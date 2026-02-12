<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-serif-display font-bold text-luxury-green mb-8 text-center dark:text-gold">Contact Us</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      <div>
        <h2 class="text-2xl font-serif-display font-bold text-luxury-green mb-6">Get in Touch</h2>
        
        <div class="space-y-6 mb-10">
          <div class="flex items-start">
            <div class="mr-4 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-luxury-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-luxury-green">Phone</h3>
              <p class="text-neutral-dark">084 342 9374</p>
              <p class="text-neutral-dark">WhatsApp: 067 157 4157</p>
              <p class="text-sm text-neutral-dark">Monday-Friday, 9am-6pm</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="mr-4 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-luxury-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-luxury-green">Email</h3>
              <p class="text-neutral-dark">gombianholdings@gmail.com</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="mr-4 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-luxury-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-luxury-green">Address</h3>
              <p class="text-neutral-dark">35B Mulder's Mile</p>
              <p class="text-neutral-dark">Eldoraigne, Centurion, 0157</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="mr-4 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-luxury-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-luxury-green">Business Hours</h3>
              <p class="text-neutral-dark">Monday-Friday: 10am-7pm</p>
              <p class="text-neutral-dark">Saturday: 10am-6pm</p>
              <p class="text-neutral-dark">Sunday: Closed</p>
            </div>
          </div>
        </div>
        
        <div class="bg-neutral-light p-6 rounded-lg">
          <h3 class="text-xl font-serif-display font-bold text-luxury-green mb-4">Visit Our Boutique</h3>
          <p class="mb-4">Experience our collection in person at our elegant boutique in the heart of Paris. Our fragrance consultants are available to help you discover your perfect scent.</p>
          <p>For an exclusive private consultation, please call ahead to schedule an appointment.</p>
        </div>

        <div class="mt-8 bg-neutral-light p-6 rounded-lg">
          <h3 class="text-xl font-serif-display font-bold text-luxury-green mb-4">Business Information</h3>
          <p class="mb-2"><strong>Gombian Boutique Perfume Store</strong></p>
          <p class="mb-2">Specializing in luxury fragrances since 2026</p>
          <p class="mb-2">Regulated by international perfume industry standards</p>
          <p class="mb-2">Member of the International Fragrance Association (IFRA)</p>
        </div>
      </div>
      
      <div>
        <h2 class="text-2xl font-serif-display font-bold text-luxury-green mb-6">Send Us a Message</h2>
        
        <form class="space-y-6">
          <div>
            <label for="name" class="block text-luxury-green font-medium mb-2">Name</label>
            <input 
              type="text" 
              id="name" 
              class="w-full px-4 py-2 border border-neutral-dark rounded focus:outline-none focus:ring-2 focus:ring-luxury-green"
              placeholder="Your name"
            >
          </div>
          
          <div>
            <label for="email" class="block text-luxury-green font-medium mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              class="w-full px-4 py-2 border border-neutral-dark rounded focus:outline-none focus:ring-2 focus:ring-luxury-green"
              placeholder="Your email"
            >
          </div>
          
          <div>
            <label for="subject" class="block text-luxury-green font-medium mb-2">Subject</label>
            <input 
              type="text" 
              id="subject" 
              class="w-full px-4 py-2 border border-neutral-dark rounded focus:outline-none focus:ring-2 focus:ring-luxury-green"
              placeholder="Subject"
            >
          </div>
          
          <div>
            <label for="message" class="block text-luxury-green font-medium mb-2">Message</label>
            <textarea 
              id="message" 
              rows="5"
              class="w-full px-4 py-2 border border-neutral-dark rounded focus:outline-none focus:ring-2 focus:ring-luxury-green"
              placeholder="Your message"
            ></textarea>
          </div>
          
          <button type="submit" class="luxury-button w-full">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Contact Us - Gombian Boutique',
  meta: [
    {
      name: 'description',
      content: 'Contact Gombian Boutique - where the art of fragrance meets the luxury of villa-inspired fragrances. Reach out for inquiries about our nature-inspired scents and exclusive perfume collection. Phone: 084 342 9374, WhatsApp: 067 157 4157, Email: gombianholdings@gmail.com'
    }
  ]
})
</script>