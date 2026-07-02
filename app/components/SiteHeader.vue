<template>
  <header ref="headerEl" class="fixed inset-x-0 z-50 px-4 sm:px-6 lg:px-8" style="top: 8px;">
    <div ref="containerEl" class="max-w-7xl mx-auto">
      <nav ref="navEl" class="flex items-center justify-between h-14 px-3 bg-white/95 backdrop-blur-md rounded-full shadow-lg shadow-black/10 border border-zinc-200/60">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex-shrink-0 pl-1">
          <img src="/light-logo.png" alt="Euro Fil" class="h-[60px] w-auto" />
        </NuxtLink>

        <!-- Nav links -->
        <div class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in links"
            :key="link.key"
            :to="localePath(link.to)"
            class="px-4 py-2 rounded text-sm font-medium transition-colors"
            :class="$route.path === localePath(link.to)
              ? 'bg-brand-900 text-white'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'"
          >
            {{ $t(link.key) }}
          </NuxtLink>
        </div>

        <div class="flex items-center gap-2">
          <!-- Dil switcher -->
          <div class="hidden md:flex items-center gap-1.5 mr-1">
            <template v-for="(loc, i) in locales" :key="loc.code">
              <span v-if="i > 0" class="w-px h-4 bg-zinc-300" />
              <button
                class="flex items-center gap-1.5 px-1.5 py-1 rounded-full transition-opacity"
                :class="locale === loc.code ? 'opacity-100' : 'opacity-50 hover:opacity-80'"
                @click="setLocale(loc.code as 'tr' | 'en')"
              >
                <span class="w-6 h-4 rounded-[3px] overflow-hidden flex-shrink-0 border border-black/10" :class="locale === loc.code ? 'ring-2 ring-brand-500 ring-offset-1' : ''">
                  <img :src="`https://flagcdn.com/w40/${loc.code === 'tr' ? 'tr' : 'gb'}.png`" :alt="loc.code" class="w-full h-full object-cover" />
                </span>
                <span class="text-xs font-semibold" :class="locale === loc.code ? 'text-brand-500' : 'text-zinc-500'">{{ loc.code.toUpperCase() }}</span>
              </button>
            </template>
          </div>

          <!-- CTA -->
          <NuxtLink ref="ctaEl" :to="localePath('/iletisim')" class="hidden sm:flex flex-shrink-0 items-center gap-1.5 px-5 py-2 bg-brand-900 hover:bg-brand-800 text-white text-sm font-semibold transition-colors" style="border-radius: 0 9999px 9999px 0;">
            {{ $t('nav.cta') }}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>

          <!-- Hamburger (mobil) -->
          <button
            class="md:hidden flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full text-zinc-700 hover:bg-zinc-100 transition-colors mr-1"
            :aria-expanded="mobileMenuOpen"
            aria-label="Menü"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <Menu v-if="!mobileMenuOpen" class="w-5 h-5" />
            <X v-else class="w-5 h-5" />
          </button>
        </div>
      </nav>

      <!-- Mobil menü paneli -->
      <Transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="md:hidden mt-2 bg-white rounded-2xl shadow-lg shadow-black/10 border border-zinc-200/60 overflow-hidden">
          <nav class="flex flex-col p-2">
            <NuxtLink
              v-for="link in links"
              :key="link.key"
              :to="localePath(link.to)"
              class="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              :class="$route.path === localePath(link.to)
                ? 'bg-brand-900 text-white'
                : 'text-zinc-700 hover:bg-zinc-100'"
              @click="mobileMenuOpen = false"
            >
              {{ $t(link.key) }}
            </NuxtLink>
          </nav>

          <div class="flex items-center justify-center gap-4 py-3 border-t border-zinc-200/60">
            <template v-for="(loc, i) in locales" :key="loc.code">
              <span v-if="i > 0" class="w-px h-4 bg-zinc-300" />
              <button
                class="flex items-center gap-1.5 px-2 py-1 rounded-full transition-opacity"
                :class="locale === loc.code ? 'opacity-100' : 'opacity-50'"
                @click="setLocale(loc.code as 'tr' | 'en')"
              >
                <span class="w-6 h-4 rounded-[3px] overflow-hidden flex-shrink-0 border border-black/10" :class="locale === loc.code ? 'ring-2 ring-brand-500 ring-offset-1' : ''">
                  <img :src="`https://flagcdn.com/w40/${loc.code === 'tr' ? 'tr' : 'gb'}.png`" :alt="loc.code" class="w-full h-full object-cover" />
                </span>
                <span class="text-xs font-semibold" :class="locale === loc.code ? 'text-brand-500' : 'text-zinc-500'">{{ loc.code.toUpperCase() }}</span>
              </button>
            </template>
          </div>

          <div class="p-2 pt-0">
            <NuxtLink :to="localePath('/iletisim')" class="flex items-center justify-center gap-1.5 w-full px-5 py-3 bg-brand-900 hover:bg-brand-800 text-white text-sm font-semibold rounded-xl transition-colors" @click="mobileMenuOpen = false">
              {{ $t('nav.cta') }}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
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
import { Menu, X } from 'lucide-vue-next'

const { locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

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
