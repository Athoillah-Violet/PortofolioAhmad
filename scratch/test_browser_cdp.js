const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 3456;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = path.join(__dirname, 'langkah-c');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// 1. Static file server
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0].split('#')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join('d:\\web portofolio', reqPath);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, '127.0.0.1', async () => {
  console.log(`Local test server running at http://127.0.0.1:${PORT}`);
  runTests().catch(err => {
    console.error('Test error:', err);
    process.exit(1);
  });
});

async function runTests() {
  const cdpPort = 9225;
  const userDataDir = path.join(SCREENSHOT_DIR, 'chrome-user-data');
  if (!fs.existsSync(userDataDir)) fs.mkdirSync(userDataDir, { recursive: true });

  console.log('Launching headless Chrome...');
  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${cdpPort}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${userDataDir}`,
    'about:blank'
  ]);

  // Wait for Chrome CDP to be ready
  let versionData = null;
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
      if (res.ok) {
        versionData = await res.json();
        break;
      }
    } catch (e) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  if (!versionData) {
    throw new Error('Could not connect to Chrome DevTools Protocol');
  }

  console.log('Connected to Chrome:', versionData['Browser']);

  // Create new target tab
  const newTabRes = await fetch(`http://127.0.0.1:${cdpPort}/json/new?http://127.0.0.1:${PORT}/index.html`, { method: 'PUT' });
  const tabData = await newTabRes.json();
  const wsUrl = tabData.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);

  let msgId = 1;
  const callbacks = new Map();
  const consoleMessages = [];

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && callbacks.has(data.id)) {
      const cb = callbacks.get(data.id);
      callbacks.delete(data.id);
      if (data.error) cb.reject(data.error);
      else cb.resolve(data.result);
    }
    if (data.method === 'Console.messageAdded') {
      consoleMessages.push(data.params.message.text);
    }
  };

  await new Promise(r => ws.onopen = r);

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      callbacks.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async function evaluate(expression) {
    const res = await send('Runtime.evaluate', { expression, returnByValue: true });
    return res.result ? res.result.value : null;
  }

  async function capture(filename) {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    const outPath = path.join(SCREENSHOT_DIR, filename);
    fs.writeFileSync(outPath, buffer);
    console.log(`[SCREENSHOT] Saved: ${filename}`);
  }

  await send('Page.enable');
  await send('DOM.enable');
  await send('Console.enable');

  const results = {};

  // =========================================================================
  // SKENARIO 1: Desktop 1440x900 - Muat di posisi atas (Hanya Nama 3 Baris)
  // =========================================================================
  console.log('\n--- UJI SKENARIO 1: Desktop 1440x900 di Posisi 0 ---');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
  await new Promise(r => setTimeout(r, 1800)); // tunggu preloader selesai

  const introOpacityS1 = await evaluate(`window.getComputedStyle(document.querySelector('[data-hero="intro"]')).opacity`);
  const photoOpacityS1 = await evaluate(`window.getComputedStyle(document.querySelector('.hero-photo-wrapper')).opacity`);
  const headerYPercentS1 = await evaluate(`window.getComputedStyle(document.querySelector('.site-header')).transform`);

  console.log(`Skenario 1 - Intro Layer Opacity: ${introOpacityS1} (harus 1)`);
  console.log(`Skenario 1 - Photo Opacity: ${photoOpacityS1} (harus 0)`);
  await capture('skenario-1-desktop-top.png');
  results.s1 = (parseFloat(introOpacityS1) > 0.9 && parseFloat(photoOpacityS1) < 0.1);

  // =========================================================================
  // SKENARIO 2: Scroll Turun sampai Hero Selesai
  // =========================================================================
  console.log('\n--- UJI SKENARIO 2: Scroll Turun sampai Hero Selesai ---');
  await evaluate(`window.scrollTo(0, 1600)`);
  await new Promise(r => setTimeout(r, 1200));

  const introOpacityS2 = await evaluate(`window.getComputedStyle(document.querySelector('[data-hero="intro"]')).opacity`);
  const photoOpacityS2 = await evaluate(`window.getComputedStyle(document.querySelector('.hero-photo-wrapper')).opacity`);
  const nameMainOpacityS2 = await evaluate(`window.getComputedStyle(document.querySelector('[data-hero="main"] h1')).opacity`);

  console.log(`Skenario 2 - Intro Layer Opacity: ${introOpacityS2} (harus 0)`);
  console.log(`Skenario 2 - Photo Opacity: ${photoOpacityS2} (harus 1)`);
  console.log(`Skenario 2 - Main Name Opacity: ${nameMainOpacityS2} (harus 1)`);
  await capture('skenario-2-desktop-scrolled.png');
  results.s2 = (parseFloat(introOpacityS2) < 0.1 && parseFloat(photoOpacityS2) > 0.9);

  // =========================================================================
  // SKENARIO 3: Scroll Kembali ke Paling Atas (0)
  // =========================================================================
  console.log('\n--- UJI SKENARIO 3: Scroll Kembali ke Paling Atas ---');
  await evaluate(`window.scrollTo(0, 0)`);
  await new Promise(r => setTimeout(r, 1200));

  const introOpacityS3 = await evaluate(`window.getComputedStyle(document.querySelector('[data-hero="intro"]')).opacity`);
  const photoOpacityS3 = await evaluate(`window.getComputedStyle(document.querySelector('.hero-photo-wrapper')).opacity`);

  console.log(`Skenario 3 - Intro Layer Opacity: ${introOpacityS3} (harus 1)`);
  console.log(`Skenario 3 - Photo Opacity: ${photoOpacityS3} (harus 0)`);
  await capture('skenario-3-desktop-back-top.png');
  results.s3 = (parseFloat(introOpacityS3) > 0.9 && parseFloat(photoOpacityS3) < 0.1);

  // =========================================================================
  // SKENARIO 4: Ulangi Turun dan Naik 3 Siklus
  // =========================================================================
  console.log('\n--- UJI SKENARIO 4: Ulangi Turun dan Naik 3 Siklus ---');
  let cycleSuccess = true;
  for (let c = 1; c <= 3; c++) {
    // Turun
    await evaluate(`window.scrollTo(0, 1600)`);
    await new Promise(r => setTimeout(r, 900));
    const downPhoto = await evaluate(`window.getComputedStyle(document.querySelector('.hero-photo-wrapper')).opacity`);
    await capture(`skenario-4-siklus-${c}-down.png`);

    // Naik
    await evaluate(`window.scrollTo(0, 0)`);
    await new Promise(r => setTimeout(r, 900));
    const upIntro = await evaluate(`window.getComputedStyle(document.querySelector('[data-hero="intro"]')).opacity`);
    await capture(`skenario-4-siklus-${c}-up.png`);

    const pass = (parseFloat(downPhoto) > 0.9 && parseFloat(upIntro) > 0.9);
    console.log(`Siklus ${c}: ${pass ? 'BERHASIL' : 'GAGAL'} (downPhoto: ${downPhoto}, upIntro: ${upIntro})`);
    if (!pass) cycleSuccess = false;
  }
  results.s4 = cycleSuccess;

  // =========================================================================
  // SKENARIO 5: Buka lewat Link #proyek lalu Scroll ke Atas
  // =========================================================================
  console.log('\n--- UJI SKENARIO 5: Hash #proyek lalu Scroll ke Atas ---');
  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html#proyek` });
  await new Promise(r => setTimeout(r, 1400));
  await capture('skenario-5-hash-proyek.png');

  // Scroll ke atas
  await evaluate(`window.scrollTo(0, 0)`);
  await new Promise(r => setTimeout(r, 1200));
  const introHashTop = await evaluate(`window.getComputedStyle(document.querySelector('[data-hero="intro"]')).opacity`);
  const photoHashTop = await evaluate(`window.getComputedStyle(document.querySelector('.hero-photo-wrapper')).opacity`);
  await capture('skenario-5-hash-back-to-top.png');

  results.s5 = (parseFloat(introHashTop) > 0.9 && parseFloat(photoHashTop) < 0.1);
  console.log(`Skenario 5: ${results.s5 ? 'BERHASIL' : 'GAGAL'} (intro: ${introHashTop}, photo: ${photoHashTop})`);

  // =========================================================================
  // SKENARIO 6: AOS Reveal Berulang (Tentang & Proyek)
  // =========================================================================
  console.log('\n--- UJI SKENARIO 6: AOS Reveal Berulang (mirror: true) ---');
  // Scroll ke bagian Tentang
  await evaluate(`document.getElementById('tentang').scrollIntoView()`);
  await new Promise(r => setTimeout(r, 1000));
  const tentangHasAos1 = await evaluate(`document.querySelector('#tentang-container [data-aos]').classList.contains('aos-animate')`);
  console.log(`AOS saat Tentang masuk layar: aos-animate = ${tentangHasAos1}`);

  // Scroll jauh ke kontak
  await evaluate(`document.getElementById('kontak').scrollIntoView()`);
  await new Promise(r => setTimeout(r, 1000));

  // Scroll kembali ke Tentang
  await evaluate(`document.getElementById('tentang').scrollIntoView()`);
  await new Promise(r => setTimeout(r, 1000));
  const tentangHasAos2 = await evaluate(`document.querySelector('#tentang-container [data-aos]').classList.contains('aos-animate')`);
  console.log(`AOS saat kembali ke Tentang: aos-animate = ${tentangHasAos2}`);
  results.s6 = (tentangHasAos1 && tentangHasAos2);

  // =========================================================================
  // SKENARIO 7: Mobile 375x812 - Urutan Berulang
  // =========================================================================
  console.log('\n--- UJI SKENARIO 7: Mobile Viewport 375x812 ---');
  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
  await new Promise(r => setTimeout(r, 1800));

  await capture('skenario-7-mobile-top.png');
  const mobileTopIntro = await evaluate(`window.getComputedStyle(document.querySelector('[data-hero="intro"]')).opacity`);

  // Scroll mobile turun
  await evaluate(`window.scrollTo(0, 500)`);
  await new Promise(r => setTimeout(r, 1000));
  await capture('skenario-7-mobile-scrolled.png');
  const mobileDownIntro = await evaluate(`window.getComputedStyle(document.querySelector('[data-hero="intro"]')).opacity`);

  // Scroll mobile kembali ke atas
  await evaluate(`window.scrollTo(0, 0)`);
  await new Promise(r => setTimeout(r, 1000));
  await capture('skenario-7-mobile-back-top.png');
  const mobileBackIntro = await evaluate(`window.getComputedStyle(document.querySelector('[data-hero="intro"]')).opacity`);

  results.s7 = (parseFloat(mobileTopIntro) > 0.8 && parseFloat(mobileDownIntro) < 0.2 && parseFloat(mobileBackIntro) > 0.8);
  console.log(`Skenario 7 (Mobile): ${results.s7 ? 'BERHASIL' : 'GAGAL'} (top: ${mobileTopIntro}, down: ${mobileDownIntro}, back: ${mobileBackIntro})`);

  // =========================================================================
  // SKENARIO 8: Mode Terang & Gelap, Reduced Motion, Console Errors
  // =========================================================================
  console.log('\n--- UJI SKENARIO 8: Mode Terang/Gelap & Console ---');
  // Toggle theme to light
  await evaluate(`document.documentElement.setAttribute('data-theme', 'light')`);
  await new Promise(r => setTimeout(r, 500));
  await capture('skenario-8-light-theme.png');

  // Toggle back to dark
  await evaluate(`document.documentElement.setAttribute('data-theme', 'dark')`);
  await new Promise(r => setTimeout(r, 500));
  await capture('skenario-8-dark-theme.png');

  const errorCount = consoleMessages.filter(m => m.toLowerCase().includes('error')).length;
  results.s8 = (errorCount === 0);
  console.log(`Console errors: ${errorCount}`);

  // Tutup Chrome dan Server
  ws.close();
  chromeProcess.kill();
  server.close();

  console.log('\n=== REKAP HASIL PENGUJIAN BROWSER SUNGGUHAN (C-5) ===');
  for (const [skenario, pass] of Object.entries(results)) {
    console.log(`- ${skenario.toUpperCase()}: ${pass ? 'LULUS (PASS)' : 'GAGAL (FAIL)'}`);
  }

  const allPassed = Object.values(results).every(Boolean);
  console.log(`\nStatus Akhir: ${allPassed ? 'SEMUA SKENARIO LULUS' : 'ADA SKENARIO GAGAL'}`);
  process.exit(allPassed ? 0 : 1);
}
