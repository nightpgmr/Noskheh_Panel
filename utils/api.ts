/**
 * API client configuration and utilities
 * Centralized API setup for consistent error handling and configuration
 */

export interface ApiError {
  message: string
  statusCode?: number
  data?: any
}

/**
 * Create a standardized error from API responses
 */
export function createApiError(error: any): ApiError {
  if (error?.data) {
    return {
      message: error.data.message || error.message || 'An error occurred',
      statusCode: error.statusCode || error.status,
      data: error.data
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: undefined,
      data: undefined
    }
  }

  return {
    message: 'An unexpected error occurred',
    statusCode: undefined,
    data: undefined
  }
}

/**
 * API base URL configuration
 * In production, this should come from environment variables
 */
export const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE_URL || '/api'

/**
 * Default fetch options for API calls
 */
export const defaultFetchOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error: any): never {
  const apiError = createApiError(error)
  console.error('API Error:', apiError)
  throw new Error(apiError.message)
}

