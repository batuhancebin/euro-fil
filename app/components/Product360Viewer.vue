<template>
  <div
    ref="containerEl"
    class="relative select-none overflow-hidden"
    :style="{ cursor: isDragging ? 'grabbing' : 'grab' }"
    @mousedown="onDragStart"
    @mousemove="onDragMove"
    @mouseup="onDragEnd"
    @mouseleave="onDragEnd"
    @touchstart.prevent="onTouchStart"
    @touchmove.prevent="onTouchMove"
    @touchend="onTouchEnd"
  >
    <!-- Loading overlay -->
    <Transition name="fade">
      <div v-if="!loaded" class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface-3 rounded-xl">
        <svg class="w-8 h-8 text-brand-400 animate-spin mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        <div class="text-sm text-zinc-400 mb-2">{{ t('viewer.loading') }}</div>
        <div class="w-40 h-1.5 bg-surface-4 rounded-full overflow-hidden">
          <div class="h-full bg-brand-500 rounded-full transition-all duration-150" :style="{ width: `${progress}%` }" />
        </div>
        <div class="text-xs text-zinc-600 mt-1.5">{{ loadedCount }} / {{ urls.length }}</div>
      </div>
    </Transition>

    <!-- Frame -->
    <img
      v-if="loaded"
      :src="urls[currentFrame]"
      :alt="t('viewer.frameAlt', { n: currentFrame + 1 })"
      class="w-full h-full object-contain pointer-events-none"
      draggable="false"
    />
    <img v-else src="/hero-urun/frame_001.webp" class="w-full object-contain opacity-0 pointer-events-none" style="aspect-ratio:16/9" draggable="false" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
  folder: string
  totalFrames: number
  fps?: number
  startFrame?: number
  skipPreload?: boolean
}>()

const { urls } = useProductFrames(props.folder, props.totalFrames)
const fps = props.fps ?? 18

const currentFrame = ref(props.startFrame ?? 0)
const loaded = ref(!!props.skipPreload)
const loadedCount = ref(0)
const isPaused = ref(false)
const isDragging = ref(false)

const progress = computed(() => Math.round((loadedCount.value / urls.length) * 100))

// — Auto-play —
let rafId: number
let lastTime = 0
const interval = 1000 / fps

function animate(time: number) {
  rafId = requestAnimationFrame(animate)
  if (isPaused.value) return
  if (!lastTime) lastTime = time
  const delta = time - lastTime
  if (delta >= interval) {
    currentFrame.value = (currentFrame.value + 1) % urls.length
    lastTime = time - (delta % interval)
  }
}

// — Drag (mouse) —
let dragStartX = 0
let dragStartFrame = 0
const SENSITIVITY = 4

function onDragStart(e: MouseEvent) {
  if (!loaded.value) return
  isPaused.value = true
  isDragging.value = true
  dragStartX = e.clientX
  dragStartFrame = currentFrame.value
}
function onDragMove(e: MouseEvent) {
  if (!isDragging.value) return
  const delta = Math.round((e.clientX - dragStartX) / SENSITIVITY)
  currentFrame.value = ((dragStartFrame - delta) % urls.length + urls.length) % urls.length
}
function onDragEnd() {
  isPaused.value = false
  isDragging.value = false
  lastTime = 0
}

// — Drag (touch) —
function onTouchStart(e: TouchEvent) {
  if (!loaded.value) return
  isPaused.value = true
  isDragging.value = true
  dragStartX = e.touches[0]?.clientX ?? 0
  dragStartFrame = currentFrame.value
}
function onTouchMove(e: TouchEvent) {
  if (!isDragging.value) return
  const delta = Math.round(((e.touches[0]?.clientX ?? dragStartX) - dragStartX) / SENSITIVITY)
  currentFrame.value = ((dragStartFrame - delta) % urls.length + urls.length) % urls.length
}
function onTouchEnd() {
  isDragging.value = false
  isPaused.value = false
  lastTime = 0
}

// — Preload —
onMounted(() => {
  if (props.skipPreload) {
    rafId = requestAnimationFrame(animate)
    return
  }
  let resolved = 0
  urls.forEach((url) => {
    const img = new Image()
    img.onload = img.onerror = () => {
      resolved++
      loadedCount.value = resolved
      if (resolved === urls.length) {
        loaded.value = true
        rafId = requestAnimationFrame(animate)
      }
    }
    img.src = url
  })
})

onUnmounted(() => cancelAnimationFrame(rafId))
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
