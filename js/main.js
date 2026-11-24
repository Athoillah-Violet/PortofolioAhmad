/**
 * js/main.js
 * Titik masuk utama aplikasi website portofolio.
 * Menjalankan render data dan menghubungkan event listener UI setelah dokumen siap.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render seluruh konten HTML dari data.js
  if (window.PortfolioRenderer) {
    window.PortfolioRenderer.init();
  } else {
    console.error('PortfolioRenderer tidak ditemukan.');
  }

  // 2. Inisialisasi fungsionalitas UI (tema, modal, lightbox, filter, dsb.)
  if (window.PortfolioUI) {
    window.PortfolioUI.init();
  } else {
    console.error('PortfolioUI tidak ditemukan.');
  }

  console.log('Portofolio Ahmad Athoillah Almadany siap digunakan.');
});
