const slider = document.querySelector('#slider');
const slidesItems = Array.from(slider.children);
const btnNext = document.querySelector('#btnNext');
const btnPrev = document.querySelector('#btnPrev');
const btnPause = document.querySelector('#btnPause');

const autoplayDelay = 3000;
let isPaused = false;
let autoplayId = null;

function startAutoplay() {
  stopAutoplay();
  if (isPaused) return;
  autoplayId = setInterval(() => {
    btnNext.click();
  }, autoplayDelay);
}

function stopAutoplay() {
  if (autoplayId !== null) {
    clearInterval(autoplayId);
    autoplayId = null;
  }
}

slidesItems.forEach((slide, index) => {
  if (index !== 0) slide.classList.add('hidden');

  slide.dataset.index = index;
  slidesItems[0].setAttribute('data-active', '');

  slide.addEventListener('click', function () {
    slide.classList.add('hidden');
    slide.removeAttribute('data-active');

    const nextSlideIndex = index + 1 === slidesItems.length ? 0 : index + 1;

    const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);
    nextSlide.classList.remove('hidden');
    nextSlide.setAttribute('data-active', '');

    startAutoplay();
  });
});

btnNext.onclick = function () {
  const currentSlide = slider.querySelector('[data-active]');
  const currentSlideIndex = +currentSlide.dataset.index;
  currentSlide.classList.add('hidden');
  currentSlide.removeAttribute('data-active');
  const nextSlideIndex = currentSlideIndex + 1 === slidesItems.length ? 0 : currentSlideIndex + 1;
  const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);
  nextSlide.classList.remove('hidden');
  nextSlide.setAttribute('data-active', '');

  startAutoplay();
};

btnPrev.onclick = function () {
  const currentSlide = slider.querySelector('[data-active]');
  const currentSlideIndex = +currentSlide.dataset.index;
  currentSlide.classList.add('hidden');
  currentSlide.removeAttribute('data-active');
  const prevSlideIndex = currentSlideIndex === 0 ? slidesItems.length - 1 : currentSlideIndex - 1;
  const prevSlide = slider.querySelector(`[data-index="${prevSlideIndex}"]`);
  prevSlide.classList.remove('hidden');
  prevSlide.setAttribute('data-active', '');

  startAutoplay();
};

btnPause.onclick = function () {
  isPaused = !isPaused;
  if (isPaused) {
    stopAutoplay();
    btnPause.textContent = 'Продолжить';
  } else {
    btnPause.textContent = 'Пауза';
    startAutoplay();
  }
};

let startX = 0;
let startY = 0;
let isSwiping = false;
let didSwipe = false;
const swipeThreshold = 50;

slider.addEventListener('pointerdown', (e) => {
  startX = e.clientX;
  startY = e.clientY;
  isSwiping = true;
  didSwipe = false;
});

slider.addEventListener('pointerup', (e) => {
  if (!isSwiping) return;
  isSwiping = false;

  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;

  if (Math.abs(deltaX) > swipeThreshold && Math.abs(deltaX) > Math.abs(deltaY)) {
    didSwipe = true;
    if (deltaX < 0) {
      btnNext.click();
    } else {
      btnPrev.click();
    }
  }
});

slider.addEventListener('pointercancel', () => {
  isSwiping = false;
  didSwipe = false;
});

slider.addEventListener(
  'click',
  (e) => {
    if (didSwipe) {
      e.stopImmediatePropagation();
      didSwipe = false;
    }
  },
  true
);
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    btnPrev.click();
  } else if (e.key === 'ArrowRight') {
    btnNext.click();
  }
});
startAutoplay();