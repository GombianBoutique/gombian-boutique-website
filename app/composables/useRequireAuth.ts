// composables/useRequireAuth.ts
import { useAuth } from './useAuth'

export const useRequireAuth = (autoCheck = true) => {
  const { isAuthenticated, checkAuth } = useAuth()
  const router = useRouter()
  const route = useRoute()

  const isAuthChecked = ref(false)

  // Check auth on mount
  const performAuthCheck = async () => {
    await checkAuth()
    isAuthChecked.value = true

    // Redirect if not authenticated
    if (!isAuthenticated.value) {
      const redirectPath = encodeURIComponent(route.path)
      await router.push(`/login?redirect=${redirectPath}`)
    }
  }

  if (autoCheck) {
    onMounted(performAuthCheck)
  }

  return {
    isAuthenticated,
    isAuthChecked,
    performAuthCheck
  }
}
