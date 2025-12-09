# 🌙 Lento Coffee

> **Crafted Slowly. Inspired by Heritage.**

A luxury coffee brand web application featuring an authentic Arabian carpet aesthetic, built with Next.js, TypeScript, and modern web technologies.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)
![Sanity](https://img.shields.io/badge/Sanity-CMS-f03e2f)

---

## ✨ Features

### 🎨 Design & Aesthetics
- **Arabian Carpet Theme**: Intricate geometric patterns, ornamental borders, and medallion motifs
- **Dual Color Palettes**:
  - 🌞 **Light Mode**: Desert Carpet (Deep Red, Rich Gold, Sand Beige, Coffee Brown, Emerald)
  - 🌙 **Dark Mode**: Midnight Carpet (Midnight Blue, Burgundy, Antique Gold, Shadowed Browns)
- **Smooth Animations**: Gentle fade-ins, slides, and textile-like shimmer effects
- **Premium Typography**: Amiri, Cairo, Inter, Noto Naskh Arabic

### 🌍 Internationalization
- **Full Bilingual Support**: English & Arabic
- **RTL/LTR Switching**: Automatic direction change based on language
- **Localized Content**: All UI text and product descriptions in both languages

### 🛠️ Technical Features
- **REST API**: Full CRUD operations for products
- **Sanity CMS**: Ready for headless CMS integration
- **Dark/Light Theme**: Smooth transitions with localStorage persistence
- **Responsive Design**: Mobile-first, works on all devices
- **Type-Safe**: Strict TypeScript throughout

---

## 📁 Project Structure

```
lento-2/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Root layout with i18n
│   │   ├── page.tsx             # Landing page
│   │   ├── products/
│   │   │   ├── page.tsx         # Products listing
│   │   │   └── [id]/page.tsx    # Product details
│   │   ├── about/page.tsx       # About page
│   │   └── contact/page.tsx     # Contact page
│   ├── api/
│   │   └── products/
│   │       ├── route.ts         # GET, POST /api/products
│   │       └── [id]/route.ts    # GET, PUT, DELETE /api/products/[id]
│   └── globals.css              # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Navigation with theme/lang toggles
│   │   └── Footer.tsx           # Footer with carpet motifs
│   ├── patterns/
│   │   ├── CarpetPattern.tsx    # SVG carpet patterns
│   │   └── Divider.tsx          # Ornamental dividers
│   ├── products/
│   │   └── ProductCard.tsx      # Product card component
│   └── ui/
│       ├── Button.tsx           # Reusable button
│       ├── ThemeToggle.tsx      # Theme switcher
│       └── LanguageSwitcher.tsx # Language switcher
├── lib/
│   ├── contexts/
│   │   └── ThemeContext.tsx     # Theme provider
│   ├── data/
│   │   └── products.json        # Mock product data
│   ├── sanity/
│   │   └── client.ts            # Sanity helpers
│   ├── types/
│   │   └── product.ts           # TypeScript types
│   └── utils.ts                 # Utility functions
├── cms/
│   ├── sanity.config.ts         # Sanity configuration
│   └── schemas/
│       ├── index.ts             # Schema registry
│       └── product.ts           # Product schema
├── i18n/
│   ├── request.ts               # i18n configuration
│   └── locales/
│       ├── en.json              # English translations
│       └── ar.json              # Arabic translations
├── middleware.ts                # Locale routing
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone or navigate to the project
cd lento-2

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/en` or `/ar`)

---

## 🎨 Color System

### Light Mode - Desert Carpet Palette
```css
Deep Red:      #8B1E1E
Rich Gold:     #C8A652
Sand Beige:    #E9D7B1
Coffee Brown:  #5B3A29
Emerald:       #0F6B4F
```

### Dark Mode - Midnight Carpet Palette
```css
Midnight Blue: #0C1B33
Burgundy:      #4A0E23
Antique Gold:  #A89038
Shadowed Brown:#36231A
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List all products (with filters) |
| `GET` | `/api/products/[id]` | Get single product |
| `POST` | `/api/products` | Create product |
| `PUT` | `/api/products/[id]` | Update product |
| `DELETE` | `/api/products/[id]` | Delete product |

### Query Parameters (GET /api/products)
- `category` - Filter by category (arabica, robusta, blend, specialty)
- `search` - Search in name/description
- `featured` - Show only featured products
- `minPrice` / `maxPrice` - Price range filter

### Example Request
```bash
curl http://localhost:3000/api/products?category=arabica&featured=true
```

---

## 🗄️ Sanity CMS Setup

1. **Create Sanity Project**
   ```bash
   npm install -g @sanity/cli
   sanity init
   ```

2. **Configure Environment**
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-03-15
   SANITY_API_TOKEN=your_write_token
   ```

3. **Import Schemas**
   - Copy schemas from `cms/schemas/` to your Sanity Studio
   - Deploy: `sanity deploy`

4. **Fetch Data**
   - The app will automatically fetch from Sanity if configured
   - Falls back to `lib/data/products.json` if not configured

---

## 📜 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run type-check # Run TypeScript checks
```

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

**Auto-configuration**: Vercel automatically detects Next.js and applies optimal settings.

---

## 🎯 Design Philosophy

Lento Coffee embodies the intersection of **slow craftsmanship** and **cultural heritage**:

- **Slow**: Gentle animations, thoughtful spacing, patient pacing
- **Heritage**: Arabian carpet patterns, traditional motifs, cultural authenticity
- **Luxury**: Premium color palettes, elegant typography, refined details
- **Modern**: Clean interfaces, smooth interactions, responsive layouts

---

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 📝 License

© 2024 Lento Coffee. All rights reserved.

---

## 🙏 Credits

- **Design Inspiration**: Traditional Arabian & Persian carpets
- **Fonts**: Google Fonts (Amiri, Cairo, Inter, Noto Naskh Arabic)
- **Icons**: Lucide React
- **Framework**: Next.js by Vercel

---

**Built with ☕ and patience**
