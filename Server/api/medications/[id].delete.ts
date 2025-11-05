import { defineEventHandler, getRouterParam, createError } from 'h3'
import { db } from '~/server/db'
import { medications } from '~/server/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Medication ID is required'
    })
  }

  // Delete from database
  const [deletedMedication] = await db
    .delete(medications)
    .where(eq(medications.id, parseInt(id)))
    .returning()

  if (!deletedMedication) {
    throw createError({
      statusCode: 404,
      message: 'Medication not found'
    })
  }

  return { success: true, id: parseInt(id) }
})