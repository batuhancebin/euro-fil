<template>
  <div class="p-8 max-w-6xl">
    <div class="mb-8">
      <NuxtLink to="/admin/products" class="text-zinc-500 hover:text-white text-sm transition-colors">← Ürünler</NuxtLink>
      <h1 class="text-xl font-bold text-white mt-2">Ürünü Düzenle</h1>
    </div>
    <AdminProductForm v-if="product" :initial="product" :saving="saving" is-edit @submit="save" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
defineI18nRoute(false)

const route = useRoute()
const saving = ref(false)

const { data: product } = await useFetch<any>(`/api/admin/products/${route.params.id}`)

async function save(form: any) {
  saving.value = true
  try {
    await $fetch(`/api/admin/products/${route.params.id}`, { method: 'PUT', body: form })
    await navigateTo('/admin/products')
  } finally {
    saving.value = false
  }
}
</script>
