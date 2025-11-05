import { defineEventHandler, getQuery } from 'h3'
import { db } from '~/server/db'
import { medications } from '~/server/db/schema'
import { ilike, eq, or, and, desc } from 'drizzle-orm'
import type { MedicationList } from '~/types/medication'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  let whereConditions: any[] = []
  
  // Apply search filter
  if (query.search) {
    const search = query.search as string
    whereConditions.push(
      or(
        ilike(medications.name, `%${search}%`),
        ilike(medications.manufacturer, `%${search}%`)
      )
    )
  }

  // Apply manufacturer filter
  if (query.manufacturer) {
    whereConditions.push(eq(medications.manufacturer, query.manufacturer as string))
  }

  // Build query with consistent ordering (by ID descending - newest first)
  let result
  
  if (whereConditions.length === 0) {
    result = await db.select().from(medications).orderBy(desc(medications.id))
  } else if (whereConditions.length === 1) {
    result = await db.select().from(medications).where(whereConditions[0]).orderBy(desc(medications.id))
  } else {
    result = await db.select().from(medications).where(and(...whereConditions)).orderBy(desc(medications.id))
  }
  
  // Map database results to Medication type
  const medicationsList: MedicationList = result.map((med: any) => ({
    id: med.id,
    name: med.name,
    nameEn: med.nameEn || undefined,
    dosage: med.dosage,
    duration: med.duration || undefined,
    status: med.status as 'فعال' | 'غیرفعال' | 'تمام شده',
    manufacturer: med.manufacturer,
    quantityPerPackage: med.quantityPerPackage,
    imageUrl: med.imageUrl || undefined,
  }))

  return medicationsList
})