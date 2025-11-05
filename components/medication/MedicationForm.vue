<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" @click.self="handleClose">
    <div class="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold text-gray-800 text-right">
          {{ isEditMode ? 'ویرایش دارو' : 'افزودن دارو جدید' }}
        </h3>
        <button
          @click="handleClose"
          class="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="بستن"
        >
          <Icon name="mdi:close" mode="svg" class="h-6 w-6" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Basic Information Section -->
        <div class="space-y-4">
          <h4 class="text-lg font-medium text-gray-700 mb-4 border-b border-gray-200 pb-2">
            اطلاعات پایه
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Name -->
            <div class="relative">
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                placeholder=" "
                @focus="setFocus('name')"
                @blur="removeFocus('name')"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg text-right text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-colors h-14 bg-white"
              />
              <label
                for="name"
                class="absolute right-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none"
                :class="formData.name || isFocused('name') ? 'top-0 right-3 -translate-y-1/2 text-xs text-purple-600 bg-white px-2' : ''"
              >
                نام دارو <span class="text-red-500">*</span>
              </label>
            </div>

            <!-- Name (English) -->
            <div class="relative">
              <input
                id="nameEn"
                v-model="formData.nameEn"
                type="text"
                placeholder=" "
                @focus="setFocus('nameEn')"
                @blur="removeFocus('nameEn')"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg text-right text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-colors h-14 bg-white"
              />
              <label
                for="nameEn"
                class="absolute right-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none"
                :class="formData.nameEn || isFocused('nameEn') ? 'top-0 right-3 -translate-y-1/2 text-xs text-purple-600 bg-white px-2' : ''"
              >
                نام انگلیسی
              </label>
            </div>
          </div>
        </div>

        <!-- Dosage and Duration Section -->
        <div class="space-y-4">
          <h4 class="text-lg font-medium text-gray-700 mb-4 border-b border-gray-200 pb-2">
            اطلاعات مصرف
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Dosage -->
            <div class="relative">
              <input
                id="dosage"
                v-model="formData.dosage"
                type="text"
                required
                placeholder=" "
                @focus="setFocus('dosage')"
                @blur="removeFocus('dosage')"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg text-right text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-colors h-14 bg-white"
              />
              <label
                for="dosage"
                class="absolute right-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none"
                :class="formData.dosage || isFocused('dosage') ? 'top-0 right-3 -translate-y-1/2 text-xs text-purple-600 bg-white px-2' : ''"
              >
                دوز مصرف <span class="text-red-500">*</span>
              </label>
            </div>

            <!-- Duration -->
            <div class="relative">
              <input
                id="duration"
                v-model="formData.duration"
                type="text"
                placeholder=" "
                @focus="setFocus('duration')"
                @blur="removeFocus('duration')"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg text-right text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-colors h-14 bg-white"
              />
              <label
                for="duration"
                class="absolute right-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none"
                :class="formData.duration || isFocused('duration') ? 'top-0 right-3 -translate-y-1/2 text-xs text-purple-600 bg-white px-2' : ''"
              >
                مدت مصرف
              </label>
            </div>
          </div>
        </div>

        <!-- Manufacturer and Quantity Section -->
        <div class="space-y-4">
          <h4 class="text-lg font-medium text-gray-700 mb-4 border-b border-gray-200 pb-2">
            اطلاعات ساخت و بسته‌بندی
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Manufacturer -->
            <div class="relative">
              <input
                id="manufacturer"
                v-model="formData.manufacturer"
                type="text"
                required
                placeholder=" "
                @focus="setFocus('manufacturer')"
                @blur="removeFocus('manufacturer')"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg text-right text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-colors h-14 bg-white"
              />
              <label
                for="manufacturer"
                class="absolute right-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none"
                :class="formData.manufacturer || isFocused('manufacturer') ? 'top-0 right-3 -translate-y-1/2 text-xs text-purple-600 bg-white px-2' : ''"
              >
                شرکت سازنده <span class="text-red-500">*</span>
              </label>
            </div>

            <!-- Quantity Per Package -->
            <div class="relative">
              <input
                id="quantityPerPackage"
                v-model="formData.quantityPerPackage"
                type="number"
                required
                placeholder=" "
                @focus="setFocus('quantityPerPackage')"
                @blur="removeFocus('quantityPerPackage')"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg text-right text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-colors h-14 bg-white"
              />
              <label
                for="quantityPerPackage"
                class="absolute right-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none"
                :class="(formData.quantityPerPackage && formData.quantityPerPackage !== '' && formData.quantityPerPackage !== 0) || isFocused('quantityPerPackage') ? 'top-0 right-3 -translate-y-1/2 text-xs text-purple-600 bg-white px-2' : ''"
              >
                تعداد در بسته <span class="text-red-500">*</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Status and Image Section -->
        <div class="space-y-4">
          <h4 class="text-lg font-medium text-gray-700 mb-4 border-b border-gray-200 pb-2">
            وضعیت و تصویر
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Status -->
            <div class="relative">
              <select
                id="status"
                v-model="formData.status"
                required
                @focus="setFocus('status')"
                @blur="removeFocus('status')"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg text-right text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-colors h-14 bg-white appearance-none cursor-pointer"
              >
                <option value="فعال">فعال</option>
                <option value="غیرفعال">غیرفعال</option>
                <option value="تمام شده">تمام شده</option>
              </select>
              <label
                for="status"
                class="absolute right-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none"
                :class="formData.status || isFocused('status') ? 'top-0 right-3 -translate-y-1/2 text-xs text-purple-600 bg-white px-2' : ''"
              >
                وضعیت <span class="text-red-500">*</span>
              </label>
              <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-0">
                <Icon name="mdi:chevron-down" mode="svg" class="h-5 w-5 text-gray-400" />
              </div>
            </div>

            <!-- Image URL / Upload -->
            <div class="space-y-3">
              <!-- Upload Button -->
              <div class="flex items-center gap-3">
                <label
                  for="imageUpload"
                  class="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 cursor-pointer transition-colors text-sm font-medium"
                >
                  <Icon name="mdi:upload" mode="svg" class="h-5 w-5" />
                  آپلود تصویر
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  class="hidden"
                  @change="handleImageUpload"
                />
                <span v-if="isUploading" class="text-sm text-gray-500 flex items-center gap-2">
                  <Icon name="mdi:loading" mode="svg" class="h-4 w-4 animate-spin" />
                  در حال آپلود...
                </span>
              </div>
              
              <!-- Image Preview -->
              <div v-if="imagePreview" class="relative w-full h-32 border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
                <img :src="imagePreview" alt="Preview" class="w-full h-full object-cover" />
                <button
                  type="button"
                  @click="clearImagePreview"
                  class="absolute top-2 left-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="حذف تصویر"
                >
                  <Icon name="mdi:close" mode="svg" class="h-4 w-4" />
                </button>
              </div>

              <!-- Image URL Input -->
              <div class="relative">
                <input
                  id="imageUrl"
                  v-model="formData.imageUrl"
                  type="text"
                  placeholder=" "
                  @focus="setFocus('imageUrl')"
                  @blur="removeFocus('imageUrl')"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg text-right text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-colors h-14 bg-white"
                />
                <label
                  for="imageUrl"
                  class="absolute right-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none"
                  :class="formData.imageUrl || isFocused('imageUrl') ? 'top-0 right-3 -translate-y-1/2 text-xs text-purple-600 bg-white px-2' : ''"
                >
                  یا آدرس تصویر (مثال: /images/daro.jpg)
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {{ error }}
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="handleClose"
            class="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            لغو
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2.5 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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

interface FormData {
  name: string
  nameEn: string
  dosage: string
  duration: string
  status: MedicationStatus
  manufacturer: string
  quantityPerPackage: number | string
  imageUrl: string
}

const formData = ref<FormData>({
  name: '',
  nameEn: '',
  dosage: '',
  duration: '',
  status: 'فعال' as MedicationStatus,
  manufacturer: '',
  quantityPerPackage: '',
  imageUrl: ''
})

const isSubmitting = ref(false)
const error = ref<string | null>(null)
const isUploading = ref(false)
const imagePreview = ref<string | null>(null)

// Focus states for floating labels
const focusedFields = ref<Set<string>>(new Set())
const setFocus = (field: string) => focusedFields.value.add(field)
const removeFocus = (field: string) => focusedFields.value.delete(field)
const isFocused = (field: string) => focusedFields.value.has(field)

// Define resetForm before it's used in watch
const resetForm = () => {
  formData.value = {
    name: '',
    nameEn: '',
    dosage: '',
    duration: '',
    status: 'فعال' as MedicationStatus,
    manufacturer: '',
    quantityPerPackage: '',
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
      quantityPerPackage: medication.quantityPerPackage || '',
      imageUrl: medication.imageUrl || ''
    }
    // Set preview if image URL exists (use full URL for external images or relative path for local)
    if (medication.imageUrl) {
      imagePreview.value = medication.imageUrl.startsWith('http') 
        ? medication.imageUrl 
        : medication.imageUrl
    } else {
      imagePreview.value = null
    }
  } else {
    resetForm()
    imagePreview.value = null
  }
}, { immediate: true })

// Reset form when dialog closes
watch(() => props.isOpen, (isOpen) => {
  if (!isOpen) {
    resetForm()
    error.value = null
    imagePreview.value = null
  }
})

// Handle image upload
const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) {
    return
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    error.value = 'نوع فایل نامعتبر است. فقط تصاویر JPEG، PNG، GIF و WebP مجاز هستند.'
    return
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    error.value = 'حجم فایل بیشتر از ۵ مگابایت است.'
    return
  }

  // Show preview immediately
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)

  // Upload file
  isUploading.value = true
  error.value = null

  try {
    const uploadFormData = new FormData()
    uploadFormData.append('image', file)

    const response = await $fetch('/api/upload/image', {
      method: 'POST',
      body: uploadFormData,
    })

    if (response.success) {
      // Set the uploaded image path
      formData.value.imageUrl = response.path
      imagePreview.value = response.path
    }
  } catch (err: any) {
    error.value = err.data?.message || 'خطا در آپلود تصویر'
    imagePreview.value = null
  } finally {
    isUploading.value = false
    // Reset file input
    target.value = ''
  }
}

// Clear image preview
const clearImagePreview = () => {
  imagePreview.value = null
  formData.value.imageUrl = ''
}

const handleClose = () => {
  emit('close')
}

const handleSubmit = async () => {
  error.value = null
  isSubmitting.value = true

  try {
    // Convert quantityPerPackage to number
    const quantity = typeof formData.value.quantityPerPackage === 'string' 
      ? (formData.value.quantityPerPackage === '' ? 0 : Number(formData.value.quantityPerPackage))
      : formData.value.quantityPerPackage || 0

    const submitData: CreateMedicationDto = {
      name: formData.value.name.trim(),
      dosage: formData.value.dosage.trim(),
      status: formData.value.status,
      manufacturer: formData.value.manufacturer.trim(),
      quantityPerPackage: quantity,
    }

    // Add optional fields if they have values
    if (formData.value.imageUrl?.trim()) {
      // Remove trailing slashes from image URL
      submitData.imageUrl = formData.value.imageUrl.trim().replace(/\/+$/, '')
    }
    if (formData.value.duration?.trim()) {
      submitData.duration = formData.value.duration.trim()
    }
    if (formData.value.nameEn?.trim()) {
      submitData.nameEn = formData.value.nameEn.trim()
    }

    emit('submit', submitData)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'خطا در ذخیره اطلاعات'
  } finally {
    isSubmitting.value = false
  }
}
</script>

