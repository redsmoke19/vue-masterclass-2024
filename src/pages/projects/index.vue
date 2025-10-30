<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { columns } from '@/utils/tableColumns/projectsColumns'

const { pageData } = storeToRefs(usePageStore())
pageData.value.title = 'Projects'

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

const { getGroupedCollabs, groupedCollabs } = useCollabs()

await getProjects()

getGroupedCollabs(projects.value ?? [])
const columnsWithCollabs = columns(groupedCollabs)

useMeta({
  title: 'Projects | Pulse',
  description: {
    name: 'Pulse projects',
    content: 'Pulse bla bla blaa'
  }
})
</script>

<template>
  <h1>Projects page</h1>
  <DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects" />
</template>

<style scoped></style>
