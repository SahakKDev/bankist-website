'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const header = document.querySelector('.header');
const message = document.createElement('div');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const allSections = document.querySelectorAll('.section');

// Modal window
const openModal = e => {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
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
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  const id = e.target.getAttribute('href');
  if (e.target.classList.contains('nav__link') && !id.endsWith('#')) {
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// Tabbed component
tabsContainer.addEventListener('click', e => {
  const tab = e.target.closest('.operations__tab');

  if (!tab) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(tc => {
    tc.classList.remove('operations__content--active');
  });

  tab.classList.add('operations__tab--active');
  const id = tab.dataset.tab;
  document
    .querySelector(`.operations__content--${id}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const onNavMouseEvent = e => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', onNavMouseEvent.bind(0.5));
nav.addEventListener('mouseout', onNavMouseEvent.bind(1));

// Sticky navigation
const stickyNav = entries => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections
const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const loadImg = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', e => {
    e.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '100px',
});
const imgTargets = document.querySelectorAll('img[data-src]');
imgTargets.forEach(img => imgObserver.observe(img));

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

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
