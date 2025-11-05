import { defineEventHandler } from 'h3'
import { seedDatabase } from '~/server/db/seed'

export default defineEventHandler(async (event) => {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    throw createError({
      statusCode: 403,
      message: 'Seeding is only allowed in development'
    })
  }

  try {
    await seedDatabase()
    return { success: true, message: 'Database seeded successfully' }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Failed to seed database'
    })
  }
})

