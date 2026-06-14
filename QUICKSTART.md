# Antigravity - Quick Start Guide

Welcome to the Antigravity e-commerce platform! This guide will get you up and running in minutes.

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to: **http://localhost:3000**

That's it! You're ready to go.

---

## 📱 What You Get

### Public Storefront
- **Home Page** (`/`): Full showcase with hero section, categories, and products
- **Category Pages** (`/category/shoes`, `/category/mens`, etc.): Browse products by category
- **Shopping Cart**: Click cart icon in navbar to view and manage items
- **Product Cards**: Hover to see quick add-to-cart button

### Admin Dashboard
- **Dashboard** (`/admin`): Overview metrics and statistics
- **Upload Products** (`/admin/upload`): Add new products with variants
- **Inventory** (`/admin/inventory`): Manage all products in a table
- **Orders** (`/admin/orders`): Track customer orders
- **Analytics** (`/admin/analytics`): View sales and performance data

---

## 🎯 Key Features Overview

### Adding a Product (Admin)
1. Go to **http://localhost:3000/admin/upload**
2. Fill in product details:
   - Name, Category, Price, Stock
   - Description and optional compare-at price
3. Select or add variants (sizes, colors, storage, etc.)
4. Click "Publish Product"
5. ✅ Product appears instantly on storefront!

### Shopping (Public)
1. Browse home page or use category links
2. Hover over product cards to see details
3. Click "Add to Cart" button
4. Cart count updates in navbar
5. Click cart icon to review and checkout

### Managing Inventory
1. Go to **http://localhost:3000/admin/inventory**
2. Filter by category or low stock status
3. View product details in table
4. Edit or delete products using action buttons

---

## 🛠️ Common Commands

```bash
# Start development server
npm run dev

# Create production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 📁 File Structure

```
app/              ← Page files
├── page.tsx      ← Home page
├── layout.tsx    ← Root layout
├── admin/        ← Admin pages
└── category/     ← Category pages

components/       ← Reusable components
├── Navbar.tsx
├── ProductCard.tsx
└── ...

lib/              ← State management
└── store/
    ├── cartStore.ts
    └── productStore.ts
```

---

## 🎨 Customization Tips

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'dark-bg': '#your-color',     // Background
  'accent-blue': '#your-color',  // Primary accent
  // ...
}
```

### Add New Categories
1. Update `Product['category']` type in `lib/store/productStore.ts`
2. Add route: `app/category/[new-category]/page.tsx`
3. Update navbar categories array in `components/Navbar.tsx`

### Customize Product Images
- Replace Unsplash URLs with your own images
- Or use local images in `public/` folder

---

## 🔧 Troubleshooting

### Port 3000 Already in Use?
```bash
npm run dev -- -p 3001
```

### Styles Not Showing?
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run dev
```

### Can't Access Admin Dashboard?
- Make sure you're at `http://localhost:3000/admin`
- Check that the admin layout file exists at `app/admin/layout.tsx`

---

## 📦 Making it Yours

### Update Branding
1. Change "ANTIGRAVITY" text in `components/Navbar.tsx`
2. Update colors in `tailwind.config.js`
3. Add your logo to `components/Navbar.tsx`
4. Update product data in `lib/store/productStore.ts`

### Add More Products
1. Go to `/admin/upload`
2. Fill form and publish
3. Product appears immediately on storefront

### Customize Homepage
Edit these components in `app/page.tsx`:
- `HeroSection`: Change headline and images
- `CategoryShowcase`: Customize categories
- `ProductsSection`: Adjust grid layout
- `BrandNarrativeSection`: Update brand story

---

## 🚀 Deploy to Production

### Simplest: Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel --prod
```

### Alternative: Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=.next
```

---

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Docs](https://github.com/pmndrs/zustand)

---

## 💡 Next Steps

1. ✅ Get the development server running
2. 📸 Add your product images
3. 🎨 Customize colors and branding
4. 🚀 Deploy to production
5. 🔐 Add authentication (for real products)
6. 💳 Integrate payments (Stripe, PayPal)

---

## ❓ Need Help?

### Project Files
- **README.md**: Full documentation
- **DEPLOYMENT_CHECKLIST.md**: Deployment guide
- **ANTIGRAVITY_SPEC.md**: Original specifications

### Common Issues
Check README.md → Troubleshooting section

### Support
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/support
- GitHub Issues: Create a discussion

---

**Happy coding! 🚀 Your Antigravity store is ready to launch.**
