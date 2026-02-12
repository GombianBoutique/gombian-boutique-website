// composables/useToast.js
import { reactive, computed, readonly } from 'vue'

// Global state for toasts
const state = reactive({
  toasts: []
})

const addToast = (title, message, type = 'success') => {
  const id = Date.now() + Math.random()
  const toast = {
    id,
    title,
    message,
    type // success, error, warning, info
  }

  state.toasts.push(toast)

  // Auto-remove toast after 5 seconds
  setTimeout(() => {
    removeToast(id)
  }, 5000)
}

const removeToast = (id) => {
  const index = state.toasts.findIndex(toast => toast.id === id)
  if (index !== -1) {
    state.toasts.splice(index, 1)
  }
}

export default function useToast() {
  return {
    toasts: computed(() => [...state.toasts]), // Create a new array to ensure reactivity
    addToast,
    removeToast
  }
}