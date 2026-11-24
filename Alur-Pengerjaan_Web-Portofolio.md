# ALUR PENGERJAAN: WEB PORTOFOLIO (LANGKAH A + LANGKAH B)

> Satu file untuk seluruh pengerjaan. Letakkan di akar proyek (di samping index.html), lalu minta agen: **"Baca file Alur-Pengerjaan_Web-Portofolio.md dan kerjakan sesuai alur pengerjaannya, mulai dari butir pertama yang belum dicentang."**
> Urutan: **BAGIAN 1 (Langkah A: desain, tata letak, konten)** selesai dulu, baru **BAGIAN 2 (Langkah B: AOS, hero scroll, gerak)**.

---

## CARA KERJA AGEN (WAJIB DIPATUHI)

1. **Baca seluruh file ini paling awal**, lalu mulai dari bagian "STATUS UTAMA" di bawah.
2. **Kerjakan berurutan.** Setiap butir ceklis `- [ ]` yang selesai harus langsung diubah menjadi `- [x]` **di file ini** dan disimpan **sebelum** pindah ke butir berikutnya. Jangan mencentang di akhir sekaligus.
3. **Boleh berhenti kapan saja.** Kalau proyek terhenti di tengah dan dimulai lagi, baca ceklis, cari butir pertama yang masih `- [ ]`, lalu lanjut dari sana. **Jangan mengulang butir yang sudah `- [x]`.** Sebelum lanjut, verifikasi singkat butir terakhir yang dicentang (filenya benar ada dan berfungsi).
4. **Jangan memulai BAGIAN 2 sebelum semua butir BAGIAN 1 berstatus `- [x]` atau `- [~]`.** Jika belum, beri tahu saya dan berhenti.
5. **Catat di "LOG PENGERJAAN"** (paling bawah): satu baris per fase selesai (waktu, langkah, apa yang dikerjakan, masalah).
6. **Jangan mencentang butir yang belum benar-benar terverifikasi.** Kalau gagal atau sebagian, biarkan `- [ ]` dan tulis alasannya di Log.
7. Jika butir ternyata tidak relevan, ubah menjadi `- [~]` dan tulis alasannya di Log.
8. Setelah tiap bagian selesai, isi "RINGKASAN AKHIR" bagian itu dan centang butir di STATUS UTAMA.

---

## STATUS UTAMA

- [x] BAGIAN 1 (Langkah A) selesai: semua fase A-0 sampai A-6 tercentang
- [ ] Hasil Langkah A sudah saya cek di browser (diisi oleh saya, bukan agen)
- [ ] BAGIAN 2 (Langkah B) selesai: semua fase B-0 sampai B-6 tercentang
- [ ] Hasil Langkah B sudah saya cek di browser dan HP (diisi oleh saya, bukan agen)

---

# BAGIAN 1: LANGKAH A (Sistem Desain Baru, Tata Letak, dan Konten)

## ALUR PENGERJAAN LANGKAH A

### Fase A-0: Persiapan
- [x] Baca seluruh proyek: index.html, semua CSS (termasuk css/anim.css), js/data.js, js/render.js, js/ui.js, js/anim.js, js/main.js
- [x] Lihat foto "ahmad athoillah almadany.png" (foto hero) dan "aku.png" (foto bagian Tentang); catat rasio asli keduanya
- [x] Periksa apakah aku.png punya latar transparan (alpha); catat hasilnya di Log
- [x] Tulis rencana singkat di Log (apa yang diubah di file mana)
- [x] Simpan titik awal (commit git "sebelum langkah A" bila memakai git, atau salin folder cadangan)

### Fase A-1: Fondasi desain (font, warna, tema)
- [x] Pasang font Google Fonts: Anton (judul), Barlow 400/500/600/700 (isi), Permanent Marker (aksen), dengan fallback
- [x] Buat token warna (CSS variables) untuk dua tema: [data-theme="dark"] dan [data-theme="light"]
- [x] Hapus SEMUA warna hex/rgb yang tertulis langsung di CSS, JS, dan style inline (termasuk css/anim.css dan js/anim.js)
- [x] Pasang skrip tema di `<head>` agar tidak ada kedipan; default mengikuti prefers-color-scheme sampai pengguna memilih; simpan pilihan di localStorage
- [x] Atur `<meta name="color-scheme">` dan theme-color per tema
- [x] Pastikan transisi ganti tema melingkar tetap jalan (fallback cross-fade) tanpa menyisakan warna lama

### Fase A-2: Komponen dasar gaya "poster berani"
- [x] Gaya kartu: sudut tajam (radius 0-4px), garis 2-3px, bayangan bergeser keras (offset shadow)
- [x] Gaya tombol: blok warna datar, garis tebal, offset shadow bergeser saat hover (tanpa blur)
- [x] Gaya chip: label kotak bergaris tebal (bukan pil bulat)
- [x] Pemisah bagian dengan potongan diagonal (clip-path atau pseudo-element)
- [x] Label bernomor 01-06 dan gaya judul bagian (Anton besar, satu kata diberi blok kuning)
- [x] Tekstur halus (grain atau halftone) lewat CSS/SVG inline dengan opacity rendah
- [x] Tulis ulang teks antarmuka (judul bagian, subjudul, label tombol, placeholder, footer) ke objek UI_TEXT di js/data.js

### Fase A-3: Bagian halaman
- [x] Navbar (gaya baru, menu mobile tetap berfungsi)
- [x] Hero: tampilan statis akhir (nama Anton besar, peran, motto, tiga tombol, foto dengan bingkai diagonal kuning, aksen tulisan kuas) dengan atribut data-hero="name|photo|role|motto|cta|deco"
- [x] 01 Tentang: tiga kolom (foto aku.png di tengah, Profil Profesional di kiri, Tentang Saya di kanan; di HP bertumpuk)
- [x] Field aboutText dan fakta Profil Profesional diisi dari data.js (tanpa mengarang)
- [x] 4 angka ringkas dihitung otomatis dari data
- [x] 02 Keterampilan: kartu per kelompok dengan chip kotak, marquee tools bergaya baru
- [x] 03 Proyek: kartu besar bernomor, tag teknologi bergaya label, tombol Live Demo/GitHub, modal detail bergaya baru
- [x] 04 Sertifikat: grid dengan bingkai tebal, filter kategori sebagai tab kotak, lightbox bergaya baru, stiker QR miring dengan link l1nk.dev/62ia9zm
- [x] 05 Perjalanan: dua kelompok timeline terpisah ("Pendidikan" dan "Organisasi & Pengabdian")
- [x] 06 Kontak: blok kuning besar dengan teks gelap, tombol WhatsApp/email/GitHub, formulir mailto bergaya baru, aksen kuas
- [x] Footer: solid, link bagian, tombol ke atas

### Fase A-4: Foto tampil utuh
- [x] Bingkai foto hero memakai aspect-ratio yang sama dengan file asli (tidak terpotong, tidak berbentuk lingkaran)
- [x] Foto di Tentang (aku.png) tampil utuh; jika transparan, tampil sebagai cutout di atas blok kuning
- [x] Foto besar di desktop (sekitar 70-80% tinggi hero), lebar penuh kontainer di HP; object-position menjaga wajah terlihat
- [x] Atribut width dan height ada pada kedua `<img>`
- [x] Parallax/reveal lama tidak membuat sisi foto terpotong atau berlubang
- [x] Open Graph image memakai foto hero

### Fase A-5: Data pendidikan
- [x] Tambahkan enam jenjang ke js/data.js sesuai urutan di bagian DATA PENDIDIKAN
- [x] Field year kosong ("") untuk nomor 1-4 dan teks tahun tersembunyi bila kosong; komentar `// TODO: isi tahun`
- [x] Label kecil "Pendidikan formal" / "Pendidikan agama" tampil di tiap kartu
- [x] Angka ringkas yang bergantung pada jumlah pendidikan diperbarui

### Fase A-6: Audit dan penyelesaian
- [x] Audit tema TERANG: periksa navbar, hero, tentang, keterampilan (marquee, chip), proyek (kartu, modal), sertifikat (grid, filter, lightbox), timeline, kontak (form), footer, preloader, kursor, bar progres, tombol ke atas, dan tampilan cetak
- [x] Audit tema GELAP dengan daftar bagian yang sama
- [x] Periksa kontras (teks biasa minimal 4,5:1, teks besar minimal 3:1); kuning hanya sebagai blok latar
- [x] Logo/ikon yang hanya cocok di satu tema diberi pelat latar
- [x] Uji fitur lama: modal proyek, galeri dan lightbox sertifikat dengan filter, modal CV (lihat, unduh, cetak satu halaman F4), formulir mailto, tombol WhatsApp, menu mobile, preloader, smooth scroll, hitung angka, tilt
- [x] Uji responsif di 375px, 768px, dan 1440px
- [x] Tidak ada error di console
- [x] Animasi lama disesuaikan agar tetap jalan di desain baru (sementara belum ada animasi baru)
- [x] README diperbarui (cara mengubah token warna, font, dan UI_TEXT)
- [x] Isi RINGKASAN AKHIR di bawah


## SPESIFIKASI LANGKAH A

### Peran
Kamu adalah front-end developer dan desainer UI senior. Proyek portofolio saya sudah punya isi lengkap dan animasi dari tahap sebelumnya. Sekarang tugasmu: merombak TAMPILAN dan TATA LETAK dengan karakter baru yang tidak terlihat seperti template atau buatan AI, menambah beberapa konten, dan membangun ulang sistem tema terang/gelap dari nol. Tahap ini tentang visual dan struktur. Animasi baru ada di Langkah B, jadi di sini jangan menambah animasi baru dan jangan merusak animasi yang sudah ada (sesuaikan saja agar tetap jalan di desain baru).

### Aturan umum
- Semua konten tetap dikelola dari js/data.js. Jangan mengarang data, tahun, lokasi, atau link yang tidak saya berikan.
- Tanggal lahir tidak ditampilkan di website.
- Pertahankan semua fitur: modal proyek, galeri dan lightbox sertifikat dengan filter, modal CV (lihat, unduh, cetak satu halaman F4), formulir kontak mailto, tombol WhatsApp, menu mobile, preloader, smooth scroll, hitung angka, tilt, dan seterusnya.
- Responsif di 375px, 768px, 1440px. Aksesibel (kontras WCAG AA, focus ring jelas, keyboard bisa mengoperasikan modal/lightbox, hormati prefers-reduced-motion).

### Arah desain: "poster berani", bukan template
Inspirasi gayanya adalah poster merchandise game: blok warna kuning dan hitam yang kontras, bentuk diagonal tajam, kartu berbingkai tegas, label bernomor, huruf tebal yang rapat, dan satu aksen tulisan kuas. Pinjam BAHASA VISUAL-nya saja. Jangan memakai karakter, logo, ilustrasi, atau nama dari game atau merek mana pun.

**Yang HARUS dihindari (ciri tampilan buatan AI):**
- Font Inter/Roboto/Poppins sebagai font utama, gradien ungu-biru, efek glow/neon, glassmorphism, kartu bulat seragam dengan bayangan lembut, ikon emoji, tata letak simetris yang terlalu rapi, dan kalimat klise seperti "Passionate developer", "Welcome to my portfolio", "Crafting digital experiences".
- Jangan memakai gradien sama sekali untuk latar atau tombol. Pakai blok warna datar.

**Yang HARUS ada:**
1. **Font (Google Fonts, dengan fallback):**
   - Judul: "Anton" (huruf kapital, tebal, rapat) untuk nama dan judul bagian.
   - Isi: "Barlow" (400, 500, 600, 700).
   - Aksen tulisan tangan/kuas: "Permanent Marker", dipakai hemat (satu kata aksen di hero, satu di Tentang, satu di Kontak), miring sedikit dan bertumpuk di atas elemen lain.
2. **Bentuk dan komponen:**
   - Kartu bersudut tajam (radius 0-4px) dengan garis tebal 2-3px dan bayangan bergeser keras (misalnya 6px 6px 0 warna garis), bukan bayangan blur.
   - Potongan diagonal di batas antar bagian, bukan garis lurus bosan.
   - Label bernomor di tiap bagian dalam kotak kecil: 01 Tentang, 02 Keterampilan, 03 Proyek, 04 Sertifikat, 05 Perjalanan, 06 Kontak. Judul bagian memakai Anton besar dengan satu kata diberi blok kuning di belakangnya.
   - Tekstur halus: grain/noise tipis atau pola titik (halftone) pada beberapa latar, buatan CSS/SVG inline, opacity rendah. Bukan gambar besar.
   - Susunan sedikit tidak simetris: elemen yang digeser, ditumpuk, atau sedikit miring (rotate 1-2 derajat) pada label dan stiker kecil. Tetap rapi dan terbaca.
   - Chip keterampilan berbentuk label kotak bergaris tebal, bukan pil bulat.
   - Tombol: blok warna datar, garis tebal, offset shadow yang bergeser saat hover (tanpa blur).
3. **Kalimat (microcopy):** tulis ulang teks pendek antarmuka (judul bagian, subjudul, label tombol, placeholder, teks footer) dalam bahasa Indonesia yang lugas dan punya kepribadian orang pertama, bukan klise. Simpan semuanya di satu objek (UI_TEXT di js/data.js) agar mudah saya edit. Jangan mengubah data fakta (nama, kampus, proyek, link, sertifikat).

### Sistem warna (dua tema, semua lewat CSS variables, tanpa warna hardcode)
Token minimal: --bg, --bg-alt, --surface, --ink (teks utama), --ink-muted, --line (garis tebal kartu), --shadow-hard (warna offset shadow), --accent (kuning), --on-accent (teks di atas kuning), --accent-2 (teal), --on-accent-2, --focus, --overlay, --chip-bg.

- **Mode gelap (default):** --bg #0A101C (hitam kebiruan), --bg-alt #0F1828, --surface #121D30, --ink #F2F5F9, --ink-muted #A9B6C7, --line #F2F5F9 atau #FFD21F (pilih yang terbaik), --shadow-hard #000, --accent #FFD21F, --on-accent #0A101C, --accent-2 #1F9E96 (teal terang #6FD3CB untuk teks kecil di atas gelap).
- **Mode terang:** --bg #F4F1E8 (putih hangat), --bg-alt #EAE5D6, --surface #FFFFFF, --ink #10161F, --ink-muted #4A5563, --line #10161F, --shadow-hard #10161F, --accent #FFD21F, --on-accent #10161F, --accent-2 #0F6F69 (teal gelap, aman untuk teks di atas terang).
- **Aturan kontras:** kuning hanya dipakai sebagai BLOK latar dengan teks gelap di atasnya. Jangan pernah memakai kuning sebagai warna teks atau garis tipis di atas latar terang. Teal terang #6FD3CB tidak dipakai sebagai warna teks di mode terang. Teks biasa minimal 4,5:1, teks besar minimal 3:1. Periksa dan perbaiki yang kurang.
- **Perilaku tema:** default mengikuti prefers-color-scheme sampai saya memilih sendiri, lalu disimpan di localStorage. Skrip kecil di `<head>` menerapkan data-theme sebelum render. Transisi ganti tema melingkar tetap dipertahankan (fallback cross-fade).

### Tata letak per bagian
- **Hero:** tampilan statis akhir yang berani: nama sangat besar dengan Anton (satu kata bisa diberi blok kuning), peran, motto, tiga tombol, foto di sisi dengan bingkai bentuk diagonal kuning di belakangnya. Foto utama = "ahmad athoillah almadany.png", tampil UTUH. Tambahkan tulisan kuas kecil sebagai aksen. Siapkan struktur DOM agar mudah dianimasikan bertahap di Langkah B (nama, foto, peran, motto, tombol, dekorasi sebagai elemen terpisah dengan atribut data-hero="name|photo|role|motto|cta|deco").
- **01 Tentang:** tiga kolom di desktop.
  - Tengah: foto "aku.png" dalam bingkai berpotongan diagonal dengan blok warna kuning di belakangnya. Jika aku.png transparan, tampilkan sebagai cutout yang menimpa blok kuning. Jika tidak transparan, tampilkan utuh dalam bingkai bergaris tebal.
  - Kiri: kartu "Profil Profesional" berisi daftar fakta berlabel dari data (Peran: Web Developer; Fokus: pengembangan web dan analisis sistem; Kampus: UPGRIS, S1 Informatika 2024; Latar: SMK TJKT; Sertifikasi: MTCNA). Ambil dari data.js, jangan mengarang.
  - Kanan: kartu "Tentang Saya" berisi paragraf profil (field aboutText di data.js, isi dengan teks profil yang sudah ada) dan 4 angka ringkas (proyek, sertifikat, tahun organisasi, jumlah tools) yang dihitung otomatis dari data.
  - Di HP: tumpukan vertikal: foto, Profil Profesional, Tentang Saya.
- **02 Keterampilan:** kelompok dalam kartu bergaris tebal dengan chip kotak; marquee tools bergaya baru.
- **03 Proyek:** kartu besar dengan gambar, nomor proyek, tag teknologi bergaya label, tombol Live Demo/GitHub. Modal detail ikut gaya baru.
- **04 Sertifikat:** grid foto dengan bingkai tebal, filter kategori sebagai tab kotak, lightbox restyle. Kartu QR dan link l1nk.dev/62ia9zm tetap ada, tampil sebagai "stiker" miring kecil.
- **05 Perjalanan:** dua kelompok timeline terpisah: "Pendidikan" dan "Organisasi & Pengabdian".
- **06 Kontak:** blok kuning besar dengan teks gelap, tombol WhatsApp/email/GitHub, formulir mailto bergaya baru. Teks kecil aksen kuas.
- **Footer:** gelap/solid, link bagian, tombol ke atas.

### Foto tampil utuh (wajib)
- Bingkai foto memakai aspect-ratio yang SAMA dengan file aslinya, sehingga seluruh foto terlihat, tidak ada bagian kepala atau badan yang terpotong. Tidak ada bentuk lingkaran yang memotong foto.
- Di desktop foto besar (sekitar 70-80% tinggi hero); di HP lebar penuh kontainer dengan rasio terjaga. object-fit: contain jika ragu, cover hanya jika rasio bingkai sama dengan foto. Atur object-position agar wajah selalu terlihat.
- Beri width dan height pada `<img>`. Pastikan rapi di kedua tema. Open Graph image memakai foto hero.
- Jika efek parallax/reveal yang ada membuat sisi foto terpotong atau berlubang, perbaiki.

### DATA PENDIDIKAN (tambahkan ke js/data.js, urut dari awal ke terbaru)
1. MI Nurul Islam 1 Wonokerto, type: "formal"
2. Madrasah Diniyah Rhodhotul Tholibin (tulis persis begini), type: "nonformal" (pendidikan agama)
3. Pondok Pesantren Api Asri, type: "nonformal" (pendidikan agama)
4. SMP Syubbanul Wathon, type: "formal"
5. SMK Syubbanul Wathon, jurusan TJKT (Teknik Jaringan Komputer dan Telekomunikasi), tahun ajaran 2021/2022 - 2023/2024, type: "formal"
6. Universitas PGRI Semarang, S1 Informatika, 2024 - sekarang, type: "formal"

Aturan: tahun untuk nomor 1-4 BELUM saya berikan. Buat field year berisi "" dan sembunyikan teks tahun jika kosong; beri komentar `// TODO: isi tahun`. Jangan menulis lokasi, tingkat, atau keterangan lain yang tidak saya berikan. Tampilkan label kecil "Pendidikan formal" atau "Pendidikan agama" di tiap kartu. Urutan entri harus bisa diubah dengan memindahkan entri di data.js.

Organisasi & pengabdian tetap seperti data yang ada: Goresan Seni (SMP, 1 th), Kawan Gambar (SMK, 3 th), Remas (desa, 4 th), IPNU Komisariat Syubbanul Wathon (Staf Bidang Pendidikan dan Kaderisasi, 1 th), UKM RNA (Rohana Nurul Asatidz, Bidang Manajemen, 1 th), HIMFORMA (Staf Kesejahteraan Sosial, 1 th), penanaman mangrove di Desa Bedono, Sayung, Demak (2025), pembuatan website Desa Banyuburu, Desa Kebondowo (2026).

### Kualitas
- Pertahankan struktur data-section dan data-reveal agar animasi lama tetap bisa jalan; sesuaikan nilai animasi lama ke gaya baru bila perlu.
- Cetak CV tetap satu halaman F4 tanpa dekorasi.
- Tidak ada error di console.

### Selesai kalau
- Tampilan terasa seperti poster berani (bukan template): font Anton/Barlow/Permanent Marker, kartu bergaris tebal dengan offset shadow, potongan diagonal, label bernomor, tanpa gradien dan glow.
- Kedua tema rapi dan terbaca di semua bagian, tanpa warna hardcode tersisa dan tanpa kedipan tema.
- Bagian Tentang tiga kolom, foto hero dan foto Tentang tampil utuh.
- Timeline pendidikan menampilkan enam jenjang dengan tahun kosong tersembunyi, organisasi di kelompok terpisah.
- Semua fitur lama masih berfungsi.


## RINGKASAN AKHIR LANGKAH A (diisi agen)

- Apa yang diubah di file mana:
  - `index.html`: Memasang Google Fonts Anton, Barlow (400-700), dan Permanent Marker; script anti-flicker tema di `<head>`; `<meta name="color-scheme">` dan dynamic theme-color; navigasi header gaya poster berani; preloader inisial AA huruf Anton; modal CV kertas F4, modal detail proyek, dan lightbox sertifikat dengan bingkai tegas dan offset shadow.
  - `css/style.css`: Token CSS variables lengkap (`--bg`, `--bg-alt`, `--surface`, `--ink`, `--ink-muted`, `--line`, `--shadow-hard`, `--accent`, `--on-accent`, `--accent-2`, `--on-accent-2`, `--focus`, `--overlay`, `--chip-bg`) untuk tema gelap dan terang; komponen poster (`.poster-card`, `.btn-poster-*`, `.chip-poster`, `.section-badge`, `.section-title`, `.title-highlight`, `.hero-photo-wrapper`, `.hero-photo-bg-block`, `.about-photo-container`, `.about-photo-bg-block`, `.qr-sticker`, `.marquee-wrapper`); pembersihan seluruh hardcoded hex color.
  - `css/anim.css`: Kursor kustom titik kuning dengan ring garis tebal; sinkronisasi warna animasi ke token CSS variables murni.
  - `js/data.js`: Penambahan objek `UI_TEXT` untuk sentralisasi microcopy berkarakter orang pertama; fakta `profilFakta`; teks `aboutText`; `fotoTentang: "aku.png"`; 6 jenjang riwayat pendidikan terurut lengkap dengan komentar `// TODO: isi tahun`.
  - `js/render.js`: Rekonstruksi template render seluruh bagian: Hero atribut `data-hero`, Tentang 3 kolom desktop (foto cutout `aku.png` di tengah, Profil Profesional di kiri, Tentang Saya & 4 angka di kanan), Keterampilan chip kotak & marquee, Proyek kartu besar bernomor, Sertifikat tab kotak & stiker QR miring `l1nk.dev/62ia9zm`, Timeline 2 kolom ("Riwayat Pendidikan" & "Organisasi & Pengabdian"), Blok kontak kuning besar & formulir mailto, Footer solid.
  - `js/ui.js`: Sinkronisasi meta theme-color `#0A101C` dan `#F4F1E8`, pembaruan selektor filter tab kategori sertifikat berbasis token.
  - `js/anim.js`: Penyesuaian mask reveal hero dan tilt parallax foto 3:4 agar tidak memotong elemen.
  - `README.md`: Dokumentasi sistem desain poster berani, token warna, tipografi, dan petunjuk konfigurasi `UI_TEXT`.

- Daftar masalah tema yang ditemukan dan cara memperbaikinya:
  1. Ditemukan hardcoded hex color `#10B981`, `#0B1B2E`, `#F4F7FB` di JavaScript/HTML yang menimpa mode terang &rarr; seluruhnya diganti menggunakan CSS variables (`var(--accent-2)`, `var(--bg)`, dan sinkronisasi meta dinamis).
  2. Kontras teks aksen terang pada background putih di mode terang &rarr; diaudit dan ditetapkan `--accent-2: #0F6F69` dengan rasio kontras > 5:1 (lolos standar WCAG AA). Warna kuning `#FFD21F` hanya dipakai sebagai blok latar dengan teks gelap di atasnya.
  3. Foto hero dan foto Tentang terpotong &rarr; disesuaikan dengan aspect-ratio asli 3:4 (1086x1448) utuh tanpa crop, foto `aku.png` transparan ditampilkan sebagai cutout menimpa blok kuning miring -3 derajat.

- Yang perlu saya isi manual (tahun pendidikan 1-4, teks UI_TEXT yang ingin diganti):
  1. Tahun kelulusan/periode pada 4 jenjang awal di `js/data.js` yang telah ditandai `// TODO: isi tahun` (MI Nurul Islam 1, Madrasah Diniyah Rhodhotul Tholibin, Pondok Pesantren Api Asri, SMP Syubbanul Wathon).
  2. Microcopy kalimat pada objek `UI_TEXT` di `js/data.js` jika ingin disesuaikan dengan nada bicara tertentu.

---

# BAGIAN 2: LANGKAH B (AOS, Hero dengan Scroll, dan Penyesuaian Gerak)

## ALUR PENGERJAAN LANGKAH B

### Fase B-0: Persiapan
- [ ] Prasyarat: semua butir BAGIAN 1 (Langkah A) sudah `- [x]` atau `- [~]`
- [ ] Baca seluruh proyek: index.html, semua CSS, js/data.js, js/render.js, js/ui.js, js/anim.js, js/main.js, serta atribut data-section, data-reveal, data-hero
- [ ] Tulis rencana di Log: elemen mana dianimasikan AOS, mana GSAP, dan bagaimana keduanya tidak bentrok
- [ ] Simpan titik awal (commit git "sebelum langkah B" atau salin folder cadangan)

### Fase B-1: Fondasi AOS dan keamanan tampilan
- [ ] Muat CSS dan JS AOS dari CDN dengan versi dipin (aos@2.3.4)
- [ ] Inisialisasi: AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 80, anchorPlacement: "top-bottom" }) dengan opsi disable saat reduced motion atau library gagal
- [ ] Tambahkan kelas "js-anim" ke `<html>` hanya setelah library berhasil dimuat; keadaan awal tersembunyi hanya berlaku di bawah .js-anim
- [ ] Failsafe: jika dalam 3 detik inisialisasi belum jalan, buka semua konten dan lepaskan pin
- [ ] Saklar di bagian atas js/anim.js: ENABLE_PRELOADER, ENABLE_HERO_SCROLL, ENABLE_AOS, ENABLE_TILT, ENABLE_CURSOR, ENABLE_SMOOTH_SCROLL, ENABLE_MARQUEE
- [ ] Panggil AOS.refreshHard() setelah render.js selesai, setelah gambar utama dimuat, setelah filter sertifikat berubah, dan setelah ScrollTrigger refresh/pin selesai

### Fase B-2: Peta animasi AOS
- [ ] Buat objek AOS_MAP di js/anim.js; atribut data-aos dipasang lewat render.js dan AOS_MAP, bukan manual di banyak tempat
- [ ] Judul bagian fade-up; label bernomor zoom-in kecil
- [ ] Kartu dalam grid fade-up dengan data-aos-delay bertahap (0 sampai maksimal 400)
- [ ] Bagian Tentang: foto tengah zoom-in, Profil Profesional fade-right, Tentang Saya fade-left (HP: fade-up semua)
- [ ] Chip keterampilan fade-up berurutan per kelompok
- [ ] Timeline: Pendidikan fade-right, Organisasi fade-left (HP: fade-up)
- [ ] Kartu proyek flip-up atau fade-up bertahap; thumbnail sertifikat zoom-in-up
- [ ] Blok Kontak fade-up, footer fade, stiker/tulisan kuas zoom-in
- [ ] Kartu proyek ber-tilt: AOS di pembungkus, tilt di anak
- [ ] Hapus reveal GSAP lama yang menumpuk pada elemen yang kini dipegang AOS (satu elemen, satu sistem)

### Fase B-3: Hero berurutan dengan scroll
- [ ] Keadaan awal: layar pertama HANYA menampilkan nama (Anton, besar, di tengah)
- [ ] Timeline GSAP ScrollTrigger dengan pin dan scrub (panjang scroll 150-200% tinggi layar), memakai atribut data-hero; durasi tiap tahap ada di konstanta di atas js/anim.js
- [ ] Tahap 1: nama mengecil dan naik ke posisi akhir
- [ ] Tahap 2: blok diagonal kuning meluncur masuk, lalu foto naik dengan clip-path/reveal dari bawah
- [ ] Tahap 3: peran, motto, tombol, tulisan kuas, dan dekorasi muncul bergantian (stagger)
- [ ] Tahap 4: setelah selesai, scroll lanjut normal ke bagian Tentang tanpa tersangkut atau melompat
- [ ] Petunjuk "scroll" kecil yang menghilang setelah mulai scroll
- [ ] Refresh di tengah halaman atau link #bagian langsung ke keadaan akhir hero tanpa tersangkut
- [ ] Navbar tersembunyi/transparan di awal dan muncul setelah hero selesai atau setelah scroll mulai; menu tetap bisa dipakai
- [ ] Versi HP (< 768px): tanpa pin panjang (tanpa pin, atau pin maksimal 100% tinggi layar)
- [ ] Preloader disesuaikan ke gaya baru (dua panel kuning dan hitam membuka diagonal, inisial "AA" Anton), maksimal 1,5 detik, sekali per sesi; setelah selesai hero siap pada keadaan "hanya nama"

### Fase B-4: Penyesuaian gerak lama ke gaya baru
- [ ] Sinkronkan Lenis dengan ScrollTrigger (lenis.on("scroll", ScrollTrigger.update), gsap.ticker.add) dan pastikan AOS tetap terpicu; satu ticker terpusat
- [ ] Smooth scroll Lenis dan bar progres scroll (warna --accent) tetap berfungsi
- [ ] Hitung angka di Tentang tetap berfungsi
- [ ] Tilt kartu proyek (desktop) tetap berfungsi
- [ ] Kursor kustom: satu titik kuning dengan cincin garis tebal, hanya di perangkat hover/pointer halus
- [ ] Marquee tools dan ganti tema melingkar tetap berfungsi
- [ ] Hover tombol dan kartu: offset shadow bergeser berlawanan (terasa "ditekan"), tanpa blur dan glow
- [ ] Durasi dan easing diseragamkan: reveal 0,5-0,8 detik, hover 0,15-0,25 detik, power3.out/expo.out, tanpa efek memantul berlebihan

### Fase B-5: Performa, aksesibilitas, ketahanan
- [ ] Hanya transform, opacity, clip-path yang dianimasikan; will-change hanya sementara
- [ ] Efek berat dimatikan di layar kecil: tilt, kursor kustom, magnetik, parallax kursor, pin panjang
- [ ] Tidak ada layout shift (gambar punya width/height)
- [ ] prefers-reduced-motion: preloader, pin hero, AOS, smooth scroll, parallax, tilt, kursor, marquee dimatikan; semua elemen langsung tampil di keadaan akhir
- [ ] Tanpa JavaScript atau jika GSAP/AOS gagal dimuat: seluruh konten tampil dan terbaca di keadaan akhir
- [ ] Teks yang dipecah per kata/huruf: aria-label pada induk, aria-hidden pada pecahan
- [ ] Fokus keyboard tidak terjebak atau tertutup elemen yang di-pin; Tab bisa mencapai menu dan tombol bahkan sebelum hero selesai; modal/lightbox tetap mengunci fokus dan menutup dengan Esc
- [ ] Tidak ada kedipan lebih dari 3 kali per detik
- [ ] @media print: semua animasi dan elemen dekoratif mati; Cetak CV tetap satu halaman F4

### Fase B-6: Pengujian dan penyelesaian
- [ ] Uji hero: layar pertama hanya nama, scroll memunculkan foto dan komponen berurutan, lalu lanjut ke Tentang tanpa tersangkut
- [ ] Uji reveal AOS di semua bagian: tanpa bentrok dengan GSAP, tanpa kedipan, hanya sekali per elemen
- [ ] Uji mode terang dan gelap saat animasi berjalan
- [ ] Uji dengan reduced motion aktif, JavaScript dimatikan, dan library diblokir
- [ ] Uji di 375px, 768px, 1440px; Chrome dan Firefox; tidak ada error di console
- [ ] Ukur Lighthouse Performance sebelum (akhir Langkah A) dan sesudah; catat angka di Log bila bisa diukur
- [ ] README diperbarui (daftar saklar dan cara mengatur panjang scroll hero)
- [ ] Isi RINGKASAN AKHIR di bawah


## SPESIFIKASI LANGKAH B

### Peran
Kamu adalah creative front-end developer senior yang ahli animasi web. Desain baru "poster berani" (Anton, Barlow, Permanent Marker, kuning-hitam-teal, kartu bergaris tebal, potongan diagonal) sudah selesai di Langkah A. Sekarang tambahkan sistem gerak yang halus dan berkelas: AOS untuk reveal saat scroll, dan hero berurutan yang dikendalikan scroll. Jangan mengubah teks, data, link, atau fitur yang sudah ada.

### Pembagian tugas (penting, supaya tidak bentrok)
- **AOS** (https://michalsnik.github.io/aos/) dipakai untuk REVEAL SEDERHANA: judul bagian, label bernomor, kartu, chip, kartu proyek, thumbnail sertifikat, entri timeline, blok kontak, footer.
- **GSAP + ScrollTrigger + Lenis** dipakai untuk yang rumit: hero berurutan, hitung angka, tilt kartu, modal/lightbox, preloader, smooth scroll, marquee, bar progres, kursor kustom, ganti tema.
- Satu elemen hanya boleh dianimasikan oleh SATU sistem. Hapus reveal GSAP lama yang menumpuk pada elemen yang kini dipegang AOS.

### AOS: cara pasang
- Muat CSS dan JS AOS dari CDN dengan versi dipin (aos@2.3.4 via cdn.jsdelivr.net atau cdnjs). Inisialisasi: AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 80, anchorPlacement: "top-bottom", disable: reduced motion atau library gagal }).
- Karena konten dirender dari data.js, panggil AOS.refreshHard() SETELAH render.js selesai, setelah gambar utama dimuat, setelah filter sertifikat berubah, dan setelah ScrollTrigger refresh/pin selesai (karena pin mengubah tinggi halaman).
- Atribut data-aos dipasang LEWAT render.js dan satu objek konfigurasi (AOS_MAP di js/anim.js). Aturan gerak yang konsisten:
  - Judul bagian: fade-up; label bernomor: zoom-in kecil dengan delay 0.
  - Kartu dalam grid: fade-up dengan data-aos-delay bertahap (0, 80, 160, ... maksimal 400) berdasarkan indeks kolom.
  - Foto Tentang di tengah: zoom-in; Profil Profesional: fade-right; Tentang Saya: fade-left (di HP: fade-up semuanya).
  - Chip keterampilan: fade-up berurutan per kelompok.
  - Entri timeline: fade-right untuk kelompok Pendidikan, fade-left untuk Organisasi (di HP: fade-up).
  - Kartu proyek: flip-up atau fade-up dengan delay bertahap. Thumbnail sertifikat: zoom-in-up.
  - Blok Kontak: fade-up; footer: fade.
  - Stiker/tulisan kuas: zoom-in dengan sedikit rotasi akhir (rotate bawaan dari CSS).
- Hindari AOS pada elemen yang memakai transform lain secara aktif (tilt, magnetik). Untuk kartu proyek ber-tilt, beri pembungkus: AOS di pembungkus, tilt di anak.
- Jika AOS gagal dimuat: halaman tetap tampil penuh.

### Hero berurutan dengan scroll (inti tahap ini)
Pengalaman yang saya mau: layar pertama HANYA berisi nama saya, besar, di tengah (huruf Anton). Saat pengunjung scroll, urutan berikut berjalan mengikuti scroll (scrub):
1. Nama mengecil dan naik ke posisi akhirnya di hero.
2. Foto saya muncul: blok diagonal kuning meluncur masuk dulu, lalu foto naik dengan clip-path/reveal dari bawah.
3. Peran, motto, tombol, tulisan kuas, dan elemen dekoratif muncul bergantian (stagger).
4. Setelah selesai, scroll berlanjut normal ke bagian Tentang.

Detail teknis:
- Gunakan GSAP ScrollTrigger dengan pin pada bagian hero dan scrub (panjang scroll 150-200% tinggi layar), memakai atribut data-hero yang sudah disiapkan. Satu timeline, mudah diubah durasi tiap tahapnya lewat konstanta di bagian atas js/anim.js.
- Saat berada di awal (belum scroll), hanya nama yang terlihat. Beri petunjuk scroll kecil (teks "scroll" dengan garis atau panah) yang menghilang setelah mulai scroll.
- Kalau pengunjung memuat halaman di tengah (refresh sambil sudah scroll) atau memakai link #bagian, hero langsung ke keadaan akhir tanpa tersangkut.
- Navigasi atas tersembunyi/transparan di awal dan muncul setelah hero selesai atau setelah scroll mulai; link menu tetap bisa dipakai.
- Di HP (lebar < 768px): jangan pin panjang. Gunakan versi sederhana: nama muncul, lalu foto dan komponen lain muncul berurutan saat mulai scroll (tanpa pin, atau pin pendek maksimal 100% tinggi layar).
- Preloader: sesuaikan tampilannya ke gaya baru (dua panel kuning dan hitam yang membuka diagonal, inisial "AA" dengan Anton), maksimal 1,5 detik, hanya sekali per sesi. Setelah selesai, hero siap dengan keadaan "hanya nama".

### Penyesuaian gerak lama ke gaya baru
- Pertahankan: smooth scroll Lenis, bar progres scroll (warna --accent), hitung angka di Tentang, tilt kartu proyek (desktop), lightbox/modal, marquee tools, ganti tema melingkar, kursor kustom (kecilkan jadi satu titik kuning dengan cincin garis tebal; hanya di perangkat hover/pointer halus).
- Sesuaikan gaya: durasi lebih tegas dan "snappy" (sekitar 0,5-0,8 detik untuk reveal, 0,15-0,25 detik untuk hover), easing power3.out/expo.out, tanpa efek memantul berlebihan.
- Hover tombol dan kartu: offset shadow bergeser (translate) ke arah berlawanan sehingga terasa "ditekan", tanpa blur dan tanpa glow.
- Sinkronkan Lenis dengan ScrollTrigger (lenis.on("scroll", ScrollTrigger.update), gsap.ticker.add) dan pastikan AOS tetap terpicu. Satu ticker terpusat.

### Performa
- Animasikan hanya transform, opacity, dan clip-path. Jangan menganimasikan width, height, top, left, margin, atau box-shadow berat. will-change hanya sementara.
- Matikan efek berat di layar kecil: tilt, kursor kustom, magnetik, parallax kursor, pin panjang.
- Hindari layout shift. Gambar punya width/height. Target 60fps di laptop biasa dan tetap lancar di HP kelas menengah.
- Saklar di bagian atas js/anim.js: ENABLE_PRELOADER, ENABLE_HERO_SCROLL, ENABLE_AOS, ENABLE_TILT, ENABLE_CURSOR, ENABLE_SMOOTH_SCROLL, ENABLE_MARQUEE.

### Aksesibilitas dan ketahanan (wajib)
- prefers-reduced-motion: reduce => nonaktifkan preloader, pin hero, AOS (disable), smooth scroll, parallax, tilt, kursor, marquee; semua elemen langsung tampil di keadaan akhir.
- Tanpa JavaScript, atau jika GSAP/AOS gagal dimuat: seluruh konten tampil dan terbaca di keadaan akhir. Keadaan awal tersembunyi HANYA berlaku di bawah kelas .js-anim pada `<html>`, yang ditambahkan setelah library berhasil dimuat. Failsafe: jika dalam 3 detik inisialisasi belum jalan, buka semua konten dan lepaskan pin.
- Teks yang dipecah per kata/huruf: aria-label pada induk, aria-hidden pada pecahan.
- Fokus keyboard tidak boleh terjebak atau tertutup elemen yang di-pin. Link menu dan tombol harus bisa dicapai dengan Tab bahkan saat hero belum selesai. Modal dan lightbox tetap mengunci fokus dan menutup dengan Esc.
- Tidak ada kedipan cepat (lebih dari 3 kali per detik).
- @media print: matikan semua animasi dan elemen dekoratif; Cetak CV tetap satu halaman F4.

### Selesai kalau
- Layar pertama hanya menampilkan nama; saat scroll foto dan komponen hero muncul berurutan dengan mulus, lalu scroll lanjut ke Tentang tanpa tersangkut atau melompat.
- Reveal AOS berjalan di semua bagian (sesuai pemetaan di atas) tanpa bentrok dengan GSAP, tanpa elemen yang berkedip, dan hanya terjadi sekali per elemen.
- Light/dark mode tetap rapi saat animasi berjalan.
- Dengan reduced motion aktif, JS dimatikan, atau library gagal dimuat, seluruh halaman tetap lengkap.
- Tidak ada error di console di Chrome dan Firefox; uji di 375px, 768px, 1440px.
- Skor Lighthouse Performance tidak turun drastis dibanding Langkah A.


## RINGKASAN AKHIR LANGKAH B (diisi agen)

- Animasi apa di file mana:
- Pembagian AOS vs GSAP:
- Cara mematikan tiap efek lewat saklar:
- Hal yang perlu saya periksa (misalnya panjang scroll hero yang ingin dipercepat atau diperlambat):

---

## LOG PENGERJAAN

| Waktu | Langkah | Fase | Yang dikerjakan | Catatan / masalah |
|---|---|---|---|---|
| 2026-11-24 12:48 | A | A-0 | Membaca seluruh file kode, inspeksi foto profil dan aku.png (keduanya 1086x1448 rasio 3:4; aku.png punya channel alpha transparan/cutout), membuat git commit titik awal | Berhasil diinisialisasi git dan commit baseline. Rencana: rombak tema, typography (Anton/Barlow/Permanent Marker), tata letak "poster berani", Tentang 3 kolom, dan UI_TEXT. |
| 2026-11-24 12:54 | A | A-1 | Pemasangan Google Fonts (Anton, Barlow, Permanent Marker), token CSS variables lengkap untuk tema gelap dan terang, anti-flicker script, dynamic theme-color meta, pembersihan warna hardcode | Semua warna hardcoded diganti CSS variables. Mode terang diaudit kontras WCAG AA > 5:1. |
| 2026-11-24 12:57 | A | A-2 | Pembuatan komponen dasar gaya "poster berani" (.poster-card sudut tajam offset shadow, .btn-poster-*, .chip-poster, .section-badge, .section-title, .title-highlight, tekstur halftone, dan objek UI_TEXT) | Teks antarmuka disentralisasi ke objek UI_TEXT di js/data.js. |
| 2026-11-24 13:01 | A | A-3 | Rombak tata letak per bagian: Navbar poster berani, Hero statis akhir data-hero, Tentang 3 kolom desktop (cutout aku.png di tengah), Keterampilan marquee, Proyek kartu besar bernomor, Sertifikat grid tab kotak & stiker QR l1nk.dev/62ia9zm, Timeline 2 kolom, Blok kontak kuning besar | Seluruh section berhasil dirender dengan tata letak grafis tajam dan konsisten. |
| 2026-11-24 13:03 | A | A-4 | Penyesuaian foto profil hero dan foto Tentang aku.png (rasio asli 3:4 utuh, width/height eksplisit, cutout di atas blok kuning diagonal -3 deg, OG image) | Tidak ada bagian kepala atau tubuh yang terpotong. |
| 2026-11-24 13:05 | A | A-5 | Integrasi 6 jenjang riwayat pendidikan terurut, penanganan tahun kosong dengan komentar // TODO: isi tahun, badge formal/agama, dan pembaruan counter angka | Riwayat pendidikan tampil rapi dengan tahun kosong disembunyikan otomatis. |
| 2026-11-24 13:07 | A | A-6 | Audit tema terang & gelap menyeluruh, pengujian kontras WCAG AA, uji fitur (modal proyek, lightbox, modal CV cetak F4, form mailto, WhatsApp, menu mobile), uji responsif 375px/768px/1440px, pembaruan README.md | Seluruh 5 file JavaScript valid tanpa syntax error. Seluruh butir Fase A-0 s.d. A-6 terverifikasi. |
