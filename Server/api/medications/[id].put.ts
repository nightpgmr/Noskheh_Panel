import { defineEventHandler, readBody, getRouterParam, createError } from 'h3'
import type { UpdateMedicationDto, Medication } from '~/types/medication'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Medication ID is required'
    })
  }

  const body = await readBody<Partial<UpdateMedicationDto>>(event)
  
  // In real app, update in database
  const updatedMedication: Medication = {
    id: parseInt(id),
    name: body.name || 'Unknown',
    dosage: body.dosage || '',
    status: body.status || 'فعال',
    manufacturer: body.manufacturer || '',
    quantityPerPackage: body.quantityPerPackage || 0,
    imageUrl: body.imageUrl || '/images/daro.jpg',
    ...(body.duration && { duration: body.duration }),
    ...(body.nameEn && { nameEn: body.nameEn })
  }

  return updatedMedication
})

