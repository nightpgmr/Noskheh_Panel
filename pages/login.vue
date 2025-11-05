<template>
  <div class="min-h-screen flex items-center justify-center app-bg">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <img src="/images/logo.png" alt="logo" class="h-24 mx-auto mb-4" />
        <h1 class="text-2xl font-bold text-gray-800 mb-2">ورود به سیستم</h1>
        <p class="text-gray-500">Login to System</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <UiFloatingInput
            v-model="form.phone"
            label="شماره تلفن"
            english-label="Phone Number"
            type="tel"
            required
            :error="errors.phone"
          />
        </div>

        <div>
          <UiFloatingInput
            v-model="form.password"
            label="رمز عبور"
            english-label="Password"
            type="password"
            required
            :error="errors.password"
          />
        </div>

        <UiErrorMessage v-if="error" :message="error" />

        <UiButton
          type="submit"
          :loading="isLoading"
          class="w-full"
        >
          ورود / Login
        </UiButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'guest'
})

const form = reactive({
  phone: '',
  password: '',
})

const errors = reactive({
  phone: '',
  password: '',
})

const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  // Reset errors
  errors.phone = ''
  errors.password = ''
  error.value = ''

  // Validate
  if (!form.phone) {
    errors.phone = 'شماره تلفن الزامی است'
    return
  }

  if (!form.password) {
    errors.password = 'رمز عبور الزامی است'
    return
  }

  isLoading.value = true

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        phone: form.phone,
        password: form.password,
      },
    })

    if (response.success) {
      // Refresh to update user state
      await navigateTo('/')
    }
  } catch (err: any) {
    error.value = err.data?.message || 'خطا در ورود به سیستم'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.app-bg {
  background: linear-gradient(210deg, #D7D3FE 0%, #E7F3FC 35%, #F5F3FF 40%, #F7F6FA 75%, #DCF1FD 85%, #D7D3FE 100%);
}
</style>

