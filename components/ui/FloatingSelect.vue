<template>
  <div class="relative" :class="wrapperClass">
    <select 
      :id="selectId"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      :class="[
        'w-full px-3 py-3 border border-gray-300 rounded-lg text-right text-gray-800 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-colors appearance-none bg-white',
        'h-14',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
        selectClass
      ]"
      @change="handleChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
      v-bind="$attrs"
    >
      <slot></slot>
    </select>
    <label 
      :for="selectId"
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
    <!-- Dropdown arrow icon -->
    <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-0">
      <Icon name="mdi:chevron-down" mode="svg" class="h-5 w-5 text-gray-400" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  label: string
  required?: boolean
  disabled?: boolean
  wrapperClass?: string
  selectClass?: string
  selectId?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  wrapperClass: '',
  selectClass: '',
  selectId: () => `select-${Math.random().toString(36).substr(2, 9)}`
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const isFocused = ref(false)
const hasValue = computed(() => {
  const value = props.modelValue
  return value !== null && value !== undefined && value !== '' && String(value).trim() !== ''
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

