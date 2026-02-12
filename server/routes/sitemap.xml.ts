import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const hostname = event.node.req.headers.host
    ? `https://${event.node.req.headers.host}`
    : 'https://gombianboutique.com'

  const urls = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/products', priority: '0.9', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/policies', priority: '0.7', changefreq: 'monthly' }
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${hostname}${url.url}</loc>
    <priority>${url.priority}</priority>
    <changefreq>${url.changefreq}</changefreq>
  </url>`).join('')}
</urlset>`

  event.node.res.setHeader('Content-Type', 'application/xml')
  return xml
})