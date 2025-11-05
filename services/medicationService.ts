import type { 
  MedicationList, 
  MedicationFilters, 
  CreateMedicationDto,
  Medication 
} from '~/types/medication'

/**
 * Service layer for medication API operations
 * Separates API calls from business logic
 */
export class MedicationService {
  private baseUrl = '/api/medications'

  async getAll(filters?: MedicationFilters): Promise<MedicationList> {
    const queryParams = new URLSearchParams()
    
    if (filters?.search) {
      queryParams.append('search', filters.search)
    }
    if (filters?.manufacturer) {
      queryParams.append('manufacturer', filters.manufacturer)
    }
    
    const query = queryParams.toString()
    const url = `${this.baseUrl}${query ? `?${query}` : ''}`
    
    return await $fetch<MedicationList>(url)
  }

  async create(data: CreateMedicationDto): Promise<Medication> {
    return await $fetch<Medication>(this.baseUrl, {
      method: 'POST',
      body: data
    })
  }

  async delete(id: number): Promise<void> {
    await $fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    })
  }

  async update(id: number, data: Partial<CreateMedicationDto>): Promise<Medication> {
    return await $fetch<Medication>(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      body: data
    })
  }
}

export const medicationService = new MedicationService()

