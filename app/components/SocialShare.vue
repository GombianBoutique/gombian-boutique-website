<!-- components/SocialShare.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
    <h3 class="text-lg font-bold text-luxury-green dark:text-white mb-4">Share this product</h3>
    <div class="flex flex-wrap gap-4">
      <button 
        @click="shareToFacebook"
        class="flex flex-col items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-24"
        aria-label="Share on Facebook"
      >
        <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.129 22 16.99 22 12z"/>
        </svg>
        <span class="text-xs">Facebook</span>
      </button>
      
      <button 
        @click="shareToTwitter"
        class="flex flex-col items-center justify-center p-4 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors w-24"
        aria-label="Share on Twitter"
      >
        <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
        </svg>
        <span class="text-xs">Twitter</span>
      </button>
      
      <button 
        @click="shareToPinterest"
        class="flex flex-col items-center justify-center p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-24"
        aria-label="Share on Pinterest"
      >
        <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12C24.007 5.367 18.641.001 12.017.001z"/>
        </svg>
        <span class="text-xs">Pinterest</span>
      </button>
      
      <button 
        @click="shareToLinkedIn"
        class="flex flex-col items-center justify-center p-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors w-24"
        aria-label="Share on LinkedIn"
      >
        <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
        <span class="text-xs">LinkedIn</span>
      </button>
      
      <button 
        @click="copyLink"
        class="flex flex-col items-center justify-center p-4 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors w-24"
        aria-label="Copy link"
      >
        <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span class="text-xs">Copy Link</span>
      </button>
    </div>
    
    <!-- Share Message -->
    <div class="mt-4 p-4 bg-luxury-green/10 dark:bg-gray-700 rounded-lg">
      <p class="text-sm text-luxury-green dark:text-gold">
        <span class="font-medium">Share this product:</span> {{ product.name }}
      </p>
      <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
        {{ product.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Get current URL
const currentUrl = computed(() => {
  if (process.client) {
    return window.location.href
  }
  return `https://gombianboutique.com/products/${props.product.id}`
})

// Share methods
const shareToFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl.value)}`
  window.open(url, '_blank', 'width=600,height=400')
}

const shareToTwitter = () => {
  const text = `Check out this amazing product: ${props.product.name}`
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl.value)}`
  window.open(url, '_blank', 'width=600,height=400')
}

const shareToPinterest = () => {
  const media = props.product.images[0].startsWith('http') 
    ? props.product.images[0] 
    : `https://gombianboutique.com${props.product.images[0]}`
  const description = encodeURIComponent(`Check out this amazing product: ${props.product.name}`)
  const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl.value)}&media=${encodeURIComponent(media)}&description=${description}`
  window.open(url, '_blank', 'width=600,height=400')
}

const shareToLinkedIn = () => {
  const title = encodeURIComponent(props.product.name)
  const summary = encodeURIComponent(props.product.description)
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl.value)}&title=${title}&summary=${summary}`
  window.open(url, '_blank', 'width=600,height=400')
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl.value)
    const toast = useToast()
    toast.success('Link copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy link: ', err)
    const toast = useToast()
    toast.error('Failed to copy link')
  }
}
</script>