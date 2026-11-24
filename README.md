# Portofolio Pribadi - Ahmad Athoillah Almadany

Website portofolio pribadi satu halaman (*single-page scroll*) modern, bersih, dan responsif untuk Ahmad Athoillah Almadany (Web Developer & Mahasiswa Informatika Universitas PGRI Semarang angkatan 2024).

Website ini dibangun menggunakan **HTML murni, Tailwind CSS via CDN, CSS Variables kustom, dan Vanilla JavaScript**, tanpa dependensi framework berat, sehingga sangat cepat dan siap dibuka langsung melalui berkas lokal (`file://`) maupun di-*host* di GitHub Pages dan Vercel.

---

## 📁 Struktur Direktori

```text
/
├── index.html                               # Halaman utama portofolio
├── README.md                                # Dokumentasi petunjuk penggunaan
├── css/
│   └── style.css                            # CSS variables, reset, print styles F4, modal/lightbox
├── js/
│   ├── data.js                              # SATU file pusat data (identitas, proyek, sertifikat, skill, dll.)
│   ├── render.js                            # Render fungsi yang membangun elemen HTML dinamis
│   ├── ui.js                                # Logika UI (tema, hamburger, modal CV, lightbox, filter, mailto)
│   └── main.js                              # Titik masuk inisialisasi aplikasi
├── assets/
│   ├── img/
│   │   ├── ahmad-athoillah-almadany.png     # Foto profil utama
│   │   ├── print-cv.png                     # Foto Curriculum Vitae (format kertas F4)
│   │   ├── qr-sertifikat.png                # QR Code akses seluruh sertifikat
│   │   └── favicon.svg                      # Favicon monogram "AA"
│   └── proyek/                              # Aset visual mockup & tangkapan layar proyek
│       ├── edu-familiy100/
│       ├── webgis-puskesmas-semarang/
│       ├── baca-buku/
│       ├── smart-blind-web-app/
│       ├── cyberguard-ai/
│       └── game-augmented-reality/
└── sertifikat/                              # Berkas foto dan dokumen PDF sertifikat asli
```

---

## 🚀 Cara Menjalankan Website

### 1. Langsung Lewat Browser (Offline / Local File)
Cukup klik dua kali berkas `index.html` atau buka browser dan drag berkas `index.html` ke dalam browser.
Semua data disimpan di objek global `window.portfolioData` di `js/data.js` tanpa pemanggilan `fetch()` JSON, sehingga **tidak akan terkendala kebijakan CORS saat dibuka via `file:///`**.

### 2. Menggunakan Local Server (Opsional)
Jika ingin menggunakan local server:
```bash
# Menggunakan Python
python -m http.server 8000

# Menggunakan Node.js (npx serve)
npx serve .
```
Buka browser di `http://localhost:8000`.

---

## ✍️ Cara Menambah Proyek atau Sertifikat Baru

Semua konten dipusatkan di berkas `js/data.js`. Anda tidak perlu mengubah kode HTML secara manual.

### Menambah Proyek Baru
Buka `js/data.js` dan tambahkan objek baru ke dalam array `proyek`:
```javascript
{
  id: "nama-slug-proyek",
  slug: "nama-slug-proyek",
  judul: "Nama Proyek Anda",
  deskripsiSingkat: "Ringkasan 1-2 kalimat untuk kartu depan.",
  deskripsiLengkap: "Penjelasan mendalam mengenai latar belakang, arsitektur, dan fitur aplikasi.",
  peran: "Frontend Developer",
  teknologi: ["HTML", "Tailwind CSS", "JavaScript"],
  gambar: "assets/proyek/nama-slug-proyek/preview.png",
  galeri: [
    "assets/proyek/nama-slug-proyek/preview.png"
  ],
  linkLive: "https://demo-proyek-anda.com", // Kosongkan jika belum live ("")
  linkGithub: "https://github.com/Athoillah-Violet/repo-anda", // Kosongkan jika private/belum ada ("")
  unggulan: false
}
```
*Catatan: Tombol "Live Demo" atau "GitHub" otomatis disembunyikan apabila nilainya dikosongkan `""`.*

### Menambah Sertifikat Baru
Buka `js/data.js` dan tambahkan objek baru ke dalam array `sertifikat`:
```javascript
{
  id: "slug-sertifikat",
  judul: "Nama Sertifikat / Pelatihan",
  penerbit: "Lembaga Penerbit",
  tahun: "2026",
  tanggal: "15 Agustus 2026",
  nomor: "NO: 001/SERTIFIKAT/2026",
  kategori: "Teknis", // Pilih salah satu: "Teknis" | "Kepemimpinan" | "Pengabdian"
  peran: "Peserta",
  gambar: "sertifikat/nama-foto.png",
  fileAsli: "sertifikat/nama-berkas.pdf",
  deskripsi: "Keterangan singkat mengenai materi atau kompetensi yang dicakup."
}
```

---

## 🌐 Cara Hosting

### A. Hosting di GitHub Pages
1. Buat repository baru di GitHub, misalnya `portfolio` atau `<username>.github.io`.
2. Unggah/push seluruh isi folder ini ke branch `main`:
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio Ahmad Athoillah Almadany"
   git branch -M main
   git remote add origin https://github.com/Athoillah-Violet/<nama-repo>.git
   git push -u origin main
   ```
3. Buka tab **Settings** di repository GitHub Anda &rarr; pilih menu **Pages** di sebelah kiri.
4. Pada bagian **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `main` / folder: `/(root)`
5. Klik **Save**. Situs akan aktif dalam beberapa menit di `https://athoillah-violet.github.io/<nama-repo>/`.

### B. Hosting di Vercel
1. Masuk ke [Vercel](https://vercel.com/) menggunakan akun GitHub Anda.
2. Klik **Add New...** &rarr; **Project**.
3. Import repository GitHub portofolio Anda.
4. Pada konfigurasi build, biarkan pengaturan default (Framework Preset: *Other*, Root Directory: `./`).
5. Klik **Deploy**. Website akan langsung online dengan domain gratis `.vercel.app`.

---

## 🖨️ Fitur Cetak CV Ukuran F4
Website dilengkapi modal CV yang dapat mencetak lembar CV resmi secara langsung:
- Menggunakan CSS `@page { size: 215mm 330mm; margin: 0 }`.
- `@media print` dirancang khusus menyembunyikan semua elemen navigasi, kartu, dekorasi, dan kursor kustom, serta memposisikan gambar `print-cv.png` memenuhi tepat satu lembar kertas F4 (215 mm x 330 mm) tanpa margin dan tanpa header/footer peramban.

---

## ✨ Fitur Animasi & Interaksi Gerak (Langkah B & C)

Animasi dikoreografi secara modular dan terpisah di [css/anim.css](file:///d:/web%20portofolio/css/anim.css) dan [js/anim.js](file:///d:/web%20portofolio/js/anim.js) dengan pembagian tugas yang jelas tanpa bentrok:
- **AOS 2.3.4 (Reveal Berulang Dua Arah)**: Menangani *scroll reveal* pada judul bagian, kartu grid, chip keterampilan, thumbnail sertifikat, entri timeline, blok kontak, dan footer (`once: false, mirror: true`).
- **GSAP 3 + ScrollTrigger + Lenis (Koreografi Kompleks & Hero Dua Arah)**: Menangani urutan hero scroll yang 100% berulang tanpa batas saat digulir turun dan naik, nama 3 baris poster sama rata di layar awal, counter angka naik (1x), 3D tilt kartu proyek, preloader, kursor kustom, smooth scroll, dan marquee.

### Fitur Utama Animasi Langkah C:
1. **Layar Pertama Hero: Blok Nama Poster 3 Baris Sama Lebar**:
   - Tiga baris nama: **AHMAD** / **[ATHOILLAH]** / **ALMADANY** ditumpuk rapi di tengah layar dengan blok kuning aksen miring -1° pada kata "ATHOILLAH" tanpa menimpa baris lain.
   - Dilengkapi kicker penjangkar atas `PORTOFOLIO · SEMARANG` dan petunjuk scroll terpusat di bawah.
   - Ukuran huruf disesuaikan otomatis dengan kalibrasi presisi (`fitHeroTitleLines()`) saat font Anton siap, sehingga membentuk satu blok persegi padat poster tanpa layout shift.
   - Bebas dari blob/lingkaran buram (diganti dengan elemen dekorasi grafis poster berani datar tanpa blur).
2. **Koreografi Hero Scroll Berulang Tanpa Batas (Reversible Scrub Dua Arah)**:
   - **Gulir Turun**: Blok nama 3 baris intro memudar halus, navbar turun, blok diagonal kuning meluncur masuk, foto profil naik dengan efek *clip-path*, dan komponen peran, motto, tombol aksi, serta tulisan kuas muncul bergantian (*stagger*).
   - **Gulir Naik**: Seluruh komponen hero mundur secara terbalik (*reverse*) dengan mulus, dan saat mencapai posisi paling atas (`scrollY = 0`), halaman kembali menampilkan tampilan bersih nama 3 baris intro. Dapat diulang berapa kali pun tanpa batas!
   - **Bebas Kunci URL Hash / Reload**: Membuka tautan langsung seperti `#proyek` atau me-reload di tengah halaman tidak pernah mengunci hero; saat pengunjung menggulir ke atas ke posisi 0, hero tetap membalik ke keadaan intro awal.
   - **Versi Layar Ponsel (< 768px)**: Menerapkan scrub dua arah ringan berbasis posisi scroll tanpa penguncian pin panjang, sehingga jari pengguna tidak terjebak.
3. **Pemisahan Tilt & AOS**: Kartu proyek dibungkus oleh `.project-aos-wrap` (AOS reveal) dan kartu anak `.project-card-tilt` (3D tilt & glare), mencegah tabrakan *matrix transform*.
4. **Central Ticker Terpusat**: Lenis `on('scroll')` sinkron dengan `ScrollTrigger.update`, dan `ScrollTrigger.refresh()` otomatis menyegarkan `AOS.refreshHard()`.
5. **Aksesibilitas & Keyboard Focus**: Navigasi atas otomatis terlihat jika elemen menu/tombol menerima fokus keyboard (Tab) melalui `.site-header:focus-within`.

### Cara Mematikan atau Menyesuaikan Efek Tertentu
Buka berkas `js/anim.js`, di bagian paling atas terdapat objek konfigurasi `ANIM_CONFIG`:
```javascript
const ANIM_CONFIG = {
  ENABLE_PRELOADER: true,       // false: nonaktifkan preloader
  ENABLE_HERO_SCROLL: true,     // false: matikan pin scrub hero (hero langsung tampil statis)
  ENABLE_AOS: true,             // false: nonaktifkan reveal scroll AOS
  ENABLE_TILT: true,            // false: matikan efek 3D tilt kartu proyek
  ENABLE_CURSOR: true,          // false: gunakan kursor standar sistem
  ENABLE_SMOOTH_SCROLL: true,   // false: gunakan native scrolling bawaan browser
  ENABLE_MARQUEE: true,         // false: matikan marquee teknologi
  ENABLE_TIMELINE_DRAW: true,   // false: timeline statis tanpa highlight scroll
  ENABLE_COUNTERS: true,        // false: tampilkan angka statistik langsung (hanya 1x hitung)
  ENABLE_MAGNETIC: true,        // false: matikan efek magnet pada tombol utama
  ENABLE_THEME_TRANSITION: true,// false: transisi tema instan tanpa view transitions

  // Pengaturan Jarak Scroll Hero Sequence:
  HERO_SCROLL_PERCENT: 160,     // Panjang scrub scroll hero (150-200% dari tinggi layar)
  HERO_STAGE1_DURATION: 0.9,    // Durasi scrub tahap nama
  HERO_STAGE2_DURATION: 0.85,   // Durasi scrub tahap foto profil
  HERO_STAGE3_DURATION: 0.9,    // Durasi scrub tahap peran, motto, tombol
  HERO_BUFFER_DURATION: 0.3     // Buffer penstabilan sebelum unpin
};
```

### Aksesibilitas & Ketahanan
- **`prefers-reduced-motion`**: Jika pengunjung mengaktifkan mode hemat gerak di sistem operasi, seluruh animasi berat (tilt, preloader, marquee, smooth scroll, kursor) otomatis dimatikan dan digantikan transisi instan yang nyaman.
- **Failsafe 3 Detik**: Jika koneksi lambat atau script CDN terhalang, pengaman otomatis akan membuka seluruh konten dalam 3 detik agar halaman tidak pernah macet dalam keadaan kosong.
- **No-JS Safe**: Tanpa JavaScript, seluruh konten tetap tampil penuh dan terbaca karena kelas `js-anim` hanya disematkan jika script berhasil dimuat.

---

## 🎨 Sistem Desain: "Poster Berani" (Langkah A)
Website kini menerapkan sistem desain poster berani grafis (*bold poster style*) tanpa gradien atau template klise:

### 1. Tipografi (Google Fonts)
- **Judul**: `Anton` (huruf kapital, tebal, rapat, impact visual tinggi).
- **Teks Isi**: `Barlow` (bobot 400, 500, 600, 700, bersih dan mudah dibaca).
- **Aksen Tulisan Tangan/Kuas**: `Permanent Marker` (dipakai hemat untuk aksen miring yang menonjol).

### 2. Token Warna (CSS Variables di `css/style.css`)
Dikelola penuh lewat token `:root`, `[data-theme="dark"]`, dan `[data-theme="light"]`:
- `--bg`: `#0A101C` (gelap) / `#F4F1E8` (terang)
- `--bg-alt`: `#0F1828` (gelap) / `#EAE5D6` (terang)
- `--surface`: `#121D30` (gelap) / `#FFFFFF` (terang)
- `--ink`: `#F2F5F9` (gelap) / `#10161F` (terang)
- `--ink-muted`: `#A9B6C7` (gelap) / `#4A5563` (terang)
- `--line`: `#F2F5F9` (gelap) / `#10161F` (terang, garis tebal kartu & tombol)
- `--shadow-hard`: `#000000` (gelap) / `#10161F` (terang, bayangan bergeser keras tanpa blur)
- `--accent`: `#FFD21F` (kuning pekat bertenaga)
- `--on-accent`: `#0A101C` (gelap) / `#10161F` (terang)
- `--accent-2`: `#1F9E96` (gelap) / `#0F6F69` (terang, teks aman WCAG AA > 5:1)

### 3. Mengubah Microcopy Antarmuka (`UI_TEXT`)
Buka `js/data.js` pada bagian `UI_TEXT` untuk mengubah teks antarmuka (judul bagian, subjudul, tombol, placeholder formulir, dan teks footer) tanpa mengubah kode logika rendering:
```javascript
window.portfolioData.UI_TEXT = {
  hero: { ... },
  tentang: { ... },
  keterampilan: { ... },
  proyek: { ... },
  sertifikat: { ... },
  timeline: { ... },
  kontak: { ... },
  footer: { ... }
};
```
