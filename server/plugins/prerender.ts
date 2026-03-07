// server/plugins/prerender.ts
// Add dynamic routes for static site generation

import { defineNitroPlugin } from '#imports'
import { products } from '../data/products'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('prerender:routes', (ctx) => {
    // Generate product detail pages
    const productRoutes = products.map(p => `/products/${p.id}`)
    
    // Generate collection pages
    const categories = [...new Set(products.map(p => p.category))]
    const collectionRoutes = categories.map(c => `/collections/${c}`)
    
    // Add dynamic routes
    console.log('[Prerender] Adding dynamic routes:', [...productRoutes, ...collectionRoutes])
    for (const route of [...productRoutes, ...collectionRoutes]) {
      ctx.routes.add(route)
    }
    console.log('[Prerender] Total routes to prerender:', ctx.routes.size)
  })
})
