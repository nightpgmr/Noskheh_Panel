<template>
  <div class="sidebar-bg hidden lg:block lg:top-0 lg:left-0 lg:h-screen lg:w-30 lg:p-4 border-l border-gray-100 bg-white/70 backdrop-blur-md shadow-lg">
    <div class="w-full h-full space-y-6 mt-12 flex flex-col items-center justify-start">
      <Icon 
        name="mdi:home-outline" 
        mode="svg" 
        class="h-12 w-12 my-6 text-gray-400 hover:text-gray-600 cursor-pointer" 
      />
      <Icon 
        name="mdi:users-outline" 
        mode="svg" 
        class="h-12 w-12 my-6 text-gray-400 hover:text-gray-600 cursor-pointer" 
      />
      <Icon 
        name="mdi:beaker-outline" 
        mode="svg" 
        class="h-12 w-12 my-6 text-blue-600 cursor-pointer" 
      />
      <Icon 
        name="mdi:shopping-outline" 
        mode="svg" 
        class="h-12 w-12 my-6 text-gray-400 hover:text-gray-600 cursor-pointer" 
      />
      <Icon 
        name="mdi:cog-outline" 
        mode="svg" 
        class="h-12 w-12 my-6 text-gray-400 hover:text-gray-600 cursor-pointer" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Sidebar navigation component
</script>

<style scoped>
.sidebar-bg {
  background: linear-gradient(180deg, #ECEAFF 0%, #F1F7FF 50%, #FAFBFF 100%);
}
</style>

