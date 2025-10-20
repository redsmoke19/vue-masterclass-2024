<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { storeToRefs } from 'pinia'
import { columns } from '@/utils/tableColumns/projectsColumns'
import { useProjectsStore } from '@/stores/loader/projects'

const { pageData } = storeToRefs(usePageStore())
const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

pageData.value.title = 'Projects'

const { getGroupedCollabs, groupedCollabs } = useCollabs()

await getProjects()

getGroupedCollabs(projects.value ?? [])
const columnsWithCollabs = columns(groupedCollabs)
</script>

<template>
  <h1>Projects page</h1>
  <DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects" />
</template>

<style scoped></style>
