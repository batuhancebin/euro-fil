<template>
  <div>
    <!-- ① HERO -->
    <section ref="heroSection" class="relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-500/10 rounded-full blur-3xl" />
        <div class="absolute top-1/3 -left-40 w-[400px] h-[400px] bg-brand-700/10 rounded-full blur-3xl" />
      </div>

      <!-- Text block -->
      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
        <div ref="heroBadge" class="opacity-0 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-white text-xs font-medium mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          {{ $t('hero.badge') }}
        </div>

        <h1 ref="heroTitle" class="opacity-0 text-5xl sm:text-7xl font-extrabold leading-tight tracking-tight text-white mb-6">
          {{ $t('hero.title') }}<br />
          <span class="text-white">
            {{ $t('hero.titleAccent') }}
          </span>
        </h1>

        <p ref="heroDesc" class="opacity-0 text-lg sm:text-xl text-zinc-400 leading-relaxed mb-10 max-w-2xl mx-auto">
          {{ $t('hero.desc') }}
        </p>

        <div ref="heroCta" class="opacity-0 flex flex-wrap gap-4 justify-center">
          <NuxtLink :to="localePath('/urunler')" class="btn-primary text-base">
            {{ $t('hero.ctaPrimary') }}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
          <NuxtLink :to="localePath('/iletisim')" class="btn-outline text-base">
            {{ $t('hero.ctaSecondary') }}
          </NuxtLink>
        </div>
      </div>

      <!-- 360° Viewer -->
      <div ref="heroViewer" class="relative max-w-none sm:max-w-3xl mx-auto px-0 sm:px-6 lg:px-8 pb-0 sm:pb-20">
        <div class="relative">
          <div ref="heroViewerBox" class="relative w-full" style="aspect-ratio: 16/9;">
            <Product360Viewer v-if="introDone" folder="/hero-urun" :total-frames="710" :start-frame="119" :fps="30" skip-preload class="w-full h-full" />
          </div>
        </div>
      </div>
    </section>

    <!-- Intro takeover: plays frames 1-40 full-hero, then morphs into the viewer's final spot over frames 40-120 -->
    <Teleport to="body">
      <img
        v-if="!introDone"
        :src="introFrameUrl"
        alt=""
        draggable="false"
        class="fixed top-0 left-0 max-w-none object-contain pointer-events-none select-none z-[9999]"
        style="transform-origin: 0 0;"
        :style="introImgStyle"
      />
    </Teleport>

    <!-- DIVIDER -->
    <div class="relative h-px">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-40" />
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-20 blur-sm" />
    </div>

    <!-- ③ ÜRÜNLER -->
    <section ref="productsSection" class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref="productsHeader" class="flex flex-col items-center text-center gap-4 mb-10">
          <div>
            <h2 class="text-3xl sm:text-4xl font-bold text-white mb-2">{{ $t('products.title') }}</h2>
            <p class="text-zinc-500">{{ $t('products.desc') }}</p>
          </div>
          <NuxtLink :to="localePath('/urunler')" class="flex-shrink-0 flex items-center gap-2 text-sm text-white hover:text-brand-300 font-medium transition-colors">
            {{ $t('products.viewAll') }}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Kategori filtreleri -->
        <div class="flex flex-wrap gap-2 mb-10">
          <button
            v-for="cat in productCategories"
            :key="cat.key"
            class="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors"
            :class="activeCategory === cat.key
              ? 'bg-brand-900 border-brand-900 text-white'
              : 'border-surface-4 text-zinc-400 hover:border-brand-500/40 hover:text-white'"
            @click="activeCategory = cat.key"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Ürün grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="product in filteredProducts"
            :key="product.slug"
            :to="localePath(`/urunler/${product.slug}`)"
            class="product-card card overflow-hidden group hover:border-brand-500/40 transition-colors flex flex-col"
          >
            <div class="aspect-square bg-white overflow-hidden relative p-6 flex-shrink-0">
              <img
                v-if="product.images?.[0]"
                :src="product.images[0]"
                :alt="locale === 'en' ? product.nameEn || product.nameTr : product.nameTr"
                loading="lazy"
                class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <Droplets class="w-14 h-14 text-brand-500/20" />
              </div>
              <div class="absolute top-3 left-3">
                <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/50 text-zinc-300 backdrop-blur-sm">
                  {{ categoryName(product.category) }}
                </span>
              </div>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <h3 class="font-bold text-white text-sm tracking-wide mb-2 whitespace-nowrap">
                {{ locale === 'en' ? product.nameEn || product.nameTr : product.nameTr }}
              </h3>
              <p v-if="metaDesc(product)" class="text-xs text-zinc-500 leading-relaxed line-clamp-4 mb-3 min-h-[5rem]">
                {{ metaDesc(product) }}
              </p>
              <div v-if="product.price" class="flex-1">
                <span class="text-white font-bold text-lg">{{ product.price }}</span>
                <span v-if="product.priceNote" class="text-zinc-500 text-xs ml-2">{{ product.priceNote }}</span>
              </div>
              <div v-else class="flex-1" />
            </div>
            <div class="border-t border-surface-4/60 group-hover:border-brand-500/40 transition-colors duration-300 px-6 py-4 flex justify-center">
              <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-brand-300 transition-colors duration-300">
                {{ $t('products.viewProduct') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ④ NEDEN EUROFİL -->
    <section ref="featuresSection" class="py-24 bg-surface-2">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref="featuresHeader" class="mb-14 text-center">
          <p class="text-white text-xs font-semibold uppercase tracking-widest mb-3">{{ $t('features.label') }}</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-3">{{ $t('features.title') }}</h2>
          <p class="text-zinc-500 max-w-xl mx-auto">{{ $t('features.desc') }}</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <!-- Büyük kart -->
          <div class="feature-card lg:col-span-2 card p-8 relative overflow-hidden group hover:border-brand-500/40 transition-colors">
            <div class="absolute -right-20 -top-20 w-72 h-72 bg-brand-500/5 rounded-full group-hover:bg-brand-500/8 transition-colors duration-500" />
            <div class="relative">
              <div class="w-12 h-12 rounded-xl bg-brand-500/15 flex items-center justify-center mb-6">
                <Droplets class="w-6 h-6 text-brand-400" />
              </div>
              <h3 class="text-xl font-bold text-white mb-3">{{ $t('features.ro.title') }}</h3>
              <p class="text-zinc-400 leading-relaxed">{{ $t('features.ro.desc') }}</p>
              <div class="mt-8 flex flex-wrap gap-2">
                <span v-for="tag in roTags" :key="tag"
                  class="px-3 py-1 rounded-full bg-surface-3 border border-surface-4 text-xs text-zinc-400">{{ tag }}</span>
              </div>
            </div>
          </div>

          <!-- Küçük kart: Sertifikalar -->
          <div class="feature-card card p-7 relative overflow-hidden group hover:border-brand-500/40 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-brand-500/15 flex items-center justify-center mb-5">
              <ShieldCheck class="w-6 h-6 text-brand-400" />
            </div>
            <h3 class="font-bold text-white mb-2">{{ $t('features.cert.title') }}</h3>
            <p class="text-sm text-zinc-400 leading-relaxed mb-5">{{ $t('features.cert.desc') }}</p>
            <div class="space-y-2">
              <div v-for="cert in certItems" :key="cert"
                class="flex items-center gap-2 text-xs text-zinc-500">
                <span class="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                {{ cert }}
              </div>
            </div>
          </div>

          <!-- Küçük kart: Kapsam -->
          <div class="feature-card card p-7 group hover:border-brand-500/40 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-brand-500/15 flex items-center justify-center mb-5">
              <Layers class="w-6 h-6 text-brand-400" />
            </div>
            <h3 class="font-bold text-white mb-2">{{ $t('features.scope.title') }}</h3>
            <p class="text-sm text-zinc-400 leading-relaxed">{{ $t('features.scope.desc') }}</p>
          </div>

          <!-- Büyük kart: Destek -->
          <div class="feature-card lg:col-span-2 card p-8 relative overflow-hidden group hover:border-brand-500/40 transition-colors">
            <div class="absolute -left-20 -bottom-20 w-72 h-72 bg-brand-500/5 rounded-full group-hover:bg-brand-500/8 transition-colors duration-500" />
            <div class="relative">
              <div class="w-12 h-12 rounded-xl bg-brand-500/15 flex items-center justify-center mb-6">
                <Headphones class="w-6 h-6 text-brand-400" />
              </div>
              <h3 class="text-xl font-bold text-white mb-3">{{ $t('features.support.title') }}</h3>
              <p class="text-zinc-400 leading-relaxed">{{ $t('features.support.desc') }}</p>
              <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-6 border-t border-surface-4">
                <div v-for="item in supportItems" :key="item"
                  class="flex items-center gap-2 text-xs text-zinc-500">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- ⑦ NASIL ÇALIŞIR -->
    <section ref="stepsSection" class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref="stepsHeader" class="text-center mb-20">
          <p class="text-white text-xs font-semibold uppercase tracking-widest mb-3">{{ $t('steps.label') }}</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">{{ $t('steps.title') }}</h2>
          <p class="text-zinc-500">{{ $t('steps.desc') }}</p>
        </div>

        <!-- Desktop: yatay timeline -->
        <div class="hidden md:block">
          <div class="relative grid grid-cols-4">
            <!-- Bağlantı çizgisi -->
            <div class="absolute top-5 left-[12.5%] right-[12.5%] h-px">
              <div class="w-full h-full bg-gradient-to-r from-brand-500/20 via-brand-500/50 to-brand-500/20" />
            </div>

            <div v-for="(step, i) in stepItems" :key="i" class="step-item flex flex-col items-center text-center px-4">
              <div class="w-10 h-10 rounded-full border border-brand-500/50 bg-surface flex items-center justify-center mb-8 relative z-10 flex-shrink-0">
                <span class="text-xs font-bold text-white">{{ String(i + 1).padStart(2, '0') }}</span>
              </div>
              <component :is="stepIcons[i]" class="w-6 h-6 text-brand-500/60 mb-4" />
              <h3 class="font-semibold text-white mb-2">{{ step.title }}</h3>
              <p class="text-sm text-zinc-500 leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Mobile: dikey timeline -->
        <div class="md:hidden space-y-0">
          <div v-for="(step, i) in stepItems" :key="i" class="step-item flex gap-5">
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 rounded-full border border-brand-500/50 bg-surface flex items-center justify-center flex-shrink-0">
                <span class="text-xs font-bold text-white">{{ String(i + 1).padStart(2, '0') }}</span>
              </div>
              <div v-if="i < 3" class="w-px flex-1 bg-brand-500/20 my-2" />
            </div>
            <div class="pb-8 pt-2">
              <h3 class="font-semibold text-white mb-1">{{ step.title }}</h3>
              <p class="text-sm text-zinc-500 leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑧ SSS -->
    <!-- CTA -->
    <section ref="ctaSection" class="py-20 bg-surface-2">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative rounded-2xl border border-surface-4 overflow-hidden">
          <div class="absolute inset-0 pointer-events-none">
            <div class="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent" />
            <div class="absolute -top-40 -left-40 w-96 h-96 bg-brand-500/8 rounded-full blur-3xl" />
          </div>

          <div class="relative grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-surface-4">
            <!-- Sol: metin + butonlar -->
            <div class="p-10 lg:p-16">
              <p class="text-white text-xs font-semibold uppercase tracking-widest mb-4">{{ $t('cta.label') }}</p>
              <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                {{ $t('cta.title') }}<br />
                <span class="text-white">{{ $t('cta.titleAccent') }}</span>
              </h2>
              <p class="text-zinc-400 mb-8 leading-relaxed">{{ $t('cta.desc') }}</p>
              <div class="flex flex-wrap gap-3">
                <NuxtLink :to="localePath('/iletisim')" class="btn-primary text-base">{{ $t('cta.primary') }}</NuxtLink>
                <NuxtLink :to="localePath('/urunler')" class="btn-outline text-base">{{ $t('cta.secondary') }}</NuxtLink>
              </div>
            </div>

            <!-- Sağ: güvenceler -->
            <div class="p-10 lg:p-16 flex flex-col justify-center gap-7">
              <div v-for="(item, i) in ctaAssurances" :key="i" class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg bg-brand-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <component :is="ctaIcons[i]" class="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <div class="font-semibold text-white text-sm">{{ item.title }}</div>
                  <div class="text-xs text-zinc-500 mt-0.5 leading-relaxed">{{ item.desc }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section ref="faqSection" class="py-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref="faqHeader" class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">{{ $t('faq.title') }}</h2>
          <p class="text-zinc-500">{{ $t('faq.desc') }}</p>
        </div>

        <div class="space-y-3">
          <div
            v-for="(faq, i) in faqItems"
            :key="i"
            class="faq-item card overflow-hidden"
          >
            <button
              class="w-full flex items-center justify-between gap-4 p-5 text-left"
              @click="activeFaq = activeFaq === i ? null : i"
            >
              <span class="font-medium text-white">{{ faq.q }}</span>
              <ChevronDown
                class="w-5 h-5 text-zinc-500 flex-shrink-0 transition-transform duration-300"
                :class="activeFaq === i ? 'rotate-180 text-brand-400' : ''"
              />
            </button>
            <Transition name="faq">
              <div v-if="activeFaq === i" class="px-5 pb-5">
                <p class="text-sm text-zinc-400 leading-relaxed">{{ faq.a }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, Droplets, ShieldCheck, Layers, Headphones, FlaskConical, Clock, BadgeCheck } from 'lucide-vue-next'

definePageMeta({ layout: 'default' })

const localePath = useLocalePath()
const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  keywords: () => t('seo.home.keywords'),
  ogTitle: () => t('seo.home.ogTitle'),
  ogDescription: () => t('seo.home.ogDescription'),
  ogType: 'website',
  ogUrl: () => `${runtimeConfig.public.siteUrl}${localePath('/')}`,
  ogLocale: () => locale.value === 'en' ? 'en_US' : 'tr_TR',
  ogSiteName: 'Euro Fil',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.home.twitterTitle'),
  twitterDescription: () => t('seo.home.twitterDescription'),
})

// The i18n prefix routing strategy (/tr, /en) means a locale switch always navigates to a
// different URL and fully remounts this page — so this head data only needs to be correct
// once per mount, not continuously reactive. Computing it eagerly (rather than passing
// unhead reactive getters) sidesteps a dev-mode unhead/Vue teardown error seen when this
// page's script[] head entries were defined as functions.
const faqItemsForJsonLd = [0, 1, 2, 3, 4, 5].map(i => ({
  q: t(`faq.items[${i}].q`),
  a: t(`faq.items[${i}].a`),
}))

useHead({
  link: [
    { rel: 'canonical', href: `${runtimeConfig.public.siteUrl}${localePath('/')}` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Euro Fil',
        description: t('seo.home.jsonLdDescription'),
        url: runtimeConfig.public.siteUrl,
        telephone: '+905540251580',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t('seo.home.offerCatalogName'),
          itemListElement: [0, 1, 2].map(i => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: t(`seo.home.offers[${i}].name`),
              description: t(`seo.home.offers[${i}].description`),
              category: t(`seo.home.offers[${i}].category`),
            },
          })),
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItemsForJsonLd.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      }),
    },
  ],
})

const heroBadge     = ref<HTMLElement>()
const heroTitle     = ref<HTMLElement>()
const heroDesc      = ref<HTMLElement>()
const heroCta       = ref<HTMLElement>()
const heroStats     = ref<HTMLElement>()
const heroViewer    = ref<HTMLElement>()
const heroSection   = ref<HTMLElement>()
const heroViewerBox = ref<HTMLElement>()
const productsSection     = ref<HTMLElement>()
const productsHeader      = ref<HTMLElement>()
const featuresSection     = ref<HTMLElement>()
const featuresHeader      = ref<HTMLElement>()
const stepsSection  = ref<HTMLElement>()
const stepsHeader   = ref<HTMLElement>()
const faqSection    = ref<HTMLElement>()
const faqHeader     = ref<HTMLElement>()
const ctaSection    = ref<HTMLElement>()
const activeFaq     = ref<number | null>(null)

// — Hero intro takeover (frames 1-40 full-hero, frames 40-120 morph into place) —
const { urls: introFrameUrls } = useProductFrames('/hero-urun', 710)
const introDone = ref(false)
const introFrameIndex = ref(0)
const introFrameUrl = computed(() => introFrameUrls[introFrameIndex.value] ?? introFrameUrls[0])
const introImgStyle = ref<{ width: string; height: string; transform: string }>({
  width: '0px', height: '0px', transform: 'translate(0px, 0px) scale(1)',
})

function preloadImage(url: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = img.onerror = () => resolve()
    img.src = url
  })
}

// Hoisted (rather than local to playIntro) so onUnmounted can reach and kill them directly —
// gsap.context() only auto-tracks animations created synchronously inside its callback, and
// this timeline/timer are necessarily built after `await` points, so they'd otherwise survive
// gsapCtx.revert() and keep running (and mutating document.body.style) after unmount.
let introTl: gsap.core.Timeline | undefined
let introSafetyTimer: ReturnType<typeof setTimeout> | undefined
let introCancelled = false

async function preloadRemainingFrames(urls: string[]) {
  const BATCH_SIZE = 40
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    if (introCancelled) return
    await Promise.all(urls.slice(i, i + BATCH_SIZE).map(preloadImage))
  }
}

function lockScroll() {
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}
function unlockScroll() {
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}

async function playIntro() {
  // Back/forward navigation can restore a non-zero scroll position before this
  // mounts — don't hijack the page with a full-hero takeover in that case.
  if (window.scrollY > 0 || !heroSection.value || !heroViewerBox.value) {
    introDone.value = true
    gsap.set([heroBadge.value, heroTitle.value, heroDesc.value, heroCta.value], { y: 0, opacity: 1 })
    return
  }

  lockScroll()
  // Safety net: whatever happens, never leave scroll locked for more than a few seconds.
  introSafetyTimer = setTimeout(() => {
    if (!introDone.value) { introTl?.kill(); introDone.value = true; unlockScroll() }
  }, 6000)

  await Promise.all(introFrameUrls.slice(0, 120).map(preloadImage))
  // keep loading the rest in the background (batched + cancellable) so the handoff to
  // Product360Viewer is instant without firing ~590 concurrent requests at once
  preloadRemainingFrames(introFrameUrls.slice(120))

  await nextTick()
  // The safety timer (or an unmount) may have already resolved this while we were awaiting.
  if (introCancelled || introDone.value || !heroSection.value || !heroViewerBox.value) {
    clearTimeout(introSafetyTimer); introDone.value = true; unlockScroll(); return
  }

  const heroRect = heroSection.value.getBoundingClientRect()
  const targetRect = heroViewerBox.value.getBoundingClientRect()

  // Cover the hero box while keeping the 16:9 frame aspect ratio intact.
  // On tall/narrow (mobile, portrait) viewports the hero is much taller than it
  // is wide, so filling by width would leave big empty gaps above/below — instead
  // fill by height (cropping the sides) so the intro reads as a vertical takeover.
  const fillWidthHeight = heroRect.width * 9 / 16
  const fitsByWidth = fillWidthHeight >= heroRect.height
  const baseWidth = fitsByWidth ? heroRect.width : heroRect.height * 16 / 9
  const baseHeight = baseWidth * 9 / 16
  const xFrom = heroRect.left + (heroRect.width - baseWidth) / 2
  const yFrom = heroRect.top + (heroRect.height - baseHeight) / 2
  const xTo = targetRect.left
  const yTo = targetRect.top
  const scaleTo = targetRect.width / baseWidth

  const state = { n: 0, x: xFrom, y: yFrom, s: 1 }
  introImgStyle.value = {
    width: `${baseWidth}px`,
    height: `${baseHeight}px`,
    transform: `translate(${xFrom}px, ${yFrom}px) scale(1)`,
  }

  await nextTick()
  if (introCancelled || introDone.value) { clearTimeout(introSafetyTimer); return }

  introTl = gsap.timeline({ onComplete: () => { clearTimeout(introSafetyTimer); introDone.value = true; unlockScroll() } })
    .to(state, {
      n: 39, duration: 40 / 30, ease: 'none',
      onUpdate: () => { introFrameIndex.value = Math.round(state.n) },
    }, 0)
    .to(state, {
      n: 119, duration: 80 / 30, ease: 'none',
      onUpdate: () => { introFrameIndex.value = Math.round(state.n) },
    }, 40 / 30)
    .to(state, {
      x: xTo, y: yTo, s: scaleTo, duration: 80 / 30, ease: 'power2.inOut',
      onUpdate: () => {
        introImgStyle.value = {
          ...introImgStyle.value,
          transform: `translate(${state.x}px, ${state.y}px) scale(${state.s})`,
        }
      },
    }, 40 / 30)
    .call(() => revealHero(), [], '-=2')
}

function revealHero() {
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .to(heroBadge.value!,   { y: 0, opacity: 1, duration: 0.6 })
    .to(heroTitle.value!,   { y: 0, opacity: 1, duration: 0.8 }, '-=0.3')
    .to(heroDesc.value!,    { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
    .to(heroCta.value!,     { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
}

let gsapCtx: gsap.Context

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsapCtx = gsap.context(() => {
    gsap.set([heroBadge.value, heroTitle.value, heroDesc.value, heroCta.value], { y: 20 })
    playIntro()

    const onEnterFade = (header: HTMLElement | undefined, cards: string, stagger = 0.12) => ({
      trigger: header,
      start: 'top 82%',
      onEnter: () => {
        gsap.from(header!, { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' })
        gsap.from(cards, { y: 50, opacity: 0, duration: 0.7, ease: 'power3.out', stagger, delay: 0.2 })
      },
    })

    ScrollTrigger.create(onEnterFade(productsHeader.value, '.product-card', 0.1))
    ScrollTrigger.create(onEnterFade(featuresHeader.value, '.feature-card'))

    ScrollTrigger.create({
      trigger: stepsSection.value,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(stepsHeader.value!, { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' })
        gsap.from('.step-item', { y: 40, opacity: 0, duration: 0.7, ease: 'back.out(1.2)', stagger: 0.2, delay: 0.2 })
      },
    })

    ScrollTrigger.create({
      trigger: faqSection.value,
      start: 'top 82%',
      onEnter: () => {
        gsap.from(faqHeader.value!, { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' })
        gsap.from('.faq-item', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1, delay: 0.2 })
      },
    })

    ScrollTrigger.create({
      trigger: ctaSection.value,
      start: 'top 85%',
      onEnter: () => gsap.from(ctaSection.value!, { scale: 0.95, opacity: 0, duration: 0.8, ease: 'power3.out' }),
    })
  })
})

onUnmounted(() => {
  gsapCtx?.revert()
  introCancelled = true
  clearTimeout(introSafetyTimer)
  introTl?.kill()
  unlockScroll()
})

const { data: dbProducts } = await useFetch<any[]>('/api/products', { default: () => [] })
const { data: dbCategories } = await useFetch<any[]>('/api/categories', { default: () => [] })

const activeCategory = ref<string>('all')

const productCategories = computed(() => [
  { key: 'all', label: t('products.categories.all') },
  ...(dbCategories.value ?? []).map((c: any) => ({
    key: c.slug,
    label: locale.value === 'en' ? c.nameEn || c.nameTr : c.nameTr,
  })),
])

// Fixed display order for the homepage's featured picks: 5/10/20" standart first, then their manometreli counterparts.
const FEATURED_ORDER = [
  'eurofil-standart-5-tekli-filtre-kabi',
  'eurofil-standart-10-tekli-filtre-kabi',
  'eurofil-standart-20-tekli-filtre-kabi',
  'eurofil-manometreli-5-tekli-filtre-kabi',
  'eurofil-manometreli-10-tekli-filtre-kabi',
  'eurofil-manometreli-20-tekli-filtre-kabi',
]

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    // Only show products that are both marked featured AND part of the curated order —
    // an isFeatured product outside FEATURED_ORDER would otherwise get indexOf() === -1
    // and sort to the very front. Cap at 6 regardless of how many are marked featured.
    return (dbProducts.value ?? [])
      .filter((p: any) => p.isFeatured && FEATURED_ORDER.includes(p.slug))
      .sort((a: any, b: any) => FEATURED_ORDER.indexOf(a.slug) - FEATURED_ORDER.indexOf(b.slug))
      .slice(0, 6)
  }
  return (dbProducts.value ?? [])
    .filter((p: any) => p.category === activeCategory.value)
    .slice(0, 6)
})

function categoryName(slug: string) {
  const cat = (dbCategories.value ?? []).find((c: any) => c.slug === slug)
  if (!cat) return slug
  return locale.value === 'en' ? cat.nameEn || cat.nameTr : cat.nameTr
}

function metaDesc(product: any): string {
  return (locale.value === 'en' ? product.seoDescEn || product.seoDescTr : product.seoDescTr) ?? ''
}

const roTags = computed(() => [0,1,2,3,4].map(i => t(`features.ro.tags[${i}]`)))
const certItems = computed(() => [0,1,2,3].map(i => t(`features.cert.items[${i}]`)))
const supportItems = computed(() => [0,1,2,3].map(i => t(`features.support.items[${i}]`)))

const ctaIcons = [FlaskConical, Clock, BadgeCheck]
const stepIcons = [FlaskConical, Layers, Clock, Headphones]

const stepItems = computed(() =>
  [0, 1, 2, 3].map(i => ({
    title: t(`steps.items[${i}].title`),
    desc:  t(`steps.items[${i}].desc`),
  }))
)

const faqItems = computed(() =>
  [0, 1, 2, 3, 4, 5].map(i => ({
    q: t(`faq.items[${i}].q`),
    a: t(`faq.items[${i}].a`),
  }))
)

const ctaAssurances = computed(() =>
  [0, 1, 2].map(i => ({
    title: t(`cta.assurances[${i}].title`),
    desc:  t(`cta.assurances[${i}].desc`),
  }))
)


</script>

<style scoped>
.faq-enter-active, .faq-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.faq-enter-from, .faq-leave-to {
  opacity: 0;
  max-height: 0;
}
.faq-enter-to, .faq-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
