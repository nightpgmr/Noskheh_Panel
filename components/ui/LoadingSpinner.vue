<template>
  <div class="flex justify-center items-center p-8">
    <div class="text-gray-500">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ message?: string }>(), {
  message: 'در حال بارگذاری...'
})
</script>

