<template>
  <div class="w-full py-2 flex items-start">
    <div class="flex flex-col items-start">
      <span class="text-xl font-semibold text-gray-800">
        {{ userName }}
      </span>
      <span class="text-base text-gray-500">
        {{ userPhone }}
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
    <Icon 
      name="mdi:power" 
      mode="svg" 
      class="h-12 w-12 mr-4 text-gray-400 hover:text-gray-600 cursor-pointer" 
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  userName?: string
  userPhone?: string
}

withDefaults(defineProps<Props>(), {
  userName: 'سارا امیدی',
  userPhone: '0912-123-4567'
})
</script>

