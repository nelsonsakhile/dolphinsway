# Antigravity E-Commerce Platform - Complete Specification

# Role and Objective
You are an expert full-stack developer specializing in Next.js 14+ (App Router), Tailwind CSS, TypeScript, and modern UI design. Your objective is to build a high-performance, responsive e-commerce web application called **Antigravity**. 

The design must map the dark, premium, luxurious look of the Colorlib Cakeshop template (dark backgrounds, striking typography, fluid carousels, clean product grids, hover transitions) into an futuristic multi-category tech and apparel marketplace.

---

# Tech Stack Requirements
- **Framework**: Next.js 14+ (App Router, Server Actions for forms, Optimized Images).
- **Styling**: Tailwind CSS configured for a deep luxury dark theme (e.g., Deep Slate/Obsidian `#0b0c10`, accents of Electric Blue or Chrome Silver instead of warm bakery tones).
- **Icons**: Lucide-React.
- **State Management**: React Context or Zustand for the shopping cart.

---

# Business & Catalog Context
**Brand Name**: Antigravity  
**Product Catalog & Categories**:
1. **Shoes**: Premium streetwear and athletic footwear.
2. **Men's Clothing**: Modern apparel, jackets, and essentials.
3. **Women's Clothing**: High-fashion and contemporary streetwear.
4. **iPhones**: Latest Apple devices, specs variants, and conditions.
5. **Electronic Accessories**: Chargers, cases, audio gear, and peripherals.

---

# Architecture & App Structure

## 1. Public Storefront (Cakeshop-Inspired Dark Layout)
Transform the sections of the Cakeshop template into our modern catalog:

### Navigation Bar
- Sticky, translucent dark floating navbar with a clean blur effect (`backdrop-blur-md`).
- Left: Logo text "ANTIGRAVITY" in a bold, spaced-out futuristic font.
- Center: Dropdown navigation linking cleanly to the 5 product categories.
- Right: Interactive Search bar tool, Wishlist icon, and dynamic Shopping Cart slider.

### Hero Section (Instead of Cake Slideshow)
- A high-impact full-screen image/video carousel showcasing cinematic product shots (e.g., floating sneakers, glowing tech specs) capturing the "Antigravity" theme.
- Clean typography overlay with a prominent primary Call-To-Action (CTA) button ("Shop Latest Drops").

### Category Showcase Grid
- A structural layout mapping the template's featured pastry blocks into a clean multi-grid.
- 5 distinct visual cards for Shoes, Men, Women, iPhones, and Accessories with smooth on-hover scaling and minimal textual labels.

### Product Presentation Grid
- Clean, grid-based card components displaying newly uploaded products dynamically.
- Each item card must include: Product image, hover-triggered alternate photo swap, clear pricing, badge indicators (e.g., "New Drop", "Low Stock"), and an absolute-positioned quick "Add to Cart" action button.

### Brand Narrative & Testimonials
- Parallax background scrolling section detailing the premium manufacturing and authenticity tracking of Antigravity products.
- Customer review carousel cleanly presenting user feedback.

---

## 2. E-Commerce Merchant Admin Dashboard
Build a completely separate, highly functional management panel (`/admin`) accessible only to the merchant.

### Layout Setup
- Sidebar tracking system: Dashboard Home, Inventory / Product Upload, Orders Tracker, Category Management, Analytics.
- Header showing user profile information and system notifications.

### Summary Metrics Row (Cards)
- Total Revenue (with monthly trend percentage).
- Active Orders counter.
- Total Stock Count.
- Out-of-Stock warnings.

### Functional Inventory Upload Form (`/admin/upload`)
A multi-field dynamic form configured to accept net-new product listings containing:
- **Title / Name**: Text field.
- **Category Selection**: Dropdown menu restricted strictly to the 5 core brand categories.
- **Price & Compare-At Price**: Numeric inputs with validation.
- **Stock Inventory**: Numeric quantity track.
- **Description**: Rich markdown or clear textarea text.
- **Product Images**: Drag-and-drop file mock field allowing multiple photo arrangements.
- **Dynamic Variant Tags**: Interactive input chips allowing merchants to append specific variables (e.g., Sizes: 9, 10, 11 for Shoes; Storage: 128GB, 256GB for iPhones).

### Live Product Table View
- A highly scannable datatable tracking all live stock across the storefront.
- Columns required: Image Thumbnail, Product Title, Selected Category, Price, Stock Status, Action buttons (Edit/Delete).
- Filter controls to sort instantly by Category or Low-Stock alerts.

---

# Generation Instructions
1. Generate the Next.js component structures cleanly using clean TypeScript typing.
2. Provide explicit file paths (e.g., `app/page.tsx`, `components/Navbar.tsx`, `app/admin/upload/page.tsx`).
3. Maintain mock state handling for product uploading so that submitting the Admin Form immediately appends the structural JSON payload to a visible local array, displaying the changes live on both the store route and backend table.
4. Ensure all code outputs strictly implement Tailwind CSS styling parameters that adhere to the luxury dark theme layout.

---

# Deployment Readiness Checklist
- [ ] All components properly typed with TypeScript
- [ ] Tailwind CSS production build configured
- [ ] Environment variables set up (.env.example provided)
- [ ] Image optimization configured for Next.js
- [ ] Mock data structure ready for database migration
- [ ] Admin routes protected (placeholder auth)
- [ ] Responsive design verified across breakpoints
- [ ] Build output validated (no console errors)
- [ ] Git repository initialized
- [ ] Ready for Vercel/Netlify deployment
