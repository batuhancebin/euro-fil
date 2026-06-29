<template>
  <div>
    <!-- Breadcrumb -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
      <div class="flex items-center gap-2 text-sm text-zinc-500">
        <NuxtLink :to="localePath('/')" class="hover:text-white transition-colors">Ana Sayfa</NuxtLink>
        <span>/</span>
        <NuxtLink :to="localePath('/urunler')" class="hover:text-white transition-colors">{{ $t('nav.products') }}</NuxtLink>
        <span>/</span>
        <span class="text-zinc-400">{{ name }}</span>
      </div>
    </div>

    <!-- Main -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        <!-- Görsel -->
        <div class="space-y-4">
          <!-- Ana görsel -->
          <div class="rounded-2xl overflow-hidden bg-surface-2 border border-surface-4 aspect-video flex items-center justify-center">
            <img
              v-if="activeImage"
              :src="activeImage"
              :alt="name"
              class="w-full h-full object-cover"
            />
            <Droplets v-else class="w-20 h-20 text-brand-500/20" />
          </div>
          <!-- Thumbnail'lar -->
          <div v-if="product.images?.length > 1" class="flex gap-3 flex-wrap">
            <button
              v-for="(img, i) in product.images"
              :key="i"
              class="w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors"
              :class="activeImage === img ? 'border-brand-500' : 'border-surface-4 hover:border-zinc-500'"
              @click="activeImage = img"
            >
              <img :src="img" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Bilgiler -->
        <div>
          <!-- Kategori badge -->
          <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/15 text-brand-400 mb-4">
            {{ categoryName }}
          </span>

          <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">{{ name }}</h1>

          <p class="text-zinc-400 leading-relaxed mb-8">{{ desc }}</p>

          <!-- Fiyat -->
          <div v-if="product.price" class="mb-8 p-5 rounded-xl bg-surface-2 border border-surface-4 inline-block">
            <div class="text-2xl font-bold text-white">{{ product.price }}</div>
            <div v-if="product.priceNote" class="text-xs text-zinc-500 mt-0.5">{{ product.priceNote }}</div>
          </div>

          <!-- Specs -->
          <div v-if="specList.length" class="mb-8">
            <h3 class="text-sm font-semibold text-zinc-300 mb-3">Teknik Özellikler</h3>
            <ul class="space-y-2.5">
              <li v-for="spec in specList" :key="spec" class="flex items-center gap-3 text-sm text-zinc-400">
                <span class="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0" />
                {{ spec }}
              </li>
            </ul>
          </div>

          <!-- CTA -->
          <div class="flex flex-wrap gap-3">
            <NuxtLink :to="localePath('/iletisim')" class="btn-primary">
              Teklif Al
            </NuxtLink>
            <NuxtLink :to="localePath('/urunler')" class="btn-outline">
              ← Tüm Ürünler
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Droplets } from 'lucide-vue-next'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()

const { data: product } = await useFetch<any>(`/api/products/${route.params.slug}`)

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Ürün bulunamadı' })
}

const { data: dbCategories } = await useFetch<any[]>('/api/categories', { default: () => [] })

const name = computed(() =>
  locale.value === 'en' ? product.value?.nameEn || product.value?.nameTr : product.value?.nameTr
)
const desc = computed(() =>
  locale.value === 'en' ? product.value?.descEn || product.value?.descTr : product.value?.descTr
)
const specList = computed<string[]>(() => {
  const list = locale.value === 'en' ? product.value?.specsEn : product.value?.specsTr
  return Array.isArray(list) ? list.filter(Boolean) : []
})
const categoryName = computed(() => {
  const cat = (dbCategories.value ?? []).find((c: any) => c.slug === product.value?.category)
  if (!cat) return product.value?.category ?? ''
  return locale.value === 'en' ? cat.nameEn || cat.nameTr : cat.nameTr
})

const activeImage = ref<string>(product.value?.images?.[0] ?? '')

useSeoMeta({
  title: () => name.value,
  description: () => desc.value,
  ogTitle: () => name.value,
  ogDescription: () => desc.value,
  ogImage: () => product.value?.images?.[0],
})
</script>
