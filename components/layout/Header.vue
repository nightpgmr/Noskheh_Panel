<template>
  <div class="w-full py-2 flex items-start">
    <div class="flex flex-col items-start">
      <span class="text-xl font-semibold text-gray-800">
        {{ user?.name || 'کاربر' }}
      </span>
      <span class="text-base text-gray-500">
        {{ user?.phone || '-' }}
      </span>
    </div>
    <div class="flex-grow"/>
    <div class="h-18 flex items-center justify-center overflow-hidden">
      <img src="/images/logo.png" alt="logo" class="h-60" />
    </div>
    <div class="flex-grow"/>
    <Icon 
      name="mdi:person-outline" 
      mode="svg" 
      class="h-12 w-12 text-gray-400 hover:text-gray-600 cursor-pointer" 
    />
    <button 
      @click="handleLogout"
      class="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      title="خروج / Logout"
    >
      <Icon 
        name="mdi:power" 
        mode="svg" 
        class="h-12 w-12 text-gray-400 hover:text-gray-600 cursor-pointer" 
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/Composables/useAuth'

const { user, logout } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>

