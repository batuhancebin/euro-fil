<template>
  <div class="relative w-full">
    <svg :viewBox="TURKEY_VIEWBOX" class="w-full h-auto select-none" role="img" :aria-label="t('contactPage.branches.title')">
      <path
        v-for="p in PROVINCES"
        :key="p.name"
        :d="p.d"
        :class="highlightedProvinces.has(p.name) ? 'fill-brand-500/25 stroke-brand-400/60' : 'fill-surface-3 stroke-surface-4'"
        stroke-width="1"
      />

      <g
        v-for="cluster in clusters"
        :key="cluster.city"
        :transform="`translate(${cluster.pos.x}, ${cluster.pos.y})`"
        class="cursor-pointer"
        @click="pinnedCity = pinnedCity === cluster.city ? null : cluster.city"
        @mouseenter="hoveredCity = cluster.city"
        @mouseleave="hoveredCity = null"
      >
        <path
          d="M0,-28 C-11,-28 -19,-20 -19,-9 C-19,4 0,24 0,24 C0,24 19,4 19,-9 C19,-20 11,-28 0,-28 Z"
          class="transition-all duration-200 stroke-white/80"
          stroke-width="1.5"
          :class="[
            visibleCity === cluster.city ? 'fill-brand-400' : 'fill-brand-600',
          ]"
          :style="{ transformOrigin: '0px 0px', transform: visibleCity === cluster.city ? 'scale(1.12)' : 'scale(1)' }"
        />
        <circle cy="-9" r="8" class="fill-white" />
        <text x="0" y="-5.5" text-anchor="middle" class="fill-brand-700 font-bold" font-size="10">{{ cluster.branches.length }}</text>
      </g>
    </svg>

    <!-- Popover -->
    <Transition name="pop">
      <div
        v-if="activeCluster"
        class="absolute z-20 w-72 card p-4 shadow-xl shadow-black/50"
        :style="popoverStyle"
        @mouseenter="hoveredCity = activeCluster.city"
        @mouseleave="hoveredCity = null"
      >
        <div class="flex items-center justify-between mb-3">
          <h4 class="text-white font-semibold text-sm">{{ activeCluster.city }}</h4>
          <button v-if="pinnedCity" class="text-zinc-500 hover:text-white transition-colors" @click="pinnedCity = null">
            <X class="w-4 h-4" />
          </button>
        </div>
        <div class="space-y-3 max-h-64 overflow-y-auto">
          <div v-for="idx in activeCluster.branches" :key="idx" class="border-t border-surface-4 pt-3 first:border-0 first:pt-0">
            <div class="text-white text-sm font-medium mb-0.5">{{ rt(branchItems[idx].name) }}</div>
            <p class="text-zinc-500 text-xs leading-relaxed whitespace-pre-line mb-1">{{ rt(branchItems[idx].address) }}</p>
            <a
              v-if="rt(branchItems[idx].phone)"
              :href="`tel:${rt(branchItems[idx].phone).split('/')[0].replace(/[^+\d]/g, '')}`"
              class="text-brand-400 text-xs font-medium hover:text-brand-300 transition-colors"
            >
              {{ rt(branchItems[idx].phone) }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { PROVINCES, TURKEY_VIEWBOX, projectLonLat } from '~/data/turkeyMap'

const { t, tm, rt } = useI18n()

const branchItems = computed<{ name: string; address: string; phone: string; city: string }[]>(
  () => tm('contactPage.branches.items') as unknown as { name: string; address: string; phone: string; city: string }[]
)

// Each branch names its own city. Hard-coding index lists here (e.g. İstanbul: [0,1,2,3,4,5])
// meant that adding or removing a branch silently re-pointed a marker at the wrong entries —
// a wrong address under a city pin, with nothing to crash and nothing to notice.
const CLUSTER_DEFS = [
  { city: 'İstanbul', lon: 28.95, lat: 41.05 },
  { city: 'İzmir',    lon: 27.25, lat: 38.30 },
  { city: 'Gaziantep', lon: 37.38, lat: 37.07 },
  { city: 'Antalya',  lon: 30.68, lat: 36.92 },
]

const highlightedProvinces = new Set(CLUSTER_DEFS.map(c => c.city))

const clusters = computed(() =>
  CLUSTER_DEFS
    .map(c => ({
      city: c.city,
      pos: projectLonLat(c.lon, c.lat),
      branches: branchItems.value
        .map((b, i) => (rt(b.city) === c.city ? i : -1))
        .filter(i => i !== -1),
    }))
    .filter(c => c.branches.length > 0)
)

const pinnedCity = ref<string | null>(null)
const hoveredCity = ref<string | null>(null)

// Hovering always previews a cluster; a click "pins" it open so it survives mouseleave.
const visibleCity = computed(() => hoveredCity.value ?? pinnedCity.value)
const activeCluster = computed(() => clusters.value.find(c => c.city === visibleCity.value) ?? null)

const [viewW, viewH] = TURKEY_VIEWBOX.split(' ').slice(2).map(Number)

const popoverStyle = computed(() => {
  if (!activeCluster.value) return {}
  const leftPct = (activeCluster.value.pos.x / viewW) * 100
  const topPct = (activeCluster.value.pos.y / viewH) * 100
  const flip = leftPct > 65
  return {
    left: flip ? 'auto' : `calc(${leftPct}% + 24px)`,
    right: flip ? `calc(${100 - leftPct}% + 24px)` : 'auto',
    top: `max(0px, calc(${topPct}% - 90px))`,
  }
})
</script>

<style scoped>
.pop-enter-active, .pop-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: translateY(4px); }
</style>
