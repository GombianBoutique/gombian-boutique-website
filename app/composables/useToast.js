// composables/useToast.js
import { reactive, computed } from 'vue'

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

// Convenience methods
const success = (message, title = 'Success') => {
  addToast(title, message, 'success')
}

const error = (message, title = 'Error') => {
  addToast(title, message, 'error')
}

const warning = (message, title = 'Warning') => {
  addToast(title, message, 'warning')
}

const info = (message, title = 'Info') => {
  addToast(title, message, 'info')
}

export default function useToast() {
  return {
    toasts: computed(() => [...state.toasts]),
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  }
}