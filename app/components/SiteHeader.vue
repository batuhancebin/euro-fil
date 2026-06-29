<template>
  <header ref="headerEl" class="fixed inset-x-0 z-50 px-4 sm:px-6 lg:px-8" style="top: 8px;">
    <div ref="containerEl" class="max-w-7xl mx-auto">
      <nav ref="navEl" class="flex items-center justify-between h-14 px-3 bg-white/95 backdrop-blur-md rounded-full shadow-lg shadow-black/10 border border-zinc-200/60">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex-shrink-0 pl-1">
          <img src="/light-logo.png" alt="Euro Fil" class="h-10 w-auto brightness-0" />
        </NuxtLink>

        <!-- Nav links -->
        <div class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in links"
            :key="link.key"
            :to="localePath(link.to)"
            class="px-4 py-2 rounded text-sm font-medium transition-colors"
            :class="$route.path === localePath(link.to)
              ? 'bg-brand-500 text-white'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'"
          >
            {{ $t(link.key) }}
          </NuxtLink>
        </div>

        <div class="flex items-center gap-2">
          <!-- Dil switcher -->
          <div class="hidden md:flex items-center gap-1 mr-1">
            <button
              v-for="loc in locales"
              :key="loc.code"
              class="px-2 py-1 rounded text-xs font-semibold transition-colors"
              :class="locale === loc.code
                ? 'text-brand-500'
                : 'text-zinc-400 hover:text-zinc-700'"
              @click="setLocale(loc.code as 'tr' | 'en')"
            >
              {{ loc.code.toUpperCase() }}
            </button>
          </div>

          <!-- CTA -->
          <NuxtLink ref="ctaEl" :to="localePath('/iletisim')" class="flex-shrink-0 flex items-center gap-1.5 px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors" style="border-radius: 0 9999px 9999px 0;">
            {{ $t('nav.cta') }}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const { locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()

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
  gsap.to(ctaEl.value!.$el, { borderRadius: '0 9999px 9999px 0', duration: 0.5, ease: 'power2.inOut' })
}

function onScroll() {
  window.scrollY > 150 ? toScrolled() : toTop()
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
