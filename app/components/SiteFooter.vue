<template>
  <footer class="border-t border-surface-4 bg-surface-2">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Brand -->
        <div>
          <div class="mb-4">
            <img src="/dark-logo.png" alt="Euro Fil" class="h-24 w-auto brightness-0 invert" />
          </div>
          <p class="text-sm text-zinc-500 leading-relaxed">{{ $t('footer.desc') }}</p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-sm font-semibold text-zinc-300 mb-4">{{ $t('footer.quickLinks') }}</h3>
          <ul class="space-y-2 text-sm text-zinc-500">
            <li><NuxtLink :to="localePath('/')" class="hover:text-white transition-colors">{{ $t('nav.home') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/urunler')" class="hover:text-white transition-colors">{{ $t('nav.products') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/kurumsal')" class="hover:text-white transition-colors">{{ $t('nav.corporate') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/iletisim')" class="hover:text-white transition-colors">{{ $t('nav.contact') }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-sm font-semibold text-zinc-300 mb-4">{{ $t('footer.contact') }}</h3>
          <ul class="space-y-2 text-sm text-zinc-500">
            <li>info@eurofil.com.tr</li>
            <li>+90 545 449 77 66</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-surface-4 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-600">
        <span>© {{ new Date().getFullYear() }} Euro Fil. {{ $t('footer.copyright') }}</span>
        <span>{{ $t('footer.madeByPrefix') }} <a href="https://codinkdigital.com" target="_blank" rel="noopener" class="text-brand-400 font-semibold hover:text-brand-300 transition-colors">Codink Digital</a> {{ $t('footer.madeBySuffix') }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
