# Cloudflare Pages Deployment Guide

## Automatic Deployment via Git Integration

1. **Connect your repository to Cloudflare Pages:**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Connect your Git provider (GitHub)
   - Select this repository

2. **Configure build settings:**
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave empty)
   - **Node.js version:** `18` or `20`

3. **Environment variables (if needed):**
   - Add any required environment variables in the Cloudflare Pages dashboard

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
   wrangler pages deploy dist
   ```

## Local Testing

Test your build locally before deploying:

```bash
npm run build
npm run preview
```

## Files Required for Deployment

- ✅ `public/_redirects` - SPA routing support
- ✅ `wrangler.toml` - Cloudflare configuration
- ✅ `vite.config.js` - Build configuration
- ✅ `package.json` - Dependencies and scripts

## Notes

- The `_redirects` file ensures that client-side routing works correctly
- All routes will fall back to `index.html` for SPA functionality
- Assets are automatically optimized during the build process
