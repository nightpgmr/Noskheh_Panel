<template>
  <div class="text-center py-8 text-gray-500">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ message?: string }>(), {
  message: 'هیچ دارویی یافت نشد'
})
</script>

