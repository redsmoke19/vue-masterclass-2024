<script setup lang="ts">
const { id } = useRoute('/tasks/[id]').params
const router = useRouter()

const pageStore = storeToRefs(usePageStore())
const taskStore = useTasksStore()
const { task } = storeToRefs(taskStore)
const { getSingleTask, updateTask, deleteTask } = taskStore
const { getProfilesByIds } = useCollabs()

watch(
  () => task.value?.name,
  () => {
    pageStore.pageData.value.title = `Task: ${task.value?.name || ''}`
  }
)

await getSingleTask(id)
const collabs = task.value?.collaborators ? await getProfilesByIds(task.value?.collaborators) : []

const isDeleted = ref(false)
const triggerDelete = async () => {
  isDeleted.value = true
  await deleteTask()
  isDeleted.value = false
  router.push('/tasks')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Table v-if="task">
      <TableRow>
        <TableHead> Name </TableHead>
        <TableCell> <AppInPlaceEditText v-model="task.name" @commit="updateTask" /> </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Description </TableHead>
        <TableCell>
          <AppInPlaceEditTextarea v-model="task.description" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Assignee </TableHead>
        <TableCell>Lorem ipsum</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Project </TableHead>
        <TableCell> {{ task.projects?.name }} </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Status </TableHead>
        <TableCell> <AppInPlaceEditStatus v-model="task.status" @commit="updateTask" /></TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Collaborators </TableHead>
        <TableCell>
          <div class="flex">
            <Avatar
              class="-mr-4 border border-primary hover:scale-110 transition-transform"
              v-for="collab in collabs"
              :key="collab.id"
            >
              <RouterLink
                class="w-full h-full flex items-center justify-center"
                :to="{ name: '/users/[username]', params: { username: collab.username } }"
              >
                <AvatarImage :src="collab.avatar_url || ''" :alt="collab.full_name" />
                <AvatarFallback> </AvatarFallback>
              </RouterLink>
            </Avatar>
          </div>
        </TableCell>
      </TableRow>
      <TableRow class="hover:bg-transparent">
        <TableHead class="align-top pt-4"> Comments </TableHead>
        <TableCell>
          Comments cards goes in here..
          <div class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md">
            <textarea
              placeholder="Add your comment.."
              class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
            >
            </textarea>
            <div class="flex justify-between mt-3">
              <Button> Comment </Button>
              <div class="flex gap-4">
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:paperclip"></iconify-icon>
                  <span class="sr-only">Attach file</span>
                </button>
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:image-up"></iconify-icon>
                  <span class="sr-only">Upload image</span>
                </button>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </Table>
    <Button class="self-end w-full max-w-40" variant="destructive" @click="triggerDelete">
      <Transition name="scale" mode="out-in">
        <iconify-icon v-if="!isDeleted" icon="lucide:trash-2" class="mr-1"></iconify-icon>
        <iconify-icon v-else icon="lucide:loader-circle" class="mr-1 animate-spin"></iconify-icon>
      </Transition>
      Delete Task
    </Button>
  </div>
</template>

<style scoped></style>
