<script setup lang="ts">
import { usePageStore } from '@/stores/page'

const { pageData } = storeToRefs(usePageStore())

pageData.value.title = 'Home'
</script>

<template>
  <h1>Home page</h1>
  <RouterLink to="/projects">Projects</RouterLink>
</template>

<style scoped></style>
