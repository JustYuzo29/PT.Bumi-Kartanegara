# 🚀 Quick Deploy Guide - PT. Bumi Kartanegara

## ⚡ Fast Track Deployment

### 1. Pre-Deploy Check (2 minutes)

```bash
# Navigate to frontend
cd frontend

# Clean install
npm install

# Test build
npm run build

# Test preview
npm run preview
```

✅ If preview works at http://localhost:4173, you're ready to deploy!

---

### 2. Deploy to Vercel (3 steps)

#### Option A: GitHub Integration (Recommended)
1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. Connect to Vercel:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import: `JustYuzo29/PT.Bumi-Kartanegara`
   
3. Configure (Auto-detected):
   - Framework: **Vite** ✅
   - Build Command: **Auto from vercel.json** ✅
   - Output: **frontend/dist** ✅
   - Click **Deploy**

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

### 3. Post-Deploy Verification

- [ ] Website loads at Vercel URL
- [ ] All pages accessible (Home, About, Services, Contact, Media)
- [ ] Images display correctly
- [ ] Dark mode toggle works
- [ ] Language switcher works (ID/EN)
- [ ] Navigation functional
- [ ] No console errors

---

## 🔧 If Deploy Fails

### Quick Fix #1: Build Error
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Quick Fix #2: 404 Errors
Already fixed in `vercel.json`:
```json
"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]
```

### Quick Fix #3: Check Logs
1. Vercel Dashboard → Deployments
2. Click failed deployment
3. Read "Build Logs"
4. Check `VERCEL_ERRORS.md` for solution

---

## 📋 Configuration Files (All Set ✅)

| File | Status | Purpose |
|------|--------|---------|
| `vercel.json` | ✅ | Build config, routing, headers |
| `.vercelignore` | ✅ | Exclude backend files |
| `vite.config.js` | ✅ | Build optimization |
| `package.json` | ✅ | Dependencies |

---

## 🎯 Expected Results

### Build Time
- **Average**: 2-3 minutes
- **Region**: Singapore (sin1)
- **Node Version**: Latest LTS

### Output
```
✓ Building for production...
✓ 127 modules transformed.
✓ Built in 45s
✓ Output directory: frontend/dist
```

### Live URL
`https://pt-bumi-kartanegara-[random].vercel.app`

---

## 🆘 Emergency Help

**Build fails?** → Check `VERCEL_ERRORS.md`
**404 errors?** → Already fixed with rewrites
**500 errors?** → Check Vercel status page
**Still stuck?** → Contact Vercel support

---

## ✨ What's Included

- ✅ React 19 + Vite 7
- ✅ TailwindCSS 4
- ✅ React Router v7
- ✅ Mock API (no backend needed)
- ✅ Multi-language (ID/EN)
- ✅ Dark Mode
- ✅ Fully Responsive
- ✅ Security Headers
- ✅ Cache Optimization
- ✅ Code Splitting

---

## 📞 Resources

- **Full Guide**: `DEPLOYMENT.md`
- **Error Solutions**: `VERCEL_ERRORS.md`
- **Vercel Docs**: https://vercel.com/docs
- **Repository**: https://github.com/JustYuzo29/PT.Bumi-Kartanegara

---

**Ready to deploy?** Just push to GitHub and let Vercel handle the rest! 🚀
