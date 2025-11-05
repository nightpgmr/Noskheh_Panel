<template>
    <div class="app-bg h-screen flex overflow-hidden">
      <LayoutSidebar />
      <div class="w-full h-screen overflow-hidden px-25 pt-10 pb-2 flex flex-col">
        <LayoutHeader />
        <div class="flex-1 overflow-hidden flex flex-col">
          <slot />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAuth } from '~/Composables/useAuth'
  
  const { fetchUser } = useAuth()

  // Fetch user on mount
  onMounted(async () => {
    try {
      await fetchUser()
    } catch (error) {
      // User not authenticated, redirect to login
      await navigateTo('/login')
    }
  })
  </script>
  
  <style scoped>
      .app-bg {
          background: linear-gradient(210deg, #D7D3FE 0%, #E7F3FC 35%, #F5F3FF 40%, #F7F6FA 75%, #DCF1FD 85%, #D7D3FE 100%);
      }
  </style>