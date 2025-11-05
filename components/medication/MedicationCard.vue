<template>
    <div class="flex items-center p-4 my-2 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300">
      <!-- Medication details (image, name, dosage) - Flexible -->
      <div class="flex items-center space-x-4 flex-1 min-w-0">
        <img 
          :src="medication.imageUrl || '/images/daro.jpg'" 
          :alt="medication.name" 
          class="w-10 h-10 object-contain flex-shrink-0" 
        />
        <div class="flex flex-col text-right min-w-0 flex-1">
          <span class="text-lg font-semibold text-gray-800 truncate">
            {{ medication.name }}
          </span>
          <span class="text-sm text-gray-500 truncate">
            {{ medication.dosage }}
            <span v-if="medication.duration"> - {{ medication.duration }}</span>
          </span>
        </div>
      </div>
      
      <!-- Middle section: Quantity and Manufacturer buttons - Fixed widths -->
      <div class="flex justify-center items-center space-x-4 flex-shrink-0">
        <!-- Quantity per package button - Fixed width -->
        <div class="flex justify-center items-center flex-shrink-0 w-[220px]">
          <div class="flex justify-center items-center space-x-2 px-6 bg-blue-400 rounded-xl w-full">
            <Icon name="mdi:beaker-outline" mode="svg" class="h-6 w-6 text-white flex-shrink-0" />
            <span class="text-4xl text-white font-bold">{{ medication.quantityPerPackage }}</span>
            <span class="text-lg text-white text-center text-nowrap">عدد<br/>در بسته</span>
          </div>
        </div>
        <!-- Manufacturer button - Fixed width -->
        <div class="flex justify-center items-center flex-shrink-0 w-[200px]">
          <div class="flex justify-center items-center space-x-2 px-10 py-2 bg-gray-100 rounded-xl w-full">
            <Icon name="mdi:beaker-outline" mode="svg" class="h-6 w-6 text-gray-400 flex-shrink-0" />
            <span class="text-sm text-gray-600 text-center text-nowrap truncate">{{ medication.manufacturer }}</span>
          </div>
        </div>
      </div>
      
      <!-- Action buttons (delete, edit, more) - Fixed width -->
      <div class="flex items-center justify-end space-x-2 flex-1 w-[180px]">
        <button 
          @click="handleDelete"
          class="bg-gray-100 text-gray-400 rounded-md hover:bg-gray-200 transition-colors flex-shrink-0"
          :disabled="props.isDeleting"
        >
          <Icon name="mdi:delete-outline" mode="svg" class="h-12 w-12 text-gray-400 hover:text-gray-600 cursor-pointer" />
        </button>
        <button 
          @click="handleEdit"
          class="bg-purple-800 text-white rounded-md mr-6 hover:bg-purple-900 transition-colors flex-shrink-0"
        >
          <Icon name="mdi:pencil-outline" mode="svg" class="h-12 w-12 text-white hover:text-white cursor-pointer" />
        </button>
        <button 
          @click="handleMore"
          class="bg-transparent text-gray-400 rounded-md mr-1 hover:bg-gray-100 transition-colors flex-shrink-0"
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