export default defineNuxtRouteMiddleware(async (to, from) => {
  // Check if user is already logged in
  const { data: user } = await useFetch('/api/auth/me')
  if (user.value) {
    return navigateTo('/')
  }
})

