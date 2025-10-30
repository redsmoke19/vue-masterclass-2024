import { supabase } from '@/lib/supebaseClient'
import type { CreateNewTask } from '@/types/CreateNewForm'
import type { QueryData } from '@supabase/supabase-js'

export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>
export type Projects = QueryData<typeof projectsQuery>
export type Project = QueryData<ReturnType<typeof projectQuery>>
export type Task = QueryData<ReturnType<typeof taskQuery>>
export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>

//Projects
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

export const updateProjectQuery = (updateProject = {}, id: number) => {
  return supabase.from('projects').update(updateProject).eq('id', id)
}

// Tasks

export const tasksWithProjectsQuery = supabase.from('tasks').select(`*, projects (name, slug, id)`)

export const updateTaskQuery = (updateTask = {}, id: number) => {
  return supabase.from('tasks').update(updateTask).eq('id', id)
}

export const taskQuery = (id: string) => {
  return supabase.from('tasks').select(`*, projects (id, name, slug)`).eq('id', Number(id)).single()
}

export const createNewTaskQuery = (task: CreateNewTask) => {
  return supabase.from('tasks').insert(task)
}

export const deleteTaskQuery = (id: number) => {
  return supabase.from('tasks').delete().eq('id', id)
}

// Profiles
export const profilesQuery = supabase.from('profiles').select('id, full_name')

export const profileQuery = ({ column, value }: { column: string; value: string }) => {
  return supabase.from('profiles').select().eq(column, value).single()
}

export const groupedProfilesQuery = (userIds: string[]) => {
  return supabase.from('profiles').select('username, avatar_url, id, full_name').in('id', userIds)
}
