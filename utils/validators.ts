import type { CreateMedicationDto, MedicationStatus } from '~/types/medication'

/**
 * Validation utilities for medication data
 */

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

/**
 * Validate medication status
 */
export function isValidMedicationStatus(status: string): status is MedicationStatus {
  return ['فعال', 'غیرفعال', 'تمام شده'].includes(status)
}

/**
 * Validate medication name
 */
export function validateMedicationName(name: string): string | null {
  if (!name || name.trim().length === 0) {
    return 'نام دارو الزامی است'
  }
  
  if (name.trim().length < 2) {
    return 'نام دارو باید حداقل ۲ کاراکتر باشد'
  }
  
  if (name.trim().length > 200) {
    return 'نام دارو نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد'
  }
  
  return null
}

/**
 * Validate dosage
 */
export function validateDosage(dosage: string): string | null {
  if (!dosage || dosage.trim().length === 0) {
    return 'دوز مصرف الزامی است'
  }
  
  if (dosage.trim().length > 100) {
    return 'دوز مصرف نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد'
  }
  
  return null
}

/**
 * Validate manufacturer
 */
export function validateManufacturer(manufacturer: string): string | null {
  if (!manufacturer || manufacturer.trim().length === 0) {
    return 'شرکت سازنده الزامی است'
  }
  
  if (manufacturer.trim().length < 2) {
    return 'نام شرکت سازنده باید حداقل ۲ کاراکتر باشد'
  }
  
  if (manufacturer.trim().length > 100) {
    return 'نام شرکت سازنده نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد'
  }
  
  return null
}

/**
 * Validate quantity per package
 */
export function validateQuantityPerPackage(quantity: number): string | null {
  if (quantity === undefined || quantity === null) {
    return 'تعداد در بسته الزامی است'
  }
  
  if (typeof quantity !== 'number' || isNaN(quantity)) {
    return 'تعداد در بسته باید یک عدد باشد'
  }
  
  if (quantity < 1) {
    return 'تعداد در بسته باید حداقل ۱ باشد'
  }
  
  if (quantity > 10000) {
    return 'تعداد در بسته نمی‌تواند بیشتر از ۱۰۰۰۰ باشد'
  }
  
  return null
}

/**
 * Validate medication status
 */
export function validateStatus(status: MedicationStatus): string | null {
  if (!status) {
    return 'وضعیت الزامی است'
  }
  
  if (!isValidMedicationStatus(status)) {
    return 'وضعیت نامعتبر است'
  }
  
  return null
}

/**
 * Validate image URL
 */
export function validateImageUrl(imageUrl?: string): string | null {
  if (!imageUrl) {
    return null // Optional field
  }
  
  try {
    // Check if it's a valid URL or path
    if (imageUrl.startsWith('/') || imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return null
    }
    return 'آدرس تصویر نامعتبر است'
  } catch {
    return 'آدرس تصویر نامعتبر است'
  }
}

/**
 * Validate complete CreateMedicationDto
 */
export function validateMedication(data: CreateMedicationDto): ValidationResult {
  const errors: ValidationError[] = []

  const nameError = validateMedicationName(data.name)
  if (nameError) {
    errors.push({ field: 'name', message: nameError })
  }

  const dosageError = validateDosage(data.dosage)
  if (dosageError) {
    errors.push({ field: 'dosage', message: dosageError })
  }

  const manufacturerError = validateManufacturer(data.manufacturer)
  if (manufacturerError) {
    errors.push({ field: 'manufacturer', message: manufacturerError })
  }

  const quantityError = validateQuantityPerPackage(data.quantityPerPackage)
  if (quantityError) {
    errors.push({ field: 'quantityPerPackage', message: quantityError })
  }

  const statusError = validateStatus(data.status)
  if (statusError) {
    errors.push({ field: 'status', message: statusError })
  }

  const imageUrlError = validateImageUrl(data.imageUrl)
  if (imageUrlError) {
    errors.push({ field: 'imageUrl', message: imageUrlError })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Get first validation error message
 */
export function getFirstValidationError(validation: ValidationResult): string | null {
  if (validation.isValid) {
    return null
  }
  
  return validation.errors[0]?.message || null
}

