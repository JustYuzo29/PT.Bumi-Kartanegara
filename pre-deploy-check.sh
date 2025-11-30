#!/usr/bin/env bash

# PT. Bumi Kartanegara - Pre-Deploy Verification Script
# Run this before deploying to Vercel

echo "🚀 PT. BUMI KARTANEGARA - Pre-Deploy Check"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    echo -e "${RED}❌ Error: vercel.json not found${NC}"
    echo "Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project root directory confirmed"
echo ""

# Check required files
echo "📁 Checking required files..."
FILES=("vercel.json" ".vercelignore" "frontend/package.json" "frontend/vite.config.js")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file"
    else
        echo -e "  ${RED}✗${NC} $file ${RED}(MISSING)${NC}"
        exit 1
    fi
done
echo ""

# Check frontend directory
echo "📂 Checking frontend directory..."
if [ -d "frontend" ]; then
    echo -e "  ${GREEN}✓${NC} frontend/ exists"
else
    echo -e "  ${RED}✗${NC} frontend/ ${RED}(NOT FOUND)${NC}"
    exit 1
fi
echo ""

# Check Node.js
echo "🔍 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "  ${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "  ${RED}✗${NC} Node.js ${RED}(NOT INSTALLED)${NC}"
    echo "  Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo ""

# Check npm
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "  ${GREEN}✓${NC} npm installed: v$NPM_VERSION"
else
    echo -e "  ${RED}✗${NC} npm ${RED}(NOT INSTALLED)${NC}"
    exit 1
fi
echo ""

# Navigate to frontend
cd frontend

# Check dependencies
echo "🔧 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "  ${GREEN}✓${NC} node_modules exists"
else
    echo -e "  ${YELLOW}⚠${NC} node_modules not found - installing..."
    npm install
fi
echo ""

# Test build
echo "🏗️  Testing build..."
echo -e "${YELLOW}This may take 30-60 seconds...${NC}"
echo ""

if npm run build; then
    echo ""
    echo -e "${GREEN}✅ BUILD SUCCESS!${NC}"
else
    echo ""
    echo -e "${RED}❌ BUILD FAILED${NC}"
    echo "Please fix build errors before deploying"
    exit 1
fi
echo ""

# Check build output
if [ -d "dist" ]; then
    echo -e "${GREEN}✓${NC} dist/ directory created"
    
    if [ -f "dist/index.html" ]; then
        echo -e "${GREEN}✓${NC} index.html generated"
    else
        echo -e "${RED}✗${NC} index.html ${RED}(NOT FOUND)${NC}"
        exit 1
    fi
    
    if [ -d "dist/assets" ]; then
        echo -e "${GREEN}✓${NC} assets/ directory created"
    else
        echo -e "${YELLOW}⚠${NC} assets/ directory not found"
    fi
else
    echo -e "${RED}✗${NC} dist/ ${RED}(BUILD OUTPUT NOT FOUND)${NC}"
    exit 1
fi
echo ""

# Go back to root
cd ..

# Final checks
echo "🎯 Final verification..."
echo -e "${GREEN}✓${NC} All configuration files present"
echo -e "${GREEN}✓${NC} Dependencies installed"
echo -e "${GREEN}✓${NC} Build successful"
echo -e "${GREEN}✓${NC} Output directory verified"
echo ""

# Success message
echo "=========================================="
echo -e "${GREEN}🎉 ALL CHECKS PASSED!${NC}"
echo "=========================================="
echo ""
echo "Your project is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Commit your changes:"
echo "   git add ."
echo "   git commit -m 'Ready for Vercel deployment'"
echo "   git push origin main"
echo ""
echo "2. Deploy to Vercel:"
echo "   - Visit https://vercel.com"
echo "   - Import your repository"
echo "   - Click Deploy"
echo ""
echo "Or use Vercel CLI:"
echo "   npm i -g vercel"
echo "   vercel --prod"
echo ""
echo "📖 For help, check:"
echo "   - QUICK_DEPLOY.md (Quick guide)"
echo "   - DEPLOYMENT.md (Full guide)"
echo "   - VERCEL_ERRORS.md (Troubleshooting)"
echo ""
