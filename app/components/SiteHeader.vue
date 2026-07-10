<template>
  <header ref="headerEl" class="fixed inset-x-0 z-50 px-4 sm:px-6 lg:px-8" style="top: 8px;">
    <div ref="containerEl" class="max-w-7xl mx-auto">
      <nav ref="navEl" class="flex items-center justify-between h-14 px-3 bg-surface-2/90 backdrop-blur-xl rounded-full shadow-xl shadow-black/40 border border-white/10">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex-shrink-0 ps-1">
          <img src="/dark-logo.png" alt="Euro Fil" class="h-[60px] w-auto" />
        </NuxtLink>

        <!-- Nav links -->
        <div class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in links"
            :key="link.key"
            :to="localePath(link.to)"
            class="px-4 py-2 rounded text-sm font-medium whitespace-nowrap transition-colors"
            :class="$route.path === localePath(link.to)
              ? 'bg-white/10 text-white'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'"
          >
            {{ $t(link.key) }}
          </NuxtLink>
        </div>

        <div class="flex items-center gap-2">
          <!-- Dil seçici (masaüstü): dünya ikonlu buton, üzerine gelince açılır liste -->
          <div class="hidden md:block relative group me-1">
            <button
              class="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
              :aria-label="$t('nav.language')"
            >
              <Globe class="w-4 h-4 flex-shrink-0" />
              <!-- fixed width so the cycling label doesn't resize the button and shift the navbar -->
              <span class="inline-block text-center whitespace-nowrap min-w-[7.5rem]">{{ cyclingLanguageLabel }}</span>
              <ChevronDown class="w-3.5 h-3.5 flex-shrink-0 opacity-60 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <!-- pt-2: butonla liste arasında hover köprüsü, boşlukta kapanmasın -->
            <div class="absolute end-0 top-full pt-2 w-48 z-50 invisible opacity-0 translate-y-1 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0">
              <div class="rounded-xl bg-surface-2/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/40 p-1.5">
                <button
                  v-for="loc in locales"
                  :key="loc.code"
                  class="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm transition-colors"
                  :class="locale === loc.code ? 'bg-white/10 text-white' : 'text-zinc-300 hover:bg-white/5 hover:text-white'"
                  @click="setLocale(loc.code as LocaleCode)"
                >
                  <span class="w-6 h-4 rounded-[3px] overflow-hidden flex-shrink-0 border border-white/15">
                    <img :src="`https://flagcdn.com/w40/${flagFor(loc.code)}.png`" :alt="loc.code" class="w-full h-full object-cover" />
                  </span>
                  <span class="font-medium whitespace-nowrap">{{ loc.name }}</span>
                  <Check v-if="locale === loc.code" class="w-4 h-4 ms-auto text-brand-400 flex-shrink-0" />
                </button>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <NuxtLink ref="ctaEl" :to="localePath('/iletisim')" class="hidden sm:flex flex-shrink-0 items-center gap-1.5 px-5 py-2 bg-brand-900 hover:bg-brand-800 text-white text-sm font-semibold transition-colors" :style="{ borderRadius: ctaRadius }">
            {{ $t('nav.cta') }}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>

          <!-- Hamburger (mobil) -->
          <button
            class="md:hidden flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full text-zinc-300 hover:bg-white/10 transition-colors me-1"
            :aria-expanded="mobileMenuOpen"
            :aria-label="$t('nav.menu')"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <Menu v-if="!mobileMenuOpen" class="w-5 h-5" />
            <X v-else class="w-5 h-5" />
          </button>
        </div>
      </nav>

      <!-- Mobil menü paneli -->
      <Transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="md:hidden mt-2 bg-surface-2/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/40 border border-white/10 overflow-hidden">
          <nav class="flex flex-col p-2">
            <NuxtLink
              v-for="link in links"
              :key="link.key"
              :to="localePath(link.to)"
              class="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              :class="$route.path === localePath(link.to)
                ? 'bg-white/10 text-white'
                : 'text-zinc-300 hover:bg-white/5'"
              @click="mobileMenuOpen = false"
            >
              {{ $t(link.key) }}
            </NuxtLink>
          </nav>

          <div class="flex items-center justify-center gap-4 py-3 border-t border-white/10">
            <template v-for="(loc, i) in locales" :key="loc.code">
              <span v-if="i > 0" class="w-px h-4 bg-white/15" />
              <button
                class="flex items-center gap-1.5 px-2 py-1 rounded-full transition-opacity"
                :class="locale === loc.code ? 'opacity-100' : 'opacity-50'"
                @click="setLocale(loc.code as LocaleCode)"
              >
                <span class="w-6 h-4 rounded-[3px] overflow-hidden flex-shrink-0 border border-white/15" :class="locale === loc.code ? 'ring-2 ring-brand-400' : ''">
                  <img :src="`https://flagcdn.com/w40/${flagFor(loc.code)}.png`" :alt="loc.code" class="w-full h-full object-cover" />
                </span>
                <span class="text-xs font-semibold" :class="locale === loc.code ? 'text-brand-400' : 'text-zinc-500'">{{ loc.code.toUpperCase() }}</span>
              </button>
            </template>
          </div>

          <div class="p-2 pt-0">
            <NuxtLink :to="localePath('/iletisim')" class="flex items-center justify-center gap-1.5 w-full px-5 py-3 bg-brand-900 hover:bg-brand-800 text-white text-sm font-semibold rounded-xl transition-colors" @click="mobileMenuOpen = false">
              {{ $t('nav.cta') }}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { Menu, X, Globe, ChevronDown, Check } from 'lucide-vue-next'
import type { LocaleCode } from '~/utils/localized'

const { locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

// A language is not a country: Arabic is spoken across twenty-odd of them. The flags are house
// style, standing for the language rather than for a single market.
const FLAGS: Record<LocaleCode, string> = { tr: 'tr', en: 'gb', ar: 'sa', ru: 'ru' }
const flagFor = (code: string) => FLAGS[code as LocaleCode] ?? 'gb'

// The switcher label cycles through all four languages every 5s, so a visitor in any language
// recognises it as the language picker. Mirrors nav.language in the locale files; hard-coded here
// because i18n is lazy and the non-active locales' messages aren't loaded to read from.
const LANGUAGE_SEQUENCE = ['tr', 'en', 'ar', 'ru'] as const
const LANGUAGE_LABELS: Record<LocaleCode, string> = {
  tr: 'Dil Seçin', en: 'Select Language', ar: 'اختر اللغة', ru: 'Выбрать язык',
}
// Start on the current locale's label (same on server and client, so no hydration mismatch).
const langCycleIndex = ref(Math.max(0, LANGUAGE_SEQUENCE.indexOf(locale.value as typeof LANGUAGE_SEQUENCE[number])))
const cyclingLanguageLabel = computed(() => LANGUAGE_LABELS[LANGUAGE_SEQUENCE[langCycleIndex.value]])
let langCycleTimer: ReturnType<typeof setInterval> | undefined

// The CTA is a pill left open on the side where it meets the navbar, so it swaps ends in Arabic.
// The scroll animation restores this exact value, hence one source of truth rather than a literal.
const isRtl = computed(() => locale.value === 'ar')
const ctaRadius = computed(() => (isRtl.value ? '9999px 0 0 9999px' : '0 9999px 9999px 0'))

const mobileMenuOpen = ref(false)

watch(() => route.fullPath, () => { mobileMenuOpen.value = false })

const links = [
  { to: '/',          key: 'nav.home' },
  { to: '/urunler',   key: 'nav.products' },
  { to: '/kurumsal',  key: 'nav.corporate' },
  { to: '/iletisim',  key: 'nav.contact' },
]

const headerEl = ref<HTMLElement>()
const containerEl = ref<HTMLElement>()
const navEl = ref<HTMLElement>()
const ctaEl = ref<{ $el: HTMLElement }>()

let isScrolled = false

function toScrolled() {
  if (isScrolled) return
  isScrolled = true
  gsap.to(headerEl.value!, { top: 0, paddingLeft: 0, paddingRight: 0, duration: 0.5, ease: 'power2.inOut' })
  gsap.to(containerEl.value!, { maxWidth: '100%', duration: 0.5, ease: 'power2.inOut' })
  gsap.to(navEl.value!, { borderRadius: 0, duration: 0.5, ease: 'power2.inOut' })
  gsap.to(ctaEl.value!.$el, { borderRadius: 0, duration: 0.5, ease: 'power2.inOut' })
}

function toTop() {
  if (!isScrolled) return
  isScrolled = false
  gsap.to(headerEl.value!, { top: 8, duration: 0.5, ease: 'power2.inOut',
    onComplete: () => gsap.set(headerEl.value!, { clearProps: 'paddingLeft,paddingRight' })
  })
  gsap.to(containerEl.value!, { maxWidth: '80rem', duration: 0.5, ease: 'power2.inOut' })
  gsap.to(navEl.value!, { borderRadius: 9999, duration: 0.5, ease: 'power2.inOut' })
  gsap.to(ctaEl.value!.$el, { borderRadius: ctaRadius.value, duration: 0.5, ease: 'power2.inOut' })
}

function onScroll() {
  window.scrollY > 150 ? toScrolled() : toTop()
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  langCycleTimer = setInterval(() => {
    langCycleIndex.value = (langCycleIndex.value + 1) % LANGUAGE_SEQUENCE.length
  }, 5000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  clearInterval(langCycleTimer)
})
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
