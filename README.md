# ACRE26 - Platform Kursus Online

Platform pembelajaran online yang dibangun dengan Next.js untuk menampilkan dan mengelola kursus, pelajaran, sertifikat, dan langganan.

## Teknologi yang Digunakan

Proyek ini dibangun dengan:

- **Next.js 14** - Framework React dengan App Router
- **TypeScript** - Type safety untuk JavaScript
- **React 18** - Library UI
- **shadcn/ui** - Komponen UI yang dapat dikustomisasi
- **Tailwind CSS** - Framework CSS utility-first
- **React Query (TanStack Query)** - State management dan data fetching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Icon library

## Fitur

- 🎓 **Katalog Kursus** - Browse dan cari kursus berdasarkan kategori
- 📚 **Detail Kursus** - Lihat detail kursus dan pelajaran
- 🎥 **Pelajaran** - Akses konten pelajaran
- 📜 **Sertifikat** - Kelola sertifikat penyelesaian
- 💳 **Langganan** - Manajemen paket langganan
- 👤 **Profil** - Edit profil dan password
- 🔔 **Notifikasi** - Sistem notifikasi
- 🤝 **Afiliasi** - Program afiliasi

## Persyaratan

- Node.js 18+ atau Bun
- npm, yarn, pnpm, atau bun

## Instalasi dan Menjalankan Proyek

### Menggunakan npm

```sh
# Clone repository
git clone <YOUR_GIT_URL>

# Masuk ke direktori proyek
cd acre26

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

### Menggunakan Bun

```sh
# Clone repository
git clone <YOUR_GIT_URL>

# Masuk ke direktori proyek
cd acre26

# Install dependencies
bun install

# Jalankan development server
bun run dev
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000)

## Scripts yang Tersedia

- `npm run dev` - Menjalankan development server
- `npm run build` - Build aplikasi untuk production
- `npm run start` - Menjalankan production server
- `npm run lint` - Menjalankan ESLint

## Struktur Proyek

```
src/
├── app/              # Next.js App Router pages
│   ├── course/       # Halaman kursus
│   ├── certificate/  # Halaman sertifikat
│   ├── subscription/ # Halaman langganan
│   ├── settings/     # Halaman pengaturan
│   └── ...
├── components/        # Komponen React
│   ├── ui/           # shadcn/ui components
│   └── ...
├── pages/            # Komponen halaman
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── data/             # Data statis
```

## Deployment

Untuk deploy aplikasi ini, Anda dapat menggunakan:

- **Vercel** (Recommended untuk Next.js)
- **Netlify**
- **AWS Amplify**
- Platform lainnya yang mendukung Next.js

### Deploy ke Vercel

```sh
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Lisensi

Private project
