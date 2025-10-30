import {
  deleteTaskQuery,
  taskQuery,
  tasksWithProjectsQuery,
  updateTaskQuery,
  type Task,
  type TasksWithProjects
} from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProjects | null>(null)
  const task = ref<Task | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadingTasks = useMemoize(async (key: string) => await tasksWithProjectsQuery)
  const loadingTask = useMemoize(async (slug: string) => await taskQuery(slug))

  interface ValidateCacheParams {
    ref: typeof task | typeof tasks
    query: typeof taskQuery | typeof tasksWithProjectsQuery
    key: string
    loadingFn: typeof loadingTask | typeof loadingTasks
  }

  const validateCache = ({ ref, query, key, loadingFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(data) === JSON.stringify(ref.value)) {
          return
        } else {
          loadingFn.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }

  const getTasks = async () => {
    tasks.value = null

    const { data, error, status } = await loadingTasks('projects')

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    if (data) tasks.value = data
    validateCache({
      ref: tasks,
      query: tasksWithProjectsQuery,
      key: 'tasks',
      loadingFn: loadingTasks
    })
  }

  const getSingleTask = async (slug: string) => {
    task.value = null

    const { data, error, status } = await loadingTask(slug)

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    if (data) task.value = data

    validateCache({
      ref: task,
      query: taskQuery,
      key: slug,
      loadingFn: loadingTask
    })
  }

  const updateTask = async () => {
    if (!task.value) return

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projects, id, ...taskProperty } = task.value
    await updateTaskQuery(taskProperty, task.value.id)
  }

  const deleteTask = async () => {
    if (!task.value) return

    await deleteTaskQuery(task.value.id)
  }

  return {
    task,
    tasks,
    getTasks,
    getSingleTask,
    updateTask,
    deleteTask
  }
})
