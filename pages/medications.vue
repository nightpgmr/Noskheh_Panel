<template>
    <div class="w-full h-full flex flex-col overflow-hidden">
      <!-- Header Section -->
      <div class="flex-shrink-0">
        <MedicationHeader>
          <MedicationFilters
            :search="filters.search || ''"
            :manufacturer="filters.manufacturer || ''"
            :manufacturers="manufacturers"
            :is-loading="isLoading"
            @search="handleSearch"
            @manufacturer="handleManufacturer"
            @clear="handleClearFilters"
            @apply="handleApplyFilters"
          />
        </MedicationHeader>
      </div>
  
      <!-- Loading State -->
      <div v-if="isLoading && medications.length === 0" class="flex-1 flex items-center justify-center">
        <LoadingSpinner />
      </div>
  
      <!-- Error State -->
      <div v-else-if="error && !isLoading" class="flex-shrink-0">
        <ErrorMessage :message="error" />
      </div>
  
      <!-- Medications List with Pagination -->
      <div v-else-if="!isLoading || medications.length > 0" class="flex-1 flex flex-col overflow-hidden min-h-0">
        <!-- Medications List - No scrolling, shows exactly 5 items -->
        <div class="flex-1 overflow-hidden min-h-0">
          <MedicationList
            :medications="paginatedMedications"
            :deleting-ids="deletingIds"
            @delete="handleDeleteClick"
            @edit="handleEditMedication"
            @more="handleMoreActions"
          />
        </div>
        
        <!-- Pagination and Add Button - Same line -->
        <div v-if="medications.length > 0" class="flex-shrink-0 py-6 flex justify-between items-center w-full border-t border-gray-200">
          
          <!-- Spacer for balance -->
          <div class="w-20"></div>
          
          <!-- Pagination - Centered -->
          <div class="flex-1 flex justify-center">
            <UiPagination
              :current-page="currentPage"
              :total-pages="totalPages"
              @update:current-page="goToPage"
            />
          </div>
          
          <!-- Add Button -->
          <button 
            @click="handleAddMedication"
            class="bg-blue-400 text-white rounded-md p-2 hover:bg-blue-500 transition-colors"
          >
            <Icon name="mdi:plus" mode="svg" class="h-12 w-12 text-white hover:text-white cursor-pointer" />
          </button>
        </div>
      </div>
  
      <!-- Empty State -->
      <div v-else-if="!isLoading && medications.length === 0" class="flex-1 flex items-center justify-center">
        <EmptyState />
      </div>
  
      <!-- Add Button for empty state -->
      <div v-if="!isLoading && medications.length === 0" class="flex-shrink-0 mt-4 mr-auto">
        <button 
          @click="handleAddMedication"
          class="bg-blue-400 text-white rounded-md p-2 hover:bg-blue-500 transition-colors"
        >
          <Icon name="mdi:plus" mode="svg" class="h-12 w-12 text-white hover:text-white cursor-pointer" />
        </button>
      </div>

      <!-- Confirm Dialog -->
      <ConfirmDialog
        :is-open="showDeleteConfirm"
        title="حذف دارو"
        message="آیا از حذف این دارو اطمینان دارید؟"
        confirm-text="حذف"
        cancel-text="لغو"
        @confirm="handleConfirmDelete"
        @cancel="handleCancelDelete"
      />

      <!-- Medication Form -->
      <MedicationForm
        :is-open="showMedicationForm"
        :medication="selectedMedication"
        @close="handleCloseForm"
        @submit="handleSubmitMedication"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Medication, CreateMedicationDto } from '~/types/medication'
  import { useMedications } from '~/Composables/useMedications'
  import { validateMedication, getFirstValidationError } from '~/utils/validators'

  // Use the composable for business logic
  const {
    medications,
    isLoading,
    error,
    filters,
    manufacturers,
    fetchMedications,
    createMedication,
    deleteMedication,
    updateFilters,
    clearFilters,
    // Pagination
    currentPage,
    totalPages,
    paginatedMedications,
    goToPage,
  } = useMedications()
  
  // Local state for filter inputs (for controlled component)
  const searchInput = ref('')
  const manufacturerInput = ref('')
  
  // Delete confirmation state
  const showDeleteConfirm = ref(false)
  const medicationToDelete = ref<number | null>(null)
  const deletingIds = ref<Set<number>>(new Set())

  // Medication form state
  const showMedicationForm = ref(false)
  const selectedMedication = ref<Medication | null>(null)
  
  // Fetch medications on mount
  onMounted(() => {
    fetchMedications()
  })
  
  // Event handlers
  const handleSearch = (value: string) => {
    searchInput.value = value
  }
  
  const handleManufacturer = (value: string) => {
    manufacturerInput.value = value
  }
  
  const handleApplyFilters = () => {
    updateFilters({
      search: searchInput.value || undefined,
      manufacturer: manufacturerInput.value || undefined,
    })
  }
  
  const handleClearFilters = () => {
    searchInput.value = ''
    manufacturerInput.value = ''
    clearFilters()
  }
  
  const handleDeleteClick = (id: number) => {
    medicationToDelete.value = id
    showDeleteConfirm.value = true
  }
  
  const handleConfirmDelete = async () => {
    if (medicationToDelete.value === null) return
    
    const id = medicationToDelete.value
    deletingIds.value.add(id)
    
    try {
      await deleteMedication(id)
      // Success - dialog will close automatically
    } catch (err) {
      console.error('Failed to delete medication:', err)
      // Error is already handled in composable
    } finally {
      deletingIds.value.delete(id)
      medicationToDelete.value = null
      showDeleteConfirm.value = false
    }
  }
  
  const handleCancelDelete = () => {
    medicationToDelete.value = null
    showDeleteConfirm.value = false
  }
  
  const handleEditMedication = (medication: Medication) => {
    selectedMedication.value = medication
    showMedicationForm.value = true
  }
  
  const handleMoreActions = (medication: Medication) => {
    // TODO: Show more actions menu
    // This should show a dropdown menu with additional actions
    console.log('More actions for:', medication)
  }
  
  const handleAddMedication = () => {
    selectedMedication.value = null
    showMedicationForm.value = true
  }

  const handleCloseForm = () => {
    showMedicationForm.value = false
    selectedMedication.value = null
  }

  const handleSubmitMedication = async (data: CreateMedicationDto) => {
    // Validate data
    const validation = validateMedication(data)
    if (!validation.isValid) {
      const error = getFirstValidationError(validation)
      if (error) {
        alert(error) // TODO: Replace with toast notification
      }
      return
    }

    try {
      if (selectedMedication.value) {
        // Update existing medication
        // TODO: Implement update functionality
        console.log('Update medication:', selectedMedication.value.id, data)
      } else {
        // Create new medication
        await createMedication(data)
        handleCloseForm()
      }
    } catch (err) {
      console.error('Failed to save medication:', err)
      // Error is already handled in composable
    }
  }
  </script>

