<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <!-- Header Section -->
    <div class="flex-shrink-0 mb-6">
      <UiPageHeader 
        persian-title="داشبورد"
        english-title="Dashboard"
        :show-back-button="false"
      />
    </div>

    <!-- Dashboard Content -->
    <div class="flex-1 overflow-y-auto">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <!-- Medications Card -->
        <NuxtLink 
          to="/medications"
          class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
        >
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm mb-2">داروها</span>
              <span class="text-3xl font-bold text-gray-800">{{ totalMedications }}</span>
              <span class="text-gray-400 text-xs mt-1">Medications</span>
            </div>
            <div class="bg-blue-100 rounded-full p-4">
              <Icon name="mdi:beaker-outline" mode="svg" class="h-12 w-12 text-blue-600" />
            </div>
          </div>
        </NuxtLink>

        <!-- Users Card -->
        <NuxtLink 
          to="/users"
          class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
        >
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm mb-2">کاربران</span>
              <span class="text-3xl font-bold text-gray-800">{{ totalUsers }}</span>
              <span class="text-gray-400 text-xs mt-1">Users</span>
            </div>
            <div class="bg-purple-100 rounded-full p-4">
              <Icon name="mdi:users-outline" mode="svg" class="h-12 w-12 text-purple-600" />
            </div>
          </div>
        </NuxtLink>

        <!-- Shopping Card -->
        <NuxtLink 
          to="/shopping"
          class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
        >
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm mb-2">خرید</span>
              <span class="text-3xl font-bold text-gray-800">{{ totalShopping }}</span>
              <span class="text-gray-400 text-xs mt-1">Shopping</span>
            </div>
            <div class="bg-green-100 rounded-full p-4">
              <Icon name="mdi:shopping-outline" mode="svg" class="h-12 w-12 text-green-600" />
            </div>
          </div>
        </NuxtLink>

        <!-- Settings Card -->
        <NuxtLink 
          to="/settings"
          class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
        >
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm mb-2">تنظیمات</span>
              <span class="text-3xl font-bold text-gray-800">-</span>
              <span class="text-gray-400 text-xs mt-1">Settings</span>
            </div>
            <div class="bg-gray-100 rounded-full p-4">
              <Icon name="mdi:cog-outline" mode="svg" class="h-12 w-12 text-gray-600" />
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Quick Actions Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
        <h2 class="text-xl font-bold text-gray-800 mb-4">دسترسی سریع</h2>
        <h3 class="text-lg text-gray-500 mb-4">Quick Actions</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NuxtLink 
            to="/medications"
            class="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
          >
            <Icon name="mdi:plus-circle-outline" mode="svg" class="h-8 w-8 text-blue-600 ml-4" />
            <div class="flex flex-col">
              <span class="font-semibold text-gray-800">افزودن داروی جدید</span>
              <span class="text-sm text-gray-500">Add New Medication</span>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/users"
            class="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200"
          >
            <Icon name="mdi:account-plus-outline" mode="svg" class="h-8 w-8 text-purple-600 ml-4" />
            <div class="flex flex-col">
              <span class="font-semibold text-gray-800">مدیریت کاربران</span>
              <span class="text-sm text-gray-500">Manage Users</span>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Recent Activity Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 class="text-xl font-bold text-gray-800 mb-4">فعالیت‌های اخیر</h2>
        <h3 class="text-lg text-gray-500 mb-4">Recent Activity</h3>
        <div v-if="recentMedications.length > 0" class="space-y-4">
          <div 
            v-for="medication in recentMedications" 
            :key="medication.id"
            class="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <Icon name="mdi:pill" mode="svg" class="h-8 w-8 text-blue-600 ml-4" />
            <div class="flex-1">
              <p class="font-semibold text-gray-800">{{ medication.name }}</p>
              <p class="text-sm text-gray-500">
                {{ medication.dosage }}
                <span v-if="medication.duration"> - {{ medication.duration }}</span>
              </p>
            </div>
            <NuxtLink 
              to="/medications"
              class="text-blue-600 hover:text-blue-800 text-sm"
            >
              مشاهده
            </NuxtLink>
          </div>
        </div>
        <div v-else class="text-center py-8">
          <Icon name="mdi:information-outline" mode="svg" class="h-12 w-12 mx-auto text-gray-400 mb-2" />
          <p class="text-gray-500">هیچ فعالیتی ثبت نشده است</p>
          <p class="text-sm text-gray-400 mt-1">No recent activity</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { useMedications } from '~/Composables/useMedications'

// Fetch medications for stats
const {
  medications,
  isLoading,
  fetchMedications,
} = useMedications()

// Stats
const totalMedications = computed(() => medications.value.length)
const totalUsers = ref(0) // TODO: Fetch from users API
const totalShopping = ref(0) // TODO: Fetch from shopping API

// Recent medications (last 5)
const recentMedications = computed(() => {
  return medications.value.slice(0, 5)
})

// Fetch medications on mount
onMounted(() => {
  fetchMedications()
})
</script>