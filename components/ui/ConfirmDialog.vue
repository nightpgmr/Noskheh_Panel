<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" @click.self="handleCancel">
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-4 text-right">{{ title }}</h3>
      <p class="text-gray-600 mb-6 text-right">{{ message }}</p>
      <div class="flex justify-end space-x-4 space-x-reverse">
        <button
          @click="handleCancel"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          {{ cancelText }}
        </button>
        <button
          @click="handleConfirm"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'تأیید',
  message: 'آیا از انجام این عمل اطمینان دارید؟',
  confirmText: 'تأیید',
  cancelText: 'لغو'
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

