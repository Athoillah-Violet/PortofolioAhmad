/**
 * js/anim.js
 * Modul Animasi & Interaksi Gerak Berkelas - "Poster Berani"
 * Menggabungkan AOS 2.3.4 (Reveal Sederhana) & GSAP 3 + ScrollTrigger + Lenis (Koreografi Hero & Interaksi Kompleks)
 * 
 * Sepenuhnya adaptif di Dark Mode & Light Mode menggunakan CSS Variables Design Tokens.
 * Bebas bentrok antar library, ramah aksesibilitas (prefers-reduced-motion), dan aman cetak (@media print).
 */

// ============================================================================
// 1. SAKLAR GLOBAL & KONFIGURASI ANIMASI
// ============================================================================
const ANIM_CONFIG = {
  ENABLE_PRELOADER: true,       // Preloader inisial "AA" (< 1.5 detik, 1x per sesi)
  ENABLE_HERO_SCROLL: true,     // Hero ScrollTrigger scrub & pin sequence
  ENABLE_AOS: true,             // AOS 2.3.4 untuk reveal sederhana saat scroll
  ENABLE_TILT: true,            // 3D Tilt kartu proyek (Desktop only)
  ENABLE_CURSOR: true,          // Kursor kustom (Desktop pointer halus saja)
  ENABLE_SMOOTH_SCROLL: true,   // Lenis Smooth Scroll
  ENABLE_MARQUEE: true,         // Marquee teknologi tak terbatas
  ENABLE_TIMELINE_DRAW: true,   // Garis timeline & titik aktif saat scroll
  ENABLE_COUNTERS: true,        // Penghitung angka naik di bagian Tentang
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

  init() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isDesktop = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches;

    // Failsafe 3 detik: jika script lambat atau ada error pada library luar, paksa buka semua konten
    setTimeout(() => {
      document.documentElement.classList.add('js-anim');
      const preloader = document.getElementById('preloader-overlay');
      if (preloader) preloader.remove();
      
      const header = document.querySelector('.site-header');
      if (header) {
        header.style.opacity = '1';
        header.style.transform = 'none';
      }
      
      document.querySelectorAll('[data-hero]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.clipPath = 'none';
      });

      if (typeof AOS !== 'undefined' && AOS.refreshHard) {
        AOS.refreshHard();
      }
    }, 3000);

    // Tandai bahwa animasi JS aktif
    document.documentElement.classList.add('js-anim');

    // Penanganan Aksesibilitas: prefers-reduced-motion
    if (this.isReducedMotion) {
      console.log('prefers-reduced-motion aktif: animasi dinonaktifkan untuk kenyamanan visual.');
      this.handleReducedMotion();
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

    // 4. Inisialisasi AOS (Reveal Sederhana)
    if (ANIM_CONFIG.ENABLE_AOS) {
      this.initAOS();
    }

    // 5. Koreografi Hero Berurutan dengan Scroll (GSAP ScrollTrigger Scrub & Pin)
    if (ANIM_CONFIG.ENABLE_HERO_SCROLL) {
      this.initHeroScrollSequence();
    }

    // 6. Angka Ringkas (Counter) di Bagian Tentang
    if (ANIM_CONFIG.ENABLE_COUNTERS) {
      this.initCounterAnimation();
    }

    // 7. 3D Tilt Kartu Proyek (Desktop Only - Terpisah dari Pembungkus AOS)
    if (ANIM_CONFIG.ENABLE_TILT && this.isDesktop) {
      this.initProjectTilt();
    }

    // 8. FLIP & Navigasi Lightbox Sertifikat
    this.initCertificateAnimations();

    // 9. Timeline Draw & Highlight Titik Aktif
    if (ANIM_CONFIG.ENABLE_TIMELINE_DRAW) {
      this.initTimelineAnimation();
    }

    // 10. Efek Magnet Tombol & Form Focus Line
    this.initContactAndButtons();

    // 11. Kursor Kustom (Titik Kuning + Cincin Garis Tebal)
    if (ANIM_CONFIG.ENABLE_CURSOR && this.isDesktop) {
      this.initCustomCursor();
    }

    // 12. Mobile Menu Transition
    this.initMobileMenuAnimation();

    // 13. Theme Switcher View Transition API
    if (ANIM_CONFIG.ENABLE_THEME_TRANSITION) {
      this.initThemeTransition();
    }

    // Refresh layout setelah window load dan gambar selesai dimuat
    window.addEventListener('load', () => {
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

    document.querySelectorAll('[data-hero]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.clipPath = 'none';
    });

    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
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
              // Segarkan scroll trigger dan AOS setelah preloader lenyap
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
  // 4. INISIALISASI AOS 2.3.4 (REVEAL SEDERHANA)
  // ==========================================================================
  initAOS() {
    if (typeof AOS === 'undefined') return;

    try {
      AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
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
  // 5. HERO BERURUTAN DENGAN SCROLL (GSAP ScrollTrigger Scrub & Pin)
  // ==========================================================================
  initHeroScrollSequence() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const nameEl = heroSection.querySelector('h1[data-hero="name"]');
    const header = document.querySelector('.site-header');
    const hintEl = heroSection.querySelector('[data-hero="hint"]');
    const photoBgBlock = heroSection.querySelector('.hero-photo-bg-block');
    const photoWrapper = heroSection.querySelector('.hero-photo-wrapper');
    const photoDeco = heroSection.querySelectorAll('[data-hero="photo"] [data-hero="deco"]');
    const roleEls = heroSection.querySelectorAll('[data-hero="role"]');
    const mottoEl = heroSection.querySelector('[data-hero="motto"]');
    const ctaEl = heroSection.querySelector('[data-hero="cta"]');
    const otherDeco = heroSection.querySelectorAll('[data-hero="deco"]:not([data-hero="photo"] [data-hero="deco"])');

    if (!nameEl) return;

    // Ambient floating shapes di latar belakang hero
    const shape1 = document.createElement('div');
    shape1.className = 'hero-floating-shape bg-[var(--accent)] w-72 h-72 -top-10 -left-10';
    const shape2 = document.createElement('div');
    shape2.className = 'hero-floating-shape bg-[var(--accent-2)] w-96 h-96 -bottom-20 -right-20';
    heroSection.appendChild(shape1);
    heroSection.appendChild(shape2);

    if (typeof gsap !== 'undefined') {
      gsap.to(shape1, { y: 20, x: 10, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to(shape2, { y: -24, x: -12, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }

    // Jika GSAP atau ScrollTrigger tidak tersedia, biarkan tampilan default statis
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }

    // ========================================================================
    // A. VERSI DESKTOP (>= 768px): PIN + SCRUB HERO SEQUENCE
    // ========================================================================
    if (this.isDesktop) {
      // Hitung selisih posisi untuk memusatkan nama di tengah hero saat scroll awal = 0
      const calculateCenterDelta = () => {
        const heroRect = heroSection.getBoundingClientRect();
        const nameRect = nameEl.getBoundingClientRect();
        return {
          deltaX: (heroRect.left + heroRect.width / 2) - (nameRect.left + nameRect.width / 2),
          deltaY: (heroRect.top + heroRect.height / 2) - (nameRect.top + nameRect.height / 2)
        };
      };

      const { deltaX, deltaY } = calculateCenterDelta();

      // Atur Keadaan Awal (Layar pertama HANYA nama di tengah, elemen lain tersembunyi)
      gsap.set(nameEl, { x: deltaX, y: deltaY, scale: 1.15, transformOrigin: 'center center' });
      if (header) gsap.set(header, { yPercent: -100, opacity: 0 });
      if (hintEl) gsap.set(hintEl, { opacity: 1, y: 0 });
      if (photoBgBlock) gsap.set(photoBgBlock, { xPercent: -60, opacity: 0 });
      if (photoWrapper) gsap.set(photoWrapper, { y: 60, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' });
      if (photoDeco.length) gsap.set(photoDeco, { scale: 0.5, opacity: 0, rotate: -15 });
      if (roleEls.length) gsap.set(roleEls, { y: 24, opacity: 0 });
      if (mottoEl) gsap.set(mottoEl, { y: 20, opacity: 0 });
      if (ctaEl) gsap.set(ctaEl, { y: 24, opacity: 0 });
      if (otherDeco.length) gsap.set(otherDeco, { scale: 0.6, opacity: 0 });

      // Cek apakah pengunjung me-reload di tengah halaman atau datang lewat tautan #hash
      const hasHash = window.location.hash && window.location.hash !== '#hero';
      const isScrolled = window.scrollY > 80;

      // Panjang scroll hero (150-200% tinggi layar)
      const scrollDistance = window.innerHeight * (ANIM_CONFIG.HERO_SCROLL_PERCENT / 100);

      // Buat Timeline GSAP ScrollTrigger dengan pin & scrub
      this.heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1
        }
      });

      // Urutan Scrub:
      // 0. Scroll hint memudar & navbar mulai muncul perlahan
      if (hintEl) {
        this.heroTimeline.to(hintEl, { opacity: 0, y: 15, duration: 0.25 }, 0);
      }
      if (header) {
        this.heroTimeline.to(header, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.05);
      }

      // Tahap 1: Nama mengecil dan naik ke posisi akhirnya di grid hero
      this.heroTimeline.to(nameEl, {
        x: 0,
        y: 0,
        scale: 1,
        duration: ANIM_CONFIG.HERO_STAGE1_DURATION,
        ease: 'power2.inOut'
      }, 0.15);

      // Tahap 2: Foto saya muncul (blok diagonal kuning meluncur masuk dulu, lalu foto naik dengan clip-path)
      const t2Start = 0.15 + ANIM_CONFIG.HERO_STAGE1_DURATION * 0.75;
      if (photoBgBlock) {
        this.heroTimeline.to(photoBgBlock, {
          xPercent: 0,
          opacity: 1,
          duration: ANIM_CONFIG.HERO_STAGE2_DURATION * 0.7,
          ease: 'power3.out'
        }, t2Start);
      }
      if (photoWrapper) {
        this.heroTimeline.to(photoWrapper, {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: ANIM_CONFIG.HERO_STAGE2_DURATION,
          ease: 'power3.out'
        }, t2Start + 0.15);
      }
      if (photoDeco.length) {
        this.heroTimeline.to(photoDeco, {
          scale: 1,
          opacity: 1,
          rotate: -2,
          duration: 0.4,
          ease: 'back.out(1.5)'
        }, t2Start + 0.35);
      }

      // Tahap 3: Peran, motto, tombol, tulisan kuas, dan elemen dekoratif muncul bergantian (stagger)
      const t3Start = t2Start + ANIM_CONFIG.HERO_STAGE2_DURATION * 0.7;
      if (roleEls.length) {
        this.heroTimeline.to(roleEls, {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.45,
          ease: 'power2.out'
        }, t3Start);
      }
      if (mottoEl) {
        this.heroTimeline.to(mottoEl, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        }, t3Start + 0.15);
      }
      if (ctaEl) {
        this.heroTimeline.to(ctaEl, {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out'
        }, t3Start + 0.25);
      }
      if (otherDeco.length) {
        this.heroTimeline.to(otherDeco, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        }, t3Start + 0.2);
      }

      // Tahap 4: Buffer settle sebelum unpin ke bagian Tentang
      this.heroTimeline.to({}, { duration: ANIM_CONFIG.HERO_BUFFER_DURATION });

      // Jika memuat halaman di tengah atau memakai tautan #hash, langsung ke keadaan akhir
      if (hasHash || isScrolled) {
        this.heroTimeline.progress(1);
        ScrollTrigger.refresh();
      }

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
    // B. VERSI MOBILE (< 768px): TANPA PIN PANJANG (Ramah Layar Sentuh)
    // ========================================================================
    else {
      if (header) {
        header.style.opacity = '1';
        header.style.transform = 'none';
      }
      if (hintEl) {
        hintEl.style.display = 'none';
      }

      // Entri lembut berurutan tanpa mengunci scroll touch
      const mobileTl = gsap.timeline({ delay: 0.2 });
      mobileTl
        .from(nameEl, { opacity: 0, y: 20, duration: 0.65, ease: 'power2.out' })
        .from(photoBgBlock, { opacity: 0, scale: 0.95, duration: 0.45, ease: 'power2.out' }, '-=0.3')
        .from(photoWrapper, { opacity: 0, y: 20, duration: 0.55, ease: 'power2.out' }, '-=0.3')
        .from(roleEls, { opacity: 0, y: 15, stagger: 0.1, duration: 0.4, ease: 'power2.out' }, '-=0.2')
        .from(mottoEl, { opacity: 0, y: 15, duration: 0.4, ease: 'power2.out' }, '-=0.2')
        .from(ctaEl, { opacity: 0, y: 15, duration: 0.4, ease: 'power2.out' }, '-=0.2');
    }
  },

  // ==========================================================================
  // 6. ANIMASI COUNTER ANGKA DI BAGIAN TENTANG
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
          once: true,
          onEnter: runCount
        });
      } else {
        runCount();
      }
    });
  },

  // ==========================================================================
  // 7. 3D TILT KARTU PROYEK (DESKTOP ONLY - TERPISAH DARI AOS WRAPPER)
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
  // 8. FLIP & NAVIGASI LIGHTBOX SERTIFIKAT
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
  // 9. TIMELINE DRAW & HIGHLIGHT TITIK AKTIF
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
          once: true,
          onEnter: () => {
            if (dot) dot.classList.add('timeline-dot-active');
          }
        });
      }
    });
  },

  // ==========================================================================
  // 10. EFEK MAGNET TOMBOL & FORM FOCUS ACCENT LINE
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
  // 11. KURSOR KUSTOM (DESKTOP ONLY)
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
  // 12. MOBILE MENU SMOOTH TRANSITION
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
  // 13. THEME SWITCHER CIRCULAR VIEW TRANSITION
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

window.PortfolioAnim = PortfolioAnim;
