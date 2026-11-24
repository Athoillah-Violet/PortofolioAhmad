/**
 * js/data.js
 * SATU file data utama untuk seluruh konten portofolio.
 * Disimpan sebagai objek global agar kompatibel jika dibuka via file:// tanpa CORS.
 * Menambah proyek atau sertifikat baru cukup menambah entri di objek ini.
 */

window.portfolioData = {
  // Identitas Pribadi
  identitas: {
    nama: "Ahmad Athoillah Almadany",
    peran: "Web Developer · Mahasiswa Informatika UPGRIS",
    kampus: "Universitas PGRI Semarang (UPGRIS)",
    prodi: "S1 Informatika",
    angkatan: "2024",
    email: "athoillahalma836@gmail.com",
    whatsapp: "085643322270",
    whatsappUrl: "https://wa.me/6285643322270",
    githubUsername: "Athoillah-Violet",
    githubUrl: "https://github.com/Athoillah-Violet",
    domisili: "Semarang",
    motto: "Kode yang baik berawal dari niat yang baik.",
    profil: "Mahasiswa Informatika Universitas PGRI Semarang angkatan 2024 berlatar belakang TJKT. Berfokus pada pengembangan web dan analisis sistem, aktif berorganisasi, serta terbiasa mengubah kebutuhan nyata menjadi aplikasi yang berguna.",
    fotoProfil: "assets/img/ahmad-athoillah-almadany.png",
    fotoTentang: "assets/img/aku.png",
    aboutText: "Saya mahasiswa Informatika di Universitas PGRI Semarang (angkatan 2024) dengan latar belakang SMK TJKT. Fokus utama saya adalah rekayasa web dan analisis sistem. Bagi saya, pemrograman bukan sekadar menulis sintaks, melainkan memecahkan masalah nyata menjadi alat kerja yang efisien, tangguh, dan mudah digunakan orang lain. Selain aktif mengasah kode, saya terus mengasah kepemimpinan lewat organisasi kampus dan pengabdian masyarakat.",
    profilFakta: [
      { label: "Peran", value: "Web Developer" },
      { label: "Fokus", value: "Pengembangan Web & Analisis Sistem" },
      { label: "Kampus", value: "UPGRIS · S1 Informatika (2024 - Sekarang)" },
      { label: "Latar Belakang", value: "SMK Syubbanul Wathon (TJKT)" },
      { label: "Sertifikasi Unggulan", value: "MTCNA (MikroTik Certified Network Associate)" }
    ],
    qrSertifikat: "assets/img/qr-sertifikat.png",
    qrSertifikatText: "Scan atau buka l1nk.dev/62ia9zm untuk melihat seluruh sertifikat",
    qrSertifikatUrl: "https://l1nk.dev/62ia9zm",
    printCv: "assets/img/print-cv.png"
  },

  // Microcopy Antarmuka (Gaya Poster Berani, Bahasa Indonesia Lugas Orang Pertama)
  UI_TEXT: {
    hero: {
      badge: "TERBUKA UNTUK KOLABORASI & PROYEK NYATA",
      brushAccent: "Siap bangun web solid!",
      btnProyek: "Lihat Karya",
      btnKontak: "Ajak Ngobrol",
      btnCv: "Periksa CV"
    },
    tentang: {
      badge: "01 TENTANG",
      judulWord1: "SIAPA",
      judulWord2: "SAYA?",
      subjudul: "Fakta langsung tanpa basa-basi korporat.",
      profilTitle: "Profil Profesional",
      tentangTitle: "Tentang Saya",
      statProyek: "Proyek Selesai",
      statSertifikat: "Sertifikasi",
      statOrganisasi: "Tahun Organisasi",
      statTools: "Tools Dikuasai"
    },
    keterampilan: {
      badge: "02 KETERAMPILAN",
      judulWord1: "SENJATA",
      judulWord2: "KODE",
      subjudul: "Teknologi yang saya gunakan untuk mewujudkan ide menjadi produk fungsional."
    },
    proyek: {
      badge: "03 PROYEK",
      judulWord1: "KARYA",
      judulWord2: "PILIHAN",
      subjudul: "Aplikasi nyata yang saya rancang, bangun, dan luncurkan ke publik.",
      btnLive: "Buka Live Demo",
      btnGithub: "Kode Sumber",
      modalPeran: "Peran Saya:",
      modalTeknologi: "Teknologi Digunakan:"
    },
    sertifikat: {
      badge: "04 SERTIFIKAT",
      judulWord1: "BUKTI",
      judulWord2: "KOMPETENSI",
      subjudul: "Sertifikasi teknis, kepemimpinan, dan dedikasi pengabdian masyarakat.",
      filterSemua: "SEMUA",
      qrLabel: "ARSIP LENGKAP",
      qrAction: "Buka l1nk.dev/62ia9zm ↗"
    },
    timeline: {
      badge: "05 PERJALANAN",
      judulWord1: "JEJAK",
      judulWord2: "LANGKAH",
      subjudul: "Jalur belajar formal, pendidikan agama, dan tempaan kepemimpinan.",
      colPendidikan: "Riwayat Pendidikan",
      colOrganisasi: "Organisasi & Pengabdian"
    },
    kontak: {
      badge: "06 KONTAK",
      judulWord1: "HUBUNGI",
      judulWord2: "SAYA",
      subjudul: "Punya ide proyek, tawaran magang, atau ingin berdiskusi? Pintu selalu terbuka.",
      brushAccent: "Respon cepat via WhatsApp!",
      btnWa: "Kirim WhatsApp",
      formTitle: "Kirim Pesan Langsung",
      labelNama: "Nama Lengkap",
      labelEmail: "Alamat Email",
      labelSubjek: "Topik Pesan",
      labelPesan: "Detail Pesan Anda",
      placeholderNama: "Tulis nama Anda...",
      placeholderEmail: "emailanda@domain.com",
      placeholderSubjek: "Misal: Rencana Pembuatan Web Portal",
      placeholderPesan: "Tuliskan garis besar kebutuhan atau pesan Anda di sini...",
      btnKirim: "Luncurkan Pesan (Mailto)"
    },
    footer: {
      tagline: "Dibangun dengan presisi, tanpa template basi.",
      copyright: "Hak Cipta © 2026 Ahmad Athoillah Almadany. Seluruh hak dilindungi.",
      btnTop: "KEMBALI KE PUNCAK ↑"
    }
  },

  // Keterampilan (Kelompok -> Daftar Item)
  keterampilan: [
    {
      kategori: "Web Development",
      ikon: "code",
      deskripsi: "Pengembangan front-end dan back-end modern yang fungsional dan responsif.",
      items: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind CSS", "PHP", "Laravel"]
    },
    {
      kategori: "Pemrograman & Game",
      ikon: "terminal",
      deskripsi: "Eksplorasi logika komputasi, mobile apps, game interaktif, dan hardware.",
      items: ["Python", "Flutter (aplikasi Android)", "Unity (game)", "Game AR", "IoT"]
    },
    {
      kategori: "Data, Sistem & Jaringan",
      ikon: "database",
      deskripsi: "Perancangan arsitektur data, analisis alur sistem, serta infrastruktur jaringan.",
      items: ["Database", "Analisis Data", "Analisis Sistem", "Dasar Jaringan", "MTCNA"]
    },
    {
      kategori: "Office & Produktivitas",
      ikon: "file-text",
      deskripsi: "Dokumentasi proyek, pengolahan lembar kerja, dan penyusunan laporan terstruktur.",
      items: ["Word", "Excel", "PowerPoint", "Google Docs", "Google Sheets"]
    },
    {
      kategori: "Desain & Editing",
      ikon: "palette",
      deskripsi: "Kreasi visual grafis, aset antarmuka, dan penyuntingan multimedia digital.",
      items: ["Adobe Illustrator", "Adobe Photoshop", "Adobe Premiere Pro", "CorelDRAW"]
    },
    {
      kategori: "Tools AI",
      ikon: "sparkles",
      deskripsi: "Pemanfaatan AI terkini untuk efisiensi pemrograman, riset, dan pemecahan masalah.",
      items: ["Claude", "Claude Code", "Gemini", "ChatGPT", "GitHub Copilot", "Antigravity", "Trae SOLO"]
    }
  ],

  // Riwayat Pendidikan (Urut dari yang paling awal ke terbaru)
  pendidikan: [
    {
      institusi: "MI Nurul Islam 1 Wonokerto",
      jurusan: "Pendidikan Dasar",
      periode: "2012/2013 - 2017/2018", // TODO: isi tahun
      year: "2012/2013 - 2017/2018", // TODO: isi tahun
      type: "formal",
      kategoriLabel: "Pendidikan formal",
      deskripsi: ""
    },
    {
      institusi: "Madrasah Diniyah Rhodhotul Tholibin",
      jurusan: "Pendidikan Dasar Agama",
      periode: "2014/2015 - 2017/2018", // TODO: isi tahun
      year: "2014/2015 - 2017/2018", // TODO: isi tahun
      type: "nonformal",
      kategoriLabel: "Pendidikan agama",
      deskripsi: ""
    },
    {
      institusi: "Pondok Pesantren Api Asri",
      jurusan: "Pendidikan Keagamaan & Pesantren",
      periode: "2018/2019 - 2023/2024", // TODO: isi tahun
      year: "2018/2019 - 2023/2024", // TODO: isi tahun
      type: "nonformal",
      kategoriLabel: "Pendidikan agama",
      deskripsi: ""
    },
    {
      institusi: "SMP Syubbanul Wathon",
      jurusan: "Pendidikan Menengah Pertama",
      periode: "2018/2019 - 2020/2021", // TODO: isi tahun
      year: "2018/2019 - 2020/2021", // TODO: isi tahun
      type: "formal",
      kategoriLabel: "Pendidikan formal",
      deskripsi: ""
    },
    {
      institusi: "SMK Syubbanul Wathon",
      jurusan: "Teknik Jaringan Komputer dan Telekomunikasi (TJKT)",
      periode: "Tahun Ajaran 2021/2022 - 2023/2024",
      year: "2021/2022 - 2023/2024",
      type: "formal",
      kategoriLabel: "Pendidikan formal",
      deskripsi: "Mempelajari perakitan jaringan komputer, routing MikroTik (bersertifikasi MTCNA), administrasi server, serta proyek IoT."
    },
    {
      institusi: "Universitas PGRI Semarang (UPGRIS)",
      jurusan: "S1 Informatika",
      periode: "2024 - Sekarang",
      year: "2024 - Sekarang",
      type: "formal",
      kategoriLabel: "Pendidikan formal",
      deskripsi: "Fokus pada Rekayasa Perangkat Lunak, Analisis Sistem Informasi, dan Algoritma. Aktif dalam kegiatan himpunan mahasiswa (HIMFORMA) dan unit kegiatan mahasiswa."
    }
  ],

  // Organisasi & Pengabdian (Urut waktu dari lama ke baru)
  organisasiPengabdian: [
    {
      nama: "Goresan Seni",
      peran: "Anggota",
      durasi: "1 tahun",
      tahun: "Tingkat SMP",
      kategori: "Organisasi",
      deskripsi: "Organisasi minat bakat seni rupa dan kreativitas visual di jenjang sekolah menengah pertama."
    },
    {
      nama: "Kawan Gambar",
      peran: "Anggota Aktif",
      durasi: "3 tahun",
      tahun: "Tingkat SMK",
      kategori: "Organisasi",
      deskripsi: "Komunitas ilustrasi dan desain grafis selama masa studi di SMK Syubbanul Wathon."
    },
    {
      nama: "Remas / Remaja Masjid",
      peran: "Pengurus",
      durasi: "4 tahun",
      tahun: "Organisasi Desa",
      kategori: "Organisasi",
      deskripsi: "Mengkoordinasikan kegiatan keagamaan, sosial kemasyarakatan, dan kepemudaan di tingkat desa."
    },
    {
      nama: "IPNU Komisariat Syubbanul Wathon",
      peran: "Staf Bidang Pendidikan dan Kaderisasi",
      durasi: "1 tahun",
      tahun: "Masa SMK",
      kategori: "Organisasi",
      deskripsi: "Merancang dan mendampingi program pembinaan karakter serta pelatihan kaderisasi pelajar."
    },
    {
      nama: "UKM RNA (Rebana Nurul Asatidz)",
      peran: "Bidang Manajemen",
      durasi: "1 tahun",
      tahun: "2024 - 2025",
      kategori: "Organisasi",
      deskripsi: "Mengelola tata kelola organisasi, penjadwalan latihan, dan kepanitiaan kegiatan UKM seni religi kampus UPGRIS."
    },
    {
      nama: "HIMFORMA (Himpunan Mahasiswa Informatika)",
      peran: "Staf Kesejahteraan Sosial",
      durasi: "1 tahun",
      tahun: "2024 - Sekarang",
      kategori: "Organisasi",
      deskripsi: "Menjalankan program kepedulian sosial, keakraban antar-mahasiswa, dan mendukung advokasi mahasiswa Informatika UPGRIS."
    },
    {
      nama: "Penanaman Mangrove di Desa Bedono",
      peran: "Relawan Pengabdian",
      durasi: "Kegiatan",
      tahun: "2025",
      lokasi: "Sayung, Demak",
      kategori: "Pengabdian",
      deskripsi: "Aksi restorasi ekosistem pesisir melalui penanaman bibit mangrove untuk mitigasi abrasi di Desa Bedono, Sayung, Demak."
    },
    {
      nama: "Pembuatan Website Desa Banyuburu",
      peran: "Web Developer Pengabdian",
      durasi: "Proyek",
      tahun: "2026",
      lokasi: "Desa Kebondowo",
      kategori: "Pengabdian",
      deskripsi: "Program pengabdian masyarakat berupa perancangan dan implementasi website resmi profil desa guna digitalisasi informasi publik dan promosi potensi desa."
    }
  ],

  // Proyek Portofolio
  proyek: [
    {
      id: "edu-familiy100",
      slug: "edu-familiy100",
      judul: "Edu Familiy100",
      deskripsiSingkat: "Website edukasi interaktif berbasis kuis pesanan seorang guru SMP untuk pembelajaran kelas yang menyenangkan.",
      deskripsiLengkap: "Edu Familiy100 adalah aplikasi web edukasi yang diadaptasi dari format kuis populer Family 100. Aplikasi ini dibuat atas pesanan seorang guru SMP guna membantu metode belajar aktif di kelas, menyajikan pertanyaan materi pelajaran dengan mekanisme skor langsung dan tampilan interaktif yang memikat siswa.",
      peran: "Frontend Developer & UI Designer",
      teknologi: ["HTML", "CSS", "JavaScript", "Vercel"],
      gambar: "assets/proyek/edu-familiy100/Screenshot 2026-11-24 090215.png",
      galeri: [
        "assets/proyek/edu-familiy100/Screenshot 2026-11-24 090215.png"
      ],
      linkLive: "https://edu-familiy100.vercel.app/",
      linkGithub: "https://github.com/Athoillah-Violet/Edu_Familiy100",
      unggulan: true
    },
    {
      id: "webgis-puskesmas-semarang",
      slug: "webgis-puskesmas-semarang",
      judul: "WebGIS Fasilitas Kesehatan Kota Semarang",
      deskripsiSingkat: "Sistem informasi geografis berbasis web untuk memetakan sebaran puskesmas dan rasio fasilitas kesehatan di Kota Semarang.",
      deskripsiLengkap: "WebGIS Fasilitas Kesehatan Kota Semarang merupakan platform sistem informasi geografis yang memvisualisasikan data lokasi pusat kesehatan masyarakat (puskesmas) secara spasial. Sistem ini dilengkapi fitur perhitungan rasio ketersediaan faskes terhadap jumlah penduduk per kecamatan untuk membantu analisis keterjangkauan layanan kesehatan.",
      peran: "Full-stack Developer & Data Analyst",
      teknologi: ["HTML", "CSS", "JavaScript", "GIS", "GitHub Pages"],
      gambar: "assets/proyek/webgis-puskesmas-semarang/Screenshot 2026-11-24 090229.png",
      galeri: [
        "assets/proyek/webgis-puskesmas-semarang/Screenshot 2026-11-24 090229.png"
      ],
      linkLive: "https://athoillah-violet.github.io/WebSigPuskesmasSemarang/",
      linkGithub: "https://github.com/Athoillah-Violet/WebSigPuskesmasSemarang",
      unggulan: true
    },
    {
      id: "baca-buku",
      slug: "baca-buku",
      judul: "Baca-Buku",
      deskripsiSingkat: "Platform web katalog dan pembacaan koleksi buku digital berbasis framework Laravel.",
      deskripsiLengkap: "Baca-Buku adalah aplikasi web manajemen katalog buku dan e-reading yang dibangun dengan arsitektur MVC Laravel. Memiliki fitur autentikasi pengguna, kategorisasi koleksi bacaan, pencarian terstruktur, dan antarmuka responsif untuk membaca konten buku secara nyaman di berbagai ukuran layar.",
      peran: "Backend & Frontend Developer",
      teknologi: ["Laravel", "PHP", "MySQL", "Bootstrap"],
      gambar: "assets/proyek/baca-buku/Screenshot 2026-11-24 100905.png",
      galeri: [
        "assets/proyek/baca-buku/Screenshot 2026-11-24 100905.png"
      ],
      linkLive: "",
      linkGithub: "https://github.com/Athoillah-Violet/baca-buku",
      unggulan: false
    },
    {
      id: "smart-blind-web-app",
      slug: "smart-blind-web-app",
      judul: "SmartBlind App (IoT & Web Assistive)",
      deskripsiSingkat: "Aplikasi web navigasi realtime untuk tunanetra yang terhubung dengan mikrokontroler ESP32 melalui protokol MQTT dan panduan suara.",
      deskripsiLengkap: "SmartBlind App adalah inovasi teknologi asistif berbasis Internet of Things (IoT) yang dirancang untuk membantu mobilitas penyandang tunanetra secara mandiri. Aplikasi web ini berlangganan (subscribe) data sensor jarak (kiri, depan, kanan) dari mikrokontroler ESP32 secara real-time via broker MQTT (HiveMQ). Dilengkapi fitur koneksi Device ID dengan penyimpanan lokal, indikator status navigasi visual, panel sensor interaktif, serta panduan suara otomatis menggunakan Web Speech API.",
      peran: "IoT & Frontend Web Developer",
      teknologi: ["IoT", "ESP32", "MQTT (HiveMQ)", "Web Speech API", "JavaScript", "Vercel"],
      gambar: "assets/proyek/smart-blind-web-app/Screenshot 2026-11-24 105041.png",
      galeri: [
        "assets/proyek/smart-blind-web-app/Screenshot 2026-11-24 105041.png"
      ],
      linkLive: "https://smart-blind-web-app.vercel.app/",
      linkGithub: "https://github.com/Athoillah-Violet/SmartBlindWebApp",
      unggulan: true
    },
    {
      id: "cyberguard-ai",
      slug: "cyberguard-ai",
      judul: "CyberGuard AI",
      deskripsiSingkat: "Platform asisten keamanan siber interaktif berbasis AI dan Python Streamlit untuk edukasi ancaman siber, analisis password, dan scanner URL.",
      deskripsiLengkap: "CyberGuard AI adalah aplikasi web asisten keamanan siber cerdas yang dibangun menggunakan Python dan framework Streamlit. Dirancang untuk meningkatkan kesadaran keamanan digital melalui chatbot interaktif berbasis knowledge base keamanan siber terkurasi, penganalisis kekuatan kata sandi (password strength checker), serta pemindai indikasi kerentanan URL secara real-time langsung di memori tanpa dependensi database eksternal.",
      peran: "AI & Python Developer",
      teknologi: ["Python", "Streamlit", "Artificial Intelligence", "Cybersecurity", "Streamlit Cloud"],
      gambar: "assets/proyek/cyberguard-ai/Screenshot 2026-11-24 105128.png",
      galeri: [
        "assets/proyek/cyberguard-ai/Screenshot 2026-11-24 105128.png"
      ],
      linkLive: "https://cyberguard-ai.streamlit.app/",
      linkGithub: "https://github.com/Athoillah-Violet/CyberGuard-AI",
      unggulan: true
    },
    {
      id: "game-augmented-reality",
      slug: "game-augmented-reality",
      judul: "Game Augmented Reality (AR)",
      deskripsiSingkat: "Game edukasi interaktif berbasis Augmented Reality yang memproyeksikan objek 3D ke dunia nyata menggunakan Unity.",
      deskripsiLengkap: "Pengembangan game berbasis Augmented Reality yang memadukan lingkungan nyata dengan objek virtual 3D interaktif secara real-time. Dibangun menggunakan Unity Engine dengan pemrograman C# dan integrasi tracking kamera untuk pengalaman visual yang imersif.",
      peran: "Game & AR Developer",
      teknologi: ["Unity Engine", "C#", "Augmented Reality", "3D Interactive"],
      gambar: "assets/proyek/game-augmented-reality/Screenshot 2026-11-24 100420.png",
      galeri: [
        "assets/proyek/game-augmented-reality/Screenshot 2026-11-24 100420.png"
      ],
      linkLive: "",
      linkGithub: "",
      unggulan: false
    }
  ],

  // Galeri Sertifikat
  // Kategori: Teknis | Kepemimpinan | Pengabdian
  sertifikat: [
    {
      id: "mtcna",
      judul: "MikroTik Certified Network Associate (MTCNA)",
      penerbit: "MikroTik (Mikrotikls SIA)",
      tahun: "2023",
      tanggal: "22 November 2023",
      nomor: "2311NA8596",
      kategori: "Teknis",
      peran: "Certified Network Associate",
      gambar: "sertifikat/mtcna.png",
      fileAsli: "sertifikat/doc.pdf",
      deskripsi: "Sertifikasi kompetensi jaringan MikroTik tingkat associate internasional yang memvalidasi keahlian routing, switching, wireless, firewall, QoS, dan bandwidth management."
    },
    {
      id: "gemini-academy",
      judul: "Gemini Academy for Higher Education",
      penerbit: "Google for Education & Paideia",
      tahun: "2026",
      tanggal: "9 November 2026",
      nomor: "GGLM26111333",
      kategori: "Teknis",
      peran: "Trainee & Certified Participant",
      gambar: "sertifikat/gemini-academy.png",
      fileAsli: "sertifikat/GGLM26111333.pdf",
      deskripsi: "Pelatihan resmi pemanfaatan Google Gemini untuk riset akademik, pembelajaran tingkat tinggi, pembuatan video Veo 3, NotebookLM, dan vibe coding (24 JP)."
    },
    {
      id: "kuliah-umum-gemini-ai",
      judul: "Kuliah Umum 'Think Smart, Code Smarter: Exploring the Power of Gemini AI'",
      penerbit: "Prodi Informatika UPGRIS",
      tahun: "2026",
      tanggal: "9 November 2026",
      nomor: "003/KU-IF/UPGRISI/XI/2026",
      kategori: "Teknis",
      peran: "Peserta",
      gambar: "sertifikat/kuliah-umum-gemini-ai.png",
      fileAsli: "sertifikat/sertifikat_ahmad-athoillah-almadany.pdf",
      deskripsi: "Seminar mendalam mengenai implementasi kecerdasan artifisial Google Gemini dalam rekayasa perangkat lunak dan optimalisasi alur kerja pengembang software."
    },
    {
      id: "pengmas-bem-fti",
      judul: "Penghargaan Pengabdian Masyarakat",
      penerbit: "BEM FTI UPGRIS",
      tahun: "2025",
      tanggal: "Agustus - September 2025",
      nomor: "Sertifikat Penghargaan Akselerasi Asa",
      kategori: "Pengabdian",
      peran: "Peserta Pengabdian Masyarakat",
      gambar: "sertifikat/SERTIFIKAT PESERTA PENGMAS - 16.png",
      fileAsli: "sertifikat/SERTIFIKAT PESERTA PENGMAS - 16.png",
      deskripsi: "Apresiasi atas partisipasi dan kontribusi aktif dalam penyelenggaraan program pengabdian kepada masyarakat oleh BEM Fakultas Teknik dan Informatika UPGRIS."
    },
    {
      id: "lkmm-td",
      judul: "Latihan Keterampilan Manajemen Mahasiswa Tingkat Dasar (LKMM TD)",
      penerbit: "BEM FTI UPGRIS",
      tahun: "2025",
      tanggal: "24-25 Mei 2025",
      nomor: "003/A/PAN_LKMM_TD/BEMFTI/V/2025",
      kategori: "Kepemimpinan",
      peran: "Peserta Aktif",
      gambar: "sertifikat/LKMN TD_1.jpg",
      fileAsli: "sertifikat/LKMN TD.pdf",
      deskripsi: "Pelatihan manajemen kepemimpinan organisasi mencakup pengendalian motivasi, administrasi kepanitiaan, kelegislatifan, dan manajemen isu sosial."
    },
    {
      id: "lkmm-tpd",
      judul: "Latihan Keterampilan Manajemen Mahasiswa Tingkat Pra Dasar (LKMM TPD)",
      penerbit: "HIMFORMA (Prodi Informatika dan Teknologi Pangan UPGRIS)",
      tahun: "2025",
      tanggal: "26-27 April 2025",
      nomor: "005/A/PAN_LKMMTPD/HIMFORMA/IV/2025",
      kategori: "Kepemimpinan",
      peran: "Peserta Aktif",
      gambar: "sertifikat/Setifikat LKMN TPD_1.jpg",
      fileAsli: "sertifikat/Setifikat LKMN TPD.pdf",
      deskripsi: "Pembekalan dasar kepemimpinan mahasiswa dengan fokus pada pemikiran kritis dan konstruktif, komunikasi efektif, kontribusi sosial, dan pengenalan diri."
    },
    // Sertifikat tambahan yang ditemukan di folder sertifikat/ (dilengkapi tanda // TODO: periksa)
    {
      id: "panitia-fe-be-infest-2025",
      judul: "Pelatihan Front End Back End 'Frontend x Backend: Building E-Commerce Beyond The Surface'",
      penerbit: "HIMFORMA UPGRIS",
      tahun: "2025",
      tanggal: "11-12 Mei 2025",
      nomor: "012/B/PAN_FEBE/HIMFORMA/V/2025",
      kategori: "Teknis", // TODO: periksa
      peran: "Panitia",
      gambar: "sertifikat/26.png",
      fileAsli: "sertifikat/26.png",
      deskripsi: "Kepanitiaan kegiatan pelatihan teknis web development pembangunan e-commerce dari sisi frontend dan backend mahasiswa Informatika UPGRIS."
    },
    {
      id: "panitia-talkshow-ai-infest-2025",
      judul: "InTalkshow 'Generasi AI: Mempersiapkan Mahasiswa dalam Dunia Kerja Baru'",
      penerbit: "HIMFORMA UPGRIS",
      tahun: "2025",
      tanggal: "13 Juni 2025",
      nomor: "004/B/PAN_INTALKSHOW/HIMFORMA/VI/2025",
      kategori: "Teknis", // TODO: periksa
      peran: "Panitia",
      gambar: "sertifikat/81.jpg",
      fileAsli: "sertifikat/81.jpg",
      deskripsi: "Kepanitiaan talkshow edukatif tentang adaptasi dan pemanfaatan kecerdasan buatan bagi generasi muda di dunia profesional."
    },
    {
      id: "workshop-pemakalah-seminar-2026",
      judul: "Workshop 'Menjadi Pemakalah dalam Seminar Nasional' (IN-FEST 2026)",
      penerbit: "Program Studi Informatika UPGRIS",
      tahun: "2026",
      tanggal: "22 Juni 2026",
      nomor: "08/INFORMATIKA/FTI/UPGRISI/VI/2026",
      kategori: "Teknis", // TODO: periksa
      peran: "Peserta",
      gambar: "sertifikat/seminar-nasional-infest-2026.png",
      fileAsli: "sertifikat/Ahmad Athoillah Almadany.pdf",
      deskripsi: "Workshop penulisan dan penyusunan artikel ilmiah serta teknik presentasi untuk menjadi pemakalah pada seminar nasional teknologi."
    },
    {
      id: "seminar-nasional-festival-mku-2024",
      judul: "Seminar Nasional 'Penanganan Kekerasan di Lingkungan Pendidikan' - Festival MKU",
      penerbit: "Pusat Pengembangan MKU LPP Universitas PGRI Semarang",
      tahun: "2024",
      tanggal: "18 Desember 2024",
      nomor: "29/P2MKU-LPP/UPGRIS/XII/2024",
      kategori: "Pengabdian", // TODO: periksa
      peran: "Peserta",
      gambar: "sertifikat/festival-mku.png",
      fileAsli: "sertifikat/Sertifikat Festival MKU _NAMA_(441).pdf",
      deskripsi: "Partisipasi dalam seminar nasional advokasi dan edukasi pencegahan serta penanganan kekerasan di institusi pendidikan."
    },
    {
      id: "panitia-raker-ukm-rna-2025",
      judul: "Raker dan Upgrading UKM Rebana Nurul Asatidz 'Ciptakan Perbaikan Menuju Generasi Perubahan'",
      penerbit: "UKM Rebana Nurul Asatidz UPGRIS",
      tahun: "2025",
      tanggal: "20 Januari 2025",
      nomor: "001/A/Pan_RAKERUP/UKMRNA/1/2025",
      kategori: "Kepemimpinan", // TODO: periksa
      peran: "Panitia",
      gambar: "sertifikat/1.png",
      fileAsli: "sertifikat/1.png",
      deskripsi: "Kepanitiaan rapat kerja dan upgrading tata kelola organisasi UKM Rebana Nurul Asatidz UPGRIS."
    },
    {
      id: "panitia-diklat-ukm-rna-2025",
      judul: "Diklat II UKM Rebana Nurul Asatidzt 'Menjadi Mahasiswa Berdaya'",
      penerbit: "UKM Rebana Nurul Asatidzt UPGRIS",
      tahun: "2025",
      tanggal: "22 Juni 2025",
      nomor: "002/B/PAN_DIKLATII/UKMRNA/VI/2025",
      kategori: "Kepemimpinan", // TODO: periksa
      peran: "Panitia",
      gambar: "sertifikat/3.png",
      fileAsli: "sertifikat/3.png",
      deskripsi: "Kepanitiaan pendidikan dan pelatihan keanggotaan II UKM Rebana Nurul Asatidz UPGRIS."
    },
    {
      id: "peserta-pelatihan-administrasi-2025",
      judul: "Pelatihan Administrasi 'Optimalisasi Administrasi untuk Efisiensi dan Transparansi Organisasi'",
      penerbit: "HIMFORMA UPGRIS",
      tahun: "2025",
      tanggal: "18 Maret 2025",
      nomor: "004/A/PAN_ADMIN/HIMFORMA/III/2025",
      kategori: "Kepemimpinan", // TODO: periksa
      peran: "Peserta",
      gambar: "sertifikat/4.png",
      fileAsli: "sertifikat/4.png",
      deskripsi: "Pelatihan standar tata kelola kesekretariatan, administrasi surat-menyurat, dan pengarsipan organisasi mahasiswa."
    },
    {
      id: "kuliah-inspiratif-ukki-2025",
      judul: "Kuliah Inspiratif 'Sholat Kunci Sukses Dunia Akhirat'",
      penerbit: "Unit Kegiatan Kerohanian Islam (UKKI) UPGRIS",
      tahun: "2025",
      tanggal: "03 Mei 2025",
      nomor: "001/A/PAN_KUISGENAP/UKKI/V/2025",
      kategori: "Pengabdian", // TODO: periksa
      peran: "Peserta",
      gambar: "sertifikat/189.png",
      fileAsli: "sertifikat/189.png",
      deskripsi: "Partisipasi dalam kegiatan kerohanian dan pengembangan spiritual mahasiswa di lingkungan kampus UPGRIS."
    },
    {
      id: "panitia-muktamar-ukm-rna-2024",
      judul: "Muktamar UKM Rebana Nurul Asatidz 'Regenerasi Kepemimpinan yang Berintegritas'",
      penerbit: "UKM Rebana Nurul Asatidz UPGRIS",
      tahun: "2024",
      tanggal: "7 Desember 2024",
      nomor: "015/B/Pan.Muktamar/UKMRNA/XII/2024",
      kategori: "Kepemimpinan", // TODO: periksa
      peran: "Panitia",
      gambar: "sertifikat/A. Athoillah Almadany-015.png",
      fileAsli: "sertifikat/A. Athoillah Almadany-015.png",
      deskripsi: "Kepanitiaan muktamar pergantian kepengurusan tahunan UKM Rebana Nurul Asatidz UPGRIS."
    },
    {
      id: "panitia-mubes-himforma-2024",
      judul: "Musyawarah Besar HIMFORMA 2024 'Evaluasi dan Reformasi: Menetapkan Visi Baru'",
      penerbit: "HIMFORMA UPGRIS",
      tahun: "2024",
      tanggal: "30 November - 1 Desember 2024",
      nomor: "012/B/PAN_MUBES/HIMFORMA/XII/2024",
      kategori: "Kepemimpinan", // TODO: periksa
      peran: "Panitia",
      gambar: "sertifikat/Ahmad Ahoillah.png",
      fileAsli: "sertifikat/Ahmad Ahoillah.png",
      deskripsi: "Kepanitiaan musyawarah tertinggi mahasiswa jurusan Informatika UPGRIS untuk menetapkan AD/ART dan arah kepengurusan."
    },
    {
      id: "peserta-mubes-himforma-2025",
      judul: "Musyawarah Besar HIMFORMA 2025 'Musyawarah Inspiratif: Menuju Kepemimpinan Transformasional'",
      penerbit: "HIMFORMA UPGRIS",
      tahun: "2025",
      tanggal: "29-30 November 2025",
      nomor: "008/A/PAN_MUBES/HIMFORMA/XII/2025",
      kategori: "Kepemimpinan", // TODO: periksa
      peran: "Peserta",
      gambar: "sertifikat/Ahmad Athoillah A.png",
      fileAsli: "sertifikat/Ahmad Athoillah A.png",
      deskripsi: "Partisipasi aktif dalam sidang komisi dan pleno Musyawarah Besar Himpunan Mahasiswa Informatika 2025."
    },
    {
      id: "peserta-sekolah-eksekutif-muda-2024",
      judul: "Sekolah Eksekutif Muda BEM FTI 'Transformasi Kepemimpinan: Membentuk Generasi Muda'",
      penerbit: "BEM FTI UPGRIS",
      tahun: "2024",
      tanggal: "28 September 2024",
      nomor: "229/A/PAN_SEM/BEMFTI/IX/2024",
      kategori: "Kepemimpinan", // TODO: periksa
      peran: "Peserta",
      gambar: "sertifikat/Ahmad Athoillah Almadany.png",
      fileAsli: "sertifikat/Ahmad Athoillah Almadany.png",
      deskripsi: "Kaderisasi dan pengenalan kelembagaan eksekutif mahasiswa Fakultas Teknik dan Informatika UPGRIS."
    },
    {
      id: "piagam-kepenulisan-buku-2024",
      judul: "Piagam Kepenulisan: Penulis Buku 'Jejak Langkah Menuju Cita Mahasiswa UPGRIS 2024'",
      penerbit: "Penerbit Literakata & Galakarsa UPGRIS",
      tahun: "2024",
      tanggal: "September 2024",
      nomor: "1510/PK/GKUPGRIS/IX/2024",
      kategori: "Pengabdian", // TODO: periksa
      peran: "Penulis",
      gambar: "sertifikat/Piagam kepenulisan.jpg",
      fileAsli: "sertifikat/Piagam kepenulisan.pdf",
      deskripsi: "Piagam penghargaan atas karya tulis dalam antologi inspiratif mahasiswa baru UPGRIS yang diterbitkan secara resmi oleh Literakata."
    }
  ]
};
