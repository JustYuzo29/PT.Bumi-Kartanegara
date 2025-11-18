# Frontend - PT. Bumi Kartanegara

Frontend standalone application menggunakan React + Vite dengan Mock API.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Aplikasi akan berjalan di: **http://localhost:5173**

## 📦 Features

- ✅ **Standalone** - Tidak memerlukan backend
- ✅ **Mock API** - Data simulasi untuk demo
- ✅ **Responsive** - Mobile, tablet, desktop
- ✅ **Dark Mode** - Light/Dark theme toggle
- ✅ **Multi-language** - Indonesia & English

## 🔑 Login Credentials (Mock)

**Admin:**
- Username: `admin`
- Password: `password`

**Staff:**
- Username: `staff`
- Password: `password`

## 🛠️ Scripts

```bash
npm run dev       # Development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Check code quality
```

## 📁 Structure

```
src/
├── components/    # React components
├── Pages/         # Page components
├── mocks/         # Mock data & API
├── lib/           # Utilities
├── locales/       # Translations
├── routes/        # Router config
└── services/      # API services
```

## 🌐 Environment Variables

File `.env` sudah dikonfigurasi untuk menggunakan Mock API:

```env
VITE_USE_MOCK_API=true
VITE_API_URL=/mock-api
VITE_DEV_MODE=true
```

## 📝 Notes

- Semua data menggunakan mock/simulasi
- Data tidak persistent (reset setiap refresh)
- Login authentication disimulasikan
- Tidak ada koneksi ke backend/database

---

© 2025 PT. Bumi Kartanegara
