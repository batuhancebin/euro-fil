<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-white">İletişim Talepleri</h1>
        <p class="text-zinc-500 text-sm mt-1">{{ contacts.length }} / {{ total }} talep</p>
      </div>
    </div>

    <div v-if="contacts.length === 0" class="card p-12 text-center text-zinc-500">
      Henüz iletişim talebi yok.
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="c in contacts"
        :key="c.id"
        class="card p-5 flex items-start gap-5"
      >
        <!-- Avatar -->
        <div class="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 text-brand-400 font-bold text-sm">
          {{ c.name?.charAt(0)?.toUpperCase() }}
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
            <span class="font-semibold text-white">{{ c.name }}</span>
            <a :href="`mailto:${c.email}`" class="text-brand-400 text-sm hover:underline">{{ c.email }}</a>
            <span v-if="c.phone" class="text-zinc-500 text-sm">{{ c.phone }}</span>
          </div>
          <p v-if="c.message" class="text-zinc-400 text-sm leading-relaxed">{{ c.message }}</p>
        </div>

        <!-- Meta + Sil -->
        <div class="flex flex-col items-end gap-2 flex-shrink-0">
          <span class="text-xs text-zinc-600">{{ formatDate(c.createdAt) }}</span>
          <button
            class="text-xs text-red-400 hover:text-red-300 transition-colors"
            @click="remove(c.id)"
          >
            Sil
          </button>
        </div>
      </div>
    </div>

    <div v-if="contacts.length < total" class="mt-6 text-center">
      <button class="btn-outline text-sm" :disabled="loading" @click="loadMore">
        {{ loading ? 'Yükleniyor…' : 'Daha Fazla Yükle' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
defineI18nRoute(false)

const PAGE_SIZE = 50

const contacts = ref<any[]>([])
const total = ref(0)
const loading = ref(false)

async function loadMore() {
  loading.value = true
  try {
    const res = await $fetch<{ items: any[]; total: number }>('/api/admin/contacts', {
      query: { limit: PAGE_SIZE, offset: contacts.value.length },
    })
    contacts.value.push(...res.items)
    total.value = res.total
  } finally {
    loading.value = false
  }
}

await loadMore()

function formatDate(val: string | null) {
  if (!val) return ''
  return new Date(val).toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

async function remove(id: number) {
  if (!confirm('Bu talebi silmek istediğinize emin misiniz?')) return
  await $fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' })
  contacts.value = contacts.value.filter(c => c.id !== id)
  total.value--
}
</script>
