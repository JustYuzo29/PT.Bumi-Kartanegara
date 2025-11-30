# PT. BUMI KARTANEGARA - Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites
- GitHub account dengan repository: https://github.com/JustYuzo29/PT.Bumi-Kartanegara.git
- Vercel account (sign up di https://vercel.com)

### Deployment Steps

1. **Login ke Vercel**
   - Buka https://vercel.com
   - Sign in dengan GitHub account

2. **Import Repository**
   - Click "Add New Project"
   - Import repository: `JustYuzo29/PT.Bumi-Kartanegara`
   - Select branch: `JEK`

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: Sudah otomatis dari `vercel.json`
   - **Output Directory**: Sudah otomatis dari `vercel.json`

4. **Environment Variables** (Opsional - sudah ada di vercel.json)
   ```
   VITE_USE_MOCK_API=true
   VITE_API_URL=/mock-api
   VITE_DEV_MODE=false
   ```

5. **Deploy**
   - Click "Deploy"
   - Tunggu proses build selesai (sekitar 2-3 menit)
   - Website akan live di URL Vercel (contoh: `https://pt-bumi-kartanegara.vercel.app`)

### Features
✅ **Standalone Frontend** - Berjalan tanpa backend
✅ **Mock API** - Data disimulasikan di frontend
✅ **Fully Responsive** - Mobile, Tablet, Desktop
✅ **Dark Mode** - Theme toggle support
✅ **Multi-language** - Indonesia & English
✅ **React 19 + Vite 7** - Modern stack
✅ **TailwindCSS 4** - Utility-first styling

### Post-Deployment
- URL akan otomatis ter-generate: `https://your-project.vercel.app`
- Setiap push ke branch `JEK` akan otomatis re-deploy
- Bisa set custom domain di Vercel dashboard

### Important Notes
⚠️ **Mock Data**: Website menggunakan mock API, data tidak persisten
⚠️ **Login Feature**: Admin/Staff login tidak berfungsi tanpa backend
⚠️ **Production Mode**: `VITE_USE_MOCK_API=true` harus aktif

### Tech Stack
- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS 4
- **Routing**: React Router v7
- **Animations**: AOS (Animate On Scroll)
- **Icons**: Heroicons
- **Deployment**: Vercel

### Support
Repository: https://github.com/JustYuzo29/PT.Bumi-Kartanegara
Branch: JEK

---

## 🔧 Troubleshooting Common Vercel Errors

### Build Errors

#### DEPLOYMENT_NOT_FOUND (404)
**Penyebab**: Deployment tidak ditemukan atau sudah dihapus.
**Solusi**:
- Push ulang ke repository
- Trigger deployment baru dari Vercel dashboard

#### FUNCTION_INVOCATION_TIMEOUT (504)
**Penyebab**: Function execution melebihi timeout limit.
**Solusi**:
- Sudah ditangani di `vercel.json` dengan `maxDuration: 10`
- Untuk Hobby plan: max 10 detik
- Upgrade ke Pro plan untuk durasi lebih lama

#### BUILD FAILED / DEPLOYMENT_BLOCKED (403)
**Penyebab**: Build command gagal atau ada masalah dependencies.
**Solusi**:
```bash
# Test build locally
cd frontend
npm install
npm run build
```
- Pastikan tidak ada error saat build
- Check package.json untuk dependencies yang valid
- Verifikasi Node version compatibility

### Routing Errors

#### NOT_FOUND (404) - Page Not Found
**Penyebab**: SPA routing tidak dikonfigurasi dengan benar.
**Solusi**: Sudah ditangani di `vercel.json`:
```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```

#### ROUTER_CANNOT_MATCH (502)
**Penyebab**: Routing configuration error.
**Solusi**:
- Pastikan `vercel.json` menggunakan rewrites, bukan redirects untuk SPA
- Verify all routes defined in React Router

### Function/API Errors

#### NO_RESPONSE_FROM_FUNCTION (502)
**Penyebab**: Function tidak return response yang valid.
**Solusi**:
- Tidak berlaku untuk frontend-only deployment ini
- Mock API berjalan di client-side

#### FUNCTION_PAYLOAD_TOO_LARGE (413)
**Penyebab**: Request body terlalu besar (limit 4.5MB).
**Solusi**:
- Compress images sebelum upload
- Implementasi chunked upload untuk file besar

### Image Optimization Errors

#### INVALID_IMAGE_OPTIMIZE_REQUEST (400)
**Penyebab**: Invalid image optimization parameter.
**Solusi**:
- Gunakan format image yang supported: JPEG, PNG, WebP, AVIF
- Check image URL validity
- Verify image dimensions

#### OPTIMIZED_EXTERNAL_IMAGE_REQUEST_FAILED (502)
**Penyebab**: Gagal fetch external image.
**Solusi**:
- Host images di `/public/` folder
- Atau gunakan CDN yang reliable

### Cache Errors

#### INTERNAL_CACHE_ERROR (500)
**Penyebab**: Internal caching issue di Vercel.
**Solusi**:
- Bypass cache dengan query parameter: `?v=timestamp`
- Clear deployment cache dan re-deploy
- Contact Vercel support jika persist

### Resource Errors

#### REQUEST_HEADER_TOO_LARGE (431)
**Penyebab**: Request headers melebihi limit (16KB).
**Solusi**:
- Reduce cookie size
- Minimize custom headers
- Compress large data in headers

#### URL_TOO_LONG (414)
**Penyebab**: URL melebihi 8KB.
**Solusi**:
- Gunakan POST method untuk data besar
- Store complex data di localStorage/sessionStorage
- Gunakan URL shortening untuk query params

## 🛠️ Local Testing Before Deploy

Selalu test build secara lokal sebelum deploy:

```bash
# 1. Clean install
cd frontend
rm -rf node_modules package-lock.json
npm install

# 2. Test build
npm run build

# 3. Test production build locally
npm run preview
```

## 📊 Monitoring & Debugging

### Check Deployment Logs
1. Buka Vercel Dashboard
2. Pilih project Anda
3. Click pada deployment yang error
4. Lihat "Build Logs" dan "Function Logs"

### Common Log Errors

**Error**: `Module not found`
**Fix**: 
```bash
cd frontend
npm install <missing-module>
```

**Error**: `Build script not found`
**Fix**: Verify `package.json` scripts section

**Error**: `Out of memory`
**Fix**: 
- Optimize bundle size
- Remove unused dependencies
- Implement code splitting

## ✅ Best Practices

1. **Always test locally first**
   ```bash
   npm run build && npm run preview
   ```

2. **Keep dependencies updated**
   ```bash
   npm outdated
   npm update
   ```

3. **Optimize bundle size**
   - Remove unused imports
   - Use dynamic imports
   - Compress images

4. **Use environment variables properly**
   - Never commit `.env` files
   - Set variables in Vercel dashboard
   - Use `VITE_` prefix for Vite

5. **Monitor deployment status**
   - Check build logs regularly
   - Set up deployment notifications
   - Use Vercel Analytics

## 🆘 Getting Help

Jika masih mengalami error:

1. **Check Vercel Status**: https://www.vercel-status.com/
2. **Vercel Documentation**: https://vercel.com/docs
3. **Community Support**: https://github.com/vercel/vercel/discussions
4. **Contact Support**: https://vercel.com/support

### Quick Fix Checklist

- [ ] Clean install dependencies: `rm -rf node_modules && npm install`
- [ ] Test local build: `npm run build`
- [ ] Check `vercel.json` configuration
- [ ] Verify environment variables
- [ ] Clear Vercel cache and redeploy
- [ ] Check deployment logs
- [ ] Verify Node.js version compatibility
- [ ] Review recent code changes
- [ ] Test in preview mode: `npm run preview`
- [ ] Check browser console for errors

---
Developed with ❤️ for PT. BUMI KARTANEGARA
