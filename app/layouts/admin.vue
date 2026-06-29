<template>
  <div class="min-h-screen bg-surface flex">
    <!-- Sidebar -->
    <aside class="w-56 flex-shrink-0 bg-surface-2 border-r border-surface-4 flex flex-col">
      <div class="p-5 border-b border-surface-4">
        <span class="text-white font-bold tracking-tight">Euro Fil</span>
        <span class="block text-xs text-zinc-500 mt-0.5">Admin Paneli</span>
      </div>
      <nav class="flex-1 p-3 space-y-1">
        <NuxtLink
          to="/admin/products"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
          :class="$route.path.startsWith('/admin/products')
            ? 'bg-brand-500/15 text-brand-400'
            : 'text-zinc-400 hover:text-white hover:bg-surface-3'"
        >
          <Package class="w-4 h-4" />
          Ürünler
        </NuxtLink>
        <NuxtLink
          to="/admin/categories"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
          :class="$route.path.startsWith('/admin/categories')
            ? 'bg-brand-500/15 text-brand-400'
            : 'text-zinc-400 hover:text-white hover:bg-surface-3'"
        >
          <Tag class="w-4 h-4" />
          Kategoriler
        </NuxtLink>
        <NuxtLink
          to="/admin/contacts"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
          :class="$route.path.startsWith('/admin/contacts')
            ? 'bg-brand-500/15 text-brand-400'
            : 'text-zinc-400 hover:text-white hover:bg-surface-3'"
        >
          <MessageSquare class="w-4 h-4" />
          İletişim
        </NuxtLink>
      </nav>
      <div class="p-3 border-t border-surface-4">
        <button
          class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-white transition-colors"
          @click="logout"
        >
          <LogOut class="w-4 h-4" />
          Çıkış
        </button>
      </div>
    </aside>

    <!-- Content -->
    <main class="flex-1 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Package, Tag, MessageSquare, LogOut } from 'lucide-vue-next'

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  navigateTo('/admin/login')
}
</script>
