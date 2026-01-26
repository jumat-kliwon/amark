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

### Build Error (SIGKILL / Segmentation Fault)

**Error yang muncul:**
```
npm error signal SIGKILL
error: script "build" was terminated by signal SIGKILL (Forced quit)
container exited on segmentation fault
```

**Penyebab:**
1. **Out of Memory (OOM)**: Build Next.js membutuhkan banyak memori (biasanya 2-4GB+)
2. **Container Memory Limit**: Podman/Docker container tidak memiliki cukup memori yang dialokasikan
3. **OOM Killer**: Sistem operasi memaksa kill process ketika memori habis

**Mengapa terjadi SIGKILL?**
- Ketika container kehabisan memori, Linux OOM (Out-Of-Memory) killer akan menghentikan proses dengan SIGKILL
- Ini berbeda dengan error biasa - process dihentikan secara paksa oleh sistem
- `NODE_OPTIONS="--max-old-space-size=4096"` hanya mengatur limit Node.js, tapi jika container sendiri tidak punya cukup memori, OOM killer tetap akan kill process

**Solusi:**

#### 1. **Menggunakan Script Helper (Recommended)**
```bash
# Build dengan memory limit 4GB (default)
./build-docker.sh

# Build dengan memory limit custom
./build-docker.sh 6g amark-nextjs:latest
```

#### 2. **Build Manual dengan Podman**
```bash
# Build dengan memory limit 4GB
podman build --memory=4g -t amark-nextjs:latest .

# Jika masih gagal, coba dengan 6GB
podman build --memory=6g -t amark-nextjs:latest .

# Build tanpa cache jika ada masalah cache
podman build --memory=4g --no-cache -t amark-nextjs:latest .
```

#### 3. **Build dengan Podman Compose**
**PENTING**: `podman-compose` tidak support `--memory` flag langsung. Gunakan salah satu cara:

**Cara A: Build image terlebih dahulu dengan podman build**
```bash
# Build image dengan memory limit
podman build --memory=4g -t amark-nextjs:latest .

# Kemudian gunakan image yang sudah di-build
podman-compose up -d
```

**Cara B: Edit docker-compose.yml untuk menggunakan image yang sudah di-build**
Atau gunakan script helper di atas.

#### 4. **Build dengan Docker**
```bash
# Docker tidak support --memory flag, tapi bisa menggunakan BuildKit
DOCKER_BUILDKIT=1 docker build -t amark-nextjs:latest .

# Atau build tanpa cache
DOCKER_BUILDKIT=1 docker build --no-cache -t amark-nextjs:latest .
```

**Catatan Penting:**
- ✅ **Dockerfile sudah dioptimasi**: Menggunakan Node.js (lebih stabil), `NODE_OPTIONS=3072MB`, dan `optimizePackageImports`
- ✅ **`shm_size` di docker-compose.yml**: Hanya untuk shared memory (/dev/shm), bukan total memory container
- ⚠️ **Untuk Podman**: Anda HARUS set memory limit saat build dengan flag `--memory`
- 💡 **Jika sistem RAM terbatas**: 
  - Cek available RAM: `free -h` (Linux) atau `vm_stat` (macOS)
  - Pastikan sistem memiliki setidaknya 6-8GB RAM untuk build yang nyaman
  - Pertimbangkan menambah swap space
  - Atau gunakan CI/CD (GitHub Actions) yang memiliki lebih banyak resources

**Cek Memory Usage:**
```bash
# Lihat memory yang digunakan saat build
podman stats

# Atau cek sistem memory
free -h  # Linux
vm_stat  # macOS
```

**Catatan:** Dockerfile sudah diupdate untuk menggunakan Node.js untuk build (lebih stabil) dan menambahkan `NODE_OPTIONS="--max-old-space-size=4096"` untuk meningkatkan memory limit Node.js.

### Port Sudah Digunakan

```bash
# Gunakan port lain
docker run -d -p 3001:3000 amark-nextjs:latest
```

## 📝 Catatan

- **Package Manager**: Bun (untuk install dependencies)
- **Build Tool**: Node.js (lebih stabil untuk Next.js build, dengan optimasi memori)
- **Runtime**: Bun (hemat memori dan lebih cepat dibanding Node.js untuk menjalankan server)
- **Image Registry**: GHCR (otomatis build saat push ke branch `master`)

**Keuntungan menggunakan Bun untuk runtime:**
- ✅ Lebih hemat memori (~30-50% lebih sedikit dibanding Node.js)
- ✅ Startup lebih cepat
- ✅ Kompatibel dengan Next.js standalone output

## 📚 Referensi

- [Docker Docs](https://docs.docker.com/)
- [Next.js Docker](https://nextjs.org/docs/deployment#docker-image)
