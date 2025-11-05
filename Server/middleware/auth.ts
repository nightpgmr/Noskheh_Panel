import { getSession } from '~/server/utils/auth'

export default defineEventHandler((event) => {
  const path = event.node.req.url || ''
  
  // Skip auth check for public auth routes
  if (
    path.startsWith('/api/auth/login') || 
    path.startsWith('/api/auth/register') ||
    path.startsWith('/api/auth/logout')
  ) {
    return
  }

  // Check for authentication on protected API routes
  if (path.startsWith('/api/')) {
    const session = getSession(event)
    if (!session) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }
  }
})

