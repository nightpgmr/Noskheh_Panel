import { defineEventHandler, getRouterParam, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Medication ID is required'
    })
  }

  // In real app, delete from database
  return { success: true, id: parseInt(id) }
})