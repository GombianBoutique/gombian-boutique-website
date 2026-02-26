<!-- components/Footer.vue -->
<!-- Merged Footer component - combines brand info, quick links, customer service, legal, and newsletter -->
<template>
  <footer class="bg-luxury-green text-white py-12 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand Info -->
        <div class="lg:col-span-1">
          <div class="flex items-center mb-4">
            <img src="/images/logos/logo.png" alt="Gombian Boutique Logo" class="h-16 w-auto mr-4">
          </div>
          <p class="mb-4 text-white dark:text-gray-300">
            Where the art of fragrance meets the luxury of villa-inspired perfumes.
            Experience our exclusive line of nature-inspired scents that transport and transform any space.
          </p>
          <div class="flex space-x-4">
            <a href="#" aria-label="Facebook" class="text-white hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.129 22 16.99 22 12z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" class="text-white hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter" class="text-white hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-serif-display mb-4 text-white dark:text-gray-200">Quick Links</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="hover:text-gold transition-colors duration-300 text-white dark:text-gray-300 dark:hover:text-gold">Home</NuxtLink></li>
            <li><NuxtLink to="/products" class="hover:text-gold transition-colors duration-300 text-white dark:text-gray-300 dark:hover:text-gold">Perfume Collection</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-gold transition-colors duration-300 text-white dark:text-gray-300 dark:hover:text-gold">About Us</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-gold transition-colors duration-300 text-white dark:text-gray-300 dark:hover:text-gold">Contact</NuxtLink></li>
            <li><NuxtLink to="/track-order" class="hover:text-gold transition-colors duration-300 text-white dark:text-gray-300 dark:hover:text-gold">Track Order</NuxtLink></li>
            <li><NuxtLink to="/policies" class="hover:text-gold transition-colors duration-300 text-white dark:text-gray-300 dark:hover:text-gold">Policies</NuxtLink></li>
          </ul>
        </div>

        <!-- Customer Service & Contact Info -->
        <div>
          <h3 class="text-xl font-serif-display mb-4 text-white dark:text-gray-200">Contact Info</h3>
          <address class="not-italic text-white dark:text-gray-300">
            <p class="mb-2">35B Mulder's Mile</p>
            <p class="mb-2">Eldoraigne, Centurion, 0157</p>
            <p class="mb-2">Email: gombianholdings@gmail.com</p>
            <p>Phone: 084 342 9374 | WhatsApp: 067 157 4157</p>
          </address>
        </div>

        <!-- Newsletter Section -->
        <div>
          <h3 class="text-xl font-serif-display mb-4 text-white dark:text-gray-200">Newsletter</h3>
          <p class="mb-4 text-white dark:text-gray-300">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form @submit.prevent="subscribeNewsletter" class="flex flex-col space-y-2">
            <input
              v-model="newsletterEmail"
              type="email"
              placeholder="Enter your email"
              required
              :disabled="subscribing"
              class="px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gold disabled:bg-gray-100"
            />
            
            <!-- GDPR Compliance Checkbox -->
            <div class="flex items-start">
              <input
                id="newsletter-gdpr"
                v-model="acceptPrivacyPolicy"
                type="checkbox"
                required
                :disabled="subscribing"
                class="mt-1 h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded disabled:opacity-50"
              />
              <label for="newsletter-gdpr" class="ml-2 text-xs text-white dark:text-gray-300">
                I agree to the processing of my personal data in accordance with the
                <NuxtLink to="/privacy" target="_blank" class="underline hover:text-gold">Privacy Policy</NuxtLink>.
                I can withdraw my consent at any time.
              </label>
            </div>
            
            <button
              type="submit"
              :disabled="subscribing || !acceptPrivacyPolicy"
              class="bg-gold text-luxury-green px-4 py-2 rounded-md hover:bg-gold/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium dark:bg-gold dark:text-luxury-green dark:hover:bg-gold/90"
            >
              {{ subscribing ? 'Subscribing...' : 'Subscribe' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Legal Links & Cookie Preferences -->
      <div class="border-t border-gold mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-white dark:text-gray-400 text-sm">
            <p>&copy; {{ new Date().getFullYear() }} Gombian Boutique. All rights reserved.</p>
          </div>
          <div class="flex flex-wrap justify-center gap-4 text-sm">
            <NuxtLink to="/terms" class="text-white hover:text-gold transition-colors duration-300 dark:text-gray-300 dark:hover:text-gold">Terms & Conditions</NuxtLink>
            <NuxtLink to="/privacy" class="text-white hover:text-gold transition-colors duration-300 dark:text-gray-300 dark:hover:text-gold">Privacy Policy</NuxtLink>
            <NuxtLink to="/cookies" class="text-white hover:text-gold transition-colors duration-300 dark:text-gray-300 dark:hover:text-gold">Cookie Policy</NuxtLink>
            <button
              @click="openCookiePreferences"
              class="text-white hover:text-gold transition-colors duration-300 dark:text-gray-300 dark:hover:text-gold"
            >
              Manage Cookie Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component with newsletter subscription and cookie consent
const { openPreferences } = useCookieConsent()
const toast = useToast()
const config = useRuntimeConfig()

const newsletterEmail = ref('')
const subscribing = ref(false)
const acceptPrivacyPolicy = ref(false)
const recaptchaToken = ref('')

// Get reCAPTCHA site key from config
const recaptchaSiteKey = config.public.recaptchaSiteKey

// Load reCAPTCHA script on mount
onMounted(() => {
  if (recaptchaSiteKey) {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }
})

const openCookiePreferences = () => {
  openPreferences()
}

const subscribeNewsletter = async () => {
  // Prevent double submission
  if (subscribing.value || !newsletterEmail.value || !acceptPrivacyPolicy.value) return

  subscribing.value = true

  try {
    // Execute reCAPTCHA v3
    if (recaptchaSiteKey && window.grecaptcha) {
      await new Promise((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(recaptchaSiteKey, {
            action: 'newsletter_subscribe'
          }).then((token) => {
            recaptchaToken.value = token
            resolve(true)
          }).catch((err) => {
            console.error('reCAPTCHA error:', err)
            reject(err)
          })
        })
      })
    }

    // Call API to subscribe
    await $fetch('/api/newsletter/subscribe', {
      method: 'POST',
      body: {
        email: newsletterEmail.value,
        acceptPrivacyPolicy: acceptPrivacyPolicy.value,
        recaptchaToken: recaptchaToken.value
      }
    })

    toast.success('Thank you for subscribing!', 'Newsletter')
    newsletterEmail.value = ''
    acceptPrivacyPolicy.value = false
    recaptchaToken.value = ''
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    // Handle specific error messages
    const errorMessage = error.data?.message || error.message || 'Failed to subscribe'
    
    if (error.statusCode === 429) {
      toast.error('Too many attempts. Please try again later.', 'Error')
    } else if (error.statusCode === 400 && errorMessage.includes('robot')) {
      toast.error('Verification failed. Please try again.', 'Error')
    } else {
      toast.error(errorMessage, 'Error')
    }
  } finally {
    subscribing.value = false
  }
}
</script>
