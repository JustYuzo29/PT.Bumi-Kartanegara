# 🔥 Fix HTTP → HTTPS Redirect 301 (Bukan 308)

## 🎯 Masalah yang Terdeteksi

Dari HTTPStatus.io test:
```
http://bumikartanegara.com → 308 Permanent Redirect → https://bumikartanegara.com
```

**Google Search Console butuh:**
```
http://bumikartanegara.com → 301 Moved Permanently → https://bumikartanegara.com
```

**Akibatnya:**
- ❌ "Halaman tidak ditayangkan melalui HTTPS"
- ❌ Assets error (8/13 tidak dapat dimuat)
- ❌ Logo tidak muncul di Google

---

## ✅ SOLUSI LENGKAP

### Step 1: Aktifkan "Automatically use HTTPS" di Vercel Dashboard

Vercel otomatis handle HTTPS redirect **HANYA** jika setting ini aktif.

**Cara:**

1. **Login Vercel:** https://vercel.com/dashboard
2. **Pilih Project:** `bumikartanegara` atau nama project Anda
3. **Settings** → **Domains**
4. Cari domain: `bumikartanegara.com`
5. Klik **⋮** (3 dots) → **Edit**
6. Pastikan **"Redirect to HTTPS"** = ✅ **ENABLED**
7. **Save**

### Step 2: Set Redirect Type ke 301

Di **Vercel Project Settings:**

1. **Settings** → **General**
2. Scroll ke **"HTTPS"**
3. Enable **"Automatic HTTPS Redirects"**
4. **Force HTTPS** → ✅ Enabled

Vercel akan otomatis redirect semua HTTP ke HTTPS dengan **301**.

---

### Step 3: Tambahkan `vercel.json` untuk SPA Routing

File `vercel.json` sudah diperbaiki untuk:
- ✅ Routing SPA yang benar
- ✅ HSTS headers
- ✅ Cache control untuk assets
- ✅ Security headers

**TIDAK** perlu manual redirect di `vercel.json` karena Vercel handle otomatis via dashboard.

---

### Step 4: Deploy Ulang

```powershell
cd "d:\Project Bumi Karta\bumikarta repair\PT.Bumi-Kartanegara"
git add .
git commit -m "Fix vercel.json - remove manual redirects"
git push origin main
```

Vercel akan auto-deploy.

---

### Step 5: Validasi Redirect 301

**Test menggunakan PowerShell:**

```powershell
curl -I http://bumikartanegara.com
```

**Expected output:**
```
HTTP/1.1 301 Moved Permanently
Location: https://bumikartanegara.com/
```

**Atau test via HTTPStatus.io:**
- Buka: https://httpstatus.io/
- Input: `http://bumikartanegara.com`
- **Harus menunjukkan:** `301` bukan `308`

---

## 🔍 Troubleshooting Assets Error

### Masalah: 8/13 assets tidak dapat dimuat

**File yang error:**
```
https://bumikartanegara.com/assets/About1-CNp1b-Bw.jpg
https://bumikartanegara.com/assets/About2-r3aR9HXo.png
https://bumikartanegara.com/assets/Bg-Journey-Bk0HdOvS.png
https://bumikartanegara.com/assets/Hero-D3wfa3VX.png
https://bumikartanegara.com/assets/Oj1-Donhggyy.jpg
https://bumikartanegara.com/assets/Oj2-CvkuTNav.png
https://bumikartanegara.com/assets/Oj3-Cs5Zl17v.png
https://bumikartanegara.com/logo-bk.png
```

### Penyebab Kemungkinan:

1. **File tidak ada di build output**
2. **Path salah di import**
3. **Vite build tidak include images**

### Solusi:

#### Check 1: Verifikasi File Ada di `dist/assets/`

Setelah build, cek folder:
```
frontend/dist/assets/
```

Harus ada semua file dengan hash yang sesuai.

#### Check 2: Pastikan Import Gambar Benar

Di component React/JSX, pastikan import seperti ini:

```jsx
// ✅ BENAR - Relative import
import About1 from '../assets/company/About1.jpg';
import Hero from '../assets/Hero.png';

// ❌ SALAH - Absolute path
import About1 from '/assets/company/About1.jpg';
```

#### Check 3: Verifikasi `vite.config.js`

Pastikan config ini ada:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
})
```

---

## 🚀 Vercel Dashboard Settings Checklist

Login ke: https://vercel.com/dashboard

### ✅ Domain Settings
- [ ] `bumikartanegara.com` terdaftar
- [ ] SSL Certificate: Valid & Active
- [ ] Redirect to HTTPS: **Enabled**
- [ ] Force HTTPS: **Enabled**

### ✅ Project Settings
- [ ] Framework: Vite
- [ ] Output Directory: `dist`
- [ ] Build Command: `npm install && npm run build`
- [ ] Install Command: `npm install`
- [ ] Root Directory: `frontend` (jika project di subfolder)

### ✅ Environment Variables (opsional)
```
VITE_USE_MOCK_API=true
VITE_API_URL=/mock-api
VITE_DEV_MODE=false
```

---

## 📊 Testing Checklist

Setelah deploy, test semua ini:

### 1. HTTP → HTTPS Redirect (301)
```powershell
curl -I http://bumikartanegara.com
```
**Expected:** `HTTP/1.1 301 Moved Permanently`

### 2. WWW Redirect (jika ada)
```powershell
curl -I http://www.bumikartanegara.com
```
**Expected:** Redirect ke `https://bumikartanegara.com`

### 3. HSTS Header
```powershell
curl -I https://bumikartanegara.com
```
**Expected:** `Strict-Transport-Security: max-age=63072000`

### 4. Assets Loading
Buka browser → DevTools → Network tab
- Akses: `https://bumikartanegara.com`
- **Semua assets harus 200 OK**, bukan 404

### 5. Logo Accessible
Test langsung:
```
https://bumikartanegara.com/logo-bk.png
```
**Harus:** Gambar muncul, bukan 404

---

## 📝 Google Search Console - Validasi Perbaikan

Setelah redirect sudah 301:

1. **Login:** https://search.google.com/search-console
2. **Pilih Property:** `https://bumikartanegara.com`
3. **Pengalaman Halaman** → **HTTPS**
4. Klik error: "Halaman tidak ditayangkan melalui HTTPS"
5. Klik **"VALIDASI PERBAIKAN"**
6. Tunggu 3-7 hari untuk Google re-crawl

### Monitor Progress:
- **Coverage** → Lihat jumlah halaman valid naik
- **URL Inspection** → Test homepage
- **Performance** → Impressions harus naik

---

## ⚠️ Common Mistakes

### ❌ JANGAN:
1. **Manual redirect di `vercel.json`** dengan protocol
   - Vercel tidak support `http://` di source
   - Gunakan dashboard setting

2. **Mixed content (HTTP + HTTPS)**
   - Semua assets harus HTTPS
   - Check di DevTools Console

3. **Hardcode absolute URLs**
   - Jangan: `<img src="http://bumikartanegara.com/logo.png">`
   - Pakai: `<img src="/logo-bk.png">` atau import

### ✅ LAKUKAN:
1. **Enable HTTPS redirect di Vercel Dashboard**
2. **Use relative paths** untuk semua assets
3. **Import images** di React components
4. **Test dengan curl** sebelum validasi GSC

---

## 🎯 Root Cause Analysis

### Kenapa 308 muncul?

**308 Permanent Redirect** = Modern HTTP standard untuk redirect yang:
- Tidak mengubah HTTP method (POST tetap POST)
- Lebih strict dari 301

**Tapi:** Google Search Console **prefer 301** untuk HTTP→HTTPS karena:
- 301 = Standard lama & well-supported
- 308 = Relatif baru, tidak semua bot support
- Google crawler **explicitly check 301** untuk HTTPS migration

**Solusi:** Paksa 301 via Vercel Dashboard settings, bukan config file.

---

## 📞 Quick Fix Commands

### Rebuild & Deploy
```powershell
cd "d:\Project Bumi Karta\bumikarta repair\PT.Bumi-Kartanegara\frontend"
npm run build
git add dist
git commit -m "Rebuild assets"
git push origin main
```

### Test Redirect
```powershell
# Test HTTP redirect
curl -I http://bumikartanegara.com

# Test HTTPS
curl -I https://bumikartanegara.com

# Test assets
curl -I https://bumikartanegara.com/assets/Hero-D3wfa3VX.png
curl -I https://bumikartanegara.com/logo-bk.png
```

### Force Vercel Redeploy
```powershell
# Trigger redeploy tanpa code change
git commit --allow-empty -m "Force redeploy for HTTPS fix"
git push origin main
```

---

## 📚 Resources

- Vercel HTTPS Docs: https://vercel.com/docs/concepts/edge-network/https
- HTTP Status Codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
- Google HTTPS Migration: https://developers.google.com/search/docs/crawling-indexing/https
- HTTPStatus Checker: https://httpstatus.io/

---

## ✅ Expected Timeline

| Time | Progress |
|------|----------|
| **Immediately** | Vercel dashboard settings applied |
| **5-10 min** | New deployment live with 301 redirect |
| **1 hour** | HTTPStatus.io shows 301 |
| **24 hours** | Google starts re-crawling |
| **3-7 days** | Search Console validation complete |
| **1-2 weeks** | Logo appears in Google SERP |
| **2-4 weeks** | All HTTPS errors resolved |

---

**Good luck! Setelah redirect jadi 301, semua error akan hilang! 🚀**
