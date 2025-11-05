import { defineEventHandler, readBody, createError } from 'h3'
import { db } from '~/server/db'
import { users } from '~/server/db/schema'
import { eq } from 'drizzle-orm'
import { verifyPassword, setSession } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ phone: string; password: string }>(event)

  if (!body.phone || !body.password) {
    throw createError({
      statusCode: 400,
      message: 'Phone and password are required'
    })
  }

  // Find user by phone
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.phone, body.phone))
    .limit(1)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Invalid phone or password'
    })
  }

  // Verify password
  const isValid = await verifyPassword(body.password, user.password)
  if (!isValid) {
    throw createError({
      statusCode: 401,
      message: 'Invalid phone or password'
    })
  }

  // Set session
  setSession(event, {
    userId: user.id,
    name: user.name,
    phone: user.phone,
  })

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
    }
  }
})

