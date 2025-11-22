const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.review');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const expandBtns = document.querySelectorAll('.faqExpandButton');
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');

let index = 0;
const visibleSlides = 1;
const slideWidth = slides[0].offsetWidth + 40;

function updateSlider() {
  slider.style.transform = `translateX(${-index * slideWidth}px)`;

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index >= slides.length - visibleSlides;
}

nextBtn.addEventListener('click', () => {
  if (index < slides.length - visibleSlides) {
    index++;
    updateSlider();
  }
});

prevBtn.addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateSlider();
  }
});

window.addEventListener('resize', () => {
  const w = slides[0].offsetWidth + 40;
  slider.style.transform = `translateX(${-index * w}px)`;
});

expandBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const faqItem = btn.closest('.faqItem');
    const descr = faqItem.querySelector('.faqItemdescr');
    const icon = faqItem.querySelector('.faqExpandButton');
    if (icon) {
      icon.classList.add('fading');
      setTimeout(() => {
        if (icon.src.includes('faqPlus.svg')) {
          icon.src = './img/faqCross.svg';
        } else {
          icon.src = './img/faqPlus.svg';
        }
        icon.classList.remove('fading');
      }, 300);
    }
    descr.classList.toggle('faqItemdescr--closed');
  });
});

updateSlider();

emailInput.addEventListener('invalid', (e) => {
  e.preventDefault();
  if (emailInput.value === '') {
    emailInput.setCustomValidation('Email is required');
  } else if (emailInput.validity.typeMismatch) {
    emailInput.setCustomValidation('Please enter a valid email address');
  } else {
    emailInput.setCustomValidation('');
  }
});

function clearCustomValidation(event) {
  event.target.setCustomVValidation('');
}
