<template>
  <div class="relative" :class="wrapperClass">
    <input 
      :id="inputId"
      :value="modelValue"
      :type="type"
      :required="required"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="[
        'w-full px-3 py-3 border border-gray-300 rounded-lg text-right text-gray-800 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-colors',
        'h-14',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
        inputClass
      ]"
      @input="handleInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
      v-bind="$attrs"
    />
    <label 
      :for="inputId"
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
  modelValue: string | number
  label: string
  type?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  wrapperClass?: string
  inputClass?: string
  inputId?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  placeholder: '',
  wrapperClass: '',
  inputClass: '',
  inputId: () => `input-${Math.random().toString(36).substr(2, 9)}`
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const isFocused = ref(false)
const hasValue = computed(() => {
  const value = props.modelValue
  if (value === null || value === undefined) return false
  if (typeof value === 'number') {
    // For number inputs, 0 is considered "no value" for label floating
    if (props.type === 'number' && value === 0) return false
    return true
  }
  return String(value).trim() !== ''
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value: string | number = target.value
  if (props.type === 'number') {
    value = target.value === '' ? 0 : Number(target.value) || 0
  }
  emit('update:modelValue', value)
}
</script>

