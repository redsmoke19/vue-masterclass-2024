import type { ColumnDef } from '@tanstack/vue-table'
import type { Projects } from '../supaQueries'
import type { GroupedCollabs } from '@/types/GroupedCollabs'
import { RouterLink } from 'vue-router'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue'

export const columns = (collabs: Ref<GroupedCollabs>): ColumnDef<Projects[0]>[] => [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
          class: 'text-left font-medium hover:bg-muted transition-colors block w-full'
        },
        () => row.getValue('name')
      )
    }
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        h(AppInPlaceEditStatus, { modelValue: row.original.status, readonly: true })
      )
    }
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium flex items-center' },
        collabs.value[row.original.id]
          ? collabs.value[row.original.id].map((item) => {
              return h(
                RouterLink,
                { to: `users/${item.username}`, class: 'flex items-center' },
                () => {
                  return h(Avatar, () => h(AvatarImage, { src: item.avatar_url || '' }))
                }
              )
            })
          : row.original.collaborators.map(() => {
              return h(Avatar, { class: 'animate-pulse' }, () => h(AvatarFallback))
            })
      )
    }
  }
]
