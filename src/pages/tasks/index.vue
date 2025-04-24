<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'
import type { TasksWithProjects } from '@/utils/supaQueries'

const { pageData } = storeToRefs(usePageStore())
pageData.value.title = 'Tasks'

const tasks = ref<TasksWithProjects | null>(null)

const getTasks = async () => {
  const { data, error, status } = await tasksWithProjectsQuery

  if (error) {
    useErrorStore().setError({ error, customCode: status })
  }

  tasks.value = data
}

await getTasks()
</script>

<template>
  <h1>Tasks page</h1>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style scoped></style>
