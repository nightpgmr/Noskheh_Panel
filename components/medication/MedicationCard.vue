<template>
    <div class="flex items-center justify-between p-4 my-2 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300">
      <div class="flex-2 flex items-center space-x-4">
        <img 
          :src="medication.imageUrl || '/images/daro.jpg'" 
          :alt="medication.name" 
          class="w-10 h-10 object-contain" 
        />
        <div class="flex flex-col text-right">
          <span class="text-lg font-semibold text-gray-800">
            {{ medication.name }}
          </span>
          <span class="text-sm text-gray-500">
            {{ medication.dosage }}
            <span v-if="medication.duration"> - {{ medication.duration }}</span>
          </span>
        </div>
      </div>
      
      <div class="flex-1 flex justify-center items-center space-x-4">
        <div class="w-[220px] flex justify-center items-center space-x-2 px-6 bg-blue-400 rounded-xl">
          <Icon name="mdi:beaker-outline" mode="svg" class="h-6 w-6 text-white" />
          <span class="text-4xl text-white font-bold">{{ medication.quantityPerPackage }}</span>
          <span class="text-lg text-white text-center text-nowrap">عدد<br/>در بسته</span>
        </div>
        <div class="flex justify-center items-center space-x-2 px-10 py-2 bg-gray-100 rounded-xl">
          <Icon name="mdi:beaker-outline" mode="svg" class="h-6 w-6 text-gray-400" />
          <span class="text-sm text-gray-600 text-center text-nowrap">{{ medication.manufacturer }}</span>
        </div>
      </div>
      
      <div class="flex-2 flex items-center justify-end">
        <button 
          @click="handleDelete"
          class="bg-gray-100 text-gray-400 rounded-md hover:bg-gray-200 transition-colors"
          :disabled="props.isDeleting"
        >
          <Icon name="mdi:delete-outline" mode="svg" class="h-12 w-12 text-gray-400 hover:text-gray-600 cursor-pointer" />
        </button>
        <button 
          @click="handleEdit"
          class="bg-purple-800 text-white rounded-md mr-6 hover:bg-purple-900 transition-colors"
        >
          <Icon name="mdi:pencil-outline" mode="svg" class="h-12 w-12 text-white hover:text-white cursor-pointer" />
        </button>
        <button 
          @click="handleMore"
          class="bg-transparent text-gray-400 rounded-md mr-1 hover:bg-gray-100 transition-colors"
        >
          <Icon name="mdi:more-vert" mode="svg" class="h-12 w-12 text-gray-400 hover:text-gray-600 cursor-pointer" />
        </button>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import type { Medication } from '~/types/medication'
  
  interface Props {
    medication: Medication
    isDeleting?: boolean
  }
  
  const props = withDefaults(defineProps<Props>(), {
    isDeleting: false
  })
  
  const emit = defineEmits<{
    delete: [id: number]
    edit: [medication: Medication]
    more: [medication: Medication]
  }>()
  
  const handleDelete = () => {
    emit('delete', props.medication.id)
  }
  
  const handleEdit = () => {
    emit('edit', props.medication)
  }
  
  const handleMore = () => {
    emit('more', props.medication)
  }
</script>