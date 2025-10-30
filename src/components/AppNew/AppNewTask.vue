<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import type { CreateNewTask } from '@/types/CreateNewForm'
import {
  createNewTaskQuery,
  profilesQuery,
  projectsQuery,
  type Projects
} from '@/utils/supaQueries'

type SelectOptions = { label: string; value: string | number }
const { profile } = storeToRefs(useAuthStore())

const openSheet = defineModel<boolean>()

const selectOptions = ref({
  projects: [] as SelectOptions[],
  profiles: [] as SelectOptions[]
})

const getProjectsOptions = async () => {
  const { data: allProjects } = await projectsQuery

  if (!allProjects) return

  allProjects.forEach((item: Projects[0]) => {
    selectOptions.value.projects.push({ label: item.name, value: item.id })
  })
}

const getProfilesOptions = async () => {
  const { data: allProfiles } = await profilesQuery

  if (!allProfiles) return

  allProfiles.forEach((item) => {
    selectOptions.value.profiles.push({ label: item.full_name, value: item.id })
  })
}

const getOptions = async () => {
  await Promise.all([getProfilesOptions(), getProjectsOptions()])
}

getOptions()

const createTask = async (formData: CreateNewTask) => {
  const task = {
    ...formData,
    collaborators: [profile.value!.id]
  }

  const { error } = await createNewTaskQuery(task)

  if (error) {
    console.log(error)
  }

  openSheet.value = false
}
</script>
<template>
  <Sheet v-model:open="openSheet">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
      </SheetHeader>
      <p>Content</p>
      <FormKit
        type="form"
        @submit="createTask"
        submit-label="Create Task"
        :config="{ validationVisibility: 'submit' }"
      >
        <FormKit
          type="text"
          name="name"
          id="name"
          label="Name"
          placeholder="My new task"
          validation="required|length:1,255"
        />
        <FormKit
          type="select"
          name="profile_id"
          id="profile_id"
          label="User"
          placeholder="Select a user"
          :options="selectOptions.profiles"
          validation="required"
        />
        <FormKit
          type="select"
          name="project_id"
          id="project_id"
          label="Porject"
          placeholder="Select a project"
          :options="selectOptions.projects"
          validation="required"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="Task description"
          validation="length:0,255"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>
