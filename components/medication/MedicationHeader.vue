<template>
  <div class="w-full flex flex-col p-6 mb-1 bg-white rounded-lg shadow-sm">
    <div class="w-full flex">
      <Icon 
        name="mdi:chevron-right" 
        mode="svg" 
        class="h-20 w-20 text-gray-400 hover:text-gray-600 cursor-pointer" 
      />
      <div class="mb-6 text-right flex-grow">
        <h1 class="text-2xl font-bold text-gray-800">
          لیست داروها
        </h1>
        <h1 class="mt-2 text-2xl text-gray-500">
          List of medications
        </h1>
      </div>
      <Icon 
        name="mdi:filter-outline" 
        mode="svg" 
        class="h-12 w-12 text-gray-400 hover:text-gray-600 cursor-pointer" 
      />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
// Header component for medication list page
</script>

