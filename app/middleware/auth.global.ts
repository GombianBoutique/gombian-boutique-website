// middleware/auth.global.ts
// Global auth middleware disabled - using page-level auth checks instead
// See: composables/useRequireAuth.ts for auth logic

export default defineNuxtRouteMiddleware(() => {
  // No-op middleware
  // Auth checks are now handled at the page level for better layout control
})
