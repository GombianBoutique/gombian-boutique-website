<!-- pages/cookies.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
          Cookie Policy
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          <strong>Last Updated:</strong> January 21, 2026
        </p>
      </div>

      <!-- Content -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-8">
        <!-- What Are Cookies -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
            1. What Are Cookies?
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you 
            visit a website. They help websites remember your actions and preferences over time, providing a better 
            browsing experience.
          </p>
        </section>

        <!-- Types of Cookies -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
            2. Types of Cookies We Use
          </h2>

          <div class="space-y-6">
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 class="text-xl font-bold text-luxury-green dark:text-white mb-2">
                Essential Cookies
              </h3>
              <p class="text-gray-700 dark:text-gray-300">
                These cookies are necessary for the website to function properly. They enable basic functions like 
                page navigation, secure access, and shopping cart functionality. Without these cookies, the website 
                cannot function properly.
              </p>
            </div>

            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 class="text-xl font-bold text-luxury-green dark:text-white mb-2">
                Performance Cookies
              </h3>
              <p class="text-gray-700 dark:text-gray-300">
                These cookies help us understand how visitors interact with our website by collecting anonymous 
                information about pages visited, time spent, and errors encountered. This helps us improve website 
                performance.
              </p>
            </div>

            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 class="text-xl font-bold text-luxury-green dark:text-white mb-2">
                Functional Cookies
              </h3>
              <p class="text-gray-700 dark:text-gray-300">
                These cookies remember your choices (such as language preference, region, or login information) to 
                provide enhanced, personalized features.
              </p>
            </div>

            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 class="text-xl font-bold text-luxury-green dark:text-white mb-2">
                Marketing Cookies
              </h3>
              <p class="text-gray-700 dark:text-gray-300">
                These cookies track your browsing habits to deliver relevant advertisements. They are usually placed 
                by advertising networks with our permission.
              </p>
            </div>
          </div>
        </section>

        <!-- Specific Cookies -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
            3. Specific Cookies We Use
          </h2>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="py-3 text-luxury-green dark:text-gold">Cookie Name</th>
                  <th class="py-3 text-luxury-green dark:text-gold">Purpose</th>
                  <th class="py-3 text-luxury-green dark:text-gold">Duration</th>
                </tr>
              </thead>
              <tbody class="text-gray-700 dark:text-gray-300">
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 font-mono text-sm">session_id</td>
                  <td class="py-3">Maintains user session</td>
                  <td class="py-3">Session</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 font-mono text-sm">cart_items</td>
                  <td class="py-3">Stores shopping cart contents</td>
                  <td class="py-3">30 days</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 font-mono text-sm">user_preferences</td>
                  <td class="py-3">Remembers user preferences</td>
                  <td class="py-3">1 year</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 font-mono text-sm">_ga</td>
                  <td class="py-3">Google Analytics tracking</td>
                  <td class="py-3">2 years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Managing Cookies -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
            4. Managing Your Cookie Preferences
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            You can control and manage cookies in various ways:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or accept cookies, delete existing cookies, or receive alerts when cookies are set</li>
            <li><strong>Cookie Consent Tool:</strong> Use our cookie consent banner to customize your preferences</li>
            <li><strong>Incognito/Private Mode:</strong> Browse in private mode to prevent cookies from being stored</li>
          </ul>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Please note that disabling certain cookies may affect the functionality of our website.
          </p>
        </section>

        <!-- Third-Party Cookies -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
            5. Third-Party Cookies
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            We use services from trusted third parties that may set cookies on your device:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
            <li><strong>Payment Processors:</strong> For secure payment processing (Stripe, PayPal)</li>
            <li><strong>Social Media:</strong> For social sharing functionality</li>
          </ul>
        </section>

        <!-- Updates -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
            6. Updates to This Policy
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for legal 
            reasons. We encourage you to review this policy periodically.
          </p>
        </section>

        <!-- Contact -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
            7. Contact Us
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            For questions about our use of cookies, please contact us at:
          </p>
          <div class="mt-4 p-4 bg-luxury-green/10 dark:bg-luxury-green/20 rounded-lg">
            <p class="text-gray-700 dark:text-gray-300">
              <strong>Email:</strong> <a href="mailto:privacy@gombianboutique.com" class="text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green underline">privacy@gombianboutique.com</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Cookie Policy - Gombian Boutique',
  meta: [
    {
      name: 'description',
      content: 'Learn about how Gombian Boutique uses cookies on our website and how you can manage your cookie preferences.'
    }
  ]
})
</script>
