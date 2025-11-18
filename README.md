# 🚀 PT. Bumi Kartanegara - Frontend Application

Frontend web application untuk PT. Bumi Kartanegara yang berjalan **standalone** dengan Mock API.

## ✨ Fitur



- 🎨 **Responsive Design** - Tampilan optimal di semua perangkat- Staff management system

- 🌓 **Dark Mode** - Toggle antara light dan dark theme- Company profile management

- 🌍 **Multi-language** - Support Bahasa Indonesia & English- Project portfolio

- 📱 **Mobile-First** - Optimized untuk pengalaman mobile- News and testimonials

- ⚡ **Fast & Modern** - Built with React + Vite- Contact management

- 🎯 **Standalone Mode** - Bisa berjalan tanpa backend (mock API)- User authentication and logging



### Halaman Tersedia

- **Home** - Landing page dengan hero, services, dan about preview
- **About Us** - Profil perusahaan, visi misi, struktur organisasi
- **Services** - Layanan yang ditawarkan
- **Media** - Gallery foto dan video
- **Contact** - Informasi kontak dan form
- **Staff Dashboard** - Panel untuk staff mengelola konten
- **Admin Dashboard** - Panel untuk admin

## 🛠️ Tech Stack

- ⚛️ **React 19** - UI Library
- ⚡ **Vite 7** - Build tool & dev server
- 🎨 **TailwindCSS 4** - Utility-first CSS framework
- 🧭 **React Router 7** - Client-side routing
- 📊 **Chart.js** - Data visualization
- 🎭 **Material UI** - Component library
- 📱 **React Icons** - Icon library
- 🔄 **Axios** - HTTP client (dengan mock adapter)

## 🚀 Quick Start

```bash
# 1. Masuk ke folder frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Frontend akan berjalan di **http://localhost:5173/**

## 📁 Struktur Project

```
frontend/
├── src/
│   ├── components/    # React components
│   ├── Pages/         # Page components
│   ├── mocks/         # Mock data & API
│   ├── lib/           # Utilities & API
│   ├── locales/       # Translations (ID/EN)
│   ├── routes/        # Route configurations
│   ├── services/      # API services
│   └── assets/        # Images & static files
├── .env               # Development config
├── .env.production    # Production config
├── package.json
└── vite.config.js

backend/ (TIDAK DIGUNAKAN)
└── ...
```

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

```

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh

## 🎯 NPM Scripts- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



```bash## Expanding the ESLint configuration

# Development

npm run dev              # Default (dengan backend)If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite-tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

npm run dev:standalone   # Tanpa backend (mock API)
npm run dev:backend      # Dengan backend (real API)

# Production
npm run build            # Build default
npm run build:standalone # Build untuk standalone (Vercel)
npm run build:backend    # Build dengan backend

# Preview
npm run preview          # Preview production build

# Setup
npm run install-frontend # Install dependencies
```

## 🌐 Deploy ke Vercel

Frontend bisa di-deploy ke Vercel tanpa memerlukan backend:

### Quick Deploy

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Set **Root Directory**: `frontend`
4. Add **Environment Variables**:
   ```
   VITE_USE_MOCK_API=true
   VITE_API_URL=/mock-api
   VITE_DEV_MODE=false
   ```
5. Deploy! 🚀

### Panduan Lengkap

Lihat dokumentasi detail di [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## 📚 Dokumentasi

- **[QUICK_START_STANDALONE.md](./QUICK_START_STANDALONE.md)** - Quick start guide
- **[STANDALONE_MODE.md](./STANDALONE_MODE.md)** - Mode standalone explained
- **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Deploy ke Vercel
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical summary
- **[INDEX_DOCUMENTATION.md](./INDEX_DOCUMENTATION.md)** - Documentation index
- **[CHECKLIST.md](./CHECKLIST.md)** - Deployment checklist

## 🔧 Configuration

### Mode Switching

Edit `frontend/.env` untuk switch mode:

```env
# Standalone Mode (tanpa backend)
VITE_USE_MOCK_API=true

# Backend Mode (dengan Django)
VITE_USE_MOCK_API=false
```

### Customize Mock Data

Edit `frontend/src/mocks/mockData.js` untuk mengubah data di standalone mode.

## 🎨 Features Detail

### Standalone Mode
- ✅ Semua halaman berfungsi normal
- ✅ Mock data untuk semua endpoint
- ✅ CRUD operations (in-memory)
- ✅ File upload simulation
- ✅ Authentication simulation
- ⚠️ Data tidak persistent (reset on refresh)

### Backend Mode
- ✅ Data persistent di database
- ✅ Real file upload
- ✅ Real authentication (JWT)
- ✅ Full CRUD operations
- ✅ Multi-user support

## 🤝 Contributing

Backend code ada di folder `backend/`. Untuk development:

1. Setup virtual environment
2. Install dependencies
3. Configure database
4. Run migrations
5. Start server

Lihat `backend/README.md` untuk detail.

## 📄 License

© 2025 PT. Bumi Kartanegara. All rights reserved.

## 🆘 Support

Untuk pertanyaan atau bantuan:
- Check dokumentasi di folder root
- Baca troubleshooting di [STANDALONE_MODE.md](./STANDALONE_MODE.md)
- Review checklist di [CHECKLIST.md](./CHECKLIST.md)

---

**Made with ❤️ for PT. Bumi Kartanegara**
