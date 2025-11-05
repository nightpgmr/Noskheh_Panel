import { getCookie, setCookie, deleteCookie } from 'h3'
import bcrypt from 'bcryptjs'

export interface SessionData {
  userId: number
  name: string
  phone: string
}

export function getSession(event: any): SessionData | null {
  const sessionCookie = getCookie(event, 'session')
  if (!sessionCookie) {
    return null
  }

  try {
    return JSON.parse(sessionCookie) as SessionData
  } catch {
    return null
  }
}

export function setSession(event: any, data: SessionData) {
  setCookie(event, 'session', JSON.stringify(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export function clearSession(event: any) {
  deleteCookie(event, 'session')
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

