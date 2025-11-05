export const useAuth = () => {
  const user = useState<{ id: number; name: string; phone: string } | null>('user', () => null)
  const isLoading = ref(false)

  const fetchUser = async () => {
    isLoading.value = true
    try {
      const data = await $fetch('/api/auth/me')
      user.value = data as { id: number; name: string; phone: string }
      return data
    } catch (error) {
      user.value = null
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const login = async (phone: string, password: string) => {
    isLoading.value = true
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { phone, password },
      })
      await fetchUser()
      return response
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST',
      })
      user.value = null
      await navigateTo('/login')
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return {
    user: readonly(user),
    isLoading: readonly(isLoading),
    fetchUser,
    login,
    logout,
  }
}

