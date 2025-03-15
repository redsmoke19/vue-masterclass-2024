import { supabase } from '@/lib/supebaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const tasksWithProjectsQuery = supabase.from('tasks').select(`*, projects (name, slug, id)`)
export const projectsQuery = supabase.from('projects').select('*')
export const projectQuery = (slug: string) => {
  return supabase
    .from('projects')
    .select(
      `
*,
tasks (
id, name, status, due_date)`
    )
    .eq('slug', slug)
    .single()
}

export const taskQuery = (id: string) => {
  return supabase.from('tasks').select(`*, projects (id, name, slug)`).eq('id', Number(id)).single()
}

export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>
export type Projects = QueryData<typeof projectsQuery>
export type Project = QueryData<ReturnType<typeof projectQuery>>
export type Task = QueryData<ReturnType<typeof taskQuery>>
