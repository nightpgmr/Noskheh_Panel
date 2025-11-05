import { defineEventHandler, readBody, createError } from 'h3'
import type { CreateMedicationDto, Medication } from '~/types/medication'

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateMedicationDto>(event)
  
  // Validate body
  if (!body.name || !body.dosage || !body.manufacturer) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields'
    })
  }

  // In real app, save to database
  const newMedication: Medication = {
    id: Date.now(), // Use proper ID generation in production
    ...body,
    imageUrl: body.imageUrl || '/images/daro.jpg'
  }

  return newMedication
})