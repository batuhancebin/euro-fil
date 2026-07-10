<template>
  <div class="p-8 max-w-2xl">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-xl font-bold text-white">Kategoriler</h1>
        <p class="text-sm text-zinc-500 mt-0.5">{{ categories.length }} kategori</p>
      </div>
      <button class="btn-primary text-sm" @click="openNew">+ Yeni Kategori</button>
    </div>

    <!-- Liste -->
    <div class="card overflow-hidden mb-8">
      <table class="w-full text-sm">
        <thead class="border-b border-surface-4">
          <tr class="text-left text-zinc-500 text-xs">
            <th class="px-5 py-3 font-medium">Ad (TR)</th>
            <th class="px-5 py-3 font-medium">Ad (EN)</th>
            <th class="px-5 py-3 font-medium">Ad (AR)</th>
            <th class="px-5 py-3 font-medium">Ad (RU)</th>
            <th class="px-5 py-3 font-medium">Slug</th>
            <th class="px-5 py-3 font-medium w-20">Sıra</th>
            <th class="px-5 py-3 font-medium w-24"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cat in categories"
            :key="cat.id"
            class="border-b border-surface-4/50 last:border-0 hover:bg-surface-3/50 transition-colors"
          >
            <td class="px-5 py-3 text-white font-medium">{{ cat.nameTr }}</td>
            <td class="px-5 py-3 text-zinc-400">{{ cat.nameEn }}</td>
              <td class="px-5 py-3 text-zinc-400" dir="rtl">{{ cat.nameAr }}</td>
              <td class="px-5 py-3 text-zinc-400">{{ cat.nameRu }}</td>
            <td class="px-5 py-3 text-zinc-500 font-mono text-xs">{{ cat.slug }}</td>
            <td class="px-5 py-3 text-zinc-500">{{ cat.sortOrder }}</td>
            <td class="px-5 py-3">
              <div class="flex gap-2">
                <button
                  class="px-3 py-1 rounded-lg bg-surface-3 text-zinc-400 hover:text-white text-xs transition-colors"
                  @click="openEdit(cat)"
                >Düzenle</button>
                <button
                  class="px-3 py-1 rounded-lg bg-surface-3 text-zinc-600 hover:text-red-400 text-xs transition-colors"
                  @click="remove(cat.id)"
                >Sil</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="categories.length === 0" class="py-12 text-center text-zinc-600">
        Henüz kategori yok.
      </div>
    </div>

    <!-- Form modal -->
    <Teleport to="body">
      <div v-if="modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" @click.self="modal = false">
        <div class="bg-surface-2 border border-surface-4 rounded-2xl p-8 w-full max-w-md mx-4">
          <h2 class="text-lg font-bold text-white mb-6">{{ editing ? 'Kategoriyi Düzenle' : 'Yeni Kategori' }}</h2>

          <form class="space-y-4" @submit.prevent="save">
            <div>
              <label class="field-label">Ad (TR)</label>
              <input v-model="form.nameTr" type="text" class="field-input" required @input="autoSlug" />
            </div>
            <div>
              <label class="field-label">Ad (EN)</label>
              <input v-model="form.nameEn" type="text" class="field-input" />
            </div>
            <div>
              <label class="field-label">Ad (AR)</label>
              <input v-model="form.nameAr" type="text" dir="rtl" class="field-input" />
            </div>
            <div>
              <label class="field-label">Ad (RU)</label>
              <input v-model="form.nameRu" type="text" class="field-input" />
            </div>
            <div>
              <label class="field-label">Slug</label>
              <input v-model="form.slug" type="text" class="field-input font-mono text-xs" required />
            </div>
            <div>
              <label class="field-label">Sıralama</label>
              <input v-model.number="form.sortOrder" type="number" class="field-input" />
            </div>

            <div class="flex gap-3 pt-2">
              <button type="submit" class="btn-primary flex-1" :disabled="saving">
                {{ saving ? 'Kaydediliyor…' : 'Kaydet' }}
              </button>
              <button type="button" class="btn-outline" @click="modal = false">İptal</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
defineI18nRoute(false)

const { data: categories, refresh } = await useFetch<any[]>('/api/admin/categories', { default: () => [] })

const modal   = ref(false)
const saving  = ref(false)
const editing = ref<any>(null)

const form = reactive({ nameTr: '', nameEn: '', nameAr: '', nameRu: '', slug: '', sortOrder: 0 })

function openNew() {
  editing.value = null
  Object.assign(form, { nameTr: '', nameEn: '', nameAr: '', nameRu: '', slug: '', sortOrder: 0 })
  modal.value = true
}

function openEdit(cat: any) {
  editing.value = cat
  Object.assign(form, { nameTr: cat.nameTr, nameEn: cat.nameEn, nameAr: cat.nameAr ?? '', nameRu: cat.nameRu ?? '', slug: cat.slug, sortOrder: cat.sortOrder })
  modal.value = true
}

function autoSlug() {
  if (editing.value) return
  form.slug = form.nameTr
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

async function save() {
  saving.value = true
  try {
    if (editing.value) {
      await $fetch(`/api/admin/categories/${editing.value.id}`, { method: 'PUT', body: { ...form } })
    } else {
      await $fetch('/api/admin/categories', { method: 'POST', body: { ...form } })
    }
    modal.value = false
    await refresh()
  } finally {
    saving.value = false
  }
}

async function remove(id: number) {
  if (!confirm('Bu kategoriyi silmek istediğine emin misin?')) return
  await $fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>

<style scoped>
.field-label { @apply block text-xs font-medium text-zinc-400 mb-1.5; }
.field-input { @apply w-full bg-surface-3 border border-surface-4 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors; }
</style>
