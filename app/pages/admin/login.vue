<template>
  <div class="min-h-screen bg-surface flex items-center justify-center">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <div class="text-2xl font-bold text-white mb-1">Euro Fil</div>
        <div class="text-zinc-500 text-sm">Admin Paneli</div>
      </div>

      <form class="card p-8 space-y-5" @submit.prevent="login">
        <div>
          <label class="block text-xs font-medium text-zinc-400 mb-2">Şifre</label>
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            class="w-full bg-surface-3 border border-surface-4 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="text-red-400 text-xs">{{ error }}</div>

        <button type="submit" class="btn-primary w-full" :disabled="loading">
          {{ loading ? 'Giriş yapılıyor…' : 'Giriş Yap' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
defineI18nRoute(false)

const password = ref('')
const error    = ref('')
const loading  = ref(false)

async function login() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/admin/login', { method: 'POST', body: { password: password.value } })
    await navigateTo('/admin/products')
  } catch {
    error.value = 'Hatalı şifre.'
  } finally {
    loading.value = false
  }
}
</script>
