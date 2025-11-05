import { defineEventHandler, readBody, getRouterParam, createError } from 'h3'
import { db } from '~/server/db'
import { medications } from '~/server/db/schema'
import { eq } from 'drizzle-orm'
import type { UpdateMedicationDto, Medication } from '~/types/medication'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Medication ID is required'
    })
  }

  const body = await readBody<Partial<CreateMedicationDto>>(event)
  
  // Validate required fields
  if (!body.name || !body.dosage || !body.manufacturer || body.quantityPerPackage === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields: name, dosage, manufacturer, quantityPerPackage'
    })
  }

  // Build update object with all provided fields
  const updateData: any = {
    name: body.name,
    dosage: body.dosage,
    status: body.status || 'فعال',
    manufacturer: body.manufacturer,
    quantityPerPackage: body.quantityPerPackage,
    updatedAt: new Date(),
  }

  // Optional fields
  if (body.nameEn !== undefined) updateData.nameEn = body.nameEn || null
  if (body.duration !== undefined) updateData.duration = body.duration || null
  if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl || null

  // Update in database
  const [updatedMedication] = await db
    .update(medications)
    .set(updateData)
    .where(eq(medications.id, parseInt(id)))
    .returning()

  if (!updatedMedication) {
    throw createError({
      statusCode: 404,
      message: 'Medication not found'
    })
  }

  const result: Medication = {
    id: updatedMedication.id,
    name: updatedMedication.name,
    nameEn: updatedMedication.nameEn || undefined,
    dosage: updatedMedication.dosage,
    duration: updatedMedication.duration || undefined,
    status: updatedMedication.status as 'فعال' | 'غیرفعال' | 'تمام شده',
    manufacturer: updatedMedication.manufacturer,
    quantityPerPackage: updatedMedication.quantityPerPackage,
    imageUrl: updatedMedication.imageUrl || undefined,
  }

  return result
})

