<template>
  <div>
    <!-- ① HERO -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-500/10 rounded-full blur-3xl" />
        <div class="absolute top-1/3 -left-40 w-[400px] h-[400px] bg-brand-700/10 rounded-full blur-3xl" />
      </div>

      <!-- Text block -->
      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
        <div ref="heroBadge" class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-white text-xs font-medium mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          {{ $t('hero.badge') }}
        </div>

        <h1 ref="heroTitle" class="text-5xl sm:text-7xl font-extrabold leading-tight tracking-tight text-white mb-6">
          {{ $t('hero.title') }}<br />
          <span class="text-white">
            {{ $t('hero.titleAccent') }}
          </span>
        </h1>

        <p ref="heroDesc" class="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-10 max-w-2xl mx-auto">
          {{ $t('hero.desc') }}
        </p>

        <div ref="heroCta" class="flex flex-wrap gap-4 justify-center">
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
      <div ref="heroViewer" class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div class="relative">
          <div class="absolute inset-0 rounded-3xl bg-brand-500/10 blur-2xl scale-95 translate-y-4" />
          <div class="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10">
            <Product360Viewer folder="/hero-urun" :total-frames="290" :fps="30" class="w-full" style="aspect-ratio: 16/9;" />
          </div>
          <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-3 border border-surface-4 text-xs text-zinc-400 whitespace-nowrap">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            {{ $t('hero.viewer360') }}
          </div>
        </div>
      </div>
    </section>


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
              ? 'bg-brand-500 border-brand-500 text-white'
              : 'border-surface-4 text-zinc-400 hover:border-brand-500/40 hover:text-white'"
            @click="activeCategory = cat.key"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Ürün grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.slug"
            class="product-card card overflow-hidden group hover:border-brand-500/40 transition-colors"
          >
            <NuxtLink :to="`/urunler/${product.slug}`">
              <div class="h-52 bg-white overflow-hidden relative p-6">
                <img
                  v-if="product.image"
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div class="p-5">
                <span class="text-xs font-medium text-white uppercase tracking-wider">{{ product.category }}</span>
                <h3 class="font-semibold text-white mt-1 mb-2 group-hover:text-brand-300 transition-colors">{{ product.name }}</h3>
                <p class="text-sm text-zinc-500 line-clamp-2">{{ product.desc }}</p>
                <div class="mt-4 flex items-center gap-2 text-sm font-medium text-white">
                  {{ $t('products.cta') }}
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </NuxtLink>
          </div>
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
              <div class="mt-8 grid grid-cols-3 gap-6 pt-6 border-t border-surface-4">
                <div>
                  <div class="text-2xl font-bold text-white">{{ $t('features.support.stats.install') }}</div>
                  <div class="text-xs text-zinc-500 mt-1">{{ $t('features.support.stats.installLabel') }}</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-white">{{ $t('features.support.stats.warranty') }}</div>
                  <div class="text-xs text-zinc-500 mt-1">{{ $t('features.support.stats.warrantyLabel') }}</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-white">{{ $t('features.support.stats.support') }}</div>
                  <div class="text-xs text-zinc-500 mt-1">{{ $t('features.support.stats.supportLabel') }}</div>
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

useSeoMeta({
  title: 'Euro Fil | Su Arıtma Sistemleri – Ev, Ofis ve Endüstriyel Çözümler',
  description: 'Euro Fil ile temiz su garantisi. Ev, ofis, fabrika ve otel için TSE sertifikalı su arıtma sistemleri, ücretsiz su analizi, 24 saatte kurulum ve 7/24 teknik destek.',
  keywords: 'su arıtma sistemi, su arıtma cihazı, reverse osmosis, endüstriyel su arıtma, ev tipi su arıtma, Euro Fil, TSE sertifikalı, su filtresi, su arıtma İstanbul',
  ogTitle: 'Euro Fil | Profesyonel Su Arıtma Sistemleri',
  ogDescription: 'Ev, ofis ve endüstriyel tesisler için TSE sertifikalı su arıtma sistemleri. Ücretsiz su analizi ve 7/24 teknik destek.',
  ogType: 'website',
  ogUrl: 'https://eurofil.com.tr/',
  ogLocale: 'tr_TR',
  ogSiteName: 'Euro Fil',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Euro Fil | Su Arıtma Sistemleri',
  twitterDescription: 'TSE sertifikalı su arıtma sistemleri. Ücretsiz su analizi, 24 saatte kurulum, 7/24 destek.',
})

useHead({
  htmlAttrs: { lang: 'tr' },
  link: [
    { rel: 'canonical', href: 'https://eurofil.com.tr/' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Euro Fil',
        description: 'Ev, ofis ve endüstriyel tesisler için profesyonel su arıtma sistemleri. TSE sertifikalı ürünler, ücretsiz su analizi ve 7/24 teknik destek.',
        url: 'https://eurofil.com.tr',
        telephone: '+905454497766',
        email: 'info@eurofil.com.tr',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'İstanbul',
          addressCountry: 'TR',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Su Arıtma Sistemleri',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: '5 Aşamalı RO Sistemi',
                description: 'Reverse osmosis teknolojisi ile %99.9 saflıkta su. Kompakt tasarım, kolay kurulum.',
                category: 'Ev Tipi Su Arıtma',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Endüstriyel Pro Serisi',
                description: 'Fabrika ve büyük işletmeler için yüksek kapasiteli saf su üretim sistemi.',
                category: 'Endüstriyel Su Arıtma',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'UV Sterilizatör',
                description: 'UV ışın teknolojisi ile bakteri ve virüsleri %100 etkisiz hale getirir.',
                category: 'Su Arıtma Ek Üniteleri',
              },
            },
          ],
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Su arıtma cihazı hangi sıklıkta bakım istiyor?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Euro Fil sistemleri yılda bir kez periyodik bakım gerektirir. Filtrelerin değişim süresi su kalitesine ve kullanım miktarına göre 6-12 ay arasında değişir. Bakım sözleşmesi olan müşterilerimize hatırlatma yapılır.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kurulum ne kadar sürer ve kim yapar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Tüm kurulumlar Euro Fil'in sertifikalı teknik ekibi tarafından yapılır. Standart ev tipi sistemler 1-2 saat, endüstriyel sistemler ise tesisin büyüklüğüne göre 1-3 gün içinde tamamlanır.",
            },
          },
          {
            '@type': 'Question',
            name: 'Hangi su kaynakları için uygundur?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Şebeke suyu, kuyu suyu ve sondaj suyu dahil her türlü su kaynağına uygun çözümlerimiz mevcuttur. Ücretsiz su analizimiz sayesinde kaynağınıza en uygun sistemi belirliyoruz.',
            },
          },
          {
            '@type': 'Question',
            name: 'Garanti kapsamı nedir?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tüm Euro Fil ürünleri 2 yıl resmi garanti kapsamındadır. Garanti süresi içinde oluşan arızalarda parça ve işçilik ücretsiz olarak karşılanır. 7/24 teknik destek hattımız her zaman hizmetinizde.',
            },
          },
          {
            '@type': 'Question',
            name: 'Teklif almak için ne yapmam gerekiyor?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'İletişim formumuzu doldurmanız yeterli. Euro Fil uzmanı 24 saat içinde sizi arar, ücretsiz su analizi planlar ve ihtiyacınıza özel fiyat teklifi sunar. Herhangi bir ön ödeme gerekmez.',
            },
          },
          {
            '@type': 'Question',
            name: 'Endüstriyel tesisler için özel çözümleriniz var mı?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Fabrika, otel, hastane ve gıda işletmeleri gibi yüksek kapasiteli tesisler için özel mühendislik çözümleri sunuyoruz. Kapasite hesabı ve sistem tasarımı ücretsiz olarak yapılır.',
            },
          },
        ],
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

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  heroTl
    .from(heroBadge.value!,  { y: 20, opacity: 0, duration: 0.6 })
    .from(heroTitle.value!,  { y: 40, opacity: 0, duration: 0.8 }, '-=0.3')
    .from(heroDesc.value!,   { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
    .from(heroCta.value!,    { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from(heroViewer.value!, { x: 60, opacity: 0, duration: 0.9 }, 0.1)

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

const { t } = useI18n()

const productCategoryKeys = ['all', 'home', 'industrial', 'addon'] as const
const activeCategory = ref<string>('all')

const productCategories = computed(() =>
  productCategoryKeys.map(k => ({ key: k, label: t(`products.categories.${k}`) }))
)

const categoryMap: Record<string, string> = {
  home: 'Ev Tipi',
  industrial: 'Endüstriyel',
  addon: 'Ek Ünite',
}

const filteredProducts = computed(() =>
  activeCategory.value === 'all'
    ? featuredProducts
    : featuredProducts.filter(p => p.category === categoryMap[activeCategory.value])
)

const roTags = computed(() => [0,1,2,3,4].map(i => t(`features.ro.tags[${i}]`)))
const certItems = computed(() => [0,1,2].map(i => t(`features.cert.items[${i}]`)))

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

const featuredProducts = [
  {
    slug: 'ro-5-asama',
    name: '5 Aşamalı RO Sistemi',
    category: 'Ev Tipi',
    desc: 'Reverse osmosis teknolojisi ile %99.9 saflıkta su. Kompakt tasarım, kolay kurulum.',
    image: '/products/ro-5-asama.svg',
  },
  {
    slug: 'endustri-pro',
    name: 'Endüstriyel Pro Serisi',
    category: 'Endüstriyel',
    desc: 'Fabrika ve büyük işletmeler için yüksek kapasiteli saf su üretim sistemi.',
    image: '/products/endustri-pro.svg',
  },
  {
    slug: 'uv-sterilizator',
    name: 'UV Sterilizatör',
    category: 'Ek Ünite',
    desc: 'UV ışın teknolojisi ile bakteri ve virüsleri %100 etkisiz hale getirir.',
    image: '/products/uv-sterilizator.svg',
  },
]



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
