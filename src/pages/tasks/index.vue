<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { columns } from '@/utils/tableColumns/tasksColumns'

const { pageData } = storeToRefs(usePageStore())
pageData.value.title = 'Tasks'

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)

await tasksStore.getTasks()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

getGroupedCollabs(tasks.value ?? [])
const columnsWithCollabs = columns(groupedCollabs)
</script>

<template>
  <h1>Tasks page</h1>
  <DataTable v-if="tasks" :columns="columnsWithCollabs" :data="tasks" />
</template>

<style scoped></style>
