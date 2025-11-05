import { defineEventHandler, readBody, createError } from 'h3'
import { db } from '~/server/db'
import { medications } from '~/server/db/schema'
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

  // Insert into database
  const [newMedication] = await db.insert(medications).values({
    name: body.name,
    nameEn: body.nameEn,
    dosage: body.dosage,
    duration: body.duration,
    status: body.status,
    manufacturer: body.manufacturer,
    quantityPerPackage: body.quantityPerPackage,
    imageUrl: body.imageUrl || '/images/daro.jpg',
  }).returning()

  const result: Medication = {
    id: newMedication.id,
    name: newMedication.name,
    nameEn: newMedication.nameEn || undefined,
    dosage: newMedication.dosage,
    duration: newMedication.duration || undefined,
    status: newMedication.status as 'فعال' | 'غیرفعال' | 'تمام شده',
    manufacturer: newMedication.manufacturer,
    quantityPerPackage: newMedication.quantityPerPackage,
    imageUrl: newMedication.imageUrl || undefined,
  }

  return result
})