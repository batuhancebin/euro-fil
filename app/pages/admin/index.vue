<template><div /></template>
<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
defineI18nRoute(false)
await navigateTo('/admin/products')
</script>
