<script setup lang="ts">
const value = defineModel<string>({ required: true })
</script>

<template>
  <input
    type="text"
    class="w-full !p-1 bg-transparent border-none outline-none focus:bg-gray-800 focus:rounded-md transition-all duration-300"
    v-model="value"
  />
</template>
