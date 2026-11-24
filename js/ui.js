/**
 * js/ui.js
 * Bertanggung jawab atas seluruh logika interaksi antarmuka (UI):
 * - Penggantian tema Gelap/Terang (Design Tokens, System Preference, Anti-Flicker, Dynamic Theme Color)
 * - Menu navigasi mobile hamburger (buka/tutup instan)
 * - Modal Curriculum Vitae (pratinjau & fungsi cetak kertas F4)
 * - Modal detail proyek (galeri, deskripsi lengkap, peran, link)
 * - Lightbox galeri sertifikat (navigasi tombol & keyboard panah/Esc)
 * - Filter sertifikat berdasarkan kategori
 * - Pengiriman formulir kontak melalui protokol mailto (tanpa backend)
 * - Tombol kembali ke atas instan
 */

const PortfolioUI = {
  currentCertIndex: 0,
  activeFilterCerts: [],

  // 1. Inisialisasi Tema (Dark/Light Mode dengan Deteksi Sistem & Anti-Flicker)
  initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const themeColorMeta = document.getElementById('theme-color-meta');
    const rootHtml = document.documentElement;

    const getInitialTheme = () => {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };

    const applyTheme = (theme, saveExplicit = false) => {
      rootHtml.setAttribute('data-theme', theme);
      if (theme === 'light') {
        rootHtml.classList.remove('dark');
        rootHtml.classList.add('light');
        if (sunIcon) sunIcon.classList.remove('hidden');
        if (moonIcon) moonIcon.classList.add('hidden');
        if (themeColorMeta) themeColorMeta.setAttribute('content', '#F4F7FB');
      } else {
        rootHtml.classList.remove('light');
        rootHtml.classList.add('dark');
        if (sunIcon) sunIcon.classList.add('hidden');
        if (moonIcon) moonIcon.classList.remove('hidden');
        if (themeColorMeta) themeColorMeta.setAttribute('content', '#0B1B2E');
      }

      if (saveExplicit) {
        localStorage.setItem('portfolio_theme', theme);
        localStorage.setItem('portfolio_theme_explicit', '1');
      }
    };

    // Terapkan tema awal
    applyTheme(getInitialTheme(), false);

    // Pantau preferensi sistem bila pengguna belum memilih manual
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('portfolio_theme_explicit')) {
        applyTheme(e.matches ? 'light' : 'dark', false);
      }
    });

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isDark = rootHtml.getAttribute('data-theme') === 'dark' || rootHtml.classList.contains('dark');
        applyTheme(isDark ? 'light' : 'dark', true);
      });
    }
  },

  // 2. Inisialisasi Menu Mobile Hamburger
  initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuPanel = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('hamburger-open-icon');
    const closeIcon = document.getElementById('hamburger-close-icon');

    if (!menuBtn || !menuPanel) return;

    const toggleMenu = () => {
      const isHidden = menuPanel.classList.contains('hidden');
      if (isHidden) {
        menuPanel.classList.remove('hidden');
        menuBtn.setAttribute('aria-expanded', 'true');
        if (openIcon) openIcon.classList.add('hidden');
        if (closeIcon) closeIcon.classList.remove('hidden');
      } else {
        menuPanel.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        if (openIcon) openIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
      }
    };

    menuBtn.addEventListener('click', toggleMenu);

    const navLinks = menuPanel.querySelectorAll('.mobile-nav-link, button');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuPanel.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        if (openIcon) openIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
      });
    });
  },

  // 3. Inisialisasi Modal CV & Cetak F4
  initCvModal() {
    const cvModal = document.getElementById('cv-modal');
    const closeBtn = document.getElementById('btn-close-cv-modal');
    const printBtn = document.getElementById('btn-print-cv');
    
    const triggerButtons = [
      document.getElementById('btn-nav-cv'),
      document.getElementById('btn-mobile-cv'),
      document.getElementById('btn-hero-cv')
    ];

    const openCvModal = () => {
      if (cvModal) {
        cvModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };

    const closeCvModal = () => {
      if (cvModal) {
        cvModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    };

    triggerButtons.forEach(btn => {
      if (btn) btn.addEventListener('click', openCvModal);
    });

    if (closeBtn) closeBtn.addEventListener('click', closeCvModal);

    if (cvModal) {
      cvModal.addEventListener('click', (e) => {
        if (e.target === cvModal) closeCvModal();
      });
    }

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  },

  // 4. Inisialisasi Modal Detail Proyek
  initProjectModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('btn-close-project-modal');
    const titleEl = document.getElementById('project-modal-title');
    const roleEl = document.getElementById('project-modal-role');
    const descEl = document.getElementById('project-modal-desc');
    const galleryEl = document.getElementById('project-modal-gallery');
    const tagsEl = document.getElementById('project-modal-tags');
    const githubLink = document.getElementById('project-modal-github');
    const liveLink = document.getElementById('project-modal-live');

    if (!modal) return;

    const openProjectModal = (project) => {
      if (titleEl) titleEl.textContent = project.judul;
      if (roleEl) roleEl.textContent = project.peran;
      if (descEl) descEl.textContent = project.deskripsiLengkap;

      if (galleryEl) {
        galleryEl.innerHTML = `
          <div class="w-full aspect-video bg-[var(--bg-soft)] overflow-hidden flex items-center justify-center">
            <img src="${project.gambar}" alt="${project.judul}" width="800" height="450" class="w-full h-full object-cover block">
          </div>
        `;
      }

      if (tagsEl) {
        tagsEl.innerHTML = project.teknologi.map(t => `
          <span class="chip-theme text-xs py-1 px-3">${t}</span>
        `).join('');
      }

      if (githubLink) {
        if (project.linkGithub) {
          githubLink.href = project.linkGithub;
          githubLink.classList.remove('hidden');
        } else {
          githubLink.classList.add('hidden');
        }
      }

      if (liveLink) {
        if (project.linkLive) {
          liveLink.href = project.linkLive;
          liveLink.classList.remove('hidden');
        } else {
          liveLink.classList.add('hidden');
        }
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeProjectModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    const projectCards = document.querySelectorAll('article[data-project-id]');
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        const project = window.portfolioData.proyek.find(p => p.id === id);
        if (project) openProjectModal(project);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-project-id');
          const project = window.portfolioData.proyek.find(p => p.id === id);
          if (project) openProjectModal(project);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  },

  // 5. Inisialisasi Galeri & Lightbox Sertifikat
  initCertificateLightbox() {
    const lightbox = document.getElementById('certificate-lightbox');
    const closeBtn = document.getElementById('btn-close-lightbox');
    const prevBtn = document.getElementById('btn-prev-lightbox');
    const nextBtn = document.getElementById('btn-next-lightbox');
    const imgEl = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    const metaEl = document.getElementById('lightbox-meta');
    const badgeEl = document.getElementById('lightbox-badge');

    if (!lightbox) return;

    this.activeFilterCerts = window.portfolioData.sertifikat.map((_, i) => i);

    const updateLightboxContent = (index) => {
      const cert = window.portfolioData.sertifikat[index];
      if (!cert) return;

      if (imgEl) {
        imgEl.src = cert.gambar;
        imgEl.alt = cert.judul;
      }
      if (titleEl) titleEl.textContent = cert.judul;
      if (metaEl) {
        metaEl.textContent = `${cert.penerbit} · ${cert.tanggal || cert.tahun} (Peran: ${cert.peran})`;
      }
      if (badgeEl) badgeEl.textContent = cert.kategori;
    };

    const openLightbox = (originalIndex) => {
      this.currentCertIndex = originalIndex;
      updateLightboxContent(originalIndex);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    const showNext = () => {
      if (this.activeFilterCerts.length === 0) return;
      const currentPos = this.activeFilterCerts.indexOf(this.currentCertIndex);
      const nextPos = (currentPos + 1) % this.activeFilterCerts.length;
      this.currentCertIndex = this.activeFilterCerts[nextPos];
      updateLightboxContent(this.currentCertIndex);
    };

    const showPrev = () => {
      if (this.activeFilterCerts.length === 0) return;
      const currentPos = this.activeFilterCerts.indexOf(this.currentCertIndex);
      const prevPos = (currentPos - 1 + this.activeFilterCerts.length) % this.activeFilterCerts.length;
      this.currentCertIndex = this.activeFilterCerts[prevPos];
      updateLightboxContent(this.currentCertIndex);
    };

    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-cert-index'), 10);
        openLightbox(idx);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const idx = parseInt(card.getAttribute('data-cert-index'), 10);
          openLightbox(idx);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    window.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  },

  // 6. Inisialisasi Filter Kategori Sertifikat (Berbasis Token)
  initCertificateFilter() {
    const filterButtons = document.querySelectorAll('.cert-filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    if (filterButtons.length === 0 || certCards.length === 0) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterButtons.forEach(b => {
          b.classList.remove('bg-[var(--accent)]', 'text-[var(--on-accent)]', 'border-[var(--accent)]');
          b.classList.add('card-theme', 'text-[var(--text-muted)]', 'border-[var(--border)]');
        });
        btn.classList.add('bg-[var(--accent)]', 'text-[var(--on-accent)]', 'border-[var(--accent)]');
        btn.classList.remove('card-theme', 'text-[var(--text-muted)]', 'border-[var(--border)]');

        const matchedIndices = [];
        certCards.forEach(card => {
          const category = card.getAttribute('data-category');
          const idx = parseInt(card.getAttribute('data-cert-index'), 10);

          if (filter === 'Semua' || category === filter) {
            card.style.display = 'flex';
            matchedIndices.push(idx);
          } else {
            card.style.display = 'none';
          }
        });

        this.activeFilterCerts = matchedIndices;
      });
    });
  },

  // 7. Inisialisasi Formulir Kontak (Mailto)
  initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      const recipient = window.portfolioData.identitas.email;
      const subject = encodeURIComponent(`Pesan Portofolio dari ${name}`);
      const body = encodeURIComponent(
        `Halo Ahmad Athoillah Almadany,\n\nNama: ${name}\nSurel: ${email}\n\nPesan:\n${message}\n\n---\nDikirim dari Formulir Portofolio Website`
      );

      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  },

  // 8. Inisialisasi Tombol Kembali Ke Atas
  initBackToTop() {
    const btn = document.getElementById('btn-back-to-top');
    if (btn) {
      btn.addEventListener('click', () => {
        window.scrollTo(0, 0);
      });
    }
  },

  // 9. Penanganan Global Keyboard Escape
  initGlobalKeyEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const cvModal = document.getElementById('cv-modal');
        const projectModal = document.getElementById('project-modal');
        const lightbox = document.getElementById('certificate-lightbox');

        if (cvModal && cvModal.classList.contains('active')) {
          cvModal.classList.remove('active');
          document.body.style.overflow = '';
        }
        if (projectModal && projectModal.classList.contains('active')) {
          projectModal.classList.remove('active');
          document.body.style.overflow = '';
        }
        if (lightbox && lightbox.classList.contains('active')) {
          lightbox.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  },

  init() {
    this.initTheme();
    this.initMobileMenu();
    this.initCvModal();
    this.initProjectModal();
    this.initCertificateLightbox();
    this.initCertificateFilter();
    this.initContactForm();
    this.initBackToTop();
    this.initGlobalKeyEvents();
  }
};

window.PortfolioUI = PortfolioUI;
