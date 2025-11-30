# PT. Bumi Kartanegara - Pre-Deploy Verification Script (PowerShell)
# Run this before deploying to Vercel

Write-Host "🚀 PT. BUMI KARTANEGARA - Pre-Deploy Check" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-Not (Test-Path "vercel.json")) {
    Write-Host "❌ Error: vercel.json not found" -ForegroundColor Red
    Write-Host "Please run this script from the project root directory" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Project root directory confirmed" -ForegroundColor Green
Write-Host ""

# Check required files
Write-Host "📁 Checking required files..." -ForegroundColor Cyan
$files = @("vercel.json", ".vercelignore", "frontend\package.json", "frontend\vite.config.js")
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file (MISSING)" -ForegroundColor Red
        exit 1
    }
}
Write-Host ""

# Check frontend directory
Write-Host "📂 Checking frontend directory..." -ForegroundColor Cyan
if (Test-Path "frontend" -PathType Container) {
    Write-Host "  ✓ frontend/ exists" -ForegroundColor Green
} else {
    Write-Host "  ✗ frontend/ (NOT FOUND)" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Check Node.js
Write-Host "🔍 Checking Node.js..." -ForegroundColor Cyan
try {
    $nodeVersion = node -v
    Write-Host "  ✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Node.js (NOT INSTALLED)" -ForegroundColor Red
    Write-Host "  Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Check npm
Write-Host "📦 Checking npm..." -ForegroundColor Cyan
try {
    $npmVersion = npm -v
    Write-Host "  ✓ npm installed: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ npm (NOT INSTALLED)" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Navigate to frontend
Set-Location frontend

# Check dependencies
Write-Host "🔧 Checking dependencies..." -ForegroundColor Cyan
if (Test-Path "node_modules" -PathType Container) {
    Write-Host "  ✓ node_modules exists" -ForegroundColor Green
} else {
    Write-Host "  ⚠ node_modules not found - installing..." -ForegroundColor Yellow
    npm install
}
Write-Host ""

# Test build
Write-Host "🏗️  Testing build..." -ForegroundColor Cyan
Write-Host "This may take 30-60 seconds..." -ForegroundColor Yellow
Write-Host ""

try {
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ BUILD SUCCESS!" -ForegroundColor Green
    } else {
        throw "Build failed"
    }
} catch {
    Write-Host ""
    Write-Host "❌ BUILD FAILED" -ForegroundColor Red
    Write-Host "Please fix build errors before deploying" -ForegroundColor Yellow
    Set-Location ..
    exit 1
}
Write-Host ""

# Check build output
if (Test-Path "dist" -PathType Container) {
    Write-Host "✓ dist/ directory created" -ForegroundColor Green
    
    if (Test-Path "dist\index.html") {
        Write-Host "✓ index.html generated" -ForegroundColor Green
    } else {
        Write-Host "✗ index.html (NOT FOUND)" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
    
    if (Test-Path "dist\assets" -PathType Container) {
        Write-Host "✓ assets/ directory created" -ForegroundColor Green
    } else {
        Write-Host "⚠ assets/ directory not found" -ForegroundColor Yellow
    }
} else {
    Write-Host "✗ dist/ (BUILD OUTPUT NOT FOUND)" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Write-Host ""

# Go back to root
Set-Location ..

# Final checks
Write-Host "🎯 Final verification..." -ForegroundColor Cyan
Write-Host "✓ All configuration files present" -ForegroundColor Green
Write-Host "✓ Dependencies installed" -ForegroundColor Green
Write-Host "✓ Build successful" -ForegroundColor Green
Write-Host "✓ Output directory verified" -ForegroundColor Green
Write-Host ""

# Success message
Write-Host "==========================================" -ForegroundColor Green
Write-Host "🎉 ALL CHECKS PASSED!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your project is ready for deployment!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Commit your changes:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Ready for Vercel deployment'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Deploy to Vercel:" -ForegroundColor White
Write-Host "   - Visit https://vercel.com" -ForegroundColor Gray
Write-Host "   - Import your repository" -ForegroundColor Gray
Write-Host "   - Click Deploy" -ForegroundColor Gray
Write-Host ""
Write-Host "Or use Vercel CLI:" -ForegroundColor White
Write-Host "   npm i -g vercel" -ForegroundColor Gray
Write-Host "   vercel --prod" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 For help, check:" -ForegroundColor Yellow
Write-Host "   - QUICK_DEPLOY.md (Quick guide)" -ForegroundColor Gray
Write-Host "   - DEPLOYMENT.md (Full guide)" -ForegroundColor Gray
Write-Host "   - VERCEL_ERRORS.md (Troubleshooting)" -ForegroundColor Gray
Write-Host ""
