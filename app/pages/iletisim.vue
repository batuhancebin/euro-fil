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

    <!-- Info -->
    <section class="pb-20 bg-surface-2">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-lg font-bold text-white mb-6 text-center">{{ $t('contactPage.info.title') }}</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          <div class="card p-5">
            <div class="w-10 h-10 rounded-lg bg-brand-500/15 flex items-center justify-center mb-4">
              <Phone class="w-5 h-5 text-brand-400" />
            </div>
            <div class="text-xs text-zinc-500 mb-1">{{ $t('contactPage.info.phoneLabel') }}</div>
            <a :href="`tel:${$t('contactPage.info.phone').replace(/\s/g,'')}`" class="text-white font-medium text-sm hover:text-brand-400 transition-colors">
              {{ $t('contactPage.info.phone') }}
            </a>
          </div>

          <div class="card p-5">
            <div class="w-10 h-10 rounded-lg bg-brand-500/15 flex items-center justify-center mb-4">
              <Mail class="w-5 h-5 text-brand-400" />
            </div>
            <div class="text-xs text-zinc-500 mb-1">{{ $t('contactPage.info.emailLabel') }}</div>
            <a :href="`mailto:${$t('contactPage.info.email')}`" class="text-white font-medium text-sm hover:text-brand-400 transition-colors break-all">
              {{ $t('contactPage.info.email') }}
            </a>
          </div>

          <div class="card p-5">
            <div class="w-10 h-10 rounded-lg bg-brand-500/15 flex items-center justify-center mb-4">
              <Printer class="w-5 h-5 text-brand-400" />
            </div>
            <div class="text-xs text-zinc-500 mb-1">{{ $t('contactPage.info.faxLabel') }}</div>
            <div class="text-white font-medium text-sm">{{ $t('contactPage.info.fax') }}</div>
          </div>

          <div class="card p-5">
            <div class="w-10 h-10 rounded-lg bg-brand-500/15 flex items-center justify-center mb-4">
              <MapPin class="w-5 h-5 text-brand-400" />
            </div>
            <div class="text-xs text-zinc-500 mb-1">{{ $t('contactPage.info.addressLabel') }}</div>
            <div class="text-white font-medium text-sm leading-relaxed whitespace-pre-line">{{ $t('contactPage.info.address') }}</div>
          </div>

          <div class="card p-5">
            <div class="w-10 h-10 rounded-lg bg-brand-500/15 flex items-center justify-center mb-4">
              <Clock class="w-5 h-5 text-brand-400" />
            </div>
            <div class="text-xs text-zinc-500 mb-1">{{ $t('contactPage.info.hoursLabel') }}</div>
            <div class="text-white font-medium text-sm">{{ $t('contactPage.info.hours') }}</div>
            <div class="text-brand-400 text-xs mt-1">{{ $t('contactPage.info.support') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Branches -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-3 text-center">{{ $t('contactPage.branches.title') }}</h2>
        <p class="text-zinc-500 text-sm text-center mb-10">{{ $t('contactPage.branches.mapHint') }}</p>

        <div class="max-w-4xl mx-auto mb-14">
          <BranchMap />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="branch in branchItems" :key="rt(branch.name)" class="card p-5">
            <div class="flex items-start gap-3 mb-3">
              <div class="w-9 h-9 rounded-lg bg-brand-500/15 flex items-center justify-center flex-shrink-0">
                <MapPin class="w-4 h-4 text-brand-400" />
              </div>
              <h3 class="text-white font-semibold pt-1.5">{{ rt(branch.name) }}</h3>
            </div>
            <p class="text-zinc-400 text-sm leading-relaxed whitespace-pre-line mb-3">{{ rt(branch.address) }}</p>
            <a
              v-if="rt(branch.phone)"
              :href="`tel:${rt(branch.phone).split('/')[0].replace(/[^+\d]/g, '')}`"
              class="text-brand-400 text-sm font-medium hover:text-brand-300 transition-colors"
            >
              {{ rt(branch.phone) }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Form -->
    <section class="py-20 bg-surface-2">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          <!-- Brief -->
          <aside class="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <p class="font-mono text-[11px] tracking-[0.2em] text-brand-400 mb-4">{{ $t('contactPage.brief.label') }}</p>
            <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">{{ $t('contactPage.brief.title') }}</h2>
            <p class="text-zinc-400 leading-relaxed mb-8">{{ $t('contactPage.brief.desc') }}</p>

            <ul class="border-t border-surface-4/60">
              <li
                v-for="item in briefItems"
                :key="rt(item.label)"
                class="flex gap-4 border-b border-surface-4/60 py-4"
              >
                <Check class="w-4 h-4 text-brand-400 flex-shrink-0 mt-1" />
                <div>
                  <div class="font-mono text-[11px] tracking-wider text-zinc-500 mb-1">{{ rt(item.label) }}</div>
                  <p class="text-sm text-zinc-300 leading-relaxed">{{ rt(item.hint) }}</p>
                </div>
              </li>
            </ul>
          </aside>

          <!-- Form -->
          <div class="lg:col-span-7">
            <!-- Success -->
            <div v-if="success" class="rounded-xl border border-surface-4 bg-surface-3 p-8 text-center">
              <div class="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
                <CheckCircle class="w-7 h-7 text-emerald-400" />
              </div>
              <h2 class="text-xl font-bold text-white mb-2">{{ $t('contactPage.form.successTitle') }}</h2>
              <p class="text-zinc-400">{{ $t('contactPage.form.success') }}</p>
              <button class="btn-outline mt-6" @click="success = false">{{ $t('contactPage.form.newMessage') }}</button>
            </div>

            <form
              v-else
              class="rounded-xl border border-surface-4 bg-surface-3 p-6 sm:p-8 space-y-7"
              @submit.prevent="submit"
            >
              <div class="flex items-center gap-2 text-xs text-zinc-400">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {{ $t('contactPage.form.responseTime') }}
              </div>

              <fieldset class="min-w-0">
                <legend class="field-label">{{ $t('contactPage.form.subject') }}</legend>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label v-for="s in subjects" :key="s.value" class="cursor-pointer">
                    <input
                      v-model="form.subject"
                      type="radio"
                      name="subject"
                      :value="s.value"
                      class="peer sr-only"
                    />
                    <span
                      class="flex items-center gap-2.5 rounded-lg border border-surface-4 bg-surface px-4 py-3 text-sm text-zinc-400
                             transition-colors hover:text-zinc-200
                             peer-checked:border-brand-500 peer-checked:bg-brand-500/10 peer-checked:text-white
                             peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500/50"
                    >
                      <component :is="s.icon" class="w-4 h-4 flex-shrink-0" />
                      {{ $t(`contactPage.form.subjects.${s.value}`) }}
                    </span>
                  </label>
                </div>
              </fieldset>

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
                  <label class="field-label">{{ $t('contactPage.form.phone') }}</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    class="field-input"
                    placeholder="+90 5xx xxx xx xx"
                  />
                </div>
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
                <div class="flex items-baseline justify-between">
                  <label class="field-label">{{ $t('contactPage.form.message') }}</label>
                  <span class="font-mono text-[11px] text-zinc-600 tabular-nums">{{ form.message.length }}/1000</span>
                </div>
                <textarea
                  v-model="form.message"
                  rows="5"
                  maxlength="1000"
                  class="field-input resize-none"
                />
              </div>

              <div
                v-if="error"
                class="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                <AlertCircle class="w-4 h-4 flex-shrink-0 mt-0.5" />
                {{ $t('contactPage.form.error') }}
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="submit"
                  class="btn-primary justify-center px-8 disabled:opacity-60 disabled:cursor-not-allowed"
                  :disabled="sending"
                >
                  <Loader2 v-if="sending" class="w-4 h-4 animate-spin" />
                  <Send v-else class="w-4 h-4" />
                  {{ sending ? $t('contactPage.form.sending') : $t('contactPage.form.submit') }}
                </button>
                <p class="text-xs text-zinc-600">{{ $t('contactPage.form.requiredNote') }}</p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Phone, Mail, Printer, Clock, CheckCircle, MapPin,
  Check, AlertCircle, Loader2, Send,
  Handshake, FileText, Wrench, MessageCircle,
} from 'lucide-vue-next'

const { t, tm, rt } = useI18n()

const branchItems = computed<{ name: string; address: string; phone: string }[]>(
  () => tm('contactPage.branches.items') as unknown as { name: string; address: string; phone: string }[]
)

const briefItems = computed<{ label: string; hint: string }[]>(
  () => tm('contactPage.brief.items') as unknown as { label: string; hint: string }[]
)

const subjects = [
  { value: 'analysis', icon: markRaw(Handshake) },
  { value: 'quote',    icon: markRaw(FileText) },
  { value: 'support',  icon: markRaw(Wrench) },
  { value: 'other',    icon: markRaw(MessageCircle) },
]

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
  @apply w-full bg-surface border border-surface-4 rounded-lg px-4 py-2.5 text-white text-sm
         placeholder:text-zinc-600
         focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-colors;
}
</style>
