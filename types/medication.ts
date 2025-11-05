export type MedicationStatus = 'فعال' | 'غیرفعال' | 'تمام شده'

export interface Medication {
  id: number
  name: string
  nameEn?: string
  dosage: string
  duration?: string
  status: MedicationStatus
  manufacturer: string
  quantityPerPackage: number
  imageUrl?: string
}

export type MedicationList = Medication[]

export interface MedicationFilters {
  search?: string
  manufacturer?: string
}

export interface CreateMedicationDto {
  name: string
  nameEn?: string
  dosage: string
  duration?: string
  status: MedicationStatus
  manufacturer: string
  quantityPerPackage: number
  imageUrl?: string
}

export interface UpdateMedicationDto extends Partial<CreateMedicationDto> {
  id: number
}