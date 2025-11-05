import { ref, computed } from 'vue'
import type { MedicationFilters } from '~/types/medication'

/**
 * Composable for medication filter logic
 * Separates filter state management from medication data
 */
export const useMedicationFilters = () => {
  const search = ref('')
  const manufacturer = ref('')

  const filters = computed<MedicationFilters>(() => {
    const result: MedicationFilters = {}
    
    if (search.value.trim()) {
      result.search = search.value.trim()
    }
    
    if (manufacturer.value) {
      result.manufacturer = manufacturer.value
    }
    
    return result
  })

  const hasActiveFilters = computed(() => {
    return !!(search.value || manufacturer.value)
  })

  const setSearch = (value: string) => {
    search.value = value
  }

  const setManufacturer = (value: string) => {
    manufacturer.value = value
  }

  const clear = () => {
    search.value = ''
    manufacturer.value = ''
  }

  const reset = (newFilters?: MedicationFilters) => {
    if (newFilters) {
      search.value = newFilters.search || ''
      manufacturer.value = newFilters.manufacturer || ''
    } else {
      clear()
    }
  }

  return {
    search,
    manufacturer,
    filters,
    hasActiveFilters,
    setSearch,
    setManufacturer,
    clear,
    reset
  }
}

