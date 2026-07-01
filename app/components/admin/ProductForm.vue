<template>
  <form class="space-y-8" @submit.prevent="$emit('submit', form)">

    <!-- 2 sütun layout -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">

      <!-- Sol: Ana bilgiler -->
      <div class="xl:col-span-2 space-y-6">

        <!-- Temel bilgiler -->
        <section class="card p-6 space-y-5">
          <h2 class="text-sm font-semibold text-zinc-300">Temel Bilgiler</h2>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="field-label">Ürün Adı (TR)</label>
              <input v-model="form.nameTr" type="text" class="field-input" required @input="autoSlug" />
            </div>
            <div>
              <label class="field-label">Ürün Adı (EN)</label>
              <input v-model="form.nameEn" type="text" class="field-input" />
            </div>
          </div>

          <div>
            <label class="field-label">Slug</label>
            <input v-model="form.slug" type="text" class="field-input font-mono text-xs" required />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="field-label">Kategori</label>
              <select v-model="form.category" class="field-input" required>
                <option value="">Seçin…</option>
                <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">
                  {{ cat.nameTr }}
                </option>
              </select>
            </div>
            <div>
              <label class="field-label">Sıralama</label>
              <input v-model.number="form.sortOrder" type="number" class="field-input" />
            </div>
          </div>
        </section>

        <!-- Açıklama -->
        <section class="card p-6 space-y-5">
          <h2 class="text-sm font-semibold text-zinc-300">Açıklama</h2>
          <div>
            <label class="field-label">Açıklama (TR)</label>
            <textarea v-model="form.descTr" rows="4" class="field-input resize-none" />
          </div>
          <div>
            <label class="field-label">Açıklama (EN)</label>
            <textarea v-model="form.descEn" rows="4" class="field-input resize-none" />
          </div>
        </section>

        <!-- Özellikler (specs) -->
        <section class="card p-6 space-y-5">
          <h2 class="text-sm font-semibold text-zinc-300">Teknik Özellikler</h2>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="field-label mb-2">TR Özellikler</label>
              <div class="space-y-2">
                <div v-for="(_, i) in form.specsTr" :key="i" class="flex gap-2">
                  <input v-model="form.specsTr[i]" type="text" class="field-input flex-1 text-sm" @paste="onSpecPaste($event, form.specsTr, i)" />
                  <button type="button" class="text-zinc-600 hover:text-red-400 px-1" @click="form.specsTr.splice(i, 1)">×</button>
                </div>
                <button type="button" class="text-xs text-brand-400 hover:text-brand-300" @click="form.specsTr.push('')">+ Ekle</button>
              </div>
            </div>
            <div>
              <label class="field-label mb-2">EN Specs</label>
              <div class="space-y-2">
                <div v-for="(_, i) in form.specsEn" :key="i" class="flex gap-2">
                  <input v-model="form.specsEn[i]" type="text" class="field-input flex-1 text-sm" @paste="onSpecPaste($event, form.specsEn, i)" />
                  <button type="button" class="text-zinc-600 hover:text-red-400 px-1" @click="form.specsEn.splice(i, 1)">×</button>
                </div>
                <button type="button" class="text-xs text-brand-400 hover:text-brand-300" @click="form.specsEn.push('')">+ Add</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Varyant Tablosu -->
        <section class="card p-6 space-y-5">
          <h2 class="text-sm font-semibold text-zinc-300">Varyant Tablosu</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="field-label">Max. Basınç</label>
              <input v-model="form.maxPressure" type="text" placeholder="Örn: 8 Bar (116 PSI)" class="field-input" />
            </div>
            <div>
              <label class="field-label">Max. Çalışma Sıcaklığı</label>
              <input v-model="form.maxTemp" type="text" placeholder="Örn: 45°C (113°F)" class="field-input" />
            </div>
          </div>

          <div class="space-y-2">
            <div class="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 text-xs text-zinc-500 px-1">
              <span>Ürün Kodu</span>
              <span>Cins</span>
              <span>Bağlantı Ölçüsü</span>
              <span></span>
            </div>
            <div v-for="(variant, i) in form.variants" :key="i" class="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
              <input v-model="variant.code" type="text" placeholder="10503406" class="field-input text-sm font-mono" />
              <input v-model="variant.cins" type="text" placeholder="ŞEFFAF" class="field-input text-sm" />
              <input v-model="variant.connection" type="text" placeholder="1/2&quot;" class="field-input text-sm" />
              <button type="button" class="text-zinc-600 hover:text-red-400 px-1" @click="form.variants.splice(i, 1)">×</button>
            </div>
            <button type="button" class="text-xs text-brand-400 hover:text-brand-300" @click="form.variants.push({ code: '', cins: '', connection: '' })">+ Varyant Ekle</button>
          </div>
        </section>

        <!-- SEO -->
        <section class="card p-6 space-y-5">
          <h2 class="text-sm font-semibold text-zinc-300">SEO</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="field-label">SEO Başlık (TR)</label>
              <input v-model="form.seoTitleTr" type="text" class="field-input" />
            </div>
            <div>
              <label class="field-label">SEO Title (EN)</label>
              <input v-model="form.seoTitleEn" type="text" class="field-input" />
            </div>
            <div>
              <label class="field-label">SEO Açıklama (TR)</label>
              <textarea v-model="form.seoDescTr" rows="2" class="field-input resize-none" />
            </div>
            <div>
              <label class="field-label">SEO Description (EN)</label>
              <textarea v-model="form.seoDescEn" rows="2" class="field-input resize-none" />
            </div>
          </div>
        </section>

      </div>

      <!-- Sağ: Görsel, fiyat, ayarlar -->
      <div class="space-y-6">

        <!-- Ayarlar -->
        <section class="card p-6 space-y-4">
          <h2 class="text-sm font-semibold text-zinc-300">Ayarlar</h2>
          <label class="flex items-center justify-between cursor-pointer">
            <span class="text-sm text-zinc-400">Aktif</span>
            <button
              type="button"
              class="w-10 h-6 rounded-full transition-colors relative"
              :class="form.isActive ? 'bg-brand-500' : 'bg-surface-4'"
              @click="form.isActive = !form.isActive"
            >
              <span class="absolute top-1 w-4 h-4 rounded-full bg-white transition-all" :class="form.isActive ? 'left-5' : 'left-1'" />
            </button>
          </label>
          <label class="flex items-center justify-between cursor-pointer">
            <span class="text-sm text-zinc-400">Öne Çıkan</span>
            <button
              type="button"
              class="w-10 h-6 rounded-full transition-colors relative"
              :class="form.isFeatured ? 'bg-brand-500' : 'bg-surface-4'"
              @click="form.isFeatured = !form.isFeatured"
            >
              <span class="absolute top-1 w-4 h-4 rounded-full bg-white transition-all" :class="form.isFeatured ? 'left-5' : 'left-1'" />
            </button>
          </label>
        </section>

        <!-- Fiyat -->
        <section class="card p-6 space-y-4">
          <h2 class="text-sm font-semibold text-zinc-300">Fiyat</h2>
          <div>
            <label class="field-label">Fiyat</label>
            <input v-model="form.price" type="text" placeholder="Örn: 2.450 ₺" class="field-input" />
          </div>
          <div>
            <label class="field-label">Not</label>
            <input v-model="form.priceNote" type="text" placeholder="Örn: KDV dahil" class="field-input" />
          </div>
        </section>

        <!-- Görseller -->
        <section class="card p-6 space-y-4">
          <h2 class="text-sm font-semibold text-zinc-300">Görseller</h2>

          <!-- Mevcut görseller -->
          <div v-if="form.images.length" class="grid grid-cols-2 gap-2">
            <div
              v-for="(img, i) in form.images"
              :key="i"
              class="relative group rounded-lg overflow-hidden bg-white aspect-video p-2"
            >
              <img :src="img" class="w-full h-full object-contain" />
              <button
                type="button"
                class="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                @click="form.images.splice(i, 1)"
              >×</button>
              <div v-if="i === 0" class="absolute bottom-1 left-1 text-xs bg-black/60 text-zinc-300 px-1.5 py-0.5 rounded">Ana</div>
            </div>
          </div>

          <!-- Upload -->
          <div
            class="border-2 border-dashed border-surface-4 rounded-lg p-6 text-center hover:border-brand-500/50 transition-colors cursor-pointer relative"
            @click="fileInput?.click()"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <input ref="fileInput" type="file" class="hidden" accept="image/*" multiple @change="handleFiles" />
            <Upload class="w-6 h-6 text-zinc-600 mx-auto mb-2" />
            <p class="text-xs text-zinc-500">Görsel yükle veya sürükle</p>
            <p class="text-xs text-zinc-600 mt-1">WebP'ye otomatik dönüştürülür</p>
          </div>

          <!-- Upload progress -->
          <div v-if="uploading" class="text-xs text-zinc-400 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
            Yükleniyor…
          </div>
          <p v-if="uploadError" class="text-xs text-red-400">{{ uploadError }}</p>
        </section>

      </div>
    </div>

    <!-- Footer actions -->
    <div class="flex items-center gap-3 pt-2">
      <button type="submit" class="btn-primary" :disabled="saving">
        {{ saving ? 'Kaydediliyor…' : (isEdit ? 'Güncelle' : 'Ürün Ekle') }}
      </button>
      <NuxtLink to="/admin/products" class="btn-outline">İptal</NuxtLink>
    </div>

  </form>
</template>

<script setup lang="ts">
import { Upload } from 'lucide-vue-next'

const { data: categories } = await useFetch<any[]>('/api/admin/categories', { default: () => [] })

const props = defineProps<{
  initial?: Record<string, any>
  saving?: boolean
  isEdit?: boolean
}>()
defineEmits<{ submit: [form: any] }>()

const fileInput = ref<HTMLInputElement>()
const uploading = ref(false)
const uploadError = ref('')

const form = reactive({
  slug:       '',
  nameTr:     '',
  nameEn:     '',
  category:   '',
  descTr:     '',
  descEn:     '',
  specsTr:    [] as string[],
  specsEn:    [] as string[],
  maxPressure: '',
  maxTemp:     '',
  variants:    [] as { code: string; cins: string; connection: string }[],
  price:      '',
  priceNote:  '',
  seoTitleTr: '',
  seoTitleEn: '',
  seoDescTr:  '',
  seoDescEn:  '',
  images:     [] as string[],
  isActive:   true,
  isFeatured: false,
  sortOrder:  0,
})

if (props.initial) Object.assign(form, props.initial)

function onSpecPaste(e: ClipboardEvent, specs: string[], i: number) {
  const text = e.clipboardData?.getData('text') ?? ''
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  if (lines.length <= 1) return
  e.preventDefault()
  specs.splice(i, 1, ...lines)
}

function autoSlug() {
  if (props.isEdit) return
  form.slug = form.nameTr
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function uploadFile(file: File) {
  const fd = new FormData()
  fd.append('file', file)
  const res = await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: fd })
  return res.url
}

async function handleFiles(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files?.length) return
  uploading.value = true
  uploadError.value = ''
  try {
    for (const file of Array.from(files)) {
      const url = await uploadFile(file)
      form.images.push(url)
    }
  } catch {
    uploadError.value = 'Yükleme başarısız.'
  } finally {
    uploading.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

async function handleDrop(e: DragEvent) {
  const files = e.dataTransfer?.files
  if (!files?.length) return
  uploading.value = true
  uploadError.value = ''
  try {
    for (const file of Array.from(files)) {
      const url = await uploadFile(file)
      form.images.push(url)
    }
  } catch {
    uploadError.value = 'Yükleme başarısız.'
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.field-label {
  @apply block text-xs font-medium text-zinc-400 mb-1.5;
}
.field-input {
  @apply w-full bg-surface-3 border border-surface-4 rounded-lg px-3 py-2 text-white text-sm
         focus:outline-none focus:border-brand-500 transition-colors;
}
</style>
