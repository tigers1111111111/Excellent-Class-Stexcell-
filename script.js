// Clean script.js - Fixed duplicates & server integration
// Modal functions (moved from inline)
function openModal(name, phone, birth, ig, img, address) {
  document.getElementById('modal').classList.add('active');
  document.getElementById('m-name').innerText = name;
  document.getElementById('m-phone').innerText = phone;
  document.getElementById('m-birth').innerText = birth;
  document.getElementById('m-ig').innerText = ig;
  document.getElementById('m-img').src = img;
  document.getElementById('m-address').innerText = address || '-';
}

function closeModal(e) {
  if (e.target.classList.contains('modal') || e.target.classList.contains('close')) {
    const modal = document.getElementById('modal');
    modal.classList.add('closing');
    setTimeout(() => {
      modal.classList.remove('active', 'closing');
    }, 300);
  }
}


function openAlbum(src) {
  const modal = document.getElementById('albumModal');
  const image = document.getElementById('albumImg');
  const video = document.getElementById('albumVideo');

  image.style.display = 'none';
  video.style.display = 'none';

  if (src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.ogg')) {
    video.src = src;
    video.style.display = 'block';
    video.load();
  } else {
    image.src = src;
    image.classList.remove('zoom');
    image.style.display = 'block';
  }

  modal.classList.add('active');
}

function closeAlbum(e) {
  if (e.target.id === 'albumModal' || e.target.classList.contains('album-close')) {
    document.getElementById('albumModal').classList.remove('active');
    document.getElementById('albumVideo').pause();
  }
}

function showUploadModal() {
  document.getElementById('uploadModal').classList.add('active');
}

function closeUploadModal(e) {
  if (e.target.id === 'uploadModal' || e.target.classList.contains('close') || e.target.classList.contains('upload-modal-close')) {
    document.getElementById('uploadModal').classList.remove('active');
    document.getElementById('uploadForm').reset();
    document.getElementById('uploadStatus').textContent = '';
  }
}


document.getElementById('albumImg')?.addEventListener('click', function() {
  this.classList.toggle('zoom');
});

// Toggle Menu
function toggleMenu() {
  document.querySelector('.nav-menu').classList.toggle('active');
}

// Hero Slideshow
let slideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function showSlides(n) {
  // Safety: kalau elemen slideshow/dots belum ada, jangan error
  if (!slides || slides.length === 0) return;

  slideIndex = (n + slides.length) % slides.length;
  slides.forEach(slide => slide.classList.remove('active'));

  if (dots && dots.length > 0) {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
  }

  if (slides[slideIndex]) slides[slideIndex].classList.add('active');
}


function plusSlides(n) {
  showSlides(slideIndex + n);
}

function currentSlide(n) {
  showSlides(n - 1);
}

// prevSlide/nextSlide tombol panah sudah dihapus dari index.html
// slideshow tetap jalan via auto-advance setInterval(nextSlide, 5000);
// jadi kita sediakan nextSlide dummy untuk kompatibilitas
function prevSlide() { plusSlides(-1); }

function nextSlide() { plusSlides(1); }


// Auto slideshow
// Pakai interval tetap tapi pastikan fungsi nextSlide benar-benar jalan
setInterval(() => {
  nextSlide();
}, 5000);


// Load More Toggle
document.addEventListener('DOMContentLoaded', () => {
  // Student load more - Single toggle: 10 OR all + effect
  const studentCards = document.querySelectorAll('#studentGrid .card');
  const loadMoreStudentBtn = document.getElementById('loadMoreStudent');
  let isShowingAll = false;

  function updateStudentDisplay() {
    const total = studentCards.length;
    const showCount = isShowingAll ? total : 10;
    
    // Elegant smooth transition - coordinated fade + slide
    studentCards.forEach((card, index) => {
      card.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      if (index < showCount) {
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.96)';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
          card.classList.add('active');
        }, 80 * Math.min(index, 15)); // Elegant stagger max 15 cards
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(-10px) scale(0.98)';
        setTimeout(() => {
          card.style.display = 'none';
          card.classList.remove('active', 'card-show');
        }, 300);
      }
    });

    loadMoreStudentBtn.style.transform = 'scale(0.95)';
    loadMoreStudentBtn.style.transition = 'all 0.3s ease';
    setTimeout(() => loadMoreStudentBtn.style.transform = 'scale(1)', 150);

    loadMoreStudentBtn.textContent = isShowingAll ? 'Show Less' : 'Load More';
  }

  loadMoreStudentBtn.addEventListener('click', () => {
    isShowingAll = !isShowingAll;
    updateStudentDisplay();
    if (!isShowingAll) {
      // Scroll ke atas ke bagian foto profile (grid top)
      setTimeout(() => {
        document.querySelector('#studentGrid').scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 500); // After animation complete
    }
  });

  // Initial: show 10
  updateStudentDisplay();
  loadMoreStudentBtn.textContent = 'Load More';

  // Album load more - Single toggle like student (10 OR all + elegant effect)
  const albumCards = document.querySelectorAll('#albumGrid .card:not(.add-placeholder)');
  const loadMoreAlbumBtn = document.getElementById('loadMoreAlbum');
  let isAlbumShowingAll = false;

  function updateAlbumDisplay() {
    const total = albumCards.length;
    const showCount = isAlbumShowingAll ? total : 10;
    
    // Elegant smooth transition - coordinated fade + slide
    albumCards.forEach((card, index) => {
      card.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      if (index < showCount) {
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.96)';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
          card.classList.add('active');
        }, 80 * Math.min(index, 15));
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(-10px) scale(0.98)';
        setTimeout(() => {
          card.style.display = 'none';
          card.classList.remove('active');
        }, 300);
      }
    });

    loadMoreAlbumBtn.style.transform = 'scale(0.95)';
    loadMoreAlbumBtn.style.transition = 'all 0.3s ease';
    setTimeout(() => loadMoreAlbumBtn.style.transform = 'scale(1)', 150);

    loadMoreAlbumBtn.textContent = isAlbumShowingAll ? 'Show Less' : 'Load More';
  }

  loadMoreAlbumBtn.addEventListener('click', () => {
    isAlbumShowingAll = !isAlbumShowingAll;
    updateAlbumDisplay();
    if (!isAlbumShowingAll) {
      setTimeout(() => {
        document.querySelector('#albumGrid').scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 500);
    }
  });

  // Initial: show 10
  updateAlbumDisplay();


  // Student modal data-*
  document.querySelectorAll('#studentGrid .card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const data = JSON.parse(card.dataset.modal);
      openModal(data[0], data[1], data[2], data[3], data[4], data[5]);
    });
  });

  // Server integration
  const SERVER_URL = 'http://localhost:3000';
  let serverImages = [];

async function loadServerImages() {
    try {
      const response = await fetch(`${SERVER_URL}/images`);
      serverImages = await response.json();
      renderDynamicAlbums(serverImages);
    } catch (error) {
      // Silent fail - no console spam, static works fine
      serverImages = [];
    }
  }

  function renderDynamicAlbums(images) {
    const albumGrid = document.getElementById('albumGrid');
    // Remove old dynamic cards
    document.querySelectorAll('[data-dynamic]').forEach(el => el.remove());
    // Add new
    images.forEach(img => {
      const card = document.createElement('div');
      card.className = 'card scroll';
      card.dataset.dynamic = true;
      card.innerHTML = `
        <img src="${SERVER_URL}/uploads/${img.filename}" onerror="this.src='foto1.jpg'" style="height: 320px; object-fit: cover;">
        <h4>${img.title}</h4>
      `;
      card.addEventListener('click', () => openAlbum(`${SERVER_URL}/uploads/${img.filename}`));
      albumGrid.appendChild(card);
    });
  }

  // Upload form
  document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const statusEl = document.getElementById('uploadStatus');
    
    statusEl.textContent = 'Mengunggah...';
    statusEl.style.color = '#deb887';

    try {
      const response = await fetch(`${SERVER_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      
      if (result.success) {
        statusEl.textContent = '✅ Upload berhasil!';
        statusEl.style.color = '#4CAF50';
        e.target.reset();
        setTimeout(loadServerImages, 1000);
      } else {
        statusEl.textContent = '❌ ' + (result.error || 'Upload gagal');
        statusEl.style.color = '#f44336';
      }
    } catch (error) {
      statusEl.textContent = '❌ Server tidak aktif. Jalankan: cd album-server && node server.js';
      statusEl.style.color = '#f44336';
    }
  });

  // Init
  loadServerImages();
  document.getElementById('modal').addEventListener('click', closeModal);
  document.getElementById('albumModal').addEventListener('click', closeAlbum);
  document.getElementById('uploadModal').addEventListener('click', closeUploadModal);
  document.querySelector('.add-placeholder').addEventListener('click', showUploadModal);
});


// Smooth scroll-triggered staggered animations
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const staggerDelay = index * 120; // Smooth 120ms stagger
        setTimeout(() => {
          entry.target.classList.add('active');
          entry.target.style.transitionDelay = `${staggerDelay}ms`;
        }, staggerDelay);
        observer.unobserve(entry.target); // One-time trigger
      }
    });
  }, observerOptions);

  // Observe all sections, cards, titles for staggered smooth reveal
  document.querySelectorAll('section, .section-title, .grid .card, .album-grid .card, #tentang p, .reveal, .scroll, .stagger').forEach(el => {
    observer.observe(el);
  });
});

// Navbar scroll hide when scrolling down, show when scrolling up
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const currentScroll = window.scrollY;
  const goingDown = currentScroll > (window.__lastScrollY ?? 0);

  // update stored value
  window.__lastScrollY = currentScroll;

  // don't hide at the very top
  if (currentScroll < 80) {
    navbar.classList.remove('hide');
    return;
  }

  if (goingDown) navbar.classList.add('hide');
  else navbar.classList.remove('hide');
});

// Typing effect
const texts = {
  title: document.getElementById('hero-title'),
  subtitle: document.getElementById('hero-subtitle'),
  quote: document.getElementById('hero-quote')
};

const phrases = {
  title: 'EXCELLENT CLASS',



  subtitle: 'Angkatan 2023',
  quote: 'Selalu Bersama dalam cerita, selamanya dalam kenangan'
};

let charIndex = { title: 0, subtitle: 0, quote: 0 };
let currentText = 'title';

function typeWriter() {
  const el = texts[currentText];
  const phrase = phrases[currentText];

  // Stabilkan layout: copy typing ke sebuah buffer (hindari innerHTML/format berubah)
  if (charIndex[currentText] < phrase.length) {
    el.textContent = phrase.slice(0, charIndex[currentText] + 1);
    charIndex[currentText]++;
    setTimeout(typeWriter, currentText === 'quote' ? 35 : 85);
    return;
  }

  setTimeout(() => {
    currentText = ['title', 'subtitle', 'quote'][(['title', 'subtitle', 'quote'].indexOf(currentText) + 1) % 3];
    charIndex[currentText] = 0;
    texts[currentText].textContent = '';
    typeWriter();
  }, 1500);
}

setTimeout(() => {
  // Typing effect starts instantly now - fallback text already shown
  typeWriter();
}, 100);

