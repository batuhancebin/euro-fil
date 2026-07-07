<template>
  <div class="overflow-hidden">

    <!-- ① HERO -->
    <section class="relative py-28 sm:py-36">
      <!-- Blueprint grid -->
      <div class="absolute inset-0 pointer-events-none opacity-[0.06]" style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 48px 48px;" />
      <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <!-- Corner brackets -->
        <div class="absolute -top-2 left-0 w-6 h-6 border-t border-l border-brand-500/40 hidden sm:block" />
        <div class="absolute -top-2 right-0 w-6 h-6 border-t border-r border-brand-500/40 hidden sm:block" />

        <h1 class="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight text-white mb-8">
          <span v-for="(word, i) in heroWords" :key="i" ref="heroWordEls" class="inline-block mr-3 sm:mr-4">{{ rt(word) }}</span>
        </h1>

        <p ref="heroDesc" class="text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto">
          {{ $t('corp.hero.desc') }}
        </p>
      </div>
    </section>

    <!-- DIVIDER -->
    <div class="relative h-px max-w-7xl mx-auto">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-40" />
    </div>

    <!-- ② MANIFESTO -->
    <section ref="manifestoSection" class="py-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p ref="manifestoQuote" class="text-2xl sm:text-3xl font-semibold text-white leading-snug">
          <span class="text-brand-400 font-serif select-none">&ldquo;</span>{{ $t('corp.manifesto.quote') }}<span class="text-brand-400 font-serif select-none">&rdquo;</span>
        </p>
      </div>
    </section>

    <!-- ③ İLKELER -->
    <section ref="valuesSection" class="py-24 bg-surface-2">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref="valuesHeader" class="mb-14 text-center">
          <p class="text-white text-xs font-semibold uppercase tracking-widest mb-3">{{ $t('corp.values.label') }}</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-white">{{ $t('corp.values.title') }}</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="(item, i) in valueItems"
            :key="i"
            class="value-card relative card p-8 overflow-hidden group hover:border-brand-500/40 transition-colors"
          >
            <span class="absolute -top-3 -right-1 text-7xl font-extrabold text-white/5 select-none leading-none">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <component :is="valueIcons[i]" class="w-7 h-7 text-brand-400 mb-5 relative" />
            <h3 class="text-lg font-bold text-white mb-2 relative">{{ rt(item.title) }}</h3>
            <p class="text-sm text-zinc-400 leading-relaxed relative">{{ rt(item.desc) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ④ STANDARTLAR (marquee) -->
    <section ref="standardsSection" class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref="standardsHeader" class="mb-12 text-center">
          <p class="text-white text-xs font-semibold uppercase tracking-widest mb-3">{{ $t('corp.standards.label') }}</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-white">{{ $t('corp.standards.title') }}</h2>
        </div>
      </div>

      <div class="relative border-y border-surface-4 py-6 overflow-hidden">
        <div class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div class="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
        <div class="flex w-max animate-marquee">
          <div v-for="n in 2" :key="n" class="flex items-center flex-shrink-0">
            <template v-for="(std, si) in standardItems" :key="si + '-' + n">
              <span class="flex items-center gap-2 px-8 text-sm font-medium text-zinc-400 whitespace-nowrap">
                <BadgeCheck class="w-4 h-4 text-brand-400 flex-shrink-0" />
                {{ rt(std) }}
              </span>
              <span class="w-1 h-1 rounded-full bg-surface-4 flex-shrink-0" />
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑥ CTA -->
    <section ref="ctaSection" class="relative py-28">
      <div class="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div class="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="absolute -bottom-2 left-0 w-6 h-6 border-b border-l border-brand-500/40 hidden sm:block" />
        <div class="absolute -bottom-2 right-0 w-6 h-6 border-b border-r border-brand-500/40 hidden sm:block" />

        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">{{ $t('corp.cta.title') }}</h2>
        <p class="text-zinc-400 mb-10">{{ $t('corp.cta.desc') }}</p>
        <div class="flex flex-wrap gap-3 justify-center">
          <NuxtLink :to="localePath('/iletisim')" class="btn-primary text-base">{{ $t('corp.cta.primary') }}</NuxtLink>
          <NuxtLink :to="localePath('/urunler')" class="btn-outline text-base">{{ $t('corp.cta.secondary') }}</NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Ruler, ShieldCheck, Eye, Headphones, BadgeCheck } from 'lucide-vue-next'

definePageMeta({ layout: 'default' })

const localePath = useLocalePath()
const { t, tm, rt } = useI18n()

useSeoMeta({
  title: () => t('corp.seo.title'),
  description: () => t('corp.seo.description'),
  ogTitle: () => t('corp.seo.title'),
  ogDescription: () => t('corp.seo.description'),
  ogType: 'website',
})

const heroWords = computed<string[]>(() => tm('corp.hero.titleWords') as unknown as string[])
const valueItems = computed<{ title: string; desc: string }[]>(() => tm('corp.values.items') as unknown as { title: string; desc: string }[])
const standardItems = computed<string[]>(() => tm('corp.standards.items') as unknown as string[])

const valueIcons = [Ruler, ShieldCheck, Eye, Headphones]

const heroWordEls   = ref<HTMLElement[]>([])
const heroDesc      = ref<HTMLElement>()
const manifestoSection = ref<HTMLElement>()
const manifestoQuote   = ref<HTMLElement>()
const valuesSection = ref<HTMLElement>()
const valuesHeader  = ref<HTMLElement>()
const standardsSection = ref<HTMLElement>()
const standardsHeader  = ref<HTMLElement>()
const ctaSection    = ref<HTMLElement>()

let gsapCtx: gsap.Context

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsapCtx = gsap.context(() => {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    heroTl
      .from(heroWordEls.value, { y: 30, opacity: 0, duration: 0.7, stagger: 0.08 })
      .from(heroDesc.value!, { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')

    ScrollTrigger.create({
      trigger: manifestoSection.value,
      start: 'top 78%',
      onEnter: () => gsap.from(manifestoQuote.value!, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }),
    })

    ScrollTrigger.create({
      trigger: valuesSection.value,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(valuesHeader.value!, { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' })
        gsap.from('.value-card', { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1, delay: 0.15 })
      },
    })

    ScrollTrigger.create({
      trigger: standardsSection.value,
      start: 'top 82%',
      onEnter: () => gsap.from(standardsHeader.value!, { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }),
    })

    ScrollTrigger.create({
      trigger: ctaSection.value,
      start: 'top 85%',
      onEnter: () => gsap.from(ctaSection.value!, { scale: 0.96, opacity: 0, duration: 0.8, ease: 'power3.out' }),
    })
  })
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>

<style scoped>
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 28s linear infinite;
}
</style>
