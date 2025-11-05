// @ts-expect-error - drizzle-orm will be available after yarn install
import { pgTable, serial, varchar, integer, text, timestamp } from 'drizzle-orm/pg-core'

export const medications = pgTable('medications', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  nameEn: varchar('name_en', { length: 255 }),
  dosage: varchar('dosage', { length: 255 }).notNull(),
  duration: varchar('duration', { length: 255 }),
  status: varchar('status', { length: 50 }).notNull().default('فعال'),
  manufacturer: varchar('manufacturer', { length: 255 }).notNull(),
  quantityPerPackage: integer('quantity_per_package').notNull(),
  imageUrl: varchar('image_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Medication = typeof medications.$inferSelect
export type NewMedication = typeof medications.$inferInsert
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

