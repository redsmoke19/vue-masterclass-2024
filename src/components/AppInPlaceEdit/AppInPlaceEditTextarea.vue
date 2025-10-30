<script setup lang="ts">
interface AppInPlaceEditTextEmits {
  (event: 'commit'): void
}

const emits = defineEmits<AppInPlaceEditTextEmits>()
const value = defineModel<string>()
</script>

<template>
  <textarea
    class="w-full !p-1 bg-transparent border-none outline-none focus:bg-gray-800 focus:rounded-md transition-all duration-300"
    v-model="value"
    @blur="emits('commit')"
  />
</template>
