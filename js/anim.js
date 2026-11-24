/**
 * js/anim.js
 * Modul Animasi & Interaksi Gerak Berkelas
 * Menggunakan GSAP 3 + ScrollTrigger + Lenis Smooth Scroll
 * 
 * Sepenuhnya adaptif di Dark Mode & Light Mode menggunakan CSS Variables Design Tokens.
 */

const ANIM_CONFIG = {
  ENABLE_PRELOADER: true,      // Preloader inisial "AA" (< 1.5 detik)
  ENABLE_SMOOTH_SCROLL: true,  // Lenis Smooth Scroll
  ENABLE_CURSOR: true,         // Kursor kustom (Desktop only)
  ENABLE_TILT: true,           // 3D Tilt kartu proyek (Desktop only)
  ENABLE_MAGNETIC: true,       // Efek magnet tombol utama (Desktop only)
  ENABLE_MARQUEE: true,        // Marquee teknologi tak terbatas
  ENABLE_TIMELINE_DRAW: true,  // Garis timeline tergambar mengikuti scroll
  ENABLE_COUNTERS: true,       // Penghitung angka naik di bagian Tentang
  ENABLE_THEME_TRANSITION: true // Transisi melingkar tema terang/gelap
};

const PortfolioAnim = {
  lenis: null,
  isReducedMotion: false,
  isDesktop: false,

  init() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isDesktop = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches;

    // Failsafe 3 detik: jika script lambat atau bermasalah, paksa buka semua konten
    setTimeout(() => {
      document.documentElement.classList.add('js-anim');
      const allReveals = document.querySelectorAll('[data-reveal]');
      allReveals.forEach(el => el.classList.add('revealed'));
      const preloader = document.getElementById('preloader-overlay');
      if (preloader) preloader.classList.add('preloader-hidden');
    }, 3000);

    document.documentElement.classList.add('js-anim');

    if (this.isReducedMotion) {
      console.log('prefers-reduced-motion aktif: animasi gerak disederhanakan.');
      this.handleReducedMotion();
      return;
    }

    // 1. Preloader
    this.initPreloader();

    // 2. Smooth Scroll (Lenis)
    if (ANIM_CONFIG.ENABLE_SMOOTH_SCROLL) {
      this.initSmoothScroll();
    }

    // 3. Scroll Progress Bar & Sticky Header
    this.initScrollProgressAndNavbar();

    // 4. Injeksi & Animasi Marquee Keterampilan
    if (ANIM_CONFIG.ENABLE_MARQUEE) {
      this.initSkillMarquee();
    }

    // 5. Intro Hero (Mask Reveal & Profile Tilt/Parallax)
    this.initHeroIntro();

    // 6. Scroll Reveals ([data-reveal])
    this.initScrollReveals();

    // 7. Angka Ringkas (Counter)
    if (ANIM_CONFIG.ENABLE_COUNTERS) {
      this.initCounterAnimation();
    }

    // 8. 3D Tilt Kartu Proyek
    if (ANIM_CONFIG.ENABLE_TILT && this.isDesktop) {
      this.initProjectTilt();
    }

    // 9. FLIP Animasi Filter Sertifikat & Lightbox Enhancements
    this.initCertificateAnimations();

    // 10. Timeline Draw & Glowing Dots
    if (ANIM_CONFIG.ENABLE_TIMELINE_DRAW) {
      this.initTimelineAnimation();
    }

    // 11. Efek Magnet Tombol & Form Focus Line
    this.initContactAndButtons();

    // 12. Kursor Kustom
    if (ANIM_CONFIG.ENABLE_CURSOR && this.isDesktop) {
      this.initCustomCursor();
    }

    // 13. Mobile Menu Smooth Transition
    this.initMobileMenuAnimation();

    // 14. Theme Switcher Circular Transition
    if (ANIM_CONFIG.ENABLE_THEME_TRANSITION) {
      this.initThemeTransition();
    }
  },

  handleReducedMotion() {
    const preloader = document.getElementById('preloader-overlay');
    if (preloader) preloader.remove();
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
  },

  // 1. Preloader Singkat (< 1.5 detik)
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
            }
          });
          tl.to(logoContent, { opacity: 0, scale: 0.92, duration: 0.25, ease: 'power2.in' })
            .to(curtainTop, { yPercent: -100, duration: 0.55, ease: 'expo.inOut' }, '-=0.1')
            .to(curtainBottom, { yPercent: 100, duration: 0.55, ease: 'expo.inOut' }, '<');
        } else {
          preloader.classList.add('preloader-hidden');
          sessionStorage.setItem('portfolio_preloader_seen', '1');
        }
      }
    }, 45);
  },

  // 2. Smooth Scroll dengan Lenis
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

      if (typeof ScrollTrigger !== 'undefined') {
        this.lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          this.lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        const raf = (time) => {
          this.lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }

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

  // 3. Scroll Progress Bar & Sticky Header
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
        const top = sec.offsetTop - 130;
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

  // 4. Injeksi & Animasi Marquee Keterampilan
  initSkillMarquee() {
    const existingMarquee = document.querySelector('.marquee-wrapper');
    if (existingMarquee) {
      // Marquee sudah dirender rapi di bawah grid keterampilan
      return;
    }
  },

  // 5. Intro Hero (Mask Reveal & Profile Parallax)
  initHeroIntro() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    // Dekorasi latar ambient melayang adaptif tema
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

    // Mask Reveal halus pada nama hero tanpa merusak span badge kuning
    const heading = heroSection.querySelector('h1[data-hero="name"]');
    if (heading && typeof gsap !== 'undefined') {
      gsap.from(heading, {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        delay: 0.15
      });
    }

    // Parallax mouse follow pada foto profil penuh (Desktop saja, tanpa crop atau celah)
    const photoWrapper = heroSection.querySelector('.hero-photo-wrapper');
    if (photoWrapper && this.isDesktop && typeof gsap !== 'undefined') {
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
  },

  // 6. Scroll Reveals ([data-reveal])
  initScrollReveals() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length === 0) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      revealElements.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              clearProps: 'willChange'
            });
            el.classList.add('revealed');
          }
        });
      });
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      revealElements.forEach(el => observer.observe(el));
    }
  },

  // 7. Animasi Counter Angka di Bagian Tentang
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
            duration: 1.6,
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
          start: 'top 85%',
          once: true,
          onEnter: runCount
        });
      } else {
        runCount();
      }
    });
  },

  // 8. 3D Tilt Kartu Proyek (Desktop Only)
  initProjectTilt() {
    const projectCards = document.querySelectorAll('article[data-project-id]');
    projectCards.forEach((card) => {
      card.classList.add('project-card-tilt');

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

  // 9. FLIP Animasi Filter Sertifikat & Lightbox Enhancements
  initCertificateAnimations() {
    const filterBtns = document.querySelectorAll('.cert-filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        certCards.forEach((card) => {
          if (card.style.display !== 'none') {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 60);
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

  // 10. Timeline Draw & Glowing Dots (Berlaku untuk Kedua Kolom: Pendidikan & Organisasi)
  initTimelineAnimation() {
    const timelineSection = document.getElementById('timeline');
    if (!timelineSection) return;

    const timelineItems = timelineSection.querySelectorAll('.timeline-tree > .relative');
    timelineItems.forEach((item, idx) => {
      const dot = item.querySelector('.rounded-full');
      const card = item.querySelector('.card-theme');

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (dot) dot.classList.add('timeline-dot-active');
            if (card && typeof gsap !== 'undefined') {
              const xOffset = (idx % 2 === 0) ? -20 : 20;
              gsap.fromTo(card, 
                { x: this.isDesktop ? xOffset : 0, y: 16, opacity: 0 },
                { x: 0, y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' }
              );
            }
          }
        });
      }
    });
  },

  // 11. Efek Magnet Tombol & Form Focus Line
  initContactAndButtons() {
    if (ANIM_CONFIG.ENABLE_MAGNETIC && this.isDesktop && typeof gsap !== 'undefined') {
      const magneticBtns = document.querySelectorAll('.btn-primary');
      magneticBtns.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: x * 0.35,
            y: y * 0.35,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
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

  // 12. Kursor Kustom (Desktop Only)
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
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    const interactives = 'a, button, input, textarea, .card-theme, .cert-card, [role="button"]';
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

  // 13. Mobile Menu Smooth Transition
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
          { opacity: 1, x: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
        );
      }
    });
  },

  // 14. Theme Switcher Circular Transition (View Transitions API)
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
        // UI theme toggle ditangani oleh ui.js
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ];
        document.documentElement.animate(
          { clipPath: clipPath },
          {
            duration: 450,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
    }, { capture: true });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PortfolioAnim.init());
} else {
  PortfolioAnim.init();
}

window.PortfolioAnim = PortfolioAnim;
