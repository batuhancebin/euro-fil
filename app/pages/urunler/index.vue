<template>
  <div>
    <!-- Page Header -->
    <section class="relative overflow-hidden py-20 bg-surface-2">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-40 right-1/3 w-[600px] h-[400px] bg-brand-500/8 rounded-full blur-3xl" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-medium mb-5">
          <span class="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          {{ $t('productsPage.hero.badge') }}
        </div>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
          {{ $t('productsPage.hero.title') }}
        </h1>
        <p class="text-zinc-400 text-lg max-w-xl">{{ $t('productsPage.hero.desc') }}</p>
      </div>
    </section>

    <!-- Filter + Grid -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Filter tabs -->
        <div class="flex flex-wrap gap-2 mb-10">
          <button
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            :class="activeCategory === 'all'
              ? 'bg-brand-900 text-white'
              : 'bg-surface-2 text-zinc-400 hover:text-white border border-surface-4'"
            @click="activeCategory = 'all'"
          >
            {{ $t('productsPage.filter.all') }}
            <span class="ml-1.5 text-xs opacity-70">({{ products?.length ?? 0 }})</span>
          </button>
          <button
            v-for="cat in dbCategories"
            :key="cat.slug"
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            :class="activeCategory === cat.slug
              ? 'bg-brand-900 text-white'
              : 'bg-surface-2 text-zinc-400 hover:text-white border border-surface-4'"
            @click="activeCategory = cat.slug"
          >
            {{ locale === 'en' ? cat.nameEn || cat.nameTr : cat.nameTr }}
            <span class="ml-1.5 text-xs opacity-70">({{ countBySlug(cat.slug) }})</span>
          </button>
        </div>

        <!-- Loading -->
        <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="i" class="card h-80 animate-pulse bg-surface-3" />
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TransitionGroup name="product-fade">
            <NuxtLink
              v-for="product in filteredProducts"
              :key="product.slug"
              :to="localePath(`/urunler/${product.slug}`)"
              class="card overflow-hidden group hover:border-brand-500/40 transition-colors flex flex-col"
            >
              <!-- Image -->
              <div
                class="relative aspect-square overflow-hidden flex-shrink-0 bg-white p-6"
              >
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
                <!-- Category badge -->
                <div class="absolute top-3 left-3">
                  <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/50 text-zinc-300 backdrop-blur-sm">
                    {{ categoryName(product.category) }}
                  </span>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6 flex flex-col flex-1">
                <h3 class="font-bold text-white text-sm tracking-wide mb-2 whitespace-nowrap">
                  {{ locale === 'en' ? product.nameEn || product.nameTr : product.nameTr }}
                </h3>
                <p v-if="metaDesc(product)" class="text-xs text-zinc-500 leading-relaxed line-clamp-4 mb-3 min-h-[5rem]">
                  {{ metaDesc(product) }}
                </p>
                <!-- Price -->
                <div v-if="product.price" class="flex-1">
                  <span class="text-white font-bold text-lg">{{ product.price }}</span>
                  <span v-if="product.priceNote" class="text-zinc-500 text-xs ml-2">{{ product.priceNote }}</span>
                </div>
                <div v-else class="flex-1" />
              </div>

              <!-- Divider + CTA -->
              <div class="border-t border-surface-4/60 group-hover:border-brand-500/40 transition-colors duration-300 px-6 py-4 flex justify-center">
                <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-brand-300 transition-colors duration-300">
                  {{ $t('products.viewProduct') }}
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </NuxtLink>
          </TransitionGroup>
        </div>

        <!-- Empty state -->
        <div v-if="!pending && filteredProducts.length === 0" class="text-center py-24 text-zinc-600">
          {{ $t('productsPage.empty') }}
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Droplets } from 'lucide-vue-next'

const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('productsPage.hero.title'),
  description: () => t('productsPage.hero.desc'),
})

const activeCategory = ref('all')

const { data: products, pending } = await useFetch<any[]>('/api/products', { default: () => [] })
const { data: dbCategories } = await useFetch<any[]>('/api/categories', { default: () => [] })

const filteredProducts = computed(() =>
  activeCategory.value === 'all'
    ? (products.value ?? [])
    : (products.value ?? []).filter((p: any) => p.category === activeCategory.value)
)

function countBySlug(slug: string) {
  return (products.value ?? []).filter((p: any) => p.category === slug).length
}

function categoryName(slug: string) {
  const cat = (dbCategories.value ?? []).find((c: any) => c.slug === slug)
  if (!cat) return slug
  return locale.value === 'en' ? cat.nameEn || cat.nameTr : cat.nameTr
}

function metaDesc(product: any): string {
  return (locale.value === 'en' ? product.seoDescEn || product.seoDescTr : product.seoDescTr) ?? ''
}

</script>

<style scoped>
.product-fade-enter-active,
.product-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.product-fade-enter-from,
.product-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
