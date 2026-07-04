<template>
  <div>
    <!-- Breadcrumb -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
      <div class="flex items-center gap-2 text-sm text-zinc-500">
        <NuxtLink :to="localePath('/')" class="hover:text-white transition-colors">Ana Sayfa</NuxtLink>
        <span class="text-zinc-700">/</span>
        <NuxtLink :to="localePath('/urunler')" class="hover:text-white transition-colors">{{ $t('nav.products') }}</NuxtLink>
        <span class="text-zinc-700">/</span>
        <span class="text-zinc-400">{{ name }}</span>
      </div>
    </div>

    <!-- Main -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

        <!-- Görsel -->
        <div ref="galleryEl" class="lg:col-span-7 lg:sticky lg:top-28">
          <div class="flex gap-3">
            <!-- Dikey thumbnail şeridi (desktop) -->
            <div v-if="product.images?.length > 1" class="hidden sm:flex flex-col gap-2.5 flex-shrink-0">
              <button
                v-for="(img, i) in product.images"
                :key="i"
                class="w-16 h-16 rounded-lg overflow-hidden border bg-white p-1.5 transition-all duration-200"
                :class="activeImage === img ? 'border-brand-500 ring-2 ring-brand-500/20' : 'border-surface-4 hover:border-zinc-400 opacity-70 hover:opacity-100'"
                @click="activeImage = img"
              >
                <img :src="img" class="w-full h-full object-contain" />
              </button>
            </div>

            <!-- Ana görsel -->
            <div class="relative flex-1 rounded-2xl overflow-hidden bg-white border border-surface-4 aspect-square flex items-center justify-center p-10">
              <span class="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/5 text-zinc-500">
                {{ categoryName }}
              </span>
              <Transition name="fade" mode="out-in">
                <img
                  v-if="activeImage"
                  :key="activeImage"
                  :src="activeImage"
                  :alt="name"
                  class="w-full h-full object-contain"
                />
                <Droplets v-else class="w-20 h-20 text-brand-500/20" />
              </Transition>
            </div>
          </div>

          <!-- Yatay thumbnail şeridi (mobil) -->
          <div v-if="product.images?.length > 1" class="sm:hidden flex gap-2.5 mt-3 overflow-x-auto pb-1">
            <button
              v-for="(img, i) in product.images"
              :key="i"
              class="w-16 h-16 rounded-lg overflow-hidden border bg-white p-1.5 flex-shrink-0 transition-all duration-200"
              :class="activeImage === img ? 'border-brand-500 ring-2 ring-brand-500/20' : 'border-surface-4'"
              @click="activeImage = img"
            >
              <img :src="img" class="w-full h-full object-contain" />
            </button>
          </div>
        </div>

        <!-- Bilgiler -->
        <div ref="infoEl" class="lg:col-span-5">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">{{ name }}</h1>
          <p class="text-zinc-400 leading-relaxed text-[15px]">{{ desc }}</p>

          <!-- Fiyat + CTA kartı -->
          <div class="mt-6 p-5 rounded-2xl bg-surface-2 border border-surface-4">
            <div v-if="product.price" class="flex items-baseline gap-2 mb-4">
              <span class="text-2xl font-bold text-white">{{ product.price }}</span>
              <span v-if="product.priceNote" class="text-xs text-zinc-500">{{ product.priceNote }}</span>
            </div>
            <div class="flex flex-col sm:flex-row gap-2.5">
              <NuxtLink :to="localePath('/iletisim')" class="btn-primary flex-1 justify-center">
                Bayi Teklifi Al
              </NuxtLink>
              <NuxtLink :to="localePath('/urunler')" class="btn-outline justify-center">
                Tüm Ürünler
              </NuxtLink>
            </div>
          </div>

          <!-- Specs -->
          <div v-if="specList.length" class="mt-8">
            <h3 class="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Teknik Özellikler</h3>
            <ul class="space-y-2.5">
              <li v-for="spec in specList" :key="spec" class="flex items-center gap-3 text-sm text-zinc-300">
                <span class="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                {{ spec }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Varyant tablosu -->
      <div v-if="product.variants?.length" class="mt-16 flex justify-center">
        <div class="w-full max-w-3xl">
          <div class="rounded-2xl border-2 border-brand-500/30 overflow-hidden">
            <div class="text-center py-4 px-4">
              <h2 class="text-lg sm:text-xl font-extrabold text-white tracking-wide">{{ name.toUpperCase() }}</h2>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm min-w-[560px]">
                <thead>
                  <tr class="bg-surface-3 text-zinc-400 text-xs uppercase tracking-wide">
                    <th class="px-3 py-3 font-semibold text-left">Ürün Kodu</th>
                    <th class="px-3 py-3 font-semibold text-left">Cins</th>
                    <th class="px-3 py-3 font-semibold text-center">Max. Basınç</th>
                    <th class="px-3 py-3 font-semibold text-center">Max. Çalışma Sıcaklığı</th>
                    <th class="px-3 py-3 font-semibold text-center">Bağlantı Ölçüsü</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(v, i) in product.variants" :key="v.code">
                    <tr class="border-t border-surface-4 text-zinc-200">
                      <td class="px-3 py-2.5 font-mono">{{ v.code }}</td>
                      <td class="px-3 py-2.5">{{ v.cins }}</td>
                      <td v-if="i === 0" :rowspan="product.variants.length" class="px-3 py-2.5 text-center align-middle border-l border-surface-4 text-zinc-300">
                        {{ product.maxPressure }}
                      </td>
                      <td v-if="i === 0" :rowspan="product.variants.length" class="px-3 py-2.5 text-center align-middle border-l border-surface-4 text-zinc-300">
                        {{ product.maxTemp }}
                      </td>
                      <td v-if="isConnectionGroupStart(i)" :rowspan="connectionGroupSize(i)" class="px-3 py-2.5 text-center align-middle border-l border-surface-4 font-semibold text-white">
                        {{ v.connection }}
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mobil sticky CTA bar -->
    <div v-if="product.price" class="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface-2/95 backdrop-blur-md border-t border-surface-4 px-4 py-3 flex items-center justify-between gap-4">
      <div>
        <div class="text-white font-bold">{{ product.price }}</div>
        <div v-if="product.priceNote" class="text-[11px] text-zinc-500">{{ product.priceNote }}</div>
      </div>
      <NuxtLink :to="localePath('/iletisim')" class="btn-primary text-sm">Bayi Teklifi Al</NuxtLink>
    </div>
    <div v-if="product.price" class="lg:hidden h-20" />
  </div>
</template>

<script setup lang="ts">
import { Droplets } from 'lucide-vue-next'
import { gsap } from 'gsap'

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
const seoTitle = computed(() =>
  (locale.value === 'en' ? product.value?.seoTitleEn || product.value?.seoTitleTr : product.value?.seoTitleTr) || name.value
)
const seoDesc = computed(() =>
  (locale.value === 'en' ? product.value?.seoDescEn || product.value?.seoDescTr : product.value?.seoDescTr) || desc.value
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

function isConnectionGroupStart(i: number): boolean {
  const variants = product.value?.variants ?? []
  return i === 0 || variants[i]?.connection !== variants[i - 1]?.connection
}

function connectionGroupSize(i: number): number {
  const variants = product.value?.variants ?? []
  let count = 0
  for (let j = i; j < variants.length && variants[j].connection === variants[i].connection; j++) count++
  return count
}

const galleryEl = ref<HTMLElement>()
const infoEl = ref<HTMLElement>()

onMounted(() => {
  gsap.from(galleryEl.value!, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
  gsap.from(infoEl.value!, { opacity: 0, y: 20, duration: 0.6, delay: 0.1, ease: 'power3.out' })
})

useHead({
  titleTemplate: (titleChunk) => titleChunk ?? 'Euro Fil',
})

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDesc.value,
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDesc.value,
  ogImage: () => product.value?.images?.[0],
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
