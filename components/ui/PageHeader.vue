<template>
  <div class="w-full flex flex-col p-6 mb-1 bg-white rounded-lg shadow-sm">
    <div class="w-full flex">
      <Icon 
        v-if="showBackButton"
        name="mdi:chevron-right" 
        mode="svg" 
        class="h-20 w-20 text-gray-400 hover:text-gray-600 cursor-pointer" 
        @click="goToDashboard"
      />
      <div v-else class="w-20"></div>
      <div class="mb-6 text-right flex-grow">
        <h1 class="text-2xl font-bold text-gray-800">
          {{ persianTitle }}
        </h1>
        <h1 class="mt-2 text-2xl text-gray-500">
          {{ englishTitle }}
        </h1>
      </div>
      <div class="w-20"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  persianTitle: string
  englishTitle: string
  showBackButton?: boolean
}

withDefaults(defineProps<Props>(), {
  showBackButton: true
})

const goToDashboard = () => {
  navigateTo('/')
}
</script>

