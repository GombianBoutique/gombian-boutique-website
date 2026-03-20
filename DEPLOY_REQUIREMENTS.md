Below is a Markdown file that outlines the necessary configuration changes and steps to prepare your existing Nuxt 4 application for deployment on Netlify. Save it as `NETLIFY_DEPLOYMENT.md` in your project root.

```markdown
# Netlify Deployment Requirements for Nuxt 4

This document lists the changes and configurations required to deploy your Nuxt 4 application (with dynamic routes) on Netlify. Follow each step to ensure a successful deployment.

---

## 1. Configure Nitro Preset

In `nuxt.config.ts`, set the Nitro preset to `netlify`. This ensures the build output is compatible with Netlify Functions and static hosting.

```typescript
export default defineNuxtConfig({
  nitro: {
    preset: "netlify"
  }
})
```

---

## 2. Handle Dynamic Routes

### Option A: Server‑Side Rendering (SSR) – Recommended for dynamic content
- No additional configuration needed. Dynamic routes are resolved on the server at request time.
- Set `ssr: true` (default) in `nuxt.config.ts`.

### Option B: Static Generation (SSG) with Fallback
If you prefer static hosting but still need unknown dynamic routes:

- In `nuxt.config.ts`, add:
  ```typescript
  export default defineNuxtConfig({
    // ... existing config
    generate: {
      fallback: true   // creates 404.html as SPA fallback
    }
  })
  ```
- Pre‑render known dynamic routes using `prerender.routes` (if you have a list of dynamic slugs):
  ```typescript
  nitro: {
    prerender: {
      routes: async () => {
        const posts = await fetch('https://your-cms.com/posts').then(r => r.json())
        return posts.map(post => `/blog/${post.slug}`)
      }
    }
  }
  ```

---

## 3. (Optional) Use `@nuxtjs/netlify` Module

This module generates `_redirects` and `_headers` files automatically. Install it:

```bash
npm install -D @nuxtjs/netlify
```

Add it to your modules in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@nuxtjs/netlify'],
  netlify: {
    redirects: [
      // Example: redirect old path
      { from: '/old', to: '/new', status: 301 }
    ],
    headers: [
      // Example: security headers
      { for: '/*', values: { 'X-Frame-Options': 'DENY' } }
    ]
  }
})
```

---

## 4. Build and Publish Settings

| Mode          | Build Command   | Publish Directory |
|---------------|-----------------|-------------------|
| **SSR**       | `npm run build` | `dist`            |
| **SSG**       | `npm run generate` | `dist`          |

Set these in your Netlify dashboard under **Site settings → Build & deploy**.

---

## 5. Environment Variables

Define any required environment variables in the Netlify UI (under **Site settings → Environment variables**).  
In your Nuxt app, access them via `useRuntimeConfig()`.

Example `.env` (local development):
```
NUXT_PUBLIC_API_BASE=https://api.example.com
NUXT_SECRET_KEY=my-secret
```

In `nuxt.config.ts`:
```typescript
runtimeConfig: {
  public: {
    apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://default-api.com'
  },
  secretKey: process.env.NUXT_SECRET_KEY
}
```

---

## 6. Netlify Configuration File (Optional)

Create a `netlify.toml` file in the root for additional settings (e.g., functions, branch deploys, environment variables). Minimal example:

```toml
[build]
  command = "npm run generate"   # or "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/server/:splat"
  status = 200
```

> **Note:** If you use the `@nuxtjs/netlify` module, it will manage redirects and headers automatically. Overriding them via `netlify.toml` may cause conflicts.

---

## 7. Deploy to Netlify

- **Via Git:** Connect your repository to Netlify and use the build settings above.
- **Via CLI:**  
  ```bash
  npm install -g netlify-cli
  netlify login
  netlify init
  netlify deploy --prod
  ```

---

## 8. Verify Dynamic Routes

After deployment:

- For **SSR**, dynamic routes should work out of the box (e.g., `/blog/any-slug`).
- For **SSG with fallback**, test a route that was **not** pre‑rendered (e.g., `/blog/new-slug`). It should load the SPA fallback and render correctly.

If dynamic routes return a 404, ensure:
- In SSG mode, `generate.fallback: true` is set.
- Netlify is not caching old builds; try clearing the cache or redeploying.

---

## 9. Troubleshooting Common Issues

| Problem | Solution |
|---------|----------|
| Redirects not working | Use `@nuxtjs/netlify` module to manage redirects, or ensure `_redirects` file is generated correctly. |
| Scheduled tasks not running | Nitro scheduled tasks not supported on Netlify. Use Netlify Scheduled Functions instead. |
| Environment variables missing in runtime | Variables must be prefixed with `NUXT_PUBLIC_` to be exposed to the client, or accessed via `useRuntimeConfig()` in server code. |
| Dynamic routes return 404 (SSG) | Enable `fallback: true` and ensure `404.html` is deployed. Also check that Netlify's redirects are not overwriting the fallback. |

---

## 10. References

- [Nuxt Deployment Documentation](https://nuxt.com/docs/getting-started/deployment)
- [Nitro Netlify Preset](https://nitro.unjs.io/deploy/providers/netlify)
- [Netlify Redirects & Headers](https://docs.netlify.com/routing/redirects/)
- [@nuxtjs/netlify Module](https://github.com/nuxt-modules/netlify)
```

This markdown file serves as a self‑contained requirement guide. Apply the suggested changes to your existing files, and you'll be ready to deploy your Nuxt 4 app with dynamic routes on Netlify.