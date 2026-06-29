<template>
  <div
    ref="containerEl"
    class="relative select-none overflow-hidden"
    :style="{ cursor: isPaused ? (isDragging ? 'grabbing' : 'grab') : 'default' }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @mousedown="onDragStart"
    @mousemove="onDragMove"
    @mouseup="onDragEnd"
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
        <div class="text-sm text-zinc-400 mb-2">Yükleniyor...</div>
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
      :alt="`Ürün görünümü ${currentFrame + 1}`"
      class="w-full h-full object-contain pointer-events-none"
      draggable="false"
    />
    <img v-else src="/hero-urun/frame_001.jpg" class="w-full object-contain opacity-0 pointer-events-none" style="aspect-ratio:16/9" draggable="false" />

    <!-- Pause/drag hint -->
    <Transition name="fade">
      <div v-if="loaded && isPaused && !isDragging" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h8M8 12h8m-8 5h8" />
        </svg>
        Sürükleyerek döndürün
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  folder: string
  totalFrames: number
  fps?: number
}>()

const { urls } = useProductFrames(props.folder, props.totalFrames)
const fps = props.fps ?? 18

const currentFrame = ref(0)
const loaded = ref(false)
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

// — Hover —
function onMouseEnter() {
  isPaused.value = true
}
function onMouseLeave() {
  isPaused.value = false
  isDragging.value = false
  lastTime = 0
}

// — Drag (mouse) —
let dragStartX = 0
let dragStartFrame = 0
const SENSITIVITY = 4

function onDragStart(e: MouseEvent) {
  if (!loaded.value) return
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
  isDragging.value = false
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
