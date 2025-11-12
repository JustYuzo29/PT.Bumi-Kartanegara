# 🚀 PT. Bumi Kartanegara - Frontend Standalone# Staff Management System



Frontend web application untuk PT. Bumi Kartanegara yang bisa berjalan **standalone** (tanpa backend) atau dengan backend Django.A full-stack web application built with React (frontend) and Django (backend) for managing staff and company information for PT. BUMI KARTANEGARA.



## ✨ Fitur## Features



- 🎨 **Responsive Design** - Tampilan optimal di semua perangkat- Staff management system

- 🌓 **Dark Mode** - Toggle antara light dan dark theme- Company profile management

- 🌍 **Multi-language** - Support Bahasa Indonesia & English- Project portfolio

- 📱 **Mobile-First** - Optimized untuk pengalaman mobile- News and testimonials

- ⚡ **Fast & Modern** - Built with React + Vite- Contact management

- 🎯 **Standalone Mode** - Bisa berjalan tanpa backend (mock API)- User authentication and logging



### Halaman Tersedia## Tech Stack



- **Home** - Landing page dengan hero, services, dan about preview### Frontend

- **About Us** - Profil perusahaan, visi misi, struktur organisasi- React + Vite

- **Services** - Layanan yang ditawarkan- TailwindCSS

- **Media** - Gallery foto dan video- JavaScript/JSX

- **Contact** - Informasi kontak dan form

- **Staff Dashboard** - Panel untuk staff mengelola konten### Backend

- **Admin Dashboard** - Panel untuk admin- Django 5.2+

- Django REST Framework

## 🛠️ Tech Stack- MySQL Database

- CORS support

### Frontend

- ⚛️ **React 19** - UI Library## Database Setup

- ⚡ **Vite 7** - Build tool & dev server

- 🎨 **TailwindCSS 4** - Utility-first CSS frameworkThis application uses MySQL as the primary database. The database schema is provided in `bumi_kartanegara.sql`.

- 🧭 **React Router 7** - Client-side routing

- 📊 **Chart.js** - Data visualization### MySQL Configuration

- 🎭 **Material UI** - Component library

- 📱 **React Icons** - Icon library1. Install MySQL server on your system

2. Create a database named `bumi_kartanegara`

### Backend (Optional)3. Import the schema:

- 🐍 **Django 5.2** - Python web framework   ```bash

- 🔌 **Django REST Framework** - API framework   mysql -u root -p bumi_kartanegara < bumi_kartanegara.sql

- 💾 **MySQL** - Database (jika menggunakan backend)   ```



## 🚀 Quick Start4. Configure environment variables by copying `.env.example` to `.env`:

   ```bash

### Mode Standalone (Tanpa Backend)   cp .env.example .env

   ```

Frontend bisa berjalan sendiri dengan mock data, cocok untuk demo atau deployment di Vercel.

5. Update the `.env` file with your MySQL credentials:

```bash   ```

# Install dependencies   DB_NAME=bumi_kartanegara

npm install-frontend   DB_USER=your_mysql_user

   DB_PASSWORD=your_mysql_password

# Run development server (standalone mode)   DB_HOST=localhost

npm run dev:standalone   DB_PORT=3306

   ```

# Build for production

npm run build:standalone## Installation



# Preview production build### Backend Setup

npm run preview

```1. Navigate to the backend directory:

   ```bash

Frontend akan berjalan di **http://localhost:5173/**   cd backend

   ```

### Mode Dengan Backend

2. Install Python dependencies:

Jika ingin menggunakan backend Django untuk data persistent:   ```bash

   pip install -r ../requirements.txt

```bash   ```

# 1. Install frontend dependencies

npm install-frontend3. Run Django migrations:

   ```bash

# 2. Run frontend (akan connect ke backend)   python manage.py migrate

npm run dev:backend   ```

```

4. Create a superuser (optional):

Backend harus running di port 8000. Lihat folder `backend/` untuk setup Django.   ```bash

   python manage.py createsuperuser

## 📁 Struktur Project   ```



```5. Start the Django development server:

staff/   ```bash

├── frontend/               # Frontend React application   python manage.py runserver

│   ├── src/   ```

│   │   ├── components/    # React components

│   │   ├── Pages/         # Page components### Frontend Setup

│   │   ├── mocks/         # Mock data & API (untuk standalone)

│   │   ├── lib/           # Utilities & API1. Install Node.js dependencies:

│   │   ├── locales/       # Translations (ID/EN)   ```bash

│   │   └── assets/        # Images & static files   npm install

│   ├── .env               # Development config   ```

│   ├── .env.production    # Production config (standalone)

│   └── package.json2. Start the development server:

│   ```bash

├── backend/               # Django backend (optional)   npm run dev

│   ├── backend/          # Django settings   ```

│   ├── core/             # Main app

│   └── manage.py## React + Vite

│

├── .venv/                # Python virtual environmentThis template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

│

└── Documentation files...Currently, two official plugins are available:

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
