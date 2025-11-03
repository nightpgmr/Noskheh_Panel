<template>
    <div class="app-bg min-h-screen flex justify-center items-start overflow-hidden">
      <div class="sidebar-bg hidden lg:block lg:top-0 lg:left-0 lg:h-screen lg:w-30 lg:p-4 border-l border-gray-100 bg-white/70 backdrop-blur-md shadow-lg">
        <div class="w-full h-full space-y-6 mt-12 flex flex-col items-center justify-start">
            <Icon name="mdi:home-outline" mode="svg" class="h-12 w-12 my-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
            <Icon name="mdi:users-outline" mode="svg" class="h-12 w-12 my-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
            <Icon name="mdi:beaker-outline" mode="svg" class="h-12 w-12 my-6 text-blue-600 cursor-pointer" />
            <Icon name="mdi:shopping-outline" mode="svg" class="h-12 w-12 my-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
            <Icon name="mdi:cog-outline" mode="svg" class="h-12 w-12 my-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>
      </div>
      <div class="w-full h-full px-25 py-10 flex flex-col justify-center items-start">
        <div class="w-full py-2 flex items-start">
            <div class="flex flex-col items-start">
                <span class="text-xl font-semibold text-gray-800">
                    سارا امیدی
                </span>
                <span class="text-base text-gray-500">
                    0912-123-4567
                </span>
            </div>
            <div class="flex-grow"/>
            <div class="h-18 flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="logo" class="h-60" />
            </div>
            <div class="flex-grow"/>
            <Icon name="mdi:person-outline" mode="svg" class="h-12 w-12 text-gray-400 hover:text-gray-600 cursor-pointer" />
            <Icon name="mdi:power" mode="svg" class="h-12 w-12 mr-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  // Layout component
  </script>
  
  <style scoped>
      .app-bg {
          background: linear-gradient(210deg, #D7D3FE 0%, #E7F3FC 35%, #F5F3FF 40%, #F7F6FA 75%, #DCF1FD 85%, #D7D3FE 100%);
      }
      
      .sidebar-bg {
          background: linear-gradient(180deg, #ECEAFF 0%, #F1F7FF 50%, #FAFBFF 100%);
      }
  </style>