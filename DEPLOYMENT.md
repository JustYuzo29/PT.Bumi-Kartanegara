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
Developed with ❤️ for PT. BUMI KARTANEGARA
