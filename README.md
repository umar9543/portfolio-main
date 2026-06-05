# Muhammad Umar — Full-Stack Developer Portfolio

A production-ready full-stack developer portfolio built with **Next.js 14 App Router**, **Three.js**, **MongoDB**, **JWT auth**, **Cloudinary**, and **Resend** — deployable to Vercel in one click.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/umar9543/portfolio)

---

## ✨ Features

- 🌌 **Three.js Hero** — 3000-particle galaxy + floating icosahedron (SSR-safe dynamic import)
- 🎭 **7 Animated Sections** — Hero, About, Skills, Projects, Experience, Contact, Footer
- ⚡ **Full Backend** — 12 API routes via Next.js App Router
- 🔐 **JWT Admin Auth** — jose library (Edge Runtime compatible), httpOnly cookies
- 📁 **MongoDB Atlas** — Mongoose with serverless singleton pattern
- 🖼️ **Cloudinary** — Image uploads with automatic optimization
- 📧 **Resend** — Email notifications on contact form submissions
- 🎛️ **Admin Panel** — Projects CRUD, messages inbox, mark read/unread
- 🌑 **Deep Space Theme** — Glassmorphism, grain texture, custom cursor

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/umar9543/portfolio.git
cd portfolio
npm install
```

### 2. Environment Variables

Copy `.env.local` and fill in your real values:

```bash
cp .env.local .env.local
```

| Variable | Where to get it |
|---|---|
| `MONGO_URI` | [MongoDB Atlas](https://cloud.mongodb.com) → Connect → Drivers |
| `JWT_SECRET` | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `CLOUDINARY_CLOUD_NAME` | [Cloudinary Console](https://console.cloudinary.com) → Dashboard |
| `CLOUDINARY_API_KEY` | Same as above |
| `CLOUDINARY_API_SECRET` | Same as above |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Same cloud name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Create unsigned upload preset named `portfolio_unsigned` |
| `RESEND_API_KEY` | [Resend](https://resend.com) → API Keys |
| `CONTACT_EMAIL` | Your email (mumer9543@gmail.com) |
| `SEED_SECRET` | Any secret string, e.g. `seed_abc123` |

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌱 Seed the Database (First Time Setup)

After setting up env vars and running the server:

```bash
curl -X POST http://localhost:3000/api/seed \
  -H "x-seed-secret: YOUR_SEED_SECRET"
```

This creates:
- Admin account: `admin@mumar.dev` / `Admin@1234`
- 4 real projects from your CV

> ⚠️ **After seeding:** Change the admin password or remove/disable the `/api/seed` route.

---

## 🔐 Admin Panel

Visit `/admin/login` and sign in with the seeded credentials.

| Page | URL | Description |
|---|---|---|
| Login | `/admin/login` | JWT auth |
| Dashboard | `/admin/dashboard` | Stats + recent messages |
| Projects | `/admin/projects` | Full CRUD with image upload |
| Messages | `/admin/messages` | Inbox with mark read |

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS |
| 3D / Motion | Three.js, @react-three/fiber, Framer Motion |
| Forms | React Hook Form + Zod |
| Database | MongoDB Atlas + Mongoose |
| Auth | jose (JWT, Edge Runtime compatible) |
| Images | Cloudinary |
| Email | Resend |
| Deployment | Vercel |

---

## 🌐 Vercel Deployment

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Add all environment variables in Vercel project settings
4. **MongoDB Atlas**: Add `0.0.0.0/0` to IP whitelist (Vercel uses dynamic IPs)
5. Deploy → call `/api/seed` once → done!

---

## 📂 Project Structure

```
/app
  /(public)        → Portfolio pages (Hero, About, Skills, etc.)
  /admin           → Admin panel (login, dashboard, projects, messages)
  /api             → 12 API routes (auth, projects, contact, upload, seed)
/components
  /three           → HeroCanvas, FloatingCube (Three.js)
  /sections        → 7 portfolio sections
  /ui              → Navbar, ProjectCard, AdminSidebar, CustomCursor
/lib               → db.ts, auth.ts, cloudinary.ts, validations.ts
/models            → Project.ts, Message.ts, Admin.ts
/middleware.ts     → Protects /admin/* routes
/public
  /resume.pdf      → Replace with your actual CV
```

---

## 📝 Customization

1. **Personal info**: Edit `components/sections/Hero.tsx`, `About.tsx`, `Contact.tsx`
2. **Projects**: Use admin panel at `/admin/projects`
3. **Resume**: Replace `public/resume.pdf` with your actual CV
4. **Colors**: Customize `--color-cyan` and `--color-violet` in `app/globals.css`

---

Built with ❤️ by Muhammad Umar
