/**
 * js/render.js
 * Bertanggung jawab merender seluruh komponen HTML dinamis dari window.portfolioData.
 * Mengintegrasikan atribut data-aos dan data-hero untuk orkestrasi animasi AOS + GSAP ScrollTrigger.
 */

const PortfolioRenderer = {
  // Helper akses UI_TEXT
  getUI(data) {
    return data.UI_TEXT || {};
  },

  // 1. Render Hero Section (Layer Intro 3-Baris + Layer Utama Sesuai Spesifikasi Langkah C)
  renderHero(data) {
    const container = document.getElementById('hero-container');
    if (!container) return;

    const { nama, peran, motto, fotoProfil } = data.identitas;
    const UI = this.getUI(data);

    container.innerHTML = `
      <div class="relative min-h-[75vh] flex flex-col justify-center">
        
        <!-- LAYER INTRO (Layar Pertama Sebelum Scroll: 3 Baris Sama Lebar + Kicker + Petunjuk Scroll) -->
        <div data-hero="intro" class="hero-intro-display" aria-hidden="true">
          <!-- Baris Kecil Penjangkar Atas -->
          <div class="hero-intro-kicker font-body font-bold text-xs sm:text-sm uppercase tracking-[0.25em] text-[var(--accent-text)] mb-3 sm:mb-4 text-center">
            PORTOFOLIO · SEMARANG
          </div>
          
          <!-- Tiga Baris Nama: AHMAD / ATHOILLAH / ALMADANY (Sama Lebar Seperti Judul Poster) -->
          <div class="hero-intro-name flex flex-col items-center justify-center font-anton leading-[0.92] text-center select-none">
            <span class="hero-name-line hero-line-1 block text-[var(--ink)]">AHMAD</span>
            <span class="hero-name-line hero-line-2 block my-1 sm:my-2">
              <span class="bg-[var(--accent)] text-[var(--on-accent)] px-3 sm:px-4 py-0.5 sm:py-1 inline-block -rotate-1 border-2 border-[var(--line)] shadow-[3px_3px_0_var(--shadow-hard)]">ATHOILLAH</span>
            </span>
            <span class="hero-name-line hero-line-3 block text-[var(--ink)]">ALMADANY</span>
          </div>

          <!-- Petunjuk Scroll Terpusat di Bawah Blok Nama -->
          <div data-hero="hint" class="pt-6 sm:pt-8 text-center">
            <span class="inline-flex items-center gap-2 px-3 py-1 bg-[var(--surface)] border-2 border-[var(--line)] shadow-[2px_2px_0_var(--shadow-hard)] font-anton text-xs tracking-widest text-[var(--accent-text)] uppercase animate-bounce">
              ↓ GULIR KE BAWAH ↓
            </span>
          </div>
        </div>

        <!-- LAYER UTAMA (Susunan Akhir Hero: Foto Kiri, Nama & Konten Kanan - Tidak Berubah) -->
        <div data-hero="main" class="hero-main-grid grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <!-- Kolom Foto Hero (3:4 Utuh, Bingkai Diagonal Kuning di Belakang) -->
          <div class="lg:col-span-5 flex justify-center lg:justify-start" data-hero="photo">
            <div class="hero-photo-container">
              <!-- Blok Kuning Diagonal di Belakang Foto -->
              <div class="hero-photo-bg-block" aria-hidden="true"></div>
              
              <!-- Bingkai Foto Asli 3:4 -->
              <div class="hero-photo-wrapper">
                <img 
                  src="${fotoProfil}" 
                  alt="Foto Profil ${nama}" 
                  width="1086" 
                  height="1448" 
                  class="hero-photo-img"
                  loading="eager"
                >
              </div>
              
              <!-- Stiker Lokasi Bergaya Poster -->
              <div data-hero="deco" class="absolute -bottom-4 right-2 sm:right-4 px-3.5 py-1.5 bg-[var(--surface)] border-2 border-[var(--line)] shadow-[3px_3px_0_var(--shadow-hard)] flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--ink)] z-10 -rotate-2">
                <span class="w-2.5 h-2.5 bg-[var(--accent)] border border-[var(--line)]"></span>
                <span>Semarang, ID</span>
              </div>
            </div>
          </div>

          <!-- Kolom Teks & Aksi Hero -->
          <div class="lg:col-span-7 text-center lg:text-left space-y-5">
            <!-- Badge Hero -->
            <div data-hero="role" class="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[var(--surface)] border-2 border-[var(--line)] shadow-[3px_3px_0_var(--shadow-hard)] text-xs font-bold uppercase tracking-widest text-[var(--ink)]">
              <span class="w-2 h-2 bg-[var(--accent)] border border-[var(--line)]"></span>
              <span>${UI.hero?.badge || "TERBUKA UNTUK KOLABORASI & PROYEK NYATA"}</span>
            </div>

            <!-- Nama Besar Anton dengan Blok Kuning (Dua Baris Sesuai Desain Poster) -->
            <h1 data-hero="name" class="font-anton text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-[var(--ink)]">
              AHMAD <span class="bg-[var(--accent)] text-[var(--on-accent)] px-3 py-1 inline-block -rotate-1 border-2 border-[var(--line)] shadow-[4px_4px_0_var(--shadow-hard)]">ATHOILLAH</span> ALMADANY
            </h1>

            <!-- Peran Profesional -->
            <p data-hero="role" class="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-[var(--accent-text)]">
              ${peran}
            </p>

            <!-- Motto -->
            <blockquote data-hero="motto" class="border-l-4 border-[var(--accent)] pl-4 py-1.5 text-base sm:text-lg font-medium text-[var(--ink-muted)] italic text-left inline-block">
              &ldquo;${motto}&rdquo;
            </blockquote>

            <!-- Aksen Tulisan Kuas Permanent Marker -->
            <div data-hero="deco" class="pt-1">
              <span class="font-marker text-lg sm:text-xl text-[var(--accent)] -rotate-3 inline-block select-none drop-shadow-sm">
                ✍️ ${UI.hero?.brushAccent || "Siap bangun web solid!"}
              </span>
            </div>

            <!-- Tiga Tombol Aksi Hero -->
            <div data-hero="cta" class="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-3">
              <a href="#proyek" class="btn-poster-primary" aria-label="Lihat daftar proyek saya">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                ${UI.hero?.btnProyek || "Lihat Karya"}
              </a>
              
              <a href="#kontak" class="btn-poster-secondary" aria-label="Hubungi saya langsung">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                ${UI.hero?.btnKontak || "Ajak Ngobrol"}
              </a>

              <button type="button" id="btn-hero-cv" class="btn-poster-outline" aria-label="Buka pratinjau Curriculum Vitae">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                ${UI.hero?.btnCv || "Periksa CV"}
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  },

  // 2. Render Tentang Saya Section (AOS: Foto zoom-in, Profil fade-right, Tentang fade-left)
  renderTentang(data) {
    const container = document.getElementById('tentang-container');
    if (!container) return;

    const UI = this.getUI(data);
    const { fotoTentang, aboutText, profilFakta, profil } = data.identitas;

    const totalProyek = data.proyek.length;
    const totalSertifikat = data.sertifikat.length;

    let totalTahunOrganisasi = 0;
    data.organisasiPengabdian.forEach(item => {
      const match = item.durasi.match(/(\d+)\s*tahun/i);
      if (match) {
        totalTahunOrganisasi += parseInt(match[1], 10);
      }
    });

    let totalSkills = 0;
    data.keterampilan.forEach(kat => {
      totalSkills += kat.items.length;
    });

    // Fakta Profil Profesional
    const faktaList = profilFakta || [
      { label: "Peran", value: "Web Developer" },
      { label: "Fokus", value: "Pengembangan Web & Analisis Sistem" },
      { label: "Kampus", value: "UPGRIS · S1 Informatika 2024" },
      { label: "Latar", value: "SMK Syubbanul Wathon (TJKT)" },
      { label: "Sertifikasi", value: "MTCNA (MikroTik Certified Network Associate)" }
    ];

    const faktaHtml = faktaList.map(f => `
      <div class="p-3 bg-[var(--bg-alt)] border-2 border-[var(--line)] shadow-[2px_2px_0_var(--shadow-hard)]">
        <span class="block text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">${f.label}</span>
        <span class="block text-sm sm:text-base font-bold text-[var(--ink)] mt-0.5">${f.value}</span>
      </div>
    `).join('');

    const descText = aboutText || profil;

    container.innerHTML = `
      <div class="space-y-12">
        <!-- Header Judul Bagian -->
        <div class="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <div class="section-badge" data-aos="zoom-in" data-aos-duration="450">${UI.tentang?.badge || "01 TENTANG"}</div>
          <h2 class="section-title">
            <span class="title-highlight">${UI.tentang?.judulWord1 || "SIAPA"}</span> ${UI.tentang?.judulWord2 || "SAYA?"}
          </h2>
          <p class="mt-3 text-base sm:text-lg text-[var(--ink-muted)] font-medium">
            ${UI.tentang?.subjudul || "Fakta langsung tanpa basa-basi korporat."}
          </p>
        </div>

        <!-- Tiga Kolom: Kiri (Profil Profesional), Tengah (Foto Cutout), Kanan (Tentang Saya & Angka) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Kolom 1 (Desktop Kiri / Order 1): Profil Profesional -->
          <div class="lg:col-span-4 lg:order-1 poster-card p-6 sm:p-7 space-y-4" data-aos="fade-right">
            <div class="flex items-center gap-2 pb-3 border-b-2 border-[var(--line)]">
              <span class="w-3 h-3 bg-[var(--accent)] border border-[var(--line)]"></span>
              <h3 class="font-anton text-xl sm:text-2xl tracking-wide text-[var(--ink)]">
                ${UI.tentang?.profilTitle || "Profil Profesional"}
              </h3>
            </div>
            <div class="space-y-3 pt-1">
              ${faktaHtml}
            </div>
          </div>

          <!-- Kolom 2 (Desktop Tengah / Order 2): Foto Cutout aku.png di atas Blok Kuning -->
          <div class="lg:col-span-4 lg:order-2 flex justify-center items-center" data-aos="zoom-in">
            <div class="about-photo-container">
              <!-- Blok Kuning Miring di Belakang Foto Cutout -->
              <div class="about-photo-bg-block" aria-hidden="true"></div>
              
              <!-- Foto Cutout Utuh -->
              <img 
                src="${fotoTentang || 'assets/img/aku.png'}" 
                alt="Ahmad Athoillah Almadany - Foto Profil" 
                width="1086" 
                height="1448" 
                class="about-photo-img"
                loading="lazy"
              >
            </div>
          </div>

          <!-- Kolom 3 (Desktop Kanan / Order 3): Tentang Saya & 4 Angka Ringkas -->
          <div class="lg:col-span-4 lg:order-3 poster-card p-6 sm:p-7 space-y-6" data-aos="fade-left">
            <div>
              <div class="flex items-center gap-2 pb-3 border-b-2 border-[var(--line)]">
                <span class="w-3 h-3 bg-[var(--accent)] border border-[var(--line)]"></span>
                <h3 class="font-anton text-xl sm:text-2xl tracking-wide text-[var(--ink)]">
                  ${UI.tentang?.tentangTitle || "Tentang Saya"}
                </h3>
              </div>
              <p class="mt-4 text-sm sm:text-base text-[var(--ink)] leading-relaxed font-normal">
                ${descText}
              </p>
            </div>

            <!-- 4 Angka Ringkas (2x2 Grid) -->
            <div class="pt-4 border-t-2 border-[var(--line)]">
              <div class="grid grid-cols-2 gap-3">
                <div class="p-3.5 bg-[var(--bg-alt)] border-2 border-[var(--line)] shadow-[2px_2px_0_var(--shadow-hard)] text-center stat-counter-box" data-aos="fade-up" data-aos-delay="50">
                  <div class="font-anton text-3xl sm:text-4xl text-[var(--ink)] leading-none stat-number" data-target="${totalProyek}">${totalProyek}</div>
                  <div class="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)] mt-1.5">${UI.tentang?.statProyek || "Proyek"}</div>
                </div>

                <div class="p-3.5 bg-[var(--bg-alt)] border-2 border-[var(--line)] shadow-[2px_2px_0_var(--shadow-hard)] text-center stat-counter-box" data-aos="fade-up" data-aos-delay="100">
                  <div class="font-anton text-3xl sm:text-4xl text-[var(--ink)] leading-none stat-number" data-target="${totalSertifikat}">${totalSertifikat}</div>
                  <div class="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)] mt-1.5">${UI.tentang?.statSertifikat || "Sertifikasi"}</div>
                </div>

                <div class="p-3.5 bg-[var(--bg-alt)] border-2 border-[var(--line)] shadow-[2px_2px_0_var(--shadow-hard)] text-center stat-counter-box" data-aos="fade-up" data-aos-delay="150">
                  <div class="font-anton text-3xl sm:text-4xl text-[var(--ink)] leading-none"><span class="stat-number" data-target="${totalTahunOrganisasi}">${totalTahunOrganisasi}</span>+</div>
                  <div class="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)] mt-1.5">${UI.tentang?.statOrganisasi || "Thn Org"}</div>
                </div>

                <div class="p-3.5 bg-[var(--bg-alt)] border-2 border-[var(--line)] shadow-[2px_2px_0_var(--shadow-hard)] text-center stat-counter-box" data-aos="fade-up" data-aos-delay="200">
                  <div class="font-anton text-3xl sm:text-4xl text-[var(--ink)] leading-none"><span class="stat-number" data-target="${totalSkills}">${totalSkills}</span>+</div>
                  <div class="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)] mt-1.5">${UI.tentang?.statTools || "Skills"}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  // 3. Render Keterampilan Section (AOS: fade-up per kelompok dengan delay bertahap)
  renderKeterampilan(data) {
    const container = document.getElementById('skill-container');
    if (!container) return;

    const UI = this.getUI(data);

    const cardsHtml = data.keterampilan.map((kat, idx) => `
      <div class="poster-card p-6 sm:p-7 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="${idx * 120}">
        <div>
          <div class="flex items-center justify-between pb-3 mb-3 border-b-2 border-[var(--line)]">
            <h3 class="font-anton text-xl tracking-wide text-[var(--ink)]">${kat.kategori}</h3>
            <span class="chip-poster text-[11px] py-0.5 px-2">
              ${kat.items.length} items
            </span>
          </div>
          <p class="text-xs sm:text-sm text-[var(--ink-muted)] mb-5 leading-relaxed font-medium">
            ${kat.deskripsi}
          </p>
        </div>
        <div class="flex flex-wrap gap-2 pt-3 border-t-2 border-[var(--line)]">
          ${kat.items.map(item => `
            <span class="chip-poster">${item}</span>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Gabungkan seluruh nama tool untuk marquee
    const allTools = [];
    data.keterampilan.forEach(k => allTools.push(...k.items));
    const marqueeItems = allTools.concat(allTools).concat(allTools);
    const marqueeHtml = marqueeItems.map(t => `<span class="mx-5 inline-block">★ ${t}</span>`).join('');

    container.innerHTML = `
      <div class="space-y-12">
        <div class="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <div class="section-badge" data-aos="zoom-in" data-aos-duration="450">${UI.keterampilan?.badge || "02 KETERAMPILAN"}</div>
          <h2 class="section-title">
            <span class="title-highlight">${UI.keterampilan?.judulWord1 || "SENJATA"}</span> ${UI.keterampilan?.judulWord2 || "KODE"}
          </h2>
          <p class="mt-3 text-base sm:text-lg text-[var(--ink-muted)] font-medium">
            ${UI.keterampilan?.subjudul || "Teknologi yang saya gunakan untuk mewujudkan ide menjadi produk nyata."}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${cardsHtml}
        </div>

        <!-- Marquee Baris Tak Berujung Bergaya Poster -->
        <div class="marquee-wrapper mt-8" data-aos="fade-up">
          <div class="marquee-track font-anton">
            ${marqueeHtml}
          </div>
        </div>
      </div>
    `;
  },

  // 4. Render Proyek Section (AOS di wrapper .project-aos-wrap, Tilt di anak .project-card-tilt)
  renderProyek(data) {
    const container = document.getElementById('proyek-container');
    if (!container) return;

    const UI = this.getUI(data);

    const cardsHtml = data.proyek.map((p, index) => {
      const projectNum = String(index + 1).padStart(2, '0');
      const delay = (index % 3) * 120;

      const liveBtnHtml = p.linkLive ? `
        <a href="${p.linkLive}" target="_blank" rel="noopener noreferrer" class="btn-poster-primary text-xs py-2 px-3" aria-label="Kunjungi demo live ${p.judul}" onclick="event.stopPropagation()">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          ${UI.proyek?.btnLive || "Live Demo"}
        </a>
      ` : '';

      const githubBtnHtml = p.linkGithub ? `
        <a href="${p.linkGithub}" target="_blank" rel="noopener noreferrer" class="btn-poster-secondary text-xs py-2 px-3" aria-label="Lihat kode sumber ${p.judul} di GitHub" onclick="event.stopPropagation()">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
          ${UI.proyek?.btnGithub || "GitHub"}
        </a>
      ` : '';

      return `
        <div class="project-aos-wrap" data-aos="fade-up" data-aos-delay="${delay}">
          <article class="project-card-tilt poster-card flex flex-col justify-between overflow-hidden cursor-pointer group h-full" data-project-id="${p.id}" tabindex="0" role="button" aria-label="Buka detail proyek ${p.judul}">
            <div>
              <!-- Gambar Proyek -->
              <div class="relative w-full aspect-video bg-[var(--bg-alt)] overflow-hidden border-b-2 border-[var(--line)]">
                <img 
                  src="${p.gambar}" 
                  alt="Mockup proyek ${p.judul}" 
                  width="800" 
                  height="450" 
                  class="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                >
                <!-- Nomor Proyek Kotak Besar -->
                <span class="absolute top-3 left-3 px-2.5 py-1 bg-[var(--accent)] text-[var(--on-accent)] font-anton text-base border-2 border-[var(--line)] shadow-[3px_3px_0_var(--shadow-hard)]">
                  #${projectNum}
                </span>
              </div>
              
              <div class="p-6 proyek-card-body">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-xs font-bold uppercase tracking-wider text-[var(--accent-text)]">${p.peran}</span>
                </div>
                <h3 class="font-anton text-2xl tracking-wide text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                  ${p.judul}
                </h3>
                <p class="project-desc-short mt-2 text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed font-medium">
                  ${p.deskripsiSingkat}
                </p>
              </div>
            </div>

            <div class="p-6 pt-0">
              <!-- Chip Teknologi Kotak: max 3 chip + "+n" sisanya -->
              <div class="flex flex-wrap gap-1.5 mb-4">
                ${(function () {
          const tags = p.teknologi;
          const maxTags = 3;
          const visible = tags.slice(0, maxTags).map(t => `<span class="chip-poster text-[11px] py-0.5 px-2">${t}</span>`).join('');
          const extra = tags.length > maxTags ? `<span class="chip-poster text-[11px] py-0.5 px-2">+${tags.length - maxTags}</span>` : '';
          return visible + extra;
        })()}
              </div>

              <div class="project-cta-row flex items-center justify-between gap-2 pt-3 border-t-2 border-[var(--line)]">
                <span class="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">Detail Proyek &rarr;</span>
                <div class="flex items-center gap-2">
                  ${githubBtnHtml}
                  ${liveBtnHtml}
                </div>
              </div>
            </div>
          </article>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="space-y-12">
        <div class="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <div class="section-badge" data-aos="zoom-in" data-aos-duration="450">${UI.proyek?.badge || "03 PROYEK"}</div>
          <h2 class="section-title">
            <span class="title-highlight">${UI.proyek?.judulWord1 || "KARYA"}</span> ${UI.proyek?.judulWord2 || "PILIHAN"}
          </h2>
          <p class="mt-3 text-base sm:text-lg text-[var(--ink-muted)] font-medium">
            ${UI.proyek?.subjudul || "Aplikasi nyata yang saya rancang, bangun, dan luncurkan ke publik."}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${cardsHtml}
        </div>

        <div class="text-center pt-4" data-aos="fade-up">
          <a href="${data.identitas.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-poster-secondary inline-flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
            Jelajahi Repositori GitHub (${data.identitas.githubUsername}) &rarr;
          </a>
        </div>
      </div>
    `;
  },

  // 5. Render Sertifikat Section (AOS: zoom-in-up kartu sertifikat, zoom-in stiker QR)
  renderSertifikat(data) {
    const container = document.getElementById('sertifikat-container');
    if (!container) return;

    const UI = this.getUI(data);
    const { qrSertifikat, qrSertifikatText, qrSertifikatUrl } = data.identitas;

    const categories = ["Semua", "Teknis", "Kepemimpinan", "Pengabdian"];

    const filterBtnsHtml = categories.map((cat, idx) => `
      <button 
        type="button" 
        class="cert-filter-btn px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-[var(--line)] shadow-[3px_3px_0_var(--shadow-hard)] cursor-pointer ${idx === 0 ? 'bg-[var(--accent)] text-[var(--on-accent)]' : 'bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--bg-alt)]'}" 
        data-filter="${cat}"
        aria-label="Filter sertifikat kategori ${cat}"
      >
        ${cat}
      </button>
    `).join('');

    const certsHtml = data.sertifikat.map((c, index) => {
      const delay = (index % 3) * 80;
      return `
        <div 
          class="cert-card poster-card overflow-hidden flex flex-col justify-between cursor-pointer group" 
          data-category="${c.kategori}" 
          data-cert-index="${index}" 
          data-aos="zoom-in-up" 
          data-aos-delay="${delay}"
          tabindex="0" 
          role="button" 
          aria-label="Lihat sertifikat ${c.judul}"
        >
          <div>
            <div class="relative w-full aspect-[4/3] bg-[var(--bg-alt)] overflow-hidden border-b-2 border-[var(--line)] flex items-center justify-center">
              <img 
                src="${c.gambar}" 
                alt="${c.judul}" 
                width="600" 
                height="450" 
                class="w-full h-full object-contain block p-2"
                loading="lazy"
              >
              <div class="absolute inset-0 bg-[var(--overlay)] opacity-0 group-hover:opacity-100 flex items-center justify-center text-[var(--ink)] text-xs font-bold uppercase tracking-wider gap-2 transition-opacity">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                Klik Pratinjau
              </div>
            </div>

            <div class="p-5">
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="chip-poster text-[11px] py-0.5 px-2">${c.kategori}</span>
                <span class="text-xs font-mono font-bold text-[var(--ink-muted)]">${c.tahun}</span>
              </div>
              <h3 class="font-anton text-base sm:text-lg tracking-wide text-[var(--ink)] group-hover:text-[var(--accent)] line-clamp-2">
                ${c.judul}
              </h3>
              <p class="mt-1 text-xs text-[var(--ink-muted)] font-medium">
                ${c.penerbit}
              </p>
            </div>
          </div>

          <div class="p-5 pt-0">
            <div class="pt-3 border-t-2 border-[var(--line)] flex items-center justify-between text-xs text-[var(--ink-muted)]">
              <span>Peran: <strong class="text-[var(--ink)]">${c.peran}</strong></span>
              <span class="text-[var(--accent-text)] font-bold">Buka &rarr;</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="space-y-12">
        <div class="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <div class="section-badge" data-aos="zoom-in" data-aos-duration="450">${UI.sertifikat?.badge || "04 SERTIFIKAT"}</div>
          <h2 class="section-title">
            <span class="title-highlight">${UI.sertifikat?.judulWord1 || "BUKTI"}</span> ${UI.sertifikat?.judulWord2 || "KOMPETENSI"}
          </h2>
          <p class="mt-3 text-base sm:text-lg text-[var(--ink-muted)] font-medium">
            ${UI.sertifikat?.subjudul || "Sertifikasi teknis, kepemimpinan, dan dedikasi pengabdian masyarakat."}
          </p>
        </div>

        <!-- Filter Tab Kotak -->
        <div class="flex flex-wrap items-center justify-center gap-3" data-aos="fade-up">
          ${filterBtnsHtml}
        </div>

        <!-- Grid Kartu Sertifikat -->
        <div id="certs-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${certsHtml}
        </div>

        <!-- Stiker Miring QR Code Sertifikat Lengkap -->
        <div class="qr-sticker p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6" data-aos="zoom-in">
          <div class="flex items-center gap-5">
            <div class="w-24 h-24 sm:w-28 sm:h-28 bg-white p-2 border-2 border-[var(--line)] shadow-[3px_3px_0_var(--shadow-hard)] flex-shrink-0 flex items-center justify-center">
              <img 
                src="${qrSertifikat}" 
                alt="QR Code Menuju Seluruh Sertifikat" 
                width="112" 
                height="112" 
                class="w-full h-full object-contain block"
                loading="lazy"
              >
            </div>
            <div>
              <div class="inline-block chip-poster mb-1 text-xs">${UI.sertifikat?.qrLabel || "ARSIP LENGKAP"}</div>
              <h3 class="font-anton text-xl sm:text-2xl text-[var(--ink)]">Seluruh Dokumen Sertifikat</h3>
              <p class="text-xs sm:text-sm text-[var(--ink-muted)] mt-1 max-w-md font-medium">
                ${qrSertifikatText}
              </p>
            </div>
          </div>

          <a href="${qrSertifikatUrl}" target="_blank" rel="noopener noreferrer" class="btn-poster-primary text-sm whitespace-nowrap w-full md:w-auto" aria-label="Buka arsip seluruh sertifikat di Google Drive">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            ${UI.sertifikat?.qrAction || "Buka Drive ↗"}
          </a>
        </div>
      </div>
    `;
  },

  // 6. Render Pendidikan & Organisasi (AOS: Pendidikan fade-right, Organisasi fade-left)
  renderTimeline(data) {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    const UI = this.getUI(data);

    // Pendidikan (6 Jenjang Lengkap)
    const eduHtml = data.pendidikan.map(e => {
      const yearText = (e.periode || e.year || "").trim();
      const yearBadge = yearText ? `<span class="text-xs font-mono font-bold text-[var(--accent-text)]">${yearText}</span>` : '';
      const typeLabel = e.kategoriLabel || (e.type === 'nonformal' ? 'Pendidikan agama' : 'Pendidikan formal');
      const descParagraph = e.deskripsi ? `<p class="text-xs sm:text-sm text-[var(--ink-muted)] mt-2 leading-relaxed font-medium">${e.deskripsi}</p>` : '';

      return `
        <div class="relative pl-8 pb-8 last:pb-0 group" data-aos="fade-right">
          <div class="absolute left-3 top-2.5 bottom-0 w-0.5 bg-[var(--line)] group-last:hidden"></div>
          <div class="absolute left-1 top-2 w-4 h-4 bg-[var(--accent)] border-2 border-[var(--line)] shadow-[2px_2px_0_var(--shadow-hard)]"></div>
          
          <div class="poster-card p-5">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
              ${yearBadge}
              <span class="chip-poster text-[11px] py-0.5 px-2">${typeLabel}</span>
            </div>
            <h4 class="font-anton text-lg tracking-wide text-[var(--ink)]">${e.institusi}</h4>
            <p class="text-xs sm:text-sm font-bold text-[var(--accent-text)] mt-0.5">${e.jurusan}</p>
            ${descParagraph}
          </div>
        </div>
      `;
    }).join('');

    // Organisasi & Pengabdian
    const orgHtml = data.organisasiPengabdian.map(o => `
      <div class="relative pl-8 pb-8 last:pb-0 group" data-aos="fade-left">
        <div class="absolute left-3 top-2.5 bottom-0 w-0.5 bg-[var(--line)] group-last:hidden"></div>
        <div class="absolute left-1 top-2 w-4 h-4 bg-[var(--accent-2)] border-2 border-[var(--line)] shadow-[2px_2px_0_var(--shadow-hard)]"></div>
        
        <div class="poster-card p-5">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
            <span class="text-xs font-mono font-bold text-[var(--accent-text)]">${o.tahun} · ${o.durasi}</span>
            <span class="chip-poster text-[11px] py-0.5 px-2">${o.kategori}</span>
          </div>
          <h4 class="font-anton text-lg tracking-wide text-[var(--ink)]">${o.nama}</h4>
          <p class="text-xs sm:text-sm font-bold text-[var(--accent-text)] mt-0.5">${o.peran}${o.lokasi ? ' · ' + o.lokasi : ''}</p>
          <p class="text-xs sm:text-sm text-[var(--ink-muted)] mt-2 leading-relaxed font-medium">${o.deskripsi}</p>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="space-y-12">
        <div class="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <div class="section-badge" data-aos="zoom-in" data-aos-duration="450">${UI.timeline?.badge || "05 PERJALANAN"}</div>
          <h2 class="section-title">
            <span class="title-highlight">${UI.timeline?.judulWord1 || "JEJAK"}</span> ${UI.timeline?.judulWord2 || "LANGKAH"}
          </h2>
          <p class="mt-3 text-base sm:text-lg text-[var(--ink-muted)] font-medium">
            ${UI.timeline?.subjudul || "Jalur belajar formal, pendidikan agama, dan tempaan kepemimpinan."}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <!-- Kolom 1: Riwayat Pendidikan -->
          <div>
            <div class="flex items-center gap-2 mb-6" data-aos="fade-up">
              <span class="w-8 h-8 bg-[var(--surface)] border-2 border-[var(--line)] shadow-[2px_2px_0_var(--shadow-hard)] flex items-center justify-center text-[var(--ink)]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
              </span>
              <h3 class="font-anton text-2xl tracking-wide text-[var(--ink)]">${UI.timeline?.colPendidikan || "Riwayat Pendidikan"}</h3>
            </div>
            <div class="timeline-tree">
              ${eduHtml}
            </div>
          </div>

          <!-- Kolom 2: Organisasi & Pengabdian -->
          <div>
            <div class="flex items-center gap-2 mb-6" data-aos="fade-up">
              <span class="w-8 h-8 bg-[var(--surface)] border-2 border-[var(--line)] shadow-[2px_2px_0_var(--shadow-hard)] flex items-center justify-center text-[var(--ink)]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </span>
              <h3 class="font-anton text-2xl tracking-wide text-[var(--ink)]">${UI.timeline?.colOrganisasi || "Organisasi & Pengabdian"}</h3>
            </div>
            <div class="timeline-tree">
              ${orgHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 7. Render Kontak Section (AOS: fade-up pada blok kontak)
  renderKontak(data) {
    const container = document.getElementById('kontak-container');
    if (!container) return;

    const UI = this.getUI(data);
    const { email, whatsapp, whatsappUrl, githubUrl, githubUsername, domisili } = data.identitas;

    container.innerHTML = `
      <div class="space-y-12">
        <div class="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <div class="section-badge" data-aos="zoom-in" data-aos-duration="450">${UI.kontak?.badge || "06 KONTAK"}</div>
          <h2 class="section-title">
            <span class="title-highlight">${UI.kontak?.judulWord1 || "HUBUNGI"}</span> ${UI.kontak?.judulWord2 || "SAYA"}
          </h2>
          <p class="mt-3 text-base sm:text-lg text-[var(--ink-muted)] font-medium">
            ${UI.kontak?.subjudul || "Punya ide proyek, tawaran magang, atau ingin berdiskusi? Pintu selalu terbuka."}
          </p>
          <div class="mt-2" data-aos="zoom-in">
            <span class="font-marker text-base sm:text-lg text-[var(--accent)] -rotate-2 inline-block">
              ⚡ ${UI.kontak?.brushAccent || "Respon cepat via WhatsApp!"}
            </span>
          </div>
        </div>

        <!-- Blok Kuning Besar Poster -->
        <div class="bg-[var(--accent)] text-[var(--on-accent)] border-[2.5px] border-[var(--line)] shadow-[8px_8px_0_var(--shadow-hard)] p-6 sm:p-10 lg:p-12" data-aos="fade-up">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Kolom Info Saluran Kontak -->
            <div class="lg:col-span-5 space-y-4">
              <!-- WhatsApp Card -->
              <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="bg-[var(--surface)] text-[var(--ink)] border-2 border-[var(--line)] shadow-[4px_4px_0_var(--shadow-hard)] p-5 flex items-center gap-4 hover:translate-x-1 transition-transform block group">
                <span class="w-12 h-12 bg-[var(--accent)] border-2 border-[var(--line)] flex items-center justify-center text-[var(--on-accent)] flex-shrink-0">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path></svg>
                </span>
                <div>
                  <span class="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)] block">WhatsApp</span>
                  <span class="text-sm sm:text-base font-bold text-[var(--ink)]">${whatsapp}</span>
                </div>
              </a>

              <!-- Email Card -->
              <a href="mailto:${email}" class="bg-[var(--surface)] text-[var(--ink)] border-2 border-[var(--line)] shadow-[4px_4px_0_var(--shadow-hard)] p-5 flex items-center gap-4 hover:translate-x-1 transition-transform block group">
                <span class="w-12 h-12 bg-[var(--accent)] border-2 border-[var(--line)] flex items-center justify-center text-[var(--on-accent)] flex-shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </span>
                <div>
                  <span class="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)] block">Surel / Email</span>
                  <span class="text-sm sm:text-base font-bold text-[var(--ink)] break-all">${email}</span>
                </div>
              </a>

              <!-- GitHub Card -->
              <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="bg-[var(--surface)] text-[var(--ink)] border-2 border-[var(--line)] shadow-[4px_4px_0_var(--shadow-hard)] p-5 flex items-center gap-4 hover:translate-x-1 transition-transform block group">
                <span class="w-12 h-12 bg-[var(--accent)] border-2 border-[var(--line)] flex items-center justify-center text-[var(--on-accent)] flex-shrink-0">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
                </span>
                <div>
                  <span class="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)] block">GitHub Profil</span>
                  <span class="text-sm sm:text-base font-bold text-[var(--ink)]">${githubUsername}</span>
                </div>
              </a>

              <!-- Domisili Badge -->
              <div class="bg-[var(--surface)] text-[var(--ink)] border-2 border-[var(--line)] shadow-[4px_4px_0_var(--shadow-hard)] p-5 flex items-center gap-4">
                <span class="w-12 h-12 bg-[var(--accent)] border-2 border-[var(--line)] flex items-center justify-center text-[var(--on-accent)] flex-shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </span>
                <div>
                  <span class="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)] block">Domisili</span>
                  <span class="text-sm sm:text-base font-bold text-[var(--ink)]">${domisili}, Jawa Tengah</span>
                </div>
              </div>
            </div>

            <!-- Kolom Formulir Pesan (Mailto) -->
            <div class="lg:col-span-7 bg-[var(--surface)] text-[var(--ink)] border-2 border-[var(--line)] shadow-[6px_6px_0_var(--shadow-hard)] p-6 sm:p-8">
              <h3 class="font-anton text-2xl tracking-wide text-[var(--ink)] mb-1">${UI.kontak?.formTitle || "Kirim Pesan Langsung"}</h3>
              <p class="text-xs sm:text-sm text-[var(--ink-muted)] font-medium mb-6">
                Isi formulir berikut untuk membuka draf pesan otomatis di aplikasi surel Anda.
              </p>

              <form id="contact-form" class="space-y-4">
                <div>
                  <label for="contact-name" class="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">${UI.kontak?.labelNama || "Nama Lengkap"} *</label>
                  <input 
                    type="text" 
                    id="contact-name" 
                    name="name" 
                    required 
                    placeholder="${UI.kontak?.placeholderNama || 'Tulis nama Anda...'}"
                    class="w-full px-4 py-2.5 bg-[var(--bg-alt)] border-2 border-[var(--line)] text-[var(--ink)] font-medium text-sm focus:bg-[var(--surface)] focus:outline-none"
                  >
                </div>

                <div>
                  <label for="contact-email" class="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">${UI.kontak?.labelEmail || "Alamat Email"} *</label>
                  <input 
                    type="email" 
                    id="contact-email" 
                    name="email" 
                    required 
                    placeholder="${UI.kontak?.placeholderEmail || 'emailanda@domain.com'}"
                    class="w-full px-4 py-2.5 bg-[var(--bg-alt)] border-2 border-[var(--line)] text-[var(--ink)] font-medium text-sm focus:bg-[var(--surface)] focus:outline-none"
                  >
                </div>

                <div>
                  <label for="contact-message" class="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">${UI.kontak?.labelPesan || "Detail Pesan"} *</label>
                  <textarea 
                    id="contact-message" 
                    name="message" 
                    rows="4" 
                    required 
                    placeholder="${UI.kontak?.placeholderPesan || 'Tuliskan kebutuhan atau pesan Anda di sini...'}"
                    class="w-full px-4 py-2.5 bg-[var(--bg-alt)] border-2 border-[var(--line)] text-[var(--ink)] font-medium text-sm focus:bg-[var(--surface)] focus:outline-none resize-y"
                  ></textarea>
                </div>

                <button type="submit" class="btn-poster-primary w-full py-3.5 text-base">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                  ${UI.kontak?.btnKirim || "Luncurkan Pesan (Mailto)"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    `;
  },

  // 8. Render Footer Section (AOS: fade)
  renderFooter(data) {
    const container = document.getElementById('footer-container');
    if (!container) return;

    const UI = this.getUI(data);
    const { nama, peran } = data.identitas;

    container.innerHTML = `
      <div class="flex flex-col md:flex-row items-center justify-between gap-6" data-aos="fade">
        <div class="text-center md:text-left">
          <span class="font-anton text-2xl tracking-wide text-[var(--ink)] block">${nama}</span>
          <span class="text-xs font-bold uppercase tracking-wider text-[var(--accent-text)]">${peran}</span>
          <p class="text-xs text-[var(--ink-muted)] mt-1 font-medium">${UI.footer?.tagline || "Dibangun dengan presisi, tanpa template basi."}</p>
        </div>

        <nav class="flex flex-wrap items-center justify-center gap-4 text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]" aria-label="Navigasi Footer">
          <a href="#hero" class="hover:text-[var(--accent)] transition-colors">Beranda</a>
          <a href="#tentang" class="hover:text-[var(--accent)] transition-colors">Tentang</a>
          <a href="#skill" class="hover:text-[var(--accent)] transition-colors">Keterampilan</a>
          <a href="#proyek" class="hover:text-[var(--accent)] transition-colors">Proyek</a>
          <a href="#sertifikat" class="hover:text-[var(--accent)] transition-colors">Sertifikat</a>
          <a href="#timeline" class="hover:text-[var(--accent)] transition-colors">Perjalanan</a>
          <a href="#kontak" class="hover:text-[var(--accent)] transition-colors">Kontak</a>
        </nav>

        <button id="btn-back-to-top" type="button" class="btn-poster-secondary text-xs py-2 px-3.5 flex items-center gap-2 cursor-pointer" aria-label="Kembali ke bagian atas halaman">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
          ${UI.footer?.btnTop || "KE PUNCAK ↑"}
        </button>
      </div>

      <div class="mt-8 pt-6 border-t-2 border-[var(--line)] text-center text-xs font-semibold text-[var(--ink-muted)]">
        ${UI.footer?.copyright || "Hak Cipta © 2026 Ahmad Athoillah Almadany. Seluruh hak dilindungi."}
      </div>
    `;
  },

  init() {
    if (!window.portfolioData) {
      console.error('Data portofolio belum tersedia di window.portfolioData!');
      return;
    }
    const data = window.portfolioData;
    this.renderHero(data);
    this.renderTentang(data);
    this.renderKeterampilan(data);
    this.renderProyek(data);
    this.renderSertifikat(data);
    this.renderTimeline(data);
    this.renderKontak(data);
    this.renderFooter(data);

    // Refresh AOS setelah seluruh elemen selesai dirender
    if (typeof AOS !== 'undefined') {
      AOS.refreshHard();
    }
  }
};

window.PortfolioRenderer = PortfolioRenderer;
