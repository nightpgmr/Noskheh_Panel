<template>
  <div class="flex justify-center items-center gap-2">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
    >
      <Icon name="mdi:chevron-right" mode="svg" class="h-5 w-5" />
    </button>

    <template v-for="page in visiblePages" :key="page">
      <button
        v-if="page !== '...'"
        @click="goToPage(page as number)"
        :class="[
          'px-4 py-2 rounded-lg transition-colors shadow-sm',
          currentPage === page
            ? 'bg-purple-800 text-white'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
        ]"
      >
        {{ page }}
      </button>
      <span v-else class="px-2 text-gray-500">...</span>
    </template>

    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
    >
      <Icon name="mdi:chevron-left" mode="svg" class="h-5 w-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
  maxVisiblePages?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 5
})

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
  }
}

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const { currentPage, totalPages, maxVisiblePages } = props

  if (totalPages === 0) {
    return []
  }

  if (totalPages <= maxVisiblePages) {
    // Show all pages if total pages is less than max visible
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    // Calculate start and end of middle pages
    let start = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2))
    let end = Math.min(totalPages - 1, start + maxVisiblePages - 3)

    // Adjust start if we're near the end
    if (end === totalPages - 1) {
      start = totalPages - maxVisiblePages + 2
    }

    // Add ellipsis if needed
    if (start > 2) {
      pages.push('...')
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Add ellipsis if needed
    if (end < totalPages - 1) {
      pages.push('...')
    }

    // Always show last page
    pages.push(totalPages)
  }

  return pages
})
</script>

