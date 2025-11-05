import { db } from './index'
import { medications, users } from './schema'
import { hashPassword } from '../utils/auth'

const seedMedications = [
  {
    name: 'آموکسی‌سیلین ۵۰۰ میلی‌گرم',
    dosage: 'هر ۱۲ ساعت',
    status: 'فعال' as const,
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 55,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'لوراتادین ۱۰ میلی‌گرم',
    dosage: 'هر شب قبل خواب',
    status: 'فعال' as const,
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 30,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'بیزوپرولول همی فومارات',
    dosage: 'هر ۱۲ ساعت',
    status: 'فعال' as const,
    manufacturer: 'شرکت سازنده',
    quantityPerPackage: 28,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'بوسنتان',
    dosage: 'هر ۱۲ ساعت',
    status: 'فعال' as const,
    manufacturer: 'شرکت سازنده',
    quantityPerPackage: 60,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'فاموکسیدین',
    dosage: 'هر ۱۲ ساعت',
    status: 'فعال' as const,
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 42,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'آسپرین ۱۰۰ میلی‌گرم',
    dosage: 'روزانه یک عدد',
    status: 'فعال' as const,
    manufacturer: 'سینا دارو',
    quantityPerPackage: 100,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'مترونیدازول ۲۵۰ میلی‌گرم',
    dosage: 'هر ۸ ساعت',
    status: 'فعال' as const,
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 20,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'سیپروفلوکساسین ۵۰۰ میلی‌گرم',
    dosage: 'هر ۱۲ ساعت',
    status: 'فعال' as const,
    manufacturer: 'شرکت سازنده',
    quantityPerPackage: 10,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'ایبوپروفن ۴۰۰ میلی‌گرم',
    dosage: 'هر ۶ ساعت در صورت نیاز',
    status: 'فعال' as const,
    manufacturer: 'سینا دارو',
    quantityPerPackage: 30,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'پاراستامول ۵۰۰ میلی‌گرم',
    dosage: 'هر ۶ ساعت',
    status: 'فعال' as const,
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 20,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'امپرازول ۲۰ میلی‌گرم',
    dosage: 'صبح ناشتا',
    status: 'فعال' as const,
    manufacturer: 'شرکت سازنده',
    quantityPerPackage: 14,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'آتورواستاتین ۲۰ میلی‌گرم',
    dosage: 'شب قبل خواب',
    status: 'فعال' as const,
    manufacturer: 'سینا دارو',
    quantityPerPackage: 30,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'لوسارتان ۵۰ میلی‌گرم',
    dosage: 'روزانه یک عدد',
    status: 'فعال' as const,
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 28,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'متفورمین ۵۰۰ میلی‌گرم',
    dosage: 'هر ۱۲ ساعت همراه غذا',
    status: 'فعال' as const,
    manufacturer: 'شرکت سازنده',
    quantityPerPackage: 60,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'سایمتیدین ۲۰۰ میلی‌گرم',
    dosage: 'هر ۸ ساعت',
    status: 'غیرفعال' as const,
    manufacturer: 'سینا دارو',
    quantityPerPackage: 30,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'رانیتیدین ۱۵۰ میلی‌گرم',
    dosage: 'هر ۱۲ ساعت',
    status: 'فعال' as const,
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 14,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'دیازپام ۵ میلی‌گرم',
    dosage: 'قبل خواب',
    status: 'فعال' as const,
    manufacturer: 'شرکت سازنده',
    quantityPerPackage: 20,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'وارفارین ۵ میلی‌گرم',
    dosage: 'روزانه یک عدد',
    status: 'فعال' as const,
    manufacturer: 'سینا دارو',
    quantityPerPackage: 30,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'فوروزماید ۴۰ میلی‌گرم',
    dosage: 'صبح ناشتا',
    status: 'فعال' as const,
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 28,
    imageUrl: '/images/daro.jpg'
  },
  {
    name: 'هیدروکلروتیازید ۲۵ میلی‌گرم',
    dosage: 'روزانه یک عدد',
    status: 'تمام شده' as const,
    manufacturer: 'شرکت سازنده',
    quantityPerPackage: 30,
    imageUrl: '/images/daro.jpg'
  },
]

export async function seedDatabase() {
  try {
    console.log('Seeding users...')
    const hashedPassword = await hashPassword('123456') // Default password
    
    // Check if users already exist
    const existingUsers = await db.select().from(users)
    if (existingUsers.length === 0) {
      await db.insert(users).values([
        {
          name: 'سارا امیدی',
          phone: '09121234567',
          password: hashedPassword,
        },
        {
          name: 'مدیر سیستم',
          phone: '09120000000',
          password: hashedPassword,
        },
      ])
      console.log('Users seeded!')
    } else {
      console.log('Users already exist, skipping...')
    }

    console.log('Seeding medications...')
    // Check if medications already exist
    const existingMedications = await db.select().from(medications)
    if (existingMedications.length === 0) {
      await db.insert(medications).values(seedMedications)
      console.log('Medications seeded!')
    } else {
      console.log('Medications already exist, skipping...')
    }
    
    console.log('Database seeded successfully!')
    console.log('Default login credentials:')
    console.log('Phone: 09121234567')
    console.log('Password: 123456')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}

