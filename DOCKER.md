# Panduan Docker

## 🚀 Quick Start

```bash
# Build dan run
docker-compose up -d

# Lihat logs
docker-compose logs -f

# Stop
docker-compose down
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📦 Build Image

```bash
# Build image
docker build -t amark-nextjs:latest .

# Run container
docker run -d --name amark-nextjs -p 3000:3000 --restart unless-stopped amark-nextjs:latest
```

## 🔍 Monitoring

```bash
# Logs
docker-compose logs -f

# Status
docker ps

# Stats
docker stats amark-nextjs
```

## 🔧 Troubleshooting

### Build Error (SIGKILL)

Jika build gagal karena kehabisan memori:

```bash
# Build dengan memory limit (Podman)
podman build --memory=4g -t amark-nextjs:latest .

# Build tanpa cache
docker build --no-cache -t amark-nextjs:latest .
```

### Port Sudah Digunakan

```bash
# Gunakan port lain
docker run -d -p 3001:3000 amark-nextjs:latest
```

## 📝 Catatan

- **Package Manager**: Bun (untuk install dependencies dan build)
- **Build Tool**: Bun (lebih efisien memori dan cepat dibanding npm)
- **Runtime**: Node.js (Next.js standalone output memerlukan Node.js untuk menjalankan server)
- **Image Registry**: GHCR (otomatis build saat push ke branch `master`)

## 📚 Referensi

- [Docker Docs](https://docs.docker.com/)
- [Next.js Docker](https://nextjs.org/docs/deployment#docker-image)
