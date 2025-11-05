import { defineEventHandler, createError } from 'h3'
import { getSession } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const session = getSession(event)
  
  if (!session) {
    throw createError({
      statusCode: 401,
      message: 'Not authenticated'
    })
  }

  return {
    id: session.userId,
    name: session.name,
    phone: session.phone,
  }
})

