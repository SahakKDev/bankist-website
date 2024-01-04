'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Modal window
const openModal = function (event) {
  event.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

// Page navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  const id = e.target.getAttribute('href');
  if (e.target.classList.contains('nav__link') && !id.endsWith('#')) {
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `
  We use cookies for improved functionality and analytics.
  <button class='btn btn--close-cookie'>Got it!</button>
`;

header.prepend(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

message.style.backgroundColor = '#37383d';

message.style.height = parseFloat(getComputedStyle(message).height) + 30 + 'px';
