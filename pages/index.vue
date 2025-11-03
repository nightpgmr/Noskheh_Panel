<template>
    <div class="w-full flex flex-col">
        <div class="w-full flex flex-col p-6 mb-1 bg-white rounded-lg shadow-sm">
            <div class="w-full flex">
                <Icon name="mdi:chevron-right" mode="svg" class="h-20 w-20 text-gray-400 hover:text-gray-600 cursor-pointer" />
                <div class="mb-6 text-right flex-grow">
                    <h1 class="text-2xl font-bold text-gray-800">
                        لیست داروها
                    </h1>
                    <h1 class="mt-2 text-2x1 text-gray-500">
                        List of medications
                    </h1>
                </div>
                <Icon name="mdi:filter-outline" mode="svg" class="h-12 w-12 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </div>
            <div class="w-full flex">
                <input type="text" placeholder="Search for a medication" class="min-w-130 p-3 border border-gray-300 rounded-lg text-right text-gray-800 focus:ring-purple-500 focus:border-purple-500" />
                <select type="text" placeholder="Search for a medication" class="min-w-80 p-3 mr-4 border border-gray-300 rounded-lg text-right text-gray-800 focus:ring-purple-500 focus:border-purple-500">
                    <option>شرکت سازنده</option>
                    <option>دکتر عبیدی</option>
                </select>
                <div class="flex-grow"/>
                <button class="bg-transparent text-gray-400 rounded-md mr-4">
                    <Icon name="mdi:close" mode="svg" class="h-12 w-12 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </button>
                <button class="bg-purple-800 text-white rounded-md mr-4">
                    <Icon name="mdi:check" mode="svg" class="h-12 w-12 text-white-400 hover:text-white-600 cursor-pointer" />
                </button>
            </div>
        </div>
        <MedicationCard v-for="drug in medications" :key="drug.id" :drug-data="drug" />
        <button class="bg-blue-400 text-white rounded-md mr-auto mt-8 p-1">
            <Icon name="mdi:plus" mode="svg" class="h-12 w-12 text-white-400 hover:text-white-600 cursor-pointer" />
        </button>
    </div>
</template>

<script setup lang="ts">
const medications = [
  { id: 1, name: 'آموکسی‌سیلین ۵۰۰ میلی‌گرم', dosage: 'هر ۱۲ ساعت', status: 'فعال' },
  { id: 2, name: 'لوراتادین ۱۰ میلی‌گرم', dosage: 'هر شب قبل خواب', status: 'فعال' },
  { id: 3, name: 'بیزوپرولول همی فومارات', dosage: 'هر ۱۲ ساعت', status: 'فعال' },
  { id: 4, name: 'بوسنتان', dosage: 'هر ۱۲ ساعت', status: 'فعال' },
  { id: 5, name: 'فاموکسیدین', dosage: 'هر ۱۲ ساعت', status: 'فعال' },
]
</script>