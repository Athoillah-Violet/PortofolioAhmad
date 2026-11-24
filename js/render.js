/**
 * js/render.js
 * Bertanggung jawab merender seluruh komponen HTML dinamis dari data di window.portfolioData.
 * Menggunakan Design Tokens CSS Variables secara ketat agar adaptif di Dark & Light Mode (WCAG AA).
 */

const PortfolioRenderer = {
  // 1. Render Hero Section
  renderHero(data) {
    const container = document.getElementById('hero-container');
    if (!container) return;

    const { nama, peran, motto, fotoProfil } = data.identitas;

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <!-- Kolom Foto Profil (Full Portrait 3:4, Besar, Tanpa Crop) -->
        <div class="lg:col-span-5 flex justify-center lg:justify-start" data-reveal>
          <div class="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-none lg:w-[400px] xl:w-[430px] group">
            <!-- Bingkai Foto Portrait Ber-rasio 3:4 Asli -->
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
            <!-- Badge Domisili -->
            <div class="absolute -bottom-3 right-4 px-3.5 py-1.5 rounded-full card-theme border border-[var(--border)] flex items-center gap-2 text-xs font-semibold text-[var(--text)] shadow-lg z-10">
              <span class="w-2.5 h-2.5 rounded-full bg-[var(--accent)]"></span>
              <span>Semarang, Indonesia</span>
            </div>
          </div>
        </div>

        <!-- Kolom Teks & Aksi -->
        <div class="lg:col-span-7 text-center lg:text-left space-y-5" data-reveal>
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full card-theme text-xs font-semibold text-[var(--accent-text)] border border-[var(--border)]">
            <svg class="w-3.5 h-3.5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            <span>Terbuka untuk Kolaborasi &amp; Proyek Web</span>
          </div>

          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-[var(--text)] tracking-tight leading-tight">
            ${nama}
          </h1>

          <p class="text-base sm:text-lg md:text-xl font-medium text-[var(--accent-text)] leading-snug">
            ${peran}
          </p>

          <blockquote class="italic text-sm sm:text-base text-[var(--text-muted)] border-l-2 border-[var(--accent)] pl-4 py-1 inline-block text-left">
            &ldquo;${motto}&rdquo;
          </blockquote>

          <!-- Tiga Tombol Aksi Hero -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <a href="#proyek" class="btn-primary" aria-label="Lihat daftar proyek saya">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              Lihat Proyek
            </a>
            
            <a href="#kontak" class="btn-secondary" aria-label="Hubungi saya via WhatsApp atau Email">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              Hubungi Saya
            </a>

            <button type="button" id="btn-hero-cv" class="btn-outline" aria-label="Buka modal pratinjau CV">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              Lihat CV
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // 2. Render Tentang Saya Section
  renderTentang(data) {
    const container = document.getElementById('tentang-container');
    if (!container) return;

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

    container.innerHTML = `
      <div class="space-y-12">
        <!-- Judul Bagian -->
        <div class="text-center max-w-3xl mx-auto" data-reveal>
          <div class="inline-block chip-theme mb-3">Profil Profesional</div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[var(--text)]">Tentang Saya</h2>
          <p class="mt-4 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            ${data.identitas.profil}
          </p>
        </div>

        <!-- 4 Angka Ringkas (Statik & Dipercantik) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6" data-reveal>
          <div class="card-theme p-6 text-center border-t-2 border-t-[var(--accent)]">
            <div class="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--accent-text)]">${totalProyek}</div>
            <div class="text-xs sm:text-sm font-medium text-[var(--text-muted)] mt-1">Proyek Selesai</div>
          </div>

          <div class="card-theme p-6 text-center border-t-2 border-t-[var(--accent)]">
            <div class="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--accent-text)]">${totalSertifikat}</div>
            <div class="text-xs sm:text-sm font-medium text-[var(--text-muted)] mt-1">Sertifikat &amp; Lisensi</div>
          </div>

          <div class="card-theme p-6 text-center border-t-2 border-t-[var(--accent)]">
            <div class="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--accent-text)]">${totalTahunOrganisasi}+</div>
            <div class="text-xs sm:text-sm font-medium text-[var(--text-muted)] mt-1">Tahun Pengalaman Org</div>
          </div>

          <div class="card-theme p-6 text-center border-t-2 border-t-[var(--accent)]">
            <div class="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--accent-text)]">${totalSkills}+</div>
            <div class="text-xs sm:text-sm font-medium text-[var(--text-muted)] mt-1">Tools &amp; Keterampilan</div>
          </div>
        </div>
      </div>
    `;
  },

  // 3. Render Keterampilan Section
  renderKeterampilan(data) {
    const container = document.getElementById('skill-container');
    if (!container) return;

    const cardsHtml = data.keterampilan.map(kat => `
      <div class="card-theme p-6 flex flex-col justify-between" data-reveal>
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-heading font-bold text-[var(--text)]">${kat.kategori}</h3>
            <span class="chip-theme text-xs py-0.5 px-2.5">
              ${kat.items.length} skill
            </span>
          </div>
          <p class="text-xs sm:text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
            ${kat.deskripsi}
          </p>
        </div>
        <div class="flex flex-wrap gap-2 pt-2 border-t border-[var(--border)]">
          ${kat.items.map(item => `
            <span class="chip-theme">${item}</span>
          `).join('')}
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="space-y-10">
        <div class="text-center max-w-3xl mx-auto" data-reveal>
          <div class="inline-block chip-theme mb-3">Keahlian &amp; Perkakas</div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[var(--text)]">Keterampilan Teknis</h2>
          <p class="mt-3 text-sm sm:text-base text-[var(--text-muted)]">
            Kombinasi kemampuan pengembangan aplikasi web, perancangan sistem, infrastruktur jaringan, serta pemanfaatan kecerdasan artifisial.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${cardsHtml}
        </div>
      </div>
    `;
  },

  // 4. Render Proyek Section
  renderProyek(data) {
    const container = document.getElementById('proyek-container');
    if (!container) return;

    const cardsHtml = data.proyek.map(p => {
      const liveBtnHtml = p.linkLive ? `
        <a href="${p.linkLive}" target="_blank" rel="noopener noreferrer" class="btn-primary text-xs py-2 px-3" aria-label="Kunjungi demo live ${p.judul}" onclick="event.stopPropagation()">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          Live Demo
        </a>
      ` : '';

      const githubBtnHtml = p.linkGithub ? `
        <a href="${p.linkGithub}" target="_blank" rel="noopener noreferrer" class="btn-secondary text-xs py-2 px-3" aria-label="Lihat kode sumber ${p.judul} di GitHub" onclick="event.stopPropagation()">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
          GitHub
        </a>
      ` : '';

      return `
        <article class="card-theme flex flex-col justify-between overflow-hidden cursor-pointer group" data-project-id="${p.id}" data-reveal tabindex="0" role="button" aria-label="Buka detail proyek ${p.judul}">
          <div>
            <div class="w-full aspect-video bg-[var(--bg-soft)] overflow-hidden border-b border-[var(--border)]">
              <img 
                src="${p.gambar}" 
                alt="Tangkapan layar atau mockup proyek ${p.judul}" 
                width="800" 
                height="450" 
                class="w-full h-full object-cover block"
                loading="lazy"
              >
            </div>
            
            <div class="p-6">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-mono font-bold text-[var(--accent-text)] uppercase tracking-wider">${p.peran}</span>
              </div>
              <h3 class="text-lg font-heading font-bold text-[var(--text)] group-hover:text-[var(--accent-text)]">
                ${p.judul}
              </h3>
              <p class="mt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                ${p.deskripsiSingkat}
              </p>
            </div>
          </div>

          <div class="p-6 pt-0">
            <div class="flex flex-wrap gap-1.5 mb-4">
              ${p.teknologi.map(t => `<span class="chip-theme text-[11px] py-0.5 px-2">${t}</span>`).join('')}
            </div>

            <div class="flex items-center justify-between gap-2 pt-3 border-t border-[var(--border)]">
              <span class="text-xs text-[var(--text-subtle)] font-medium">Klik kartu untuk detail</span>
              <div class="flex items-center gap-2">
                ${githubBtnHtml}
                ${liveBtnHtml}
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    container.innerHTML = `
      <div class="space-y-10">
        <div class="text-center max-w-3xl mx-auto" data-reveal>
          <div class="inline-block chip-theme mb-3">Karya &amp; Portofolio</div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[var(--text)]">Proyek Pilihan</h2>
          <p class="mt-3 text-sm sm:text-base text-[var(--text-muted)]">
            Aplikasi web edukasi, sistem informasi geografis, sistem inventaris buku, platform profil desa, dan eksperimen teknologi.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${cardsHtml}
        </div>

        <div class="text-center pt-4" data-reveal>
          <a href="${data.identitas.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary inline-flex items-center gap-2 text-sm">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
            Lihat proyek lainnya di GitHub (${data.identitas.githubUsername}) &rarr;
          </a>
        </div>
      </div>
    `;
  },

  // 5. Render Sertifikat Section
  renderSertifikat(data) {
    const container = document.getElementById('sertifikat-container');
    if (!container) return;

    const { qrSertifikat, qrSertifikatText, qrSertifikatUrl } = data.identitas;

    const categories = ["Semua", "Teknis", "Kepemimpinan", "Pengabdian"];

    const filterBtnsHtml = categories.map((cat, idx) => `
      <button 
        type="button" 
        class="cert-filter-btn px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border ${idx === 0 ? 'bg-[var(--accent)] text-[var(--on-accent)] border-[var(--accent)]' : 'card-theme text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--accent)]'}" 
        data-filter="${cat}"
        aria-label="Filter sertifikat kategori ${cat}"
      >
        ${cat}
      </button>
    `).join('');

    const certsHtml = data.sertifikat.map((c, index) => `
      <div 
        class="cert-card card-theme overflow-hidden flex flex-col justify-between cursor-pointer group" 
        data-category="${c.kategori}" 
        data-cert-index="${index}" 
        data-reveal 
        tabindex="0" 
        role="button" 
        aria-label="Lihat sertifikat ${c.judul}"
      >
        <div>
          <div class="relative w-full aspect-[4/3] bg-[var(--bg-soft)] overflow-hidden border-b border-[var(--border)] flex items-center justify-center">
            <img 
              src="${c.gambar}" 
              alt="${c.judul}" 
              width="600" 
              height="450" 
              class="w-full h-full object-contain block p-2"
              loading="lazy"
            >
            <div class="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold gap-1.5 transition-opacity">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
              Klik untuk Memperbesar
            </div>
          </div>

          <div class="p-5">
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="chip-theme text-[11px] py-0.5 px-2">${c.kategori}</span>
              <span class="text-xs font-mono text-[var(--text-subtle)]">${c.tahun}</span>
            </div>
            <h3 class="text-sm sm:text-base font-heading font-bold text-[var(--text)] group-hover:text-[var(--accent-text)] line-clamp-2">
              ${c.judul}
            </h3>
            <p class="mt-1 text-xs text-[var(--text-muted)]">
              ${c.penerbit}
            </p>
          </div>
        </div>

        <div class="p-5 pt-0">
          <div class="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-subtle)]">
            <span>Peran: <strong class="text-[var(--text-muted)]">${c.peran}</strong></span>
            <span class="text-[var(--accent-text)] font-semibold">Lihat &rarr;</span>
          </div>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="space-y-10">
        <div class="text-center max-w-3xl mx-auto" data-reveal>
          <div class="inline-block chip-theme mb-3">Validasi &amp; Kredensial</div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[var(--text)]">Sertifikat &amp; Lisensi</h2>
          <p class="mt-3 text-sm sm:text-base text-[var(--text-muted)]">
            Dokumentasi sertifikasi kompetensi, lokakarya teknologi, pengabdian masyarakat, dan kepemimpinan organisasi.
          </p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-2" data-reveal>
          ${filterBtnsHtml}
        </div>

        <div id="certs-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${certsHtml}
        </div>

        <!-- Banner QR Code Sertifikat Lengkap -->
        <div class="card-theme p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[var(--border)] bg-[var(--bg-elev)]" data-reveal>
          <div class="flex items-center gap-5">
            <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-white p-2 border border-slate-300 flex-shrink-0 flex items-center justify-center shadow-md">
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
              <div class="inline-block chip-theme mb-1 text-xs">Arsip Digital Lengkap</div>
              <h3 class="text-lg sm:text-xl font-heading font-bold text-[var(--text)]">Seluruh Berkas Sertifikat</h3>
              <p class="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-md">
                ${qrSertifikatText}
              </p>
            </div>
          </div>

          <a href="${qrSertifikatUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm whitespace-nowrap w-full md:w-auto" aria-label="Buka seluruh sertifikat di tab baru">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            Buka l1nk.dev/62ia9zm &rarr;
          </a>
        </div>
      </div>
    `;
  },

  // 6. Render Pendidikan & Organisasi Section (PERBAIKAN 1: Dua Kolom Terpisah + 6 Jenjang Lengkap)
  renderTimeline(data) {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    // Pendidikan (6 Jenjang dari MI s.d. Kuliah)
    const eduHtml = data.pendidikan.map(e => {
      const yearText = (e.periode || e.year || "").trim();
      const yearBadge = yearText ? `<span class="text-xs font-mono font-bold text-[var(--accent-text)]">${yearText}</span>` : '';
      const typeLabel = e.kategoriLabel || (e.type === 'nonformal' ? 'Pendidikan agama' : 'Pendidikan formal');
      const descParagraph = e.deskripsi ? `<p class="text-xs sm:text-sm text-[var(--text-muted)] mt-2 leading-relaxed">${e.deskripsi}</p>` : '';

      return `
        <div class="relative pl-8 pb-8 last:pb-0 group" data-reveal>
          <div class="absolute left-3 top-2.5 bottom-0 w-0.5 bg-[var(--border)] group-last:hidden"></div>
          <div class="absolute left-1.5 top-2 w-3.5 h-3.5 rounded-full bg-[var(--accent)] border-2 border-[var(--bg-elev)]"></div>
          
          <div class="card-theme p-5">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
              ${yearBadge}
              <span class="chip-theme text-[11px] py-0.5 px-2">${typeLabel}</span>
            </div>
            <h4 class="text-base sm:text-lg font-heading font-bold text-[var(--text)]">${e.institusi}</h4>
            <p class="text-xs sm:text-sm font-semibold text-[var(--text-muted)] mt-0.5">${e.jurusan}</p>
            ${descParagraph}
          </div>
        </div>
      `;
    }).join('');

    // Organisasi & Pengabdian
    const orgHtml = data.organisasiPengabdian.map(o => `
      <div class="relative pl-8 pb-8 last:pb-0 group" data-reveal>
        <div class="absolute left-3 top-2.5 bottom-0 w-0.5 bg-[var(--border)] group-last:hidden"></div>
        <div class="absolute left-1.5 top-2 w-3.5 h-3.5 rounded-full ${o.kategori === 'Pengabdian' ? 'bg-[#10B981]' : 'bg-[var(--accent)]'} border-2 border-[var(--bg-elev)]"></div>
        
        <div class="card-theme p-5">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
            <span class="text-xs font-mono font-bold text-[var(--accent-text)]">${o.tahun} · ${o.durasi}</span>
            <span class="chip-theme text-[11px] py-0.5 px-2 ${o.kategori === 'Pengabdian' ? 'text-[#10B981] border-[#10B981]/30' : ''}">${o.kategori}</span>
          </div>
          <h4 class="text-base sm:text-lg font-heading font-bold text-[var(--text)]">${o.nama}</h4>
          <p class="text-xs sm:text-sm font-semibold text-[var(--text-muted)] mt-0.5">${o.peran}${o.lokasi ? ' · ' + o.lokasi : ''}</p>
          <p class="text-xs sm:text-sm text-[var(--text-muted)] mt-2 leading-relaxed">${o.deskripsi}</p>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="space-y-12">
        <div class="text-center max-w-3xl mx-auto" data-reveal>
          <div class="inline-block chip-theme mb-3">Jejak Langkah &amp; Kontribusi</div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[var(--text)]">Pendidikan &amp; Organisasi</h2>
          <p class="mt-3 text-sm sm:text-base text-[var(--text-muted)]">
            Perjalanan akademik formal dan keagamaan dari pendidikan dasar hingga universitas, dipadukan keaktifan berorganisasi serta pengabdian masyarakat.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <!-- Kolom 1: Riwayat Pendidikan -->
          <div>
            <div class="flex items-center gap-2 mb-6" data-reveal>
              <span class="w-8 h-8 rounded-lg bg-[var(--chip-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent-text)]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
              </span>
              <h3 class="text-xl font-heading font-bold text-[var(--text)]">Riwayat Pendidikan</h3>
            </div>
            <div class="timeline-tree">
              ${eduHtml}
            </div>
          </div>

          <!-- Kolom 2: Organisasi & Pengabdian -->
          <div>
            <div class="flex items-center gap-2 mb-6" data-reveal>
              <span class="w-8 h-8 rounded-lg bg-[var(--chip-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent-text)]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </span>
              <h3 class="text-xl font-heading font-bold text-[var(--text)]">Organisasi &amp; Pengabdian</h3>
            </div>
            <div class="timeline-tree">
              ${orgHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 7. Render Kontak Section
  renderKontak(data) {
    const container = document.getElementById('kontak-container');
    if (!container) return;

    const { email, whatsapp, whatsappUrl, githubUrl, githubUsername, domisili } = data.identitas;

    container.innerHTML = `
      <div class="space-y-12">
        <div class="text-center max-w-3xl mx-auto" data-reveal>
          <div class="inline-block chip-theme mb-3">Komunikasi &amp; Kolaborasi</div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[var(--text)]">Hubungi Saya</h2>
          <p class="mt-3 text-sm sm:text-base text-[var(--text-muted)]">
            Silakan kirim pesan melalui surel, WhatsApp, atau formulir berikut untuk berdiskusi seputar peluang kerja, proyek web, maupun kolaborasi.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Kolom Info Saluran Kontak -->
          <div class="lg:col-span-5 space-y-4" data-reveal>
            <!-- Email Card -->
            <a href="mailto:${email}" class="card-theme p-5 flex items-center gap-4 hover:border-[var(--accent)] block group">
              <span class="w-12 h-12 rounded-xl bg-[var(--chip-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent-text)] flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </span>
              <div>
                <span class="text-xs text-[var(--text-subtle)] font-medium block">Surel / Email</span>
                <span class="text-sm sm:text-base font-semibold text-[var(--text)] group-hover:text-[var(--accent-text)] break-all">${email}</span>
              </div>
            </a>

            <!-- WhatsApp Card -->
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="card-theme p-5 flex items-center gap-4 hover:border-[var(--accent)] block group">
              <span class="w-12 h-12 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] flex-shrink-0">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path></svg>
              </span>
              <div>
                <span class="text-xs text-[var(--text-subtle)] font-medium block">WhatsApp</span>
                <span class="text-sm sm:text-base font-semibold text-[var(--text)] group-hover:text-[#10B981]">${whatsapp}</span>
              </div>
            </a>

            <!-- GitHub Card -->
            <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="card-theme p-5 flex items-center gap-4 hover:border-[var(--accent)] block group">
              <span class="w-12 h-12 rounded-xl bg-[var(--bg-soft)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] flex-shrink-0">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
              </span>
              <div>
                <span class="text-xs text-[var(--text-subtle)] font-medium block">GitHub Profil</span>
                <span class="text-sm sm:text-base font-semibold text-[var(--text)] group-hover:text-[var(--accent-text)]">${githubUsername}</span>
              </div>
            </a>

            <!-- Domisili Card -->
            <div class="card-theme p-5 flex items-center gap-4">
              <span class="w-12 h-12 rounded-xl bg-[var(--chip-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent-text)] flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </span>
              <div>
                <span class="text-xs text-[var(--text-subtle)] font-medium block">Domisili</span>
                <span class="text-sm sm:text-base font-semibold text-[var(--text)]">${domisili}, Jawa Tengah, Indonesia</span>
              </div>
            </div>
          </div>

          <!-- Kolom Formulir Pesan (Mailto) -->
          <div class="lg:col-span-7 card-theme p-6 sm:p-8" data-reveal>
            <h3 class="text-lg font-heading font-bold text-[var(--text)] mb-1">Kirim Surel Langsung</h3>
            <p class="text-xs sm:text-sm text-[var(--text-muted)] mb-6">
              Isi data di bawah untuk membuka aplikasi surel Anda dengan draf pesan otomatis.
            </p>

            <form id="contact-form" class="space-y-4">
              <div>
                <label for="contact-name" class="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">Nama Lengkap *</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  name="name" 
                  required 
                  placeholder="Misal: Budi Santoso"
                  class="w-full px-4 py-2.5 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none"
                >
              </div>

              <div>
                <label for="contact-email" class="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">Alamat Surel Anda *</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  name="email" 
                  required 
                  placeholder="nama@perusahaan.com"
                  class="w-full px-4 py-2.5 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none"
                >
              </div>

              <div>
                <label for="contact-message" class="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">Isi Pesan *</label>
                <textarea 
                  id="contact-message" 
                  name="message" 
                  rows="4" 
                  required 
                  placeholder="Tuliskan pesan, penawaran proyek, atau pertanyaan Anda di sini..."
                  class="w-full px-4 py-2.5 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none resize-y"
                ></textarea>
              </div>

              <button type="submit" class="btn-primary w-full py-3 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                Buka di Aplikasi Email (Kirim Pesan)
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  // 8. Render Footer Section
  renderFooter(data) {
    const container = document.getElementById('footer-container');
    if (!container) return;

    const currentYear = new Date().getFullYear();
    const { nama, peran } = data.identitas;

    container.innerHTML = `
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="text-center md:text-left">
          <span class="font-heading font-bold text-lg text-[var(--text)] block">${nama}</span>
          <span class="text-xs text-[var(--text-muted)]">${peran}</span>
        </div>

        <nav class="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[var(--text-muted)]" aria-label="Navigasi Footer">
          <a href="#hero" class="hover:text-[var(--accent-text)]">Beranda</a>
          <a href="#tentang" class="hover:text-[var(--accent-text)]">Tentang</a>
          <a href="#skill" class="hover:text-[var(--accent-text)]">Keterampilan</a>
          <a href="#proyek" class="hover:text-[var(--accent-text)]">Proyek</a>
          <a href="#sertifikat" class="hover:text-[var(--accent-text)]">Sertifikat</a>
          <a href="#timeline" class="hover:text-[var(--accent-text)]">Pendidikan</a>
          <a href="#kontak" class="hover:text-[var(--accent-text)]">Kontak</a>
        </nav>

        <button id="btn-back-to-top" type="button" class="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5" aria-label="Kembali ke bagian atas halaman">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
          Ke Atas
        </button>
      </div>

      <div class="mt-8 pt-6 border-t border-[var(--border)] text-center text-xs text-[var(--text-subtle)]">
        &copy; ${currentYear} ${nama}. Seluruh hak cipta dilindungi.
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
  }
};

window.PortfolioRenderer = PortfolioRenderer;
