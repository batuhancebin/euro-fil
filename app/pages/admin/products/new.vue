<template>
  <div class="p-8 max-w-6xl">
    <div class="mb-8">
      <NuxtLink to="/admin/products" class="text-zinc-500 hover:text-white text-sm transition-colors">← Ürünler</NuxtLink>
      <h1 class="text-xl font-bold text-white mt-2">Yeni Ürün</h1>
    </div>
    <AdminProductForm :saving="saving" @submit="save" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
defineI18nRoute(false)

const saving = ref(false)

async function save(form: any) {
  saving.value = true
  try {
    await $fetch('/api/admin/products', { method: 'POST', body: form })
    await navigateTo('/admin/products')
  } finally {
    saving.value = false
  }
}
</script>
