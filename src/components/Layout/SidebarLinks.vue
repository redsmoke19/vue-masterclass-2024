<script setup lang="ts">
interface LinkProps {
  title: string
  to?: string
  icon: string
}

defineProps<{
  links: LinkProps[]
}>()

const emits = defineEmits<{
  (event: 'actionClick', linkTitle: string): void
}>()

const emitActionClicked = (linkTitle: string) => {
  emits('actionClick', linkTitle)
}

// const filteredLinks = props.links.filter((link): link is LinkProps & { to: string } => !!link.to)
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink v-if="link.to" active-class="text-primary bg-muted" :to="link.to" class="nav-link">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>
    <div v-else class="nav-link cursor-pointer" @click="emitActionClicked(link.title)">
      <iconify-icon :icon="link.icon" />
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </div>
  </template>
</template>
<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground;
}
</style>
