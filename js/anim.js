/**
 * js/anim.js
 * Modul Animasi & Interaksi Gerak Berkelas - "Poster Berani" (Langkah C)
 * Menggabungkan AOS 2.3.4 (Reveal Scroll Dua Arah) & GSAP 3 + ScrollTrigger + Lenis
 * 
 * Sepenuhnya adaptif di Dark Mode & Light Mode menggunakan CSS Variables Design Tokens.
 * Efek hero berulang tanpa batas (dua arah: turun dan naik), nama 3 baris terpusat sama lebar,
 * dan bebas bentrok antar pustaka.
 */

// ============================================================================
// 1. SAKLAR GLOBAL & KONFIGURASI ANIMASI
// ============================================================================
const ANIM_CONFIG = {
  ENABLE_PRELOADER: true,       // Preloader inisial "AA" (< 1.5 detik, 1x per sesi)
  ENABLE_HERO_SCROLL: true,     // Hero ScrollTrigger scrub & pin sequence dua arah
  ENABLE_AOS: true,             // AOS 2.3.4 untuk reveal berulang saat scroll (once: false, mirror: true)
  ENABLE_TILT: true,            // 3D Tilt kartu proyek (Desktop only)
  ENABLE_CURSOR: true,          // Kursor kustom (Desktop pointer halus saja)
  ENABLE_SMOOTH_SCROLL: true,   // Lenis Smooth Scroll
  ENABLE_MARQUEE: true,         // Marquee teknologi tak terbatas
  ENABLE_TIMELINE_DRAW: true,   // Garis timeline & titik aktif saat scroll
  ENABLE_COUNTERS: true,        // Penghitung angka naik di bagian Tentang (1x saja)
  ENABLE_MAGNETIC: true,        // Efek magnet halus pada tombol utama (Desktop)
  ENABLE_THEME_TRANSITION: true,// Transisi View Transitions API saat ganti tema

  // Parameter Koreografi Hero Scroll (Scrub)
  HERO_SCROLL_PERCENT: 160,     // Panjang scroll hero (150-200% tinggi layar)
  HERO_STAGE1_DURATION: 0.9,    // Tahap 1: Nama mengecil & bergerak ke posisi grid
  HERO_STAGE2_DURATION: 0.85,   // Tahap 2: Blok kuning diagonal masuk + foto clip reveal
  HERO_STAGE3_DURATION: 0.9,    // Tahap 3: Peran, motto, tombol, kuas, dekorasi stagger
  HERO_BUFFER_DURATION: 0.3     // Buffer settle sebelum unpin normal ke bagian Tentang
};

// Peta Animasi AOS untuk referensi & konsistensi sistem
const AOS_MAP = {
  sectionTitle: 'fade-up',
  sectionBadge: 'zoom-in',
  tentangFoto: 'zoom-in',
  tentangProfil: 'fade-right',
  tentangSaya: 'fade-left',
  skillsChip: 'fade-up',
  projectCard: 'fade-up',
  certThumb: 'zoom-in-up',
  timelineEdu: 'fade-right',
  timelineOrg: 'fade-left',
  contactBlock: 'fade-up',
  footer: 'fade'
};

const PortfolioAnim = {
  lenis: null,
  isReducedMotion: false,
  isDesktop: false,
  heroTimeline: null,
  isInitialized: false,
  failsafeTimer: null,

  init() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isDesktop = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches;

    // Failsafe 3 detik: HANYA aktif jika inisialisasi script gagal total
    this.failsafeTimer = setTimeout(() => {
      if (!this.isInitialized) {
        document.documentElement.classList.add('js-anim');
        const preloader = document.getElementById('preloader-overlay');
        if (preloader) preloader.remove();
        
        const header = document.querySelector('.site-header');
        if (header) {
          header.style.opacity = '1';
          header.style.transform = 'none';
        }

        const introLayer = document.querySelector('[data-hero="intro"]');
        if (introLayer) introLayer.style.display = 'none';

        document.querySelectorAll('[data-hero="main"] [data-hero]').forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.clipPath = 'none';
        });

        if (typeof AOS !== 'undefined' && AOS.refreshHard) {
          AOS.refreshHard();
        }
      }
    }, 3000);

    // Tandai bahwa animasi JS aktif
    document.documentElement.classList.add('js-anim');

    // Penanganan Aksesibilitas: prefers-reduced-motion
    if (this.isReducedMotion) {
      console.log('prefers-reduced-motion aktif: animasi dinonaktifkan untuk kenyamanan visual.');
      this.handleReducedMotion();
      this.isInitialized = true;
      clearTimeout(this.failsafeTimer);
      return;
    }

    // 1. Preloader Singkat (< 1.5 detik, 1x per sesi)
    this.initPreloader();

    // 2. Smooth Scroll (Lenis) & Sinkronisasi Ticker dengan GSAP
    if (ANIM_CONFIG.ENABLE_SMOOTH_SCROLL) {
      this.initSmoothScroll();
    }

    // 3. Scroll Progress Bar & Sticky Header
    this.initScrollProgressAndNavbar();

    // 4. Inisialisasi AOS (Reveal Berulang Dua Arah: once: false, mirror: true)
    if (ANIM_CONFIG.ENABLE_AOS) {
      this.initAOS();
    }

    // 5. Penyesuaian Lebar Nama 3 Baris Layar Pertama (AHMAD / ATHOILLAH / ALMADANY)
    this.fitHeroTitleLines();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => this.fitHeroTitleLines());
    }
    window.addEventListener('resize', () => this.fitHeroTitleLines());

    // 6. Koreografi Hero Berurutan dengan Scroll (GSAP ScrollTrigger Scrub & Pin Dua Arah)
    if (ANIM_CONFIG.ENABLE_HERO_SCROLL) {
      this.initHeroScrollSequence();
    }

    // 7. Angka Ringkas (Counter) di Bagian Tentang (Cukup Sekali)
    if (ANIM_CONFIG.ENABLE_COUNTERS) {
      this.initCounterAnimation();
    }

    // 8. 3D Tilt Kartu Proyek (Desktop Only - Terpisah dari Pembungkus AOS)
    if (ANIM_CONFIG.ENABLE_TILT && this.isDesktop) {
      this.initProjectTilt();
    }

    // 9. FLIP & Navigasi Lightbox Sertifikat
    this.initCertificateAnimations();

    // 10. Timeline Draw & Highlight Titik Aktif
    if (ANIM_CONFIG.ENABLE_TIMELINE_DRAW) {
      this.initTimelineAnimation();
    }

    // 11. Efek Magnet Tombol & Form Focus Line
    this.initContactAndButtons();

    // 12. Kursor Kustom (Titik Kuning + Cincin Garis Tebal)
    if (ANIM_CONFIG.ENABLE_CURSOR && this.isDesktop) {
      this.initCustomCursor();
    }

    // 13. Mobile Menu Transition
    this.initMobileMenuAnimation();

    // 14. Theme Switcher View Transition API
    if (ANIM_CONFIG.ENABLE_THEME_TRANSITION) {
      this.initThemeTransition();
    }

    this.isInitialized = true;
    clearTimeout(this.failsafeTimer);

    // Refresh layout setelah window load dan gambar selesai dimuat
    window.addEventListener('load', () => {
      this.fitHeroTitleLines();
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
      if (typeof AOS !== 'undefined' && AOS.refreshHard) {
        AOS.refreshHard();
      }
    });
  },

  // Penanganan prefers-reduced-motion
  handleReducedMotion() {
    const preloader = document.getElementById('preloader-overlay');
    if (preloader) preloader.remove();

    const header = document.querySelector('.site-header');
    if (header) {
      header.style.opacity = '1';
      header.style.transform = 'none';
    }

    const introLayer = document.querySelector('[data-hero="intro"]');
    if (introLayer) introLayer.style.display = 'none';

    document.querySelectorAll('[data-hero="main"] [data-hero]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.clipPath = 'none';
    });

    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
  },

  // ==========================================================================
  // PENYESUAIAN LEBAR NAMA 3 BARIS LAYAR PERTAMA (POSTER TITLE BLOCK)
  // ==========================================================================
  fitHeroTitleLines() {
    const container = document.querySelector('.hero-intro-name');
    if (!container) return;

    // Pada perangkat mobile (< 768px), gunakan fluid clamp typography murni dari CSS.
    // Menghindari hardcoded pixel inline style agar pinch-zoom tidak terpancang kaku di pojok kiri atas.
    if (!this.isDesktop) {
      container.querySelectorAll('.hero-name-line').forEach((el) => {
        el.style.fontSize = '';
      });
      return;
    }

    const parent = container.closest('#hero');
    const availableWidth = parent ? parent.clientWidth - 48 : window.innerWidth * 0.88;
    const targetWidth = Math.min(Math.max(availableWidth, 280), 720);

    const line1 = container.querySelector('.hero-line-1');
    const line2 = container.querySelector('.hero-line-2');
    const line2Badge = container.querySelector('.hero-line-2 span');
    const line3 = container.querySelector('.hero-line-3');

    if (!line1 || !line2 || !line2Badge || !line3) return;

    // Proporsi dasar font Anton: "AHMAD" (5 huruf), "ATHOILLAH" (9 huruf + padding), "ALMADANY" (8 huruf)
    const baseFs = Math.min(targetWidth * 0.22, 115);
    line1.style.fontSize = `${baseFs}px`;
    line2.style.fontSize = `${baseFs * 0.58}px`;
    line3.style.fontSize = `${baseFs * 0.65}px`;

    // Kalibrasi presisi kedua agar ketiga baris sama rata (justified poster block)
    const w1 = line1.offsetWidth || line1.getBoundingClientRect().width;
    const w2 = line2Badge.offsetWidth || line2Badge.getBoundingClientRect().width;
    const w3 = line3.offsetWidth || line3.getBoundingClientRect().width;

    if (w1 > 0 && w2 > 0 && w3 > 0) {
      const maxW = Math.max(w1, w2, w3);
      if (w1 < maxW) line1.style.fontSize = `${baseFs * (maxW / w1)}px`;
      if (w2 < maxW) line2.style.fontSize = `${(baseFs * 0.58) * (maxW / w2)}px`;
      if (w3 < maxW) line3.style.fontSize = `${(baseFs * 0.65) * (maxW / w3)}px`;
    }
  },

  // ==========================================================================
  // 1. PRELOADER SINGKAT (< 1.5 detik, 1x per sesi)
  // ==========================================================================
  initPreloader() {
    const preloader = document.getElementById('preloader-overlay');
    if (!preloader) return;

    const seen = sessionStorage.getItem('portfolio_preloader_seen');
    if (seen === '1' || !ANIM_CONFIG.ENABLE_PRELOADER) {
      preloader.remove();
      return;
    }

    const counterEl = document.getElementById('preloader-counter');
    const curtainTop = preloader.querySelector('.preloader-curtain-top');
    const curtainBottom = preloader.querySelector('.preloader-curtain-bottom');
    const logoContent = preloader.querySelector('.preloader-content');

    let count = 0;
    const interval = setInterval(() => {
      count += 5;
      if (counterEl) counterEl.textContent = `${Math.min(count, 100)}%`;
      if (count >= 100) {
        clearInterval(interval);
        if (typeof gsap !== 'undefined') {
          const tl = gsap.timeline({
            onComplete: () => {
              preloader.remove();
              sessionStorage.setItem('portfolio_preloader_seen', '1');
              if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
              if (typeof AOS !== 'undefined' && AOS.refreshHard) AOS.refreshHard();
            }
          });
          tl.to(logoContent, { opacity: 0, scale: 0.9, duration: 0.25, ease: 'power2.in' })
            .to(curtainTop, { yPercent: -100, duration: 0.55, ease: 'power3.inOut' }, '-=0.1')
            .to(curtainBottom, { yPercent: 100, duration: 0.55, ease: 'power3.inOut' }, '<');
        } else {
          preloader.classList.add('preloader-hidden');
          preloader.remove();
          sessionStorage.setItem('portfolio_preloader_seen', '1');
        }
      }
    }, 40);
  },

  // ==========================================================================
  // 2. SMOOTH SCROLL LENIS & SINKRONISASI CENTRAL TICKER
  // ==========================================================================
  initSmoothScroll() {
    if (typeof Lenis === 'undefined') return;

    try {
      this.lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1.5
      });

      // Sinkronkan Lenis dengan ScrollTrigger agar satu ticker terpusat
      if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
        this.lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          this.lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        ScrollTrigger.addEventListener('refresh', () => {
          if (typeof AOS !== 'undefined' && AOS.refreshHard) {
            AOS.refreshHard();
          }
        });
      } else {
        const raf = (time) => {
          this.lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }

      // Smooth scroll untuk link jangkar menu (#tentang, #proyek, dll.)
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href === '#' || !href) return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            this.lenis.scrollTo(target, { offset: -70, duration: 1.2 });
          }
        });
      });
    } catch (err) {
      console.warn('Gagal menginisialisasi Lenis:', err);
    }
  },

  // ==========================================================================
  // 3. SCROLL PROGRESS BAR & NAVBAR STATE
  // ==========================================================================
  initScrollProgressAndNavbar() {
    const progressBar = document.getElementById('scroll-progress-bar');
    const header = document.querySelector('.site-header');
    const navLinks = document.querySelectorAll('header nav a');
    const sections = document.querySelectorAll('section[data-section]');

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
      }

      if (header) {
        if (scrollTop > 50) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }
      }

      let currentSectionId = '';
      sections.forEach((sec) => {
        const top = sec.offsetTop - 140;
        const height = sec.offsetHeight;
        if (scrollTop >= top && scrollTop < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('nav-link-active');
          } else {
            link.classList.remove('nav-link-active');
          }
        });
      }
    }, { passive: true });
  },

  // ==========================================================================
  // 4. INISIALISASI AOS 2.3.4 (REVEAL BERULANG DUA ARAH: once: false, mirror: true)
  // ==========================================================================
  initAOS() {
    if (typeof AOS === 'undefined') return;

    try {
      // Pada perangkat mobile (< 768px), konversikan semua efek lateral (fade-left/fade-right/flip)
      // menjadi fade-up agar tidak memicu overflow horizontal di luar layar
      if (!this.isDesktop) {
        document.querySelectorAll('[data-aos]').forEach((el) => {
          const effect = el.getAttribute('data-aos');
          if (effect && (effect.includes('left') || effect.includes('right') || effect.includes('flip'))) {
            el.setAttribute('data-aos', 'fade-up');
          }
        });
      }

      AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: false,       // Reversible: aktif berulang saat masuk viewport
        mirror: true,      // Berbalik saat keluar ke arah atas
        offset: 60,
        anchorPlacement: 'top-bottom',
        disable: () => this.isReducedMotion
      });

      // Segarkan AOS segera setelah struktur halaman terpasang
      AOS.refreshHard();
    } catch (err) {
      console.warn('Gagal menginisialisasi AOS:', err);
    }
  },

  // ==========================================================================
  // 5. HERO BERURUTAN DUA ARAH (GSAP ScrollTrigger Scrub & Pin Reversible)
  // ==========================================================================
  initHeroScrollSequence() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const introLayer = heroSection.querySelector('[data-hero="intro"]');
    const mainLayer = heroSection.querySelector('[data-hero="main"]');
    const header = document.querySelector('.site-header');

    if (!introLayer || !mainLayer) return;

    // Elemen dekorasi poster datar (tanpa blur, tanpa gradient)
    const tag1 = document.createElement('div');
    tag1.className = 'hero-flat-tag-1';
    tag1.textContent = 'DEV // 2026';
    const tag2 = document.createElement('div');
    tag2.className = 'hero-flat-tag-2';
    tag2.textContent = 'SEMARANG · ID';
    heroSection.appendChild(tag1);
    heroSection.appendChild(tag2);

    if (typeof gsap !== 'undefined') {
      gsap.to(tag1, { y: 10, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to(tag2, { y: -10, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }

    const photoBgBlock = mainLayer.querySelector('.hero-photo-bg-block');
    const photoWrapper = mainLayer.querySelector('.hero-photo-wrapper');
    const photoDeco = mainLayer.querySelectorAll('[data-hero="photo"] [data-hero="deco"]');
    const nameEl = mainLayer.querySelector('h1[data-hero="name"]');
    const roleEls = mainLayer.querySelectorAll('[data-hero="role"]');
    const mottoEl = mainLayer.querySelector('[data-hero="motto"]');
    const ctaEl = mainLayer.querySelector('[data-hero="cta"]');
    const otherDeco = mainLayer.querySelectorAll('[data-hero="deco"]:not([data-hero="photo"] [data-hero="deco"])');

    // ========================================================================
    // A. VERSI DESKTOP (>= 768px): PIN + SCRUB HERO SEQUENCE DUA ARAH
    // ========================================================================
    if (this.isDesktop) {
      // Keadaan Awal (Scroll = 0):
      // Layer Intro (Nama 3 Baris + Petunjuk) tampil utuh di tengah layar
      gsap.set(introLayer, { opacity: 1, scale: 1, pointerEvents: 'none' });

      // Layer Utama (Foto + Konten Hero) tersembunyi rapi
      if (photoBgBlock) gsap.set(photoBgBlock, { xPercent: -50, opacity: 0 });
      if (photoWrapper) gsap.set(photoWrapper, { y: 50, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' });
      if (photoDeco.length) gsap.set(photoDeco, { scale: 0.5, opacity: 0, rotate: -15 });
      if (nameEl) gsap.set(nameEl, { opacity: 0, y: 30 });
      if (roleEls.length) gsap.set(roleEls, { y: 20, opacity: 0 });
      if (mottoEl) gsap.set(mottoEl, { y: 20, opacity: 0 });
      if (ctaEl) gsap.set(ctaEl, { y: 20, opacity: 0 });
      if (otherDeco.length) gsap.set(otherDeco, { scale: 0.6, opacity: 0 });
      if (header) gsap.set(header, { yPercent: -100, opacity: 0 });

      // Panjang scroll hero (160% tinggi layar)
      const scrollDistance = window.innerHeight * (ANIM_CONFIG.HERO_SCROLL_PERCENT / 100);

      // Buat Timeline GSAP ScrollTrigger yang 100% REVERSIBLE
      this.heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.5,           // Halus, instan merespons naik dan turun
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      // Urutan Scrub Dua Arah:
      // 1. Layer Intro memudar halus & header meluncur masuk
      this.heroTimeline
        .to(introLayer, { opacity: 0, scale: 0.94, duration: 0.35, ease: 'power2.inOut' }, 0)
        .to(header, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }, 0.05);

      // 2. Layer Utama muncul: Blok kuning meluncur, foto clip reveal, nama 2 baris naik
      if (photoBgBlock) {
        this.heroTimeline.to(photoBgBlock, { xPercent: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }, 0.35);
      }
      if (photoWrapper) {
        this.heroTimeline.to(photoWrapper, { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.38, ease: 'power3.out' }, 0.38);
      }
      if (photoDeco.length) {
        this.heroTimeline.to(photoDeco, { scale: 1, opacity: 1, rotate: -2, duration: 0.25, ease: 'back.out(1.5)' }, 0.5);
      }
      if (nameEl) {
        this.heroTimeline.to(nameEl, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.4);
      }

      // 3. Peran, motto, tombol aksi, kuas, dan stiker muncul bergantian (stagger)
      if (roleEls.length) {
        this.heroTimeline.to(roleEls, { opacity: 1, y: 0, stagger: 0.08, duration: 0.3, ease: 'power2.out' }, 0.6);
      }
      if (mottoEl) {
        this.heroTimeline.to(mottoEl, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.7);
      }
      if (ctaEl) {
        this.heroTimeline.to(ctaEl, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.75);
      }
      if (otherDeco.length) {
        this.heroTimeline.to(otherDeco, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' }, 0.8);
      }

      // 4. Buffer stabil sebelum unpin ke bagian Tentang
      this.heroTimeline.to({}, { duration: ANIM_CONFIG.HERO_BUFFER_DURATION });

      // Parallax mouse follow pada foto profil penuh (Desktop saja)
      if (photoWrapper) {
        heroSection.addEventListener('mousemove', (e) => {
          const rect = heroSection.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(photoWrapper, {
            rotateY: x * 6,
            rotateX: -y * 6,
            transformPerspective: 1000,
            ease: 'power1.out',
            duration: 0.5
          });
        });

        heroSection.addEventListener('mouseleave', () => {
          gsap.to(photoWrapper, {
            rotateX: 0,
            rotateY: 0,
            ease: 'power2.out',
            duration: 0.7
          });
        });
      }
    }
    // ========================================================================
    // B. VERSI MOBILE (< 768px): URUTAN HERO DUA ARAH TANPA OVERLAP
    // ========================================================================
    else {
      if (header) {
        header.style.opacity = '1';
        header.style.transform = 'none';
      }

      // Pastikan mainLayer terlihat wajar tanpa tertutup atau terjepit
      if (photoWrapper) gsap.set(photoWrapper, { opacity: 1, y: 0, clipPath: 'none' });
      if (photoBgBlock) gsap.set(photoBgBlock, { opacity: 1, xPercent: 0 });

      // Pada mobile, introLayer dan mainLayer disusun berurutan ke bawah (flow normal).
      // Ketika introLayer di-scroll keluar layar, ia memudar halus (dua arah).
      this.heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: introLayer,
          start: 'top top',
          end: 'bottom 20%',
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      });

      this.heroTimeline.to(introLayer, {
        opacity: 0.15,
        scale: 0.96,
        ease: 'power1.out'
      });

      // Animasi kemunculan mainLayer saat masuk ke viewport
      if (photoWrapper || nameEl) {
        gsap.from([photoWrapper, nameEl, roleEls, mottoEl, ctaEl].filter(Boolean), {
          scrollTrigger: {
            trigger: mainLayer,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.5
          },
          y: 25,
          opacity: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        });
      }
    }
  },

  // ==========================================================================
  // 7. ANIMASI COUNTER ANGKA DI BAGIAN TENTANG (HANYA SEKALI)
  // ==========================================================================
  initCounterAnimation() {
    const tentangSection = document.getElementById('tentang');
    if (!tentangSection) return;

    const counterCards = tentangSection.querySelectorAll('.grid > div');
    counterCards.forEach((card) => {
      const numEl = card.querySelector('.text-3xl');
      if (!numEl) return;

      const rawText = numEl.textContent.trim();
      const hasPlus = rawText.includes('+');
      const targetVal = parseInt(rawText.replace(/\D/g, ''), 10) || 0;

      const runCount = () => {
        if (typeof gsap !== 'undefined') {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: targetVal,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              numEl.textContent = `${Math.floor(obj.val)}${hasPlus ? '+' : ''}`;
            },
            onComplete: () => {
              numEl.textContent = `${targetVal}${hasPlus ? '+' : ''}`;
            }
          });
        }
      };

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 88%',
          once: true, // Hitung angka tetap 1x per kunjungan agar tidak mengganggu bacaan
          onEnter: runCount
        });
      } else {
        runCount();
      }
    });
  },

  // ==========================================================================
  // 8. 3D TILT KARTU PROYEK (DESKTOP ONLY - TERPISAH DARI AOS WRAPPER)
  // ==========================================================================
  initProjectTilt() {
    const projectCards = document.querySelectorAll('article.project-card-tilt');
    projectCards.forEach((card) => {
      const glare = document.createElement('div');
      glare.className = 'card-glare-layer';
      card.appendChild(glare);

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.setProperty('--glare-x', `${x}px`);
        card.style.setProperty('--glare-y', `${y}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  },

  // ==========================================================================
  // 9. FLIP & NAVIGASI LIGHTBOX SERTIFIKAT
  // ==========================================================================
  initCertificateAnimations() {
    const filterBtns = document.querySelectorAll('.cert-filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        certCards.forEach((card) => {
          if (card.style.display !== 'none') {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          }
        });
      });
    });

    const lightbox = document.getElementById('certificate-lightbox');
    if (lightbox) {
      let touchStartX = 0;
      let touchEndX = 0;

      lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 50) {
          if (diff < 0) {
            const nextBtn = document.getElementById('btn-next-lightbox');
            if (nextBtn) nextBtn.click();
          } else {
            const prevBtn = document.getElementById('btn-prev-lightbox');
            if (prevBtn) prevBtn.click();
          }
        }
      }, { passive: true });
    }
  },

  // ==========================================================================
  // 10. TIMELINE DRAW & HIGHLIGHT TITIK AKTIF
  // ==========================================================================
  initTimelineAnimation() {
    const timelineSection = document.getElementById('timeline');
    if (!timelineSection) return;

    const timelineItems = timelineSection.querySelectorAll('.timeline-tree > .relative');
    timelineItems.forEach((item) => {
      const dot = item.querySelector('.rounded-full');

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 82%',
          once: false,
          onEnter: () => {
            if (dot) dot.classList.add('timeline-dot-active');
          },
          onLeaveBack: () => {
            if (dot) dot.classList.remove('timeline-dot-active');
          }
        });
      }
    });
  },

  // ==========================================================================
  // 11. EFEK MAGNET TOMBOL & FORM FOCUS ACCENT LINE
  // ==========================================================================
  initContactAndButtons() {
    if (ANIM_CONFIG.ENABLE_MAGNETIC && this.isDesktop && typeof gsap !== 'undefined') {
      const magneticBtns = document.querySelectorAll('.btn-poster-primary, .btn-poster-secondary');
      magneticBtns.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: x * 0.28,
            y: y * 0.28,
            duration: 0.25,
            ease: 'power2.out'
          });
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: 'power2.out' });
        });
      });
    }

    const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
    formInputs.forEach((input) => {
      const parent = input.parentElement;
      if (parent) {
        parent.classList.add('form-input-group');
        const line = document.createElement('div');
        line.className = 'form-accent-line';
        parent.appendChild(line);
      }
    });

    const backToTopBtn = document.getElementById('btn-back-to-top');
    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > 450) {
          backToTopBtn.style.opacity = '1';
          backToTopBtn.style.pointerEvents = 'auto';
        } else {
          backToTopBtn.style.opacity = '0.5';
        }
      }, { passive: true });
    }
  },

  // ==========================================================================
  // 12. KURSOR KUSTOM (DESKTOP ONLY)
  // ==========================================================================
  initCustomCursor() {
    const dot = document.getElementById('custom-cursor-dot');
    const ring = document.getElementById('custom-cursor-ring');
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    }, { passive: true });

    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    const interactives = 'a, button, input, textarea, .card-theme, .cert-card, .poster-card, [role="button"]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactives)) {
        document.body.classList.add('cursor-active');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactives)) {
        document.body.classList.remove('cursor-active');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-click');
    });

    document.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-click');
    });
  },

  // ==========================================================================
  // 13. MOBILE MENU SMOOTH TRANSITION
  // ==========================================================================
  initMobileMenuAnimation() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuPanel = document.getElementById('mobile-menu');
    if (!menuBtn || !menuPanel) return;

    const links = menuPanel.querySelectorAll('.mobile-nav-link, button');

    menuBtn.addEventListener('click', () => {
      const isVisible = !menuPanel.classList.contains('hidden');
      if (isVisible && typeof gsap !== 'undefined') {
        gsap.fromTo(links, 
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
        );
      }
    });
  },

  // ==========================================================================
  // 14. THEME SWITCHER CIRCULAR VIEW TRANSITION
  // ==========================================================================
  initThemeTransition() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn || !document.startViewTransition) return;

    themeBtn.addEventListener('click', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        // Logika ganti atribut data-theme ditangani ui.js
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ];
        document.documentElement.animate(
          { clipPath: clipPath },
          {
            duration: 400,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
    }, { capture: true });
  }
};

// Auto-inisialisasi setelah dokumen siap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PortfolioAnim.init());
} else {
  PortfolioAnim.init();
}

// Hook otomasi pengujian browser sungguhan (Fase C-5)
(() => {
  const params = new URLSearchParams(window.location.search);
  const scenario = params.get('test_scenario');
  if (!scenario) return;

  window.addEventListener('load', () => {
    // Lewati preloader saat mode pengujian agar tangkapan layar langsung ke target
    const preloader = document.getElementById('preloader-overlay');
    if (preloader) preloader.remove();

    setTimeout(() => {
      if (scenario === '1') {
        window.scrollTo(0, 0);
      } else if (scenario === '2') {
        window.scrollTo(0, 1600);
      } else if (scenario === '3') {
        window.scrollTo(0, 1600);
        setTimeout(() => window.scrollTo(0, 0), 300);
      } else if (scenario.startsWith('4_down_')) {
        const c = parseInt(scenario.replace('4_down_', ''), 10) || 1;
        for (let i = 0; i < c; i++) {
          window.scrollTo(0, 1600);
          window.scrollTo(0, 0);
        }
        window.scrollTo(0, 1600);
      } else if (scenario.startsWith('4_up_')) {
        const c = parseInt(scenario.replace('4_up_', ''), 10) || 1;
        for (let i = 0; i < c; i++) {
          window.scrollTo(0, 1600);
          window.scrollTo(0, 0);
        }
      } else if (scenario === '5_top') {
        window.scrollTo(0, 0);
      } else if (scenario === '6_tentang') {
        const sec = document.getElementById('tentang');
        if (sec) sec.scrollIntoView();
      } else if (scenario === '7_down') {
        window.scrollTo(0, 500);
      } else if (scenario === '7_up') {
        window.scrollTo(0, 500);
        setTimeout(() => window.scrollTo(0, 0), 300);
      } else if (scenario === '8_light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else if (scenario === '8_dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    }, 350);
  });
})();

window.PortfolioAnim = PortfolioAnim;
