<script setup lang="ts">
const value = defineModel<'in-progress' | 'completed'>()

interface AppInPlaceEditTextEmits {
  (event: 'commit'): void
}

const { readonly = false } = defineProps<{
  readonly?: boolean
}>()
const emits = defineEmits<AppInPlaceEditTextEmits>()

const toggleValue = (): void => {
  if (readonly) return
  value.value = value.value === 'completed' ? 'in-progress' : 'completed'
  emits('commit')
}
</script>

<template>
  <div class="text-2xl cursor-pointer" @click="toggleValue">
    <Transition name="scale" mode="out-in">
      <iconify-icon
        v-if="value === 'completed'"
        icon="lucide:circle-check"
        class="text-green-500"
      />
      <iconify-icon v-else icon="lucide:circle-dot" class="text-gray-500" />
    </Transition>
  </div>
</template>
