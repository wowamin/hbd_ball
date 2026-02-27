/**
 * Project: hbd_ball
 * Author: wowamin
 * URL: https://wowamin.github.io/hbd_ball/
 * Copyright (c) 2024 wowamin.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

const cards = Array.from(document.querySelectorAll('.card img'));
const lightbox = document.getElementById('lightbox');
const carousel = document.getElementById('carouselExampleIndicators');
let currentIndex = 0;

// 動態生成 carousel slides
function updateCarouselSlides() {
  const carouselInner = carousel.querySelector('.carousel-inner');
  const carouselIndicators = carousel.querySelector('.carousel-indicators');
  carouselInner.innerHTML = '';
  carouselIndicators.innerHTML = '';
  cards.forEach((img, idx) => {
    // slide
    const item = document.createElement('div');
    item.className = 'carousel-item' + (idx === currentIndex ? ' active' : '');
    const slideImg = document.createElement('img');
    slideImg.src = img.dataset.full || img.src;
    slideImg.className = 'd-block w-100';
    slideImg.alt = img.alt || '';
    item.appendChild(slideImg);
    carouselInner.appendChild(item);
    // indicator
    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
    indicator.setAttribute('data-bs-slide-to', idx);
    indicator.className = idx === currentIndex ? 'active' : '';
    indicator.setAttribute('aria-label', `Slide ${idx + 1}`);
    if (idx === currentIndex) indicator.setAttribute('aria-current', 'true');
    carouselIndicators.appendChild(indicator);
  });
}

function openLightbox(index) {
  currentIndex = index;
  updateCarouselSlides();
  lightbox.style.display = 'block';
  lightbox.classList.add('active');
  // Bootstrap carousel API: 跳到指定 slide
  const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carousel);
  bsCarousel.to(index);
}

function closeLightbox() {
  lightbox.style.display = 'none';
  lightbox.classList.remove('active');
}


cards.forEach((img, index) => {
  img.addEventListener('click', () => openLightbox(index));
});

// 關閉按鈕事件
const closeBtn = document.querySelector('.lightbox-close');
if (closeBtn) {
  closeBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    closeLightbox();
  });
}

// 點擊遮罩關閉
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// 鍵盤切換
document.addEventListener('keydown', event => {
  if (lightbox.style.display !== 'block') return;
  const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carousel);
  if (event.key === 'ArrowLeft') bsCarousel.prev();
  if (event.key === 'ArrowRight') bsCarousel.next();
  if (event.key === 'Escape') closeLightbox();
});

// 手機滑動支援
let startX = 0;
carousel.addEventListener('touchstart', e => {
  if (window.innerWidth > 900) return;
  startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', e => {
  if (window.innerWidth > 900) return;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;
  const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carousel);
  if (Math.abs(diff) > 50) {
    if (diff < 0) bsCarousel.next();
    else bsCarousel.prev();
  }
});

// 禁止自動輪播
carousel.removeAttribute('data-bs-ride');
const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carousel, { interval: false, ride: false });