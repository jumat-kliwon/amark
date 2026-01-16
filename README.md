# ACRE26 - Platform Kursus Online

Platform pembelajaran online yang dibangun dengan Next.js untuk menampilkan dan mengelola kursus, pelajaran, sertifikat, dan langganan.

## Teknologi yang Digunakan

Proyek ini dibangun dengan:

- **Next.js 16.1.2** - Framework React dengan App Router, Turbopack, dan React Compiler
- **React 19** - Library UI dengan optimasi terbaru
- **TypeScript 5.8+** - Type safety untuk JavaScript
- **Turbopack** - Bundler default Next.js 16 untuk build dan dev yang lebih cepat
- **React Compiler** - Optimasi render otomatis dan memoization
- **shadcn/ui** - Komponen UI yang dapat dikustomisasi
- **Tailwind CSS** - Framework CSS utility-first
- **React Query (TanStack Query)** - State management dan data fetching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Icon library

## Fitur

### Fitur Aplikasi
- 🎓 **Katalog Kursus** - Browse dan cari kursus berdasarkan kategori
- 📚 **Detail Kursus** - Lihat detail kursus dan pelajaran
- 🎥 **Pelajaran** - Akses konten pelajaran
- 📜 **Sertifikat** - Kelola sertifikat penyelesaian
- 💳 **Langganan** - Manajemen paket langganan
- 👤 **Profil** - Edit profil dan password
- 🔔 **Notifikasi** - Sistem notifikasi
- 🤝 **Afiliasi** - Program afiliasi

### Fitur Teknologi Next.js 16
- ⚡ **Turbopack** - Build dan dev server yang lebih cepat (default bundler)
- 🚀 **React Compiler** - Optimasi render otomatis, mengurangi kebutuhan `useMemo` dan `useCallback` manual
- 💾 **Image Optimization** - Optimasi gambar dengan cache TTL 4 jam default
- 📦 **Modern Tooling** - ESLint 9, TypeScript 5.8+, dan tooling terbaru

## Persyaratan

- **Node.js 20.9.0+** (Next.js 16 memerlukan Node.js 20.9.0 atau lebih tinggi)
- npm, yarn, pnpm, atau bun
- TypeScript 5.1.0+ (sudah termasuk dalam dependencies)

## Instalasi dan Menjalankan Proyek

### Menggunakan npm

```sh
# Clone repository
git clone <YOUR_GIT_URL>

# Masuk ke direktori proyek
cd acre26

# Install dependencies
npm install --legacy-peer-deps

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

- `npm run dev` - Menjalankan development server dengan Turbopack (default)
- `npm run build` - Build aplikasi untuk production dengan Turbopack
- `npm run start` - Menjalankan production server
- `npm run lint` - Menjalankan ESLint (Next.js 16 menggunakan ESLint 9)

### Catatan Build

- Next.js 16 menggunakan **Turbopack** sebagai bundler default untuk build dan dev yang lebih cepat
- Jika perlu menggunakan Webpack (tidak disarankan), gunakan: `next dev --webpack` atau `next build --webpack`

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

- **Vercel** (Recommended untuk Next.js 16)
- **Netlify**
- **AWS Amplify**
- Platform lainnya yang mendukung Next.js 16

### Persyaratan Deployment

Pastikan platform deployment Anda mendukung:
- **Node.js 20.9.0+** (wajib untuk Next.js 16)
- Next.js 16.1.2 dengan Turbopack

### Deploy ke Vercel

```sh
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Vercel secara otomatis akan mendeteksi Next.js 16 dan menggunakan konfigurasi optimal.

## Lisensi

Private project
