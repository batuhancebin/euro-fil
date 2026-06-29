<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-xl font-bold text-white">Ürünler</h1>
        <p class="text-sm text-zinc-500 mt-0.5">{{ products.length }} ürün</p>
      </div>
      <NuxtLink to="/admin/products/new" class="btn-primary text-sm">
        + Yeni Ürün
      </NuxtLink>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead class="border-b border-surface-4">
          <tr class="text-left text-zinc-500 text-xs">
            <th class="px-5 py-3 font-medium">Ürün</th>
            <th class="px-5 py-3 font-medium">Kategori</th>
            <th class="px-5 py-3 font-medium">Fiyat</th>
            <th class="px-5 py-3 font-medium">Durum</th>
            <th class="px-5 py-3 font-medium">Öne Çıkan</th>
            <th class="px-5 py-3 font-medium w-28"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in products"
            :key="p.id"
            class="border-b border-surface-4/50 last:border-0 hover:bg-surface-3/50 transition-colors"
          >
            <td class="px-5 py-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-surface-3 overflow-hidden flex-shrink-0">
                  <img
                    v-if="p.images?.[0]"
                    :src="p.images[0]"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <ImageIcon class="w-4 h-4 text-zinc-600" />
                  </div>
                </div>
                <div>
                  <div class="text-white font-medium">{{ p.nameTr }}</div>
                  <div class="text-zinc-600 text-xs">{{ p.slug }}</div>
                </div>
              </div>
            </td>
            <td class="px-5 py-3">
              <span class="px-2 py-0.5 rounded-full text-xs" :class="catClass(p.category)">
                {{ catLabel(p.category) }}
              </span>
            </td>
            <td class="px-5 py-3 text-zinc-400">{{ p.price || '—' }}</td>
            <td class="px-5 py-3">
              <span
                class="inline-flex items-center gap-1.5 text-xs"
                :class="p.isActive ? 'text-emerald-400' : 'text-zinc-600'"
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="p.isActive ? 'bg-emerald-400' : 'bg-zinc-600'" />
                {{ p.isActive ? 'Aktif' : 'Gizli' }}
              </span>
            </td>
            <td class="px-5 py-3">
              <span v-if="p.isFeatured" class="text-brand-400 text-xs">Evet</span>
              <span v-else class="text-zinc-600 text-xs">—</span>
            </td>
            <td class="px-5 py-3">
              <div class="flex items-center gap-2">
                <NuxtLink
                  :to="`/admin/products/${p.id}`"
                  class="px-3 py-1 rounded-lg bg-surface-3 text-zinc-400 hover:text-white text-xs transition-colors"
                >
                  Düzenle
                </NuxtLink>
                <button
                  class="px-3 py-1 rounded-lg bg-surface-3 text-zinc-600 hover:text-red-400 text-xs transition-colors"
                  @click="deleteProduct(p.id)"
                >
                  Sil
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="products.length === 0" class="py-16 text-center text-zinc-600">
        Henüz ürün yok. İlk ürünü ekle.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image as ImageIcon } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'admin' })
defineI18nRoute(false)

const { data: products, refresh } = await useFetch<any[]>('/api/admin/products', { default: () => [] })

async function deleteProduct(id: number) {
  if (!confirm('Bu ürünü silmek istediğine emin misin?')) return
  await $fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
  await refresh()
}

const catMap: Record<string, string> = { home: 'Ev Tipi', industrial: 'Endüstriyel', addon: 'Ek Ünite' }
const catLabel = (c: string) => catMap[c] ?? c

const catClass = (c: string) => ({
  home:       'bg-brand-500/20 text-brand-300',
  industrial: 'bg-purple-500/20 text-purple-300',
  addon:      'bg-emerald-500/20 text-emerald-300',
}[c] ?? 'bg-zinc-500/20 text-zinc-300')
</script>
