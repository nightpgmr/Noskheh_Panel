/**
 * Pinia store for medication state management
 * 
 * Note: This store requires @pinia/nuxt to be installed and configured
 * Install: yarn add @pinia/nuxt
 * Then add '@pinia/nuxt' to nuxt.config.ts modules array
 */

import { defineStore } from 'pinia'
import type { MedicationList, MedicationFilters, CreateMedicationDto } from '~/types/medication'
import { medicationService } from '~/services/medicationService'

export const useMedicationStore = defineStore('medication', {
  state: () => ({
    medications: [] as MedicationList,
    isLoading: false,
    error: null as string | null,
    filters: {} as MedicationFilters,
  }),

  getters: {
    /**
     * Get unique manufacturers for filter dropdown
     */
    manufacturers: (state): string[] => {
      const unique = new Set(state.medications.map(m => m.manufacturer))
      return Array.from(unique)
    },

    /**
     * Get filtered medications (client-side filtering if needed)
     */
    filteredMedications: (state): MedicationList => {
      // Server-side filtering is preferred, but this can be used for client-side filtering
      return state.medications
    },

    /**
     * Get medication by ID
     */
    getMedicationById: (state) => {
      return (id: number) => {
        return state.medications.find(m => m.id === id)
      }
    },
  },

  actions: {
    /**
     * Fetch medications from API
     */
    async fetchMedications() {
      this.isLoading = true
      this.error = null

      try {
        this.medications = await medicationService.getAll(this.filters)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch medications'
        this.error = errorMessage
        console.error('Error fetching medications:', err)
        throw err
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Create new medication
     */
    async createMedication(medicationData: CreateMedicationDto) {
      this.isLoading = true
      this.error = null

      try {
        const newMedication = await medicationService.create(medicationData)
        // Refetch to ensure consistency with server
        await this.fetchMedications()
        return newMedication
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create medication'
        this.error = errorMessage
        throw err
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Update medication
     */
    async updateMedication(id: number, medicationData: Partial<CreateMedicationDto>) {
      this.isLoading = true
      this.error = null

      try {
        await medicationService.update(id, medicationData)
        // Refetch to ensure consistency with server
        await this.fetchMedications()
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update medication'
        this.error = errorMessage
        throw err
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Delete medication
     */
    async deleteMedication(id: number) {
      this.isLoading = true
      this.error = null

      try {
        await medicationService.delete(id)
        // Optimistic update - remove from list immediately
        this.medications = this.medications.filter(m => m.id !== id)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete medication'
        this.error = errorMessage
        // Re-fetch on error to restore correct state
        await this.fetchMedications()
        throw err
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Update filters
     */
    updateFilters(newFilters: MedicationFilters) {
      this.filters = { ...this.filters, ...newFilters }
      this.fetchMedications()
    },

    /**
     * Clear filters
     */
    clearFilters() {
      this.filters = {}
      this.fetchMedications()
    },

    /**
     * Clear error
     */
    clearError() {
      this.error = null
    },
  },
})

