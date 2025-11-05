<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" @click.self="handleClose">
    <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold text-gray-800 text-right">
          {{ isEditMode ? 'ویرایش دارو' : 'افزودن دارو جدید' }}
        </h3>
        <button
          @click="handleClose"
          class="text-gray-400 hover:text-gray-600"
        >
          <Icon name="mdi:close" mode="svg" class="h-6 w-6" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Name -->
          <FloatingInput
            v-model="formData.name"
            label="نام دارو"
            type="text"
            required
          />

          <!-- Name (English) -->
          <FloatingInput
            v-model="formData.nameEn"
            label="نام انگلیسی"
            type="text"
          />

          <!-- Dosage -->
          <FloatingInput
            v-model="formData.dosage"
            label="دوز مصرف"
            type="text"
            required
          />

          <!-- Duration -->
          <FloatingInput
            v-model="formData.duration"
            label="مدت مصرف"
            type="text"
          />

          <!-- Manufacturer -->
          <FloatingInput
            v-model="formData.manufacturer"
            label="شرکت سازنده"
            type="text"
            required
          />

          <!-- Quantity Per Package -->
          <FloatingInput
            v-model="formData.quantityPerPackage"
            label="تعداد در بسته"
            type="number"
            required
          />

          <!-- Status -->
          <FloatingSelect
            v-model="formData.status"
            label="وضعیت"
            required
          >
            <option value="فعال">فعال</option>
            <option value="غیرفعال">غیرفعال</option>
            <option value="تمام شده">تمام شده</option>
          </FloatingSelect>

          <!-- Image URL -->
          <FloatingInput
            v-model="formData.imageUrl"
            label="آدرس تصویر"
            type="text"
          />
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4 space-x-reverse mt-6">
          <button
            type="button"
            @click="handleClose"
            class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            لغو
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition-colors disabled:opacity-50"
          >
            {{ isSubmitting ? 'در حال ذخیره...' : (isEditMode ? 'ذخیره تغییرات' : 'افزودن') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Medication, CreateMedicationDto, MedicationStatus } from '~/types/medication'

interface Props {
  isOpen: boolean
  medication?: Medication | null
}

const props = withDefaults(defineProps<Props>(), {
  medication: null
})

const emit = defineEmits<{
  close: []
  submit: [data: CreateMedicationDto]
}>()

const isEditMode = computed(() => !!props.medication)

const formData = ref<CreateMedicationDto & { nameEn?: string; duration?: string }>({
  name: '',
  nameEn: '',
  dosage: '',
  duration: '',
  status: 'فعال' as MedicationStatus,
  manufacturer: '',
  quantityPerPackage: 0,
  imageUrl: ''
})

const isSubmitting = ref(false)
const error = ref<string | null>(null)

// Define resetForm before it's used in watch
const resetForm = () => {
  formData.value = {
    name: '',
    nameEn: '',
    dosage: '',
    duration: '',
    status: 'فعال' as MedicationStatus,
    manufacturer: '',
    quantityPerPackage: 0,
    imageUrl: ''
  }
}

// Initialize form when medication changes
watch(() => props.medication, (medication) => {
  if (medication) {
    formData.value = {
      name: medication.name,
      nameEn: medication.nameEn || '',
      dosage: medication.dosage,
      duration: medication.duration || '',
      status: medication.status,
      manufacturer: medication.manufacturer,
      quantityPerPackage: medication.quantityPerPackage,
      imageUrl: medication.imageUrl || ''
    }
  } else {
    resetForm()
  }
}, { immediate: true })

// Reset form when dialog closes
watch(() => props.isOpen, (isOpen) => {
  if (!isOpen) {
    resetForm()
    error.value = null
  }
})

const handleClose = () => {
  emit('close')
}

const handleSubmit = async () => {
  error.value = null
  isSubmitting.value = true

  try {
    const submitData: CreateMedicationDto = {
      name: formData.value.name,
      dosage: formData.value.dosage,
      status: formData.value.status,
      manufacturer: formData.value.manufacturer,
      quantityPerPackage: formData.value.quantityPerPackage,
      ...(formData.value.imageUrl && { imageUrl: formData.value.imageUrl }),
      ...(formData.value.duration && { duration: formData.value.duration }),
      ...(formData.value.nameEn && { nameEn: formData.value.nameEn })
    }

    emit('submit', submitData)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'خطا در ذخیره اطلاعات'
  } finally {
    isSubmitting.value = false
  }
}
</script>

