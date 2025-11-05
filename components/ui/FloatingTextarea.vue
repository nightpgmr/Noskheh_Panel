<template>
  <div class="relative" :class="wrapperClass">
    <textarea 
      :id="textareaId"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      :placeholder="placeholder"
      :rows="rows"
      :class="[
        'w-full px-3 py-3 border border-gray-300 rounded-lg text-right text-gray-800 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-colors resize-none',
        'min-h-[100px]',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
        textareaClass
      ]"
      @input="handleInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
      v-bind="$attrs"
    ></textarea>
    <label 
      :for="textareaId"
      :class="[
        'absolute transition-all duration-200 pointer-events-none z-10',
        hasValue || isFocused 
          ? 'top-0 right-3 -translate-y-1/2 text-xs text-purple-600 bg-white px-2' 
          : 'top-3 right-3 text-gray-500'
      ]"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  label: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  wrapperClass?: string
  textareaClass?: string
  textareaId?: string
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  placeholder: '',
  wrapperClass: '',
  textareaClass: '',
  rows: 4,
  textareaId: () => `textarea-${Math.random().toString(36).substr(2, 9)}`
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isFocused = ref(false)
const hasValue = computed(() => {
  const value = props.modelValue
  return value !== null && value !== undefined && String(value).trim() !== ''
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

