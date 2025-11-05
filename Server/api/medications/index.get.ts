import { defineEventHandler } from 'h3'
import type { MedicationList } from '~/types/medication'


// Mock data - replace with actual database calls
const mockMedications: MedicationList = [
  {
    id: 1,
    name: 'آموکسی‌سیلین ۵۰۰ میلی‌گرم',
    dosage: 'هر ۱۲ ساعت',
    status: 'فعال',
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 55,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 2,
    name: 'لوراتادین ۱۰ میلی‌گرم',
    dosage: 'هر شب قبل خواب',
    status: 'فعال',
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 30,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 3,
    name: 'بیزوپرولول همی فومارات',
    dosage: 'هر ۱۲ ساعت',
    status: 'فعال',
    manufacturer: 'شرکت سازنده',
    quantityPerPackage: 28,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 4,
    name: 'بوسنتان',
    dosage: 'هر ۱۲ ساعت',
    status: 'فعال',
    manufacturer: 'شرکت سازنده',
    quantityPerPackage: 60,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 5,
    name: 'فاموکسیدین',
    dosage: 'هر ۱۲ ساعت',
    status: 'فعال',
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 42,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 6,
    name: 'آسپرین ۱۰۰ میلی‌گرم',
    dosage: 'روزانه یک عدد',
    status: 'فعال',
    manufacturer: 'سینا دارو',
    quantityPerPackage: 100,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 7,
    name: 'مترونیدازول ۲۵۰ میلی‌گرم',
    dosage: 'هر ۸ ساعت',
    status: 'فعال',
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 20,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 8,
    name: 'سیپروفلوکساسین ۵۰۰ میلی‌گرم',
    dosage: 'هر ۱۲ ساعت',
    status: 'فعال',
    manufacturer: 'شرکت سازنده',
    quantityPerPackage: 10,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 9,
    name: 'ایبوپروفن ۴۰۰ میلی‌گرم',
    dosage: 'هر ۶ ساعت در صورت نیاز',
    status: 'فعال',
    manufacturer: 'سینا دارو',
    quantityPerPackage: 30,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 10,
    name: 'پاراستامول ۵۰۰ میلی‌گرم',
    dosage: 'هر ۶ ساعت',
    status: 'فعال',
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 20,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 11,
    name: 'امپرازول ۲۰ میلی‌گرم',
    dosage: 'صبح ناشتا',
    status: 'فعال',
    manufacturer: 'شرکت سازنده',
    quantityPerPackage: 14,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 12,
    name: 'آتورواستاتین ۲۰ میلی‌گرم',
    dosage: 'شب قبل خواب',
    status: 'فعال',
    manufacturer: 'سینا دارو',
    quantityPerPackage: 30,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 13,
    name: 'لوسارتان ۵۰ میلی‌گرم',
    dosage: 'روزانه یک عدد',
    status: 'فعال',
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 28,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 14,
    name: 'متفورمین ۵۰۰ میلی‌گرم',
    dosage: 'هر ۱۲ ساعت همراه غذا',
    status: 'فعال',
    manufacturer: 'شرکت سازنده',
    quantityPerPackage: 60,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 15,
    name: 'سایمتیدین ۲۰۰ میلی‌گرم',
    dosage: 'هر ۸ ساعت',
    status: 'غیرفعال',
    manufacturer: 'سینا دارو',
    quantityPerPackage: 30,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 16,
    name: 'رانیتیدین ۱۵۰ میلی‌گرم',
    dosage: 'هر ۱۲ ساعت',
    status: 'فعال',
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 14,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 17,
    name: 'دیازپام ۵ میلی‌گرم',
    dosage: 'قبل خواب',
    status: 'فعال',
    manufacturer: 'شرکت سازنده',
    quantityPerPackage: 20,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 18,
    name: 'وارفارین ۵ میلی‌گرم',
    dosage: 'روزانه یک عدد',
    status: 'فعال',
    manufacturer: 'سینا دارو',
    quantityPerPackage: 30,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 19,
    name: 'فوروزماید ۴۰ میلی‌گرم',
    dosage: 'صبح ناشتا',
    status: 'فعال',
    manufacturer: 'دکتر عبیدی',
    quantityPerPackage: 28,
    imageUrl: '/images/daro.jpg'
  },
  {
    id: 20,
    name: 'هیدروکلروتیازید ۲۵ میلی‌گرم',
    dosage: 'روزانه یک عدد',
    status: 'تمام شده',
    manufacturer: 'شرکت سازنده',
    quantityPerPackage: 30,
    imageUrl: '/images/daro.jpg'
  },
]

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))

  let filtered = [...mockMedications]

  // Apply filters
  if (query.search) {
    const search = query.search as string
    filtered = filtered.filter(m => 
      m.name.includes(search) || 
      m.manufacturer.includes(search)
    )
  }

  if (query.manufacturer) {
    filtered = filtered.filter(m => 
      m.manufacturer === query.manufacturer
    )
  }

  return filtered
})