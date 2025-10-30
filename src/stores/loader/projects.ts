import { projectQuery, projectsQuery, updateProjectQuery } from '@/utils/supaQueries'
import type { Project, Projects } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<Project | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadingProjects = useMemoize(async (key: string) => await projectsQuery)
  const loadingProject = useMemoize(async (slug: string) => await projectQuery(slug))

  interface ValidateCacheParams {
    ref: typeof project | typeof projects
    query: typeof projectQuery | typeof projectsQuery
    key: string
    loadingFn: typeof loadingProject | typeof loadingProjects
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

  const getProjects = async () => {
    projects.value = null

    const { data, error, status } = await loadingProjects('projects')

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    if (data) projects.value = data
    validateCache({
      ref: projects,
      query: projectsQuery,
      key: 'projects',
      loadingFn: loadingProjects
    })
  }

  const getSingleProject = async (slug: string) => {
    project.value = null

    const { data, error, status } = await loadingProject(slug)

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    if (data) project.value = data

    validateCache({
      ref: project,
      query: projectQuery,
      key: slug,
      loadingFn: loadingProject
    })
  }

  const updateProject = async () => {
    if (!project.value) return

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tasks, id, ...projectProperty } = project.value
    await updateProjectQuery(projectProperty, project.value.id)
  }

  return { projects, project, getProjects, getSingleProject, updateProject }
})
