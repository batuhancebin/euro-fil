<template>
  <div>
    <!-- Header -->
    <section class="relative overflow-hidden py-20 bg-surface-2">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/8 rounded-full blur-3xl" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-medium mb-5">
          <span class="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          {{ $t('contactPage.badge') }}
        </div>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
          {{ $t('contactPage.title') }}
        </h1>
        <p class="text-zinc-400 text-lg max-w-xl mx-auto">{{ $t('contactPage.desc') }}</p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <!-- Form -->
          <div class="lg:col-span-2">
            <!-- Success -->
            <div v-if="success" class="card p-8 text-center">
              <div class="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
                <CheckCircle class="w-7 h-7 text-emerald-400" />
              </div>
              <h2 class="text-xl font-bold text-white mb-2">{{ $t('contactPage.form.successTitle') }}</h2>
              <p class="text-zinc-400">{{ $t('contactPage.form.success') }}</p>
              <button class="btn-outline mt-6" @click="success = false">{{ $t('contactPage.form.newMessage') }}</button>
            </div>

            <!-- Form -->
            <form v-else class="card p-8 space-y-6" @submit.prevent="submit">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="field-label">{{ $t('contactPage.form.name') }} *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="field-input"
                    required
                  />
                </div>
                <div>
                  <label class="field-label">{{ $t('contactPage.form.email') }} *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="field-input"
                    required
                  />
                </div>
                <div>
                  <label class="field-label">{{ $t('contactPage.form.phone') }}</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    class="field-input"
                    placeholder="+90 5xx xxx xx xx"
                  />
                </div>
                <div>
                  <label class="field-label">{{ $t('contactPage.form.subject') }}</label>
                  <select v-model="form.subject" class="field-input">
                    <option value="analysis">{{ $t('contactPage.form.subjects.analysis') }}</option>
                    <option value="quote">{{ $t('contactPage.form.subjects.quote') }}</option>
                    <option value="support">{{ $t('contactPage.form.subjects.support') }}</option>
                    <option value="other">{{ $t('contactPage.form.subjects.other') }}</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="field-label">{{ $t('contactPage.form.message') }}</label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  class="field-input resize-none"
                />
              </div>

              <div v-if="error" class="text-red-400 text-sm">{{ $t('contactPage.form.error') }}</div>

              <button type="submit" class="btn-primary w-full sm:w-auto px-10" :disabled="sending">
                {{ sending ? $t('contactPage.form.sending') : $t('contactPage.form.submit') }}
              </button>
            </form>
          </div>

          <!-- Info -->
          <div class="space-y-5">
            <h2 class="text-lg font-bold text-white">{{ $t('contactPage.info.title') }}</h2>

            <div class="card p-5 flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-brand-500/15 flex items-center justify-center flex-shrink-0">
                <Phone class="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <div class="text-xs text-zinc-500 mb-0.5">{{ $t('contactPage.info.phoneLabel') }}</div>
                <a :href="`tel:${$t('contactPage.info.phone').replace(/\s/g,'')}`" class="text-white font-medium hover:text-brand-400 transition-colors">
                  {{ $t('contactPage.info.phone') }}
                </a>
              </div>
            </div>

            <div class="card p-5 flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-brand-500/15 flex items-center justify-center flex-shrink-0">
                <Mail class="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <div class="text-xs text-zinc-500 mb-0.5">{{ $t('contactPage.info.emailLabel') }}</div>
                <a :href="`mailto:${$t('contactPage.info.email')}`" class="text-white font-medium hover:text-brand-400 transition-colors">
                  {{ $t('contactPage.info.email') }}
                </a>
              </div>
            </div>

            <div class="card p-5 flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-brand-500/15 flex items-center justify-center flex-shrink-0">
                <Clock class="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <div class="text-xs text-zinc-500 mb-0.5">{{ $t('contactPage.info.hoursLabel') }}</div>
                <div class="text-white font-medium text-sm">{{ $t('contactPage.info.hours') }}</div>
                <div class="text-brand-400 text-xs mt-1">{{ $t('contactPage.info.support') }}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Phone, Mail, Clock, CheckCircle } from 'lucide-vue-next'

const { t } = useI18n()

useSeoMeta({
  title: () => t('contactPage.title'),
  description: () => t('contactPage.desc'),
})

const sending = ref(false)
const success  = ref(false)
const error    = ref(false)

const form = reactive({
  name:    '',
  email:   '',
  phone:   '',
  subject: 'analysis',
  message: '',
})

async function submit() {
  sending.value = true
  error.value   = false
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form } })
    success.value = true
    Object.assign(form, { name: '', email: '', phone: '', subject: 'analysis', message: '' })
  } catch {
    error.value = true
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.field-label { @apply block text-xs font-medium text-zinc-400 mb-1.5; }
.field-input {
  @apply w-full bg-surface-3 border border-surface-4 rounded-lg px-4 py-2.5 text-white text-sm
         focus:outline-none focus:border-brand-500 transition-colors;
}
</style>
