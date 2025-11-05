import { ref, computed, readonly } from 'vue'
import type { MedicationList, MedicationFilters, CreateMedicationDto } from '~/types/medication'
import { medicationService } from '~/services/medicationService'

/**
 * Composable for medication state management and business logic
 * Uses service layer for API calls
 */
export const useMedications = () => {
  // State (moved inside function - each instance has its own state)
  const medications = ref<MedicationList>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<MedicationFilters>({})
  
  // Pagination state
  const currentPage = ref(1)
  const itemsPerPage = ref(5)

  // Get unique manufacturers for filter dropdown
  const manufacturers = computed(() => {
    const unique = new Set(medications.value.map(m => m.manufacturer))
    return Array.from(unique)
  })

  // Pagination computed properties
  const totalPages = computed(() => {
    return Math.ceil(medications.value.length / itemsPerPage.value)
  })

  const paginatedMedications = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return medications.value.slice(start, end)
  })

  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPreviousPage = computed(() => currentPage.value > 1)

  // Fetch medications from API
  const fetchMedications = async () => {
    isLoading.value = true
    error.value = null

    try {
      medications.value = await medicationService.getAll(filters.value)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch medications'
      error.value = errorMessage
      console.error('Error fetching medications:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Create new medication
  const createMedication = async (medicationData: CreateMedicationDto) => {
    isLoading.value = true
    error.value = null

    try {
      const newMedication = await medicationService.create(medicationData)
      
      // Refetch to ensure consistency with server
      await fetchMedications()
      return newMedication
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create medication'
      error.value = errorMessage
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Update medication
  const updateMedication = async (id: number, medicationData: Partial<CreateMedicationDto>) => {
    isLoading.value = true
    error.value = null

    try {
      const updatedMedication = await medicationService.update(id, medicationData)
      
      // Update in place to preserve sort order
      const index = medications.value.findIndex(m => m.id === id)
      if (index !== -1) {
        medications.value[index] = updatedMedication
      } else {
        // If not found, refetch (shouldn't happen, but safety check)
        await fetchMedications()
      }
      
      return updatedMedication
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update medication'
      error.value = errorMessage
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Delete medication
  const deleteMedication = async (id: number) => {
    isLoading.value = true
    error.value = null

    try {
      await medicationService.delete(id)
      
      // Optimistic update - remove from list immediately
      medications.value = medications.value.filter(m => m.id !== id)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete medication'
      error.value = errorMessage
      // Re-fetch on error to restore correct state
      await fetchMedications()
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Update filters
  const updateFilters = (newFilters: MedicationFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1 // Reset to first page when filters change
    fetchMedications()
  }

  // Clear filters
  const clearFilters = () => {
    filters.value = {}
    currentPage.value = 1 // Reset to first page when clearing filters
    fetchMedications()
  }

  // Pagination methods
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (hasNextPage.value) {
      currentPage.value++
    }
  }

  const previousPage = () => {
    if (hasPreviousPage.value) {
      currentPage.value--
    }
  }

  const setItemsPerPage = (items: number) => {
    itemsPerPage.value = items
    currentPage.value = 1 // Reset to first page when changing items per page
  }

  return {
    // State
    medications: readonly(medications),
    isLoading: readonly(isLoading),
    error: readonly(error),
    filters: readonly(filters),
    manufacturers,

    // Pagination state
    currentPage: readonly(currentPage),
    itemsPerPage: readonly(itemsPerPage),
    totalPages,
    paginatedMedications,
    hasNextPage,
    hasPreviousPage,

    // Methods
    fetchMedications,
    createMedication,
    updateMedication,
    deleteMedication,
    updateFilters,
    clearFilters,
    
    // Pagination methods
    goToPage,
    nextPage,
    previousPage,
    setItemsPerPage,
  }
}