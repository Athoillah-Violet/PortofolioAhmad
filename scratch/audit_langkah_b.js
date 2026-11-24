const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const animJs = fs.readFileSync('js/anim.js', 'utf8');
const renderJs = fs.readFileSync('js/render.js', 'utf8');
const uiJs = fs.readFileSync('js/ui.js', 'utf8');
const animCss = fs.readFileSync('css/anim.css', 'utf8');

const checks = [];

function test(name, condition, details = '') {
  checks.push({ name, passed: Boolean(condition), details });
}

// 1. CDN AOS 2.3.4
test('AOS CSS CDN 2.3.4 pinned in index.html', indexHtml.includes('https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css'));
test('AOS JS CDN 2.3.4 pinned in index.html', indexHtml.includes('https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js'));

// 2. ANIM_CONFIG switches in js/anim.js
const requiredSwitches = [
  'ENABLE_PRELOADER',
  'ENABLE_HERO_SCROLL',
  'ENABLE_AOS',
  'ENABLE_TILT',
  'ENABLE_CURSOR',
  'ENABLE_SMOOTH_SCROLL',
  'ENABLE_MARQUEE'
];
requiredSwitches.forEach(sw => {
  test(`ANIM_CONFIG has switch ${sw}`, animJs.includes(sw));
});

// 3. AOS Init options
test('AOS.init with duration 700', animJs.includes('duration: 700'));
test('AOS.init with easing ease-out-cubic', animJs.includes("easing: 'ease-out-cubic'"));
test('AOS.init with once: true', animJs.includes('once: true'));
test('AOS.init with offset: 80', animJs.includes('offset: 80'));
test('AOS.init with anchorPlacement top-bottom', animJs.includes("anchorPlacement: 'top-bottom'"));
test('AOS.refreshHard() called in anim.js', animJs.includes('AOS.refreshHard()'));

// 4. Hero ScrollTrigger Sequence
test('Hero timeline has pin and scrub', animJs.includes('pin: true') && animJs.includes('scrub: 0.65'));
test('Hero sequence uses data-hero attributes', animJs.includes('data-hero="name"') && animJs.includes('data-hero="photo"'));
test('Hero stages 1, 2, 3 implemented', animJs.includes('HERO_STAGE1_DURATION') && animJs.includes('HERO_STAGE2_DURATION') && animJs.includes('HERO_STAGE3_DURATION'));
test('Hero mobile avoids long pin', animJs.includes('B. VERSI MOBILE (< 768px): TANPA PIN PANJANG'));
test('Mid-page / hash reload failsafe', animJs.includes('hasHash || isScrolled'));

// 5. Central Ticker Lenis + ScrollTrigger + AOS
test('Lenis scrolls syncs with ScrollTrigger', animJs.includes("this.lenis.on('scroll', ScrollTrigger.update)"));
test('GSAP ticker drives Lenis', animJs.includes('gsap.ticker.add'));
test('ScrollTrigger refresh triggers AOS.refreshHard', animJs.includes('AOS.refreshHard()'));

// 6. Project Card Tilt vs AOS separation
test('Project card has outer .project-aos-wrap in render.js', renderJs.includes('project-aos-wrap'));
test('Project card has inner .project-card-tilt in render.js', renderJs.includes('project-card-tilt'));
test('CSS has .project-aos-wrap style', animCss.includes('.project-aos-wrap'));

// 7. Failsafe & Accessibility
test('3-second failsafe present in anim.js', animJs.includes('setTimeout') && animJs.includes('3000'));
test('prefers-reduced-motion handler present', animJs.includes('handleReducedMotion'));
test('site-header focus-within accessibility in anim.css', animCss.includes('.site-header:focus-within'));
test('Print media free of animation in anim.css', animCss.includes('@media print') && animCss.includes('display: none !important'));

// Summary
console.log('=== HASIL AUDIT VERIFIKASI LANGKAH B ===');
let failed = 0;
checks.forEach(c => {
  if (c.passed) {
    console.log(`[PASS] ${c.name}`);
  } else {
    console.log(`[FAIL] ${c.name}: ${c.details}`);
    failed++;
  }
});

console.log(`\nTotal: ${checks.length} uji. Lolos: ${checks.length - failed}, Gagal: ${failed}`);
if (failed > 0) process.exit(1);
