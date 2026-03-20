# Netlify Deployment Checklist for Gombian Boutique

**Last Updated**: 2026-03-20  
**Status**: ✅ Ready for Deployment

This document provides a complete checklist for deploying the Gombian Boutique perfume store to Netlify using Static Site Generation (SSG).

---

## ✅ Configuration Review Complete

### 1. Nuxt Configuration (`nuxt.config.ts`)

- [x] **SSR disabled for static generation**: `ssr: false`
- [x] **Fallback enabled for dynamic routes**: `generate.fallback: true`
- [x] **Nitro preset set to static**: `nitro.preset: 'static'`
- [x] **Prerender routes configured**: 34 routes including products, account pages, and policies
- [x] **All modules installed and configured**:
  - `@nuxtjs/tailwindcss`
  - `@nuxtjs/color-mode`
  - `@nuxtjs/robots`
  - `@nuxt/image`
  - `@pinia/nuxt`
  - `@nuxtjs/i18n`

### 2. Netlify Configuration (`netlify.toml`)

```toml
[build]
  command = "pnpm run generate"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
  PNPM_VERSION = "10"
```

- [x] Build command: `pnpm run generate`
- [x] Publish directory: `dist`
- [x] Node.js version: 20
- [x] PNPM version: 10
- [x] Environment variables configured for production

### 3. Build Verification

- [x] **Build completed successfully**: `pnpm generate` runs without errors
- [x] **34 routes prerendered**: All static pages generated
- [x] **Fallback 404.html created**: For unknown dynamic routes
- [x] **Output directory**: `.output/public` (ready for deployment)

---

## 📋 Pre-Deployment Checklist

### Environment Variables (Set in Netlify Dashboard)

Navigate to **Site Settings → Environment Variables** and add:

#### Payment Processing (Stripe)
- [ ] `STRIPE_SECRET_KEY` - Your Stripe secret key (e.g., `sk_test_...` or `sk_live_...`)
- [ ] `STRIPE_PUBLIC_KEY` - Your Stripe publishable key (e.g., `pk_test_...` or `pk_live_...`)

#### Email Service (SendGrid)
- [ ] `SENDGRID_API_KEY` - Your SendGrid API key

#### Security (reCAPTCHA)
- [ ] `NUXT_RECAPTCHA_SITE_KEY` - Your reCAPTCHA site key
- [ ] `NUXT_RECAPTCHA_SECRET_KEY` - Your reCAPTCHA secret key

#### Application Configuration
- [ ] `APP_URL` - Your production URL (e.g., `https://gombianboutique.netlify.app`)
- [ ] `NUXT_CONTACT_EMAIL` - Contact email address (default: `gombianholdings@gmail.com`)

#### Optional Services
- [ ] `MAILCHIMP_API_KEY` - Mailchimp API key for newsletter
- [ ] `MAILCHIMP_LIST_ID` - Mailchimp list ID
- [ ] `MAILCHIMP_SERVER_PREFIX` - Mailchimp server prefix (e.g., `us1`)

> **Note**: Variables prefixed with `NUXT_` are accessible client-side. Variables without the prefix are server-side only.

---

## 🚀 Deployment Steps

### Option 1: Deploy via Git (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Configure for Netlify SSG deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select your Git provider and repository
   - Netlify will auto-detect the `netlify.toml` configuration

3. **Configure Environment Variables**
   - In Netlify Dashboard, go to **Site Settings → Environment Variables**
   - Add all required environment variables from the checklist above

4. **Deploy**
   - Click "Deploy site"
   - Netlify will run `pnpm run generate` automatically
   - Your site will be live at `https://your-site-name.netlify.app`

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Site**
   ```bash
   netlify init
   ```
   - Select "Create & configure a new site"
   - Choose your team
   - Enter a unique site name

4. **Set Environment Variables**
   ```bash
   netlify env:set STRIPE_SECRET_KEY sk_test_...
   netlify env:set STRIPE_PUBLIC_KEY pk_test_...
   # Add all other required variables
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Option 3: Manual Deploy (Drag & Drop)

1. **Build Locally**
   ```bash
   pnpm run generate
   ```

2. **Deploy to Netlify**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag and drop the `.output/public` folder
   - Your site will be live instantly

---

## 🧪 Post-Deployment Verification

After deployment, verify the following:

### Core Functionality
- [ ] Homepage loads correctly
- [ ] Product listing page displays all products
- [ ] Product detail pages work (e.g., `/products/[id]`)
- [ ] Shopping cart functionality works
- [ ] Checkout process completes successfully
- [ ] Order confirmation page displays
- [ ] Contact form submits successfully

### Dynamic Routes
- [ ] Known product routes load (prerendered)
- [ ] Unknown product routes show fallback page (not 404 error)
- [ ] Account pages are accessible

### Performance
- [ ] Page load time is under 2 seconds
- [ ] Images are optimized and load correctly
- [ ] Mobile responsiveness works on all device sizes

### SEO
- [ ] Meta tags are present on all pages
- [ ] Sitemap.xml is accessible at `/sitemap.xml`
- [ ] Robots.txt is accessible at `/robots.txt`

### Security
- [ ] HTTPS is enabled (automatic on Netlify)
- [ ] Environment variables are not exposed in client-side code
- [ ] Payment processing uses secure Stripe Elements

---

## 🔧 Troubleshooting

### Issue: Dynamic Routes Return 404

**Solution**: The `generate.fallback: true` setting creates a SPA fallback for unknown routes. If you still see 404s:

1. Verify `nuxt.config.ts` has:
   ```typescript
   generate: {
     fallback: true
   }
   ```

2. Clear Netlify cache and redeploy:
   ```bash
   netlify deploy --prod --force
   ```

### Issue: Environment Variables Not Working

**Solution**: 
- Ensure variables are prefixed with `NUXT_` for client-side access
- Server-side variables (like `STRIPE_SECRET_KEY`) are only accessible in server endpoints
- Redeploy after adding new environment variables

### Issue: Build Fails on Netlify

**Solution**:
1. Check build logs in Netlify dashboard
2. Verify `pnpm-lock.yaml` is committed to Git
3. Ensure all dependencies are in `package.json`
4. Test build locally: `pnpm run generate`

### Issue: Stripe Payments Not Working

**Solution**:
- Verify Stripe keys are correct (test vs. live keys)
- Ensure webhook endpoints are configured in Stripe Dashboard
- Check browser console for Stripe.js errors

---

## 📊 Build Information

**Last Successful Build**: 2026-03-20  
**Routes Prerendered**: 34  
**Build Output**: `.output/public`  
**Build Time**: ~24 seconds  

### Prerendered Routes
```
/, /about, /account, /account/orders, /account/preferences, /account/profile,
/cart, /checkout, /compare, /confirmation, /contact, /cookies, /faq,
/login, /policies, /privacy, /products, /register, /returns, /search,
/shipping, /support, /sustainability, /terms, /testimonials, /track-order,
/wishlist, /sitemap.xml, /robots.txt, /200.html, /404.html
```

---

## 📝 Custom Domain Setup (Optional)

To use a custom domain:

1. In Netlify Dashboard, go to **Domain Settings**
2. Click "Add custom domain"
3. Enter your domain name (e.g., `www.gombianboutique.com`)
4. Update DNS records at your domain registrar:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: your-site-name.netlify.app
5. Enable HTTPS (automatic with Let's Encrypt)

---

## 🎯 Next Steps

1. ✅ **Configuration complete** - All settings verified
2. ⏳ **Set environment variables** - Add keys in Netlify Dashboard
3. ⏳ **Deploy to Netlify** - Use Git, CLI, or manual deploy
4. ⏳ **Test deployment** - Verify all functionality works
5. ⏳ **Set up custom domain** (optional)
6. ⏳ **Monitor performance** - Use Netlify Analytics or Google Analytics

---

## 📚 References

- [Nuxt Deployment Documentation](https://nuxt.com/docs/getting-started/deployment)
- [Nitro Static Preset](https://nitro.unjs.io/deploy/providers/static)
- [Netlify Build Settings](https://docs.netlify.com/configure-builds/get-started/)
- [Stripe Integration Guide](https://stripe.com/docs/payments/accept-a-payment)
- [SendGrid Documentation](https://docs.sendgrid.com/)

---

**Questions or Issues?** Check the troubleshooting section or contact the development team.
