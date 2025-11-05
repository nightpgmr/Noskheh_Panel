<template>
    <div class="w-full flex">
      <div class="relative min-w-130">
        <input 
          v-model="localSearch"
          type="text" 
          class="w-full px-3 py-3 h-14 border border-gray-300 rounded-lg text-right text-gray-800 focus:ring-purple-500 focus:border-purple-500 focus:outline-none bg-white"
          @input="handleSearch"
          @focus="isSearchFocused = true"
          @blur="isSearchFocused = false"
        />
        <label 
          :class="[
            'absolute transition-all duration-200 pointer-events-none z-10',
            localSearch || isSearchFocused 
              ? 'top-0 right-3 -translate-y-1/2 text-xs text-purple-600 bg-white px-2' 
              : 'top-3 right-3 text-gray-500'
          ]"
        >
          {{ placeholderText }}
        </label>
      </div>
      <div class="relative min-w-80 mr-4">
        <select 
          v-model="localManufacturer"
          class="w-full px-3 py-3 h-14 border border-gray-300 rounded-lg text-right text-gray-800 focus:ring-purple-500 focus:border-purple-500 focus:outline-none appearance-none bg-white"
          @change="handleManufacturerChange"
          @focus="isManufacturerFocused = true"
          @blur="isManufacturerFocused = false"
        >
          <option value=""></option>
          <option v-for="manufacturer in manufacturers" :key="manufacturer" :value="manufacturer">
            {{ manufacturer }}
          </option>
        </select>
        <label 
          :class="[
            'absolute transition-all duration-200 pointer-events-none z-10',
            localManufacturer || isManufacturerFocused 
              ? 'top-0 right-3 -translate-y-1/2 text-xs text-purple-600 bg-white px-2' 
              : 'top-3 right-3 text-gray-500'
          ]"
        >
          شرکت سازنده
        </label>
        <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-0">
          <Icon name="mdi:chevron-down" mode="svg" class="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div class="flex-grow"/>
      <button 
        v-if="hasActiveFilters"
        @click="handleClear"
        class="bg-transparent text-gray-400 rounded-md mr-4 hover:text-gray-600 transition-colors"
        :aria-label="clearLabel"
      >
        <Icon name="mdi:close" mode="svg" class="h-12 w-12 text-gray-400 hover:text-gray-600 cursor-pointer" />
      </button>
      <button 
        @click="handleApply"
        class="bg-purple-800 text-white rounded-md mr-4 hover:bg-purple-900 transition-colors px-4 py-2"
        :disabled="isLoading"
      >
        <Icon name="mdi:check" mode="svg" class="h-12 w-12 text-white hover:text-white cursor-pointer" />
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
    interface Props {
        search?: string
        manufacturer?: string
        manufacturers: string[]
        isLoading?: boolean
        placeholderText?: string
        clearLabel?: string
    }
    
    const props = withDefaults(defineProps<Props>(), {
        search: '',
        manufacturer: '',
        manufacturers: () => [],
        isLoading: false,
        placeholderText: 'نام دارو',
        clearLabel: 'Clear filters'
    })
    
    const emit = defineEmits<{
        search: [value: string]
        manufacturer: [value: string]
        clear: []
        apply: []
    }>()
    
    const localSearch = ref(props.search)
    const localManufacturer = ref(props.manufacturer)
    const isSearchFocused = ref(false)
    const isManufacturerFocused = ref(false)
    
    const hasActiveFilters = computed(() => {
        return !!(localSearch.value || localManufacturer.value)
    })
    
    const handleSearch = () => {
        emit('search', localSearch.value)
    }
    
    const handleManufacturerChange = () => {
        emit('manufacturer', localManufacturer.value)
    }
    
    const handleClear = () => {
        localSearch.value = ''
        localManufacturer.value = ''
        emit('clear')
    }
    
    const handleApply = () => {
        emit('apply')
    }
    
    // Watch for external prop changes
    watch(() => props.search, (newVal) => {
        localSearch.value = newVal
    })
    
    watch(() => props.manufacturer, (newVal) => {
        localManufacturer.value = newVal
    })
  </script>