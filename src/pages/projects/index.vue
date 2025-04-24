<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { storeToRefs } from 'pinia'
import { columns } from '@/utils/tableColumns/projectsColumns'
import { projectsQuery } from '@/utils/supaQueries'
import type { Projects } from '@/utils/supaQueries'

const { pageData } = storeToRefs(usePageStore())
pageData.value.title = 'Projects'

const projects = ref<Projects | null>(null)

const getProjects = async () => {
  const { data, error, status } = await projectsQuery

  if (error) {
    useErrorStore().setError({ error, customCode: status })
  }

  projects.value = data
  return data
}

await getProjects()
</script>

<template>
  <h1>Projects page</h1>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style scoped></style>
