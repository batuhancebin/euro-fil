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
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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
        ref="introImg"
        :src="introFrameUrls[0]"
        alt=""
        draggable="false"
        class="fixed top-0 left-0 max-w-none object-contain pointer-events-none select-none z-[9999]"
        style="width: 0; height: 0; transform-origin: 0 0; will-change: transform;"
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
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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
                :alt="localized(product, 'name', locale)"
                loading="lazy"
                class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <Droplets class="w-14 h-14 text-brand-500/20" />
              </div>
              <div class="absolute top-3 start-3">
                <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/50 text-zinc-300 backdrop-blur-sm">
                  {{ categoryName(product.category) }}
                </span>
              </div>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <h3 class="font-bold text-white text-sm tracking-wide mb-2 whitespace-nowrap">
                {{ localized(product, 'name', locale) }}
              </h3>
              <p v-if="metaDesc(product)" class="text-xs text-zinc-500 leading-relaxed line-clamp-4 mb-3 min-h-[5rem]">
                {{ metaDesc(product) }}
              </p>
              <div v-if="product.price" class="flex-1">
                <span class="text-white font-bold text-lg">{{ product.price }}</span>
                <span v-if="product.priceNote" class="text-zinc-500 text-xs ms-2">{{ product.priceNote }}</span>
              </div>
              <div v-else class="flex-1" />
            </div>
            <div class="border-t border-surface-4/60 group-hover:border-brand-500/40 transition-colors duration-300 px-6 py-4 flex justify-center">
              <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-brand-300 transition-colors duration-300">
                {{ $t('products.viewProduct') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 rtl:rotate-180 transition-transform duration-300 ease-out group-hover:translate-x-1 rtl:group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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
          <div class="relative grid grid-cols-3">
            <!-- Bağlantı çizgisi: her iki uçta yarım sütun boşluk bırakır (50% / sütun sayısı) -->
            <div class="absolute top-5 left-[16.667%] right-[16.667%] h-px">
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
              <div v-if="i < stepItems.length - 1" class="w-px flex-1 bg-brand-500/20 my-2" />
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
              class="w-full flex items-center justify-between gap-4 p-5 text-start"
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
import { ChevronDown, Droplets, ShieldCheck, Layers, Headphones, FlaskConical, BadgeCheck } from 'lucide-vue-next'

definePageMeta({ layout: 'default' })

const localePath = useLocalePath()
const { t, tm, rt, locale } = useI18n()

const OG_LOCALES: Record<LocaleCode, string> = { tr: 'tr_TR', en: 'en_US', ar: 'ar_AR', ru: 'ru_RU' }
const runtimeConfig = useRuntimeConfig()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  keywords: () => t('seo.home.keywords'),
  ogTitle: () => t('seo.home.ogTitle'),
  ogDescription: () => t('seo.home.ogDescription'),
  ogType: 'website',
  ogUrl: () => `${runtimeConfig.public.siteUrl}${localePath('/')}`,
  ogLocale: () => OG_LOCALES[locale.value as LocaleCode] ?? 'tr_TR',
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
// Read the array itself rather than a hand-written index list: the FAQ has changed length twice,
// and a stale [0..n] list silently renders the raw i18n key (here, straight into the FAQPage
// structured data that Google reads).
const faqItemsForJsonLd = (tm('faq.items') as unknown as { q: string; a: string }[])
  .map(item => ({ q: rt(item.q), a: rt(item.a) }))

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
        faxNumber: '+902324610105',
        email: 'info@eurofilwater.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Bahçelievler, 430. Sk. No: 17',
          postalCode: '35170',
          addressLocality: 'Torbalı',
          addressRegion: 'İzmir',
          addressCountry: 'TR',
        },
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
// The takeover image is driven straight through the DOM, never through reactive state: writing a
// ref on every rAF re-runs this page's (very large) render function 60x/sec for two attributes.
const introImg = ref<HTMLImageElement | null>(null)

const FRAME_WIDTH = 960        // intrinsic width of the /hero-urun frames
const INTRO_FRAMES = 120        // frames the takeover timeline plays through
const INTRO_HEAD = 24          // enough of a head start to begin; the rest streams in behind us
const HEAD_BUDGET_MS = 2500    // scroll stays locked while the head loads — never hold longer

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// A full-screen 30fps image sequence is a GPU fill-rate problem on touch devices (a DPR-3 handset
// rasterises ~11M device px per frame here) and a bandwidth problem on metered connections. Both
// skip the takeover and get the hero and the 360° viewer straight away.
function skipTakeover() {
  // Phones and tablets, by device class rather than by touch capability: a touch-screen laptop
  // reports a coarse *primary* pointer yet still exposes a fine one (its trackpad/mouse), so the
  // `any-pointer: fine` clause keeps the takeover for it while a phone/tablet (coarse only) skips.
  if (window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(any-pointer: fine)').matches) return true
  // Honour an explicit Data Saver request only. We deliberately no longer guess from
  // `connection.effectiveType`: it reports '3g' on plenty of healthy Wi-Fi and was the main reason
  // the takeover silently never appeared on perfectly capable computers. The head-load budget below
  // measures *these* frames' real download speed and drops the takeover only if they can't make it.
  const conn = (navigator as { connection?: { saveData?: boolean } }).connection
  return !!conn?.saveData
}

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

// On a reload the scroll offset is restored *after* we mount, so window.scrollY still reads 0
// here. vue-router stashes the pre-reload offset in history.state.scroll before the page is
// hidden, so that's the only reliable way to know where the page is about to land.
function pendingScrollTop() {
  const saved = (window.history.state as { scroll?: { top?: number } } | null)?.scroll?.top
  return Math.max(window.scrollY, typeof saved === 'number' ? saved : 0)
}

// Belt and braces: whatever scrolls the page (router restore, browser restore, anchor jump),
// a takeover that started at the top must not keep playing over a scrolled-away section.
function onScrollAbort() {
  if (window.scrollY > 0) endIntro()
}

function endIntro() {
  if (introDone.value) return
  window.removeEventListener('scroll', onScrollAbort)
  clearTimeout(introSafetyTimer)
  introTl?.kill()
  introDone.value = true
  unlockScroll()
  gsap.set([heroBadge.value, heroTitle.value, heroDesc.value, heroCta.value], { y: 0, opacity: 1 })
}

// Batched and in play order, so frames arrive roughly when the timeline reaches them.
async function preloadBatched(urls: string[], batchSize: number) {
  for (let i = 0; i < urls.length; i += batchSize) {
    if (introCancelled) return
    await Promise.all(urls.slice(i, i + batchSize).map(preloadImage))
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
  // Reloads and back/forward navigation restore a non-zero scroll position — don't hijack the
  // page with a full-hero takeover in that case.
  if (pendingScrollTop() > 0 || !heroSection.value || !heroViewerBox.value || reducedMotion()) {
    endIntro()
    return
  }

  // No takeover here, but the page is at the top and motion is welcome: let the hero copy animate
  // in over the 360° viewer, which now takes the takeover's place immediately.
  if (skipTakeover()) {
    introDone.value = true
    unlockScroll()
    revealHero()
    return
  }

  window.addEventListener('scroll', onScrollAbort, { passive: true })
  lockScroll()

  // The hero is blank and scroll is locked until frames land, so this wait *is* the intro's cost.
  // Waiting for all 120 (2.8MB) meant ~5s of frozen page on a phone. Take a small head start and
  // let the rest stream in: the sequence eats 30 frames/s, any usable connection delivers more.
  // If even the head can't make the budget, drop the takeover rather than freeze the page.
  const headReady = await Promise.race([
    Promise.all(introFrameUrls.slice(0, INTRO_HEAD).map(preloadImage)).then(() => true),
    new Promise<boolean>((r) => { introSafetyTimer = setTimeout(() => r(false), HEAD_BUDGET_MS) }),
  ])
  clearTimeout(introSafetyTimer)
  if (!headReady) { endIntro(); return }

  // Feed the timeline while it plays. An <img> keeps painting its previous frame until the new
  // src decodes, so a frame that arrives late costs a repeated frame, never a blank flash.
  preloadBatched(introFrameUrls.slice(INTRO_HEAD, INTRO_FRAMES), 8)

  // Safety net: whatever happens, never leave scroll locked for more than a few seconds.
  introSafetyTimer = setTimeout(() => {
    endIntro()
  }, 6000)

  await nextTick()
  // The safety timer (or an unmount) may have already resolved this while we were awaiting.
  if (introCancelled || introDone.value || !heroSection.value || !heroViewerBox.value) {
    endIntro(); return
  }
  // Scroll restoration usually lands while we were awaiting the preload above. This is the last
  // point before the overlay gets a size (it is 0x0 until now), so bailing here keeps the
  // takeover from ever painting over whatever section the page was restored to.
  if (window.scrollY > 0) {
    endIntro(); return
  }

  const targetRect = heroViewerBox.value.getBoundingClientRect()

  // Cover the full viewport (not just the hero section's own box) while keeping the
  // 16:9 frame aspect ratio intact — the hero section's natural content height can be
  // shorter than the viewport (e.g. wide/short windows), which would otherwise leave a
  // gap at the bottom during the takeover and let the next section peek through.
  // On tall/narrow (mobile, portrait) viewports the viewport is much taller than it is
  // wide, so filling by width would leave big empty gaps above/below — instead fill by
  // height (cropping the sides) so the intro reads as a vertical takeover.
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const fillWidthHeight = viewportWidth * 9 / 16
  const fitsByWidth = fillWidthHeight >= viewportHeight
  const baseWidth = fitsByWidth ? viewportWidth : viewportHeight * 16 / 9
  const baseHeight = baseWidth * 9 / 16
  const xFrom = (viewportWidth - baseWidth) / 2
  const yFrom = (viewportHeight - baseHeight) / 2
  const xTo = targetRect.left
  const yTo = targetRect.top
  const scaleTo = targetRect.width / baseWidth

  const el = introImg.value
  if (!el) { endIntro(); return }

  // Never lay the image out larger than the frames actually are. Filling a portrait phone by
  // height wants ~1500 CSS px, which on a DPR-3 handset is ~11M device px rasterised per frame —
  // all of it upscaled from a 960px source, so the extra pixels buy nothing but GPU work. Lay it
  // out at the source size and reach the same on-screen size with a compositor scale instead.
  // transform-origin is 0 0 and translate is applied before scale, so x/y are unaffected.
  const renderWidth = Math.min(baseWidth, FRAME_WIDTH)
  const renderScale = baseWidth / renderWidth

  const state = { n: 0, x: xFrom, y: yFrom, s: 1 }
  el.style.width = `${renderWidth}px`
  el.style.height = `${renderWidth * 9 / 16}px`
  el.style.transform = `translate3d(${xFrom}px, ${yFrom}px, 0) scale(${renderScale})`

  // Only touch .src when the frame index actually changes: gsap ticks at the display's rate
  // (60-120Hz), the sequence only holds 30 distinct frames per second.
  let lastFrame = -1
  const drawFrame = () => {
    const i = Math.round(state.n)
    if (i === lastFrame) return
    lastFrame = i
    el.src = introFrameUrls[i]!
  }

  await nextTick()
  if (introCancelled || introDone.value) { clearTimeout(introSafetyTimer); return }

  introTl = gsap.timeline({
    // Not endIntro(): revealHero() is still animating the hero copy in at this point, and
    // endIntro() would snap it to its end state mid-flight.
    onComplete: () => {
      window.removeEventListener('scroll', onScrollAbort)
      clearTimeout(introSafetyTimer)
      introDone.value = true
      unlockScroll()
      // Only now go after the remaining ~590 frames: fetching and decoding 14MB while the
      // takeover is on screen starves the very animation it is meant to feed.
      preloadBatched(introFrameUrls.slice(INTRO_FRAMES), 40)
    },
  })
    .to(state, { n: 39, duration: 40 / 30, ease: 'none', onUpdate: drawFrame }, 0)
    .to(state, { n: 119, duration: 80 / 30, ease: 'none', onUpdate: drawFrame }, 40 / 30)
    .to(state, {
      x: xTo, y: yTo, s: scaleTo, duration: 80 / 30, ease: 'power2.inOut',
      onUpdate: () => {
        el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.s * renderScale})`
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
  window.removeEventListener('scroll', onScrollAbort)
  clearTimeout(introSafetyTimer)
  introTl?.kill()
  unlockScroll()
})

const { data: dbProducts } = await useFetch<any[]>('/api/products', { default: () => [] })
const { data: dbCategories } = await useFetch<any[]>('/api/categories', { default: () => [] })

const activeCategory = ref<string>('all')

const productCategories = computed(() => [
  { key: 'all', label: t('products.categories.all') },
  // A category with nothing to list gets no tab — the gauge housings are variants of the
  // standard ones now, so their category is empty here.
  ...(dbCategories.value ?? [])
    .filter((c: any) => (dbProducts.value ?? []).some((p: any) => p.category === c.slug))
    .map((c: any) => ({
      key: c.slug,
      label: localized(c, 'name', locale.value),
    })),
])

const HOMEPAGE_PICKS = 6
const HOUSING_CATEGORY = 'standart-filtre-kabi'

// Fixed display order for the homepage's featured picks: 5/10/20" standart.
const FEATURED_ORDER = [
  'eurofil-standart-5-tekli-filtre-kabi',
  'eurofil-standart-10-tekli-filtre-kabi',
  'eurofil-standart-20-tekli-filtre-kabi',
]

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    // Only show products that are both marked featured AND part of the curated order —
    // an isFeatured product outside FEATURED_ORDER would otherwise get indexOf() === -1
    // and sort to the very front.
    const featured = (dbProducts.value ?? [])
      .filter((p: any) => p.isFeatured && FEATURED_ORDER.includes(p.slug))
      .sort((a: any, b: any) => FEATURED_ORDER.indexOf(a.slug) - FEATURED_ORDER.indexOf(b.slug))

    // The featured picks used to be three housings times two variants. Now that the gauge
    // variants live behind their standard sibling, that curation only fills half the shelf —
    // top it up with the remaining housings so the grid still reads as a full showcase.
    const rest = (dbProducts.value ?? [])
      .filter((p: any) => p.category === HOUSING_CATEGORY && !featured.some((f: any) => f.slug === p.slug))

    return [...featured, ...rest].slice(0, HOMEPAGE_PICKS)
  }
  return (dbProducts.value ?? [])
    .filter((p: any) => p.category === activeCategory.value)
    .slice(0, HOMEPAGE_PICKS)
})

function categoryName(slug: string) {
  const cat = (dbCategories.value ?? []).find((c: any) => c.slug === slug)
  if (!cat) return slug
  return localized(cat, 'name', locale.value) ?? slug
}

function metaDesc(product: any): string {
  return localized<string>(product, 'seoDesc', locale.value) ?? ''
}

const roTags = computed(() => [0,1,2,3,4].map(i => t(`features.ro.tags[${i}]`)))
const certItems = computed(() => [0,1,2,3].map(i => t(`features.cert.items[${i}]`)))
const supportItems = computed(() => [0,1,2,3].map(i => t(`features.support.items[${i}]`)))

const ctaIcons = [FlaskConical, Headphones, BadgeCheck]
const stepIcons = [FlaskConical, Layers, Headphones]

const stepItems = computed(() =>
  [0, 1, 2].map(i => ({
    title: t(`steps.items[${i}].title`),
    desc:  t(`steps.items[${i}].desc`),
  }))
)

const faqItems = computed(() =>
  (tm('faq.items') as unknown as { q: string; a: string }[])
    .map(item => ({ q: rt(item.q), a: rt(item.a) }))
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
