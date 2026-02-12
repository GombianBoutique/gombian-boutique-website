<!-- components/ui/Button.vue -->
<template>
  <component
    :is="to ? 'NuxtLink' : 'button'"
    :to="to"
    :href="to"
    :type="!to ? type : undefined"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none',
      sizeClasses[size],
      variantClasses[variant],
      className
    ]"
    v-bind="$attrs"
  >
    <span v-if="loading" class="mr-2 h-4 w-4 animate-spin">
      <svg class="h-full w-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 0a6 6 0 016-6v4a8 8 0 00-8 8h4z"></path>
      </svg>
    </span>
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  to?: string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false
})

const variantClasses = {
  primary: 'bg-luxury-green text-white hover:bg-opacity-90',
  secondary: 'bg-gold text-luxury-green hover:bg-luxury-green hover:text-white',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
}

const sizeClasses = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 py-2 px-4 text-base',
  lg: 'h-12 px-8 text-lg'
}
</script>