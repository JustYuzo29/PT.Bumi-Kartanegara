# 🔒 Panduan Migrasi HTTP ke HTTPS - Memulihkan Logo di Google

## 🔴 Masalah yang Terjadi

Anda sudah migrasi dari:
- ❌ `http://bumikartanegara.com` → ✅ `https://bumikartanegara.com`

**Akibatnya:**
- Logo yang sudah muncul di Google **HILANG**
- Google menganggap ini sebagai **2 website berbeda**

---

## ✅ Solusi Sudah Diterapkan

### 1. ✓ HTTPS Redirect (vercel.json)
- Semua HTTP otomatis redirect ke HTTPS (301 permanent)
- HSTS header ditambahkan untuk security

### 2. ✓ Canonical URL (index.html)
- Tag `<link rel="canonical">` ditambahkan
- Semua meta tags menggunakan HTTPS

### 3. ✓ Structured Data Diperbaiki
- Logo dalam format `ImageObject`
- Properti `image` ditambahkan
- Semua URL menggunakan HTTPS

---

## 🚨 LANGKAH WAJIB SEKARANG - Google Search Console

### Step 1: Tambahkan Property HTTPS Baru

1. **Buka:** https://search.google.com/search-console

2. **Tambahkan Property Baru:**
   - Klik "Add Property"
   - Pilih "URL prefix"
   - Masukkan: `https://bumikartanegara.com`
   - Klik "Continue"

3. **Verifikasi Kepemilikan:**
   - Pilih metode "HTML tag"
   - Copy meta tag
   - Paste di `<head>` index.html (setelah charset)
   - Klik "Verify"

### Step 2: Beritahu Google Tentang Perubahan Alamat

Di **property HTTP LAMA** (`http://bumikartanegara.com`):

1. Klik **Settings** (⚙️) di sidebar kiri
2. Klik **"Change of address"**
3. Pilih property baru: `https://bumikartanegara.com`
4. Klik **"Validate and update"**

**PENTING:** Ini memberitahu Google bahwa website pindah, bukan website baru!

### Step 3: Submit Sitemap di Property HTTPS Baru

1. Di property `https://bumikartanegara.com`
2. Klik **"Sitemaps"** di sidebar
3. Masukkan: `https://bumikartanegara.com/sitemap.xml`
4. Klik **"Submit"**

### Step 4: Request Re-indexing Homepage

1. Di property HTTPS baru
2. Klik **URL Inspection** di top bar
3. Masukkan: `https://bumikartanegara.com`
4. Tunggu selesai
5. Klik **"Request Indexing"**

### Step 5: Fix Sitemap.xml (Jika Perlu)

Cek file: `frontend/public/sitemap.xml`

Pastikan SEMUA URL menggunakan **HTTPS**, bukan HTTP!

Contoh yang benar:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bumikartanegara.com/</loc>
    <lastmod>2025-12-01</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://bumikartanegara.com/about</loc>
    <lastmod>2025-12-01</lastmod>
    <priority>0.8</priority>
  </url>
  <!-- Semua URL harus HTTPS! -->
</urlset>
```

---

## 🔄 Migrasi Google Business Profile

**Logo di Google SERP** banyak berasal dari **Google Business Profile**!

### Langkah Update GBP:

1. **Login:** https://business.google.com
2. Pilih **PT. Bumi Kartanegara**
3. Klik **"Info"** → **"Website"**
4. Update URL dari:
   - ❌ `http://bumikartanegara.com`
   - ✅ `https://bumikartanegara.com`
5. **Save changes**

**PENTING:** Re-upload logo jika perlu!
- Klik "Photos" → "Logo"
- Upload ulang `logo-bk.png`
- Tandai sebagai "Logo"

---

## 🧪 Validasi & Testing

### 1. Test Redirect
Buka terminal dan test:

```powershell
curl -I http://bumikartanegara.com
```

**Harus return:**
```
HTTP/1.1 301 Moved Permanently
Location: https://bumikartanegara.com/
```

### 2. Test HTTPS
```powershell
curl -I https://bumikartanegara.com
```

**Harus return:**
```
HTTP/2 200
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

### 3. Validate Schema.org

**Tool:** https://validator.schema.org/

1. Masukkan: `https://bumikartanegara.com`
2. Klik "Run Test"
3. Pastikan **NO ERRORS**
4. Cek bahwa logo URL adalah HTTPS

### 4. Test Rich Results

**Tool:** https://search.google.com/test/rich-results

1. Masukkan: `https://bumikartanegara.com`
2. Klik "Test URL"
3. Pastikan "Organization" terdeteksi
4. Logo harus muncul di preview

### 5. Facebook Debugger

**Tool:** https://developers.facebook.com/tools/debug/

1. Masukkan: `https://bumikartanegara.com`
2. Klik **"Scrape Again"** (penting untuk clear cache!)
3. Pastikan image muncul
4. Semua URL harus HTTPS

---

## ⏱️ Timeline Recovery

| Waktu | Yang Terjadi |
|-------|--------------|
| **Hari 1** | Deploy changes + request indexing |
| **Hari 2-3** | Google crawl ulang homepage |
| **Minggu 1** | Logo mulai muncul kembali untuk branded search |
| **Minggu 2-3** | Logo konsisten di semua hasil pencarian |
| **Bulan 1** | HTTP ranking authority transfer ke HTTPS |

---

## 🔍 Monitoring Progress

### Cek di Google Search Console:

1. **Coverage Report**
   - Pastikan halaman HTTPS mulai ter-index
   - Halaman HTTP akan perlahan hilang

2. **Performance Report**
   - Impressions harus mulai pindah dari HTTP ke HTTPS
   - Klik harus naik di property HTTPS

3. **URL Inspection**
   - Test URL: `https://bumikartanegara.com`
   - Status harus: "URL is on Google"
   - Sitemaps: Harus terdeteksi

### Test di Google Search:

Cari: **"PT Bumi Kartanegara"**

Dalam 1-2 minggu, logo harus muncul di:
- ✓ Knowledge Panel (kanan)
- ✓ Main search result
- ✓ Google Maps

---

## ⚠️ Common Mistakes to Avoid

### ❌ JANGAN:
1. **Hapus property HTTP lama** dari Search Console
   - Biarkan tetap ada untuk tracking redirect
   
2. **Submit sitemap dengan mixed HTTP/HTTPS**
   - Semua URL harus konsisten HTTPS

3. **Lupa update social media links**
   - Facebook, Instagram, LinkedIn semua harus HTTPS

4. **Upload logo berbeda di GBP**
   - Gunakan file yang SAMA PERSIS dengan di website

### ✅ LAKUKAN:
1. **Keep property HTTP** setidaknya 6 bulan
2. **Monitor coverage** untuk pastikan redirect bekerja
3. **Re-upload logo** di Google Business Profile
4. **Update backlinks** dari website lain (jika ada akses)

---

## 🆘 Troubleshooting

### Logo masih belum muncul setelah 2 minggu?

**Check list:**

1. ✓ Property HTTPS sudah di-verify di Search Console?
2. ✓ "Change of address" sudah dilakukan?
3. ✓ Sitemap HTTPS sudah submitted?
4. ✓ Homepage sudah request indexing?
5. ✓ Google Business Profile URL sudah diupdate ke HTTPS?
6. ✓ Logo di GBP sudah re-upload?
7. ✓ Schema.org valid di validator?
8. ✓ Rich Results Test mendeteksi Organization?

### Google masih index versi HTTP?

**Solusi:**

1. Pastikan redirect 301 aktif (test dengan curl)
2. Request indexing ulang untuk homepage HTTPS
3. Submit sitemap lagi
4. Tunggu 1-2 minggu untuk Google update

### Logo muncul tapi gambar lama/salah?

**Solusi:**

1. Clear cache di Facebook Debugger
2. Re-upload logo di Google Business Profile
3. Pastikan file `logo-bk.png` di server adalah yang terbaru
4. Hard refresh browser: Ctrl+Shift+R

---

## 📋 Deployment Checklist

Sebelum deploy, pastikan:

- [ ] File `vercel.json` sudah updated dengan redirects
- [ ] File `index.html` sudah updated dengan canonical
- [ ] Semua meta tags menggunakan HTTPS
- [ ] Schema.org logo URL menggunakan HTTPS
- [ ] Sitemap.xml semua URL menggunakan HTTPS
- [ ] Deploy ke production
- [ ] Test redirect HTTP → HTTPS
- [ ] Test HTTPS certificate valid
- [ ] Google Search Console property HTTPS added
- [ ] "Change of address" submitted
- [ ] Sitemap submitted
- [ ] Homepage request indexing
- [ ] Google Business Profile URL updated
- [ ] Logo re-uploaded di GBP
- [ ] Validate schema.org
- [ ] Test rich results
- [ ] Clear Facebook cache

---

## 🎯 Expected Results

Setelah semua langkah:

**Minggu 1:**
- ✓ Google crawl homepage HTTPS
- ✓ Property HTTPS mulai ada traffic
- ✓ Logo muncul di rich results test

**Minggu 2-3:**
- ✓ Logo muncul untuk branded search "PT Bumi Kartanegara"
- ✓ Knowledge panel muncul (jika eligible)
- ✓ Google Maps listing updated

**Bulan 1-2:**
- ✓ Semua ranking pindah ke HTTPS
- ✓ Logo konsisten di semua hasil
- ✓ Property HTTP traffic menurun drastis

---

## 📞 Quick Commands

### Deploy to Vercel
```powershell
cd "d:\Project Bumi Karta\bumikarta repair\PT.Bumi-Kartanegara\frontend"
git add .
git commit -m "Fix HTTPS redirect and schema for logo recovery"
git push origin main
```

### Test Redirect
```powershell
curl -I http://bumikartanegara.com
curl -I https://bumikartanegara.com
```

### Validate Schema
```powershell
# Test di browser
start https://validator.schema.org/#url=https%3A%2F%2Fbumikartanegara.com
```

---

## 📚 Resources

- Google Search Console: https://search.google.com/search-console
- Schema Validator: https://validator.schema.org/
- Rich Results Test: https://search.google.com/test/rich-results
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Google Business: https://business.google.com
- HSTS Preload: https://hstspreload.org/

---

**Good luck! Logo akan kembali muncul dalam 1-2 minggu! 🚀**
