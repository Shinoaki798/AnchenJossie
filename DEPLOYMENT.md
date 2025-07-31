# Cloudflare Pages Deployment Guide

## Automatic Deployment via Git Integration (Recommended)

1. **Connect your repository to Cloudflare Pages:**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Connect your Git provider (GitHub)
   - Select this repository

2. **Configure build settings in Cloudflare Pages dashboard:**
   - **Framework preset:** `Vue`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave empty)
   - **Node.js version:** `18` or `20`

3. **Environment variables (if needed):**
   - Add any required environment variables in the Cloudflare Pages dashboard
   - For this project, no additional environment variables are required

## Manual Deployment via Wrangler CLI

1. **Install Wrangler:**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

3. **Build and deploy:**
   ```bash
   npm run build
   wrangler pages deploy dist --project-name anchen-jossie-website
   ```

## Local Testing

Test your build locally before deploying:

```bash
npm run build
npm run preview
```

## Files Required for Deployment

- ✅ `public/_redirects` - SPA routing support  
- ✅ `public/_headers` - Security headers and caching rules
- ✅ `vite.config.js` - Build configuration
- ✅ `package.json` - Dependencies and scripts
- ❌ ~~`wrangler.toml`~~ - Not needed for static sites

## Important Notes

- **No `wrangler.toml` needed:** For static sites, Cloudflare Pages doesn't require this file
- **The `_redirects` file:** Ensures that client-side routing works correctly
- **The `_headers` file:** Provides security headers and optimized caching
- **All routes fall back to `index.html`:** Required for SPA functionality
- **Assets are automatically optimized:** During the build process

## Cloudflare Pages Dashboard Settings

When setting up in the Cloudflare Pages dashboard, use these exact settings:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node.js version:** `18`
- **Install command:** `npm install` (auto-detected)
