<template>
  <div>
    <MedicationCard 
      v-for="medication in medications" 
      :key="medication.id" 
      :medication="medication"
      :is-deleting="props.deletingIds?.has(medication.id) || false"
      @delete="handleDelete"
      @edit="handleEdit"
      @more="handleMore"
    />
  </div>
</template>

<script setup lang="ts">
import type { Medication } from '~/types/medication'

interface Props {
  medications: readonly Medication[]
  deletingIds?: Set<number>
}

const props = withDefaults(defineProps<Props>(), {
  deletingIds: () => new Set<number>()
})

const emit = defineEmits<{
  delete: [id: number]
  edit: [medication: Medication]
  more: [medication: Medication]
}>()

const handleDelete = (id: number) => {
  emit('delete', id)
}

const handleEdit = (medication: Medication) => {
  emit('edit', medication)
}

const handleMore = (medication: Medication) => {
  emit('more', medication)
}
</script>

