/* eslint-disable import/extensions */

import ImageLoader from './lazy-loader.js';

const anchor = () => window.location.hash || undefined;
const lazyImage = new ImageLoader();

/* -------------------------------------------------------------------------- */

function setAnchor() {
  if (anchor() === undefined) window.location.href = '#home';
}
window.addEventListener('hashchange', setAnchor);
setAnchor();

/* -------------------------------------------------------------------------- */

function loadHeaderBackground() {
  const image = new Image();
  const header = document.querySelector('header');

  function callback() {
    header.style.backgroundImage = `url(${header.dataset.backgroundImage})`;
  }

  lazyImage.load(image, header.dataset.backgroundImage, callback);
}
loadHeaderBackground();

/* -------------------------------------------------------------------------- */

const menuItems = Array.from(document.querySelectorAll('header .menu a'));

function highlightMenuItem() {
  const currentAnchor = anchor();
  const menuItem = menuItems.filter((mI) => mI.href === currentAnchor)[0];

  menuItems.forEach((mI) => mI.classList.remove('active'));
  if (menuItem !== undefined) menuItem.classList.add('active');
}
window.addEventListener('hashchange', highlightMenuItem);
highlightMenuItem();

/* -------------------------------------------------------------------------- */

function loadActivitiesImages() {
  const currentAnchor = anchor();
  const modalTarget = (currentAnchor || '').match(/^#activities-zoom-.*$/);

  //* thumbnails **/
  if (currentAnchor === '#activities') {
    const imagesSelector = 'li.activities-gallery-item img';
    const images = Array.from(document.querySelectorAll(imagesSelector));

    images.forEach((image) => lazyImage.load(image));
  }

  //* zoomed *//
  if (modalTarget !== null) {
    const image = document.querySelector(`div${modalTarget} img`);

    lazyImage.load(image);
  }
}
window.addEventListener('hashchange', loadActivitiesImages);
loadActivitiesImages();

/* -------------------------------------------------------------------------- */

function closeModal() {
  const currentAnchor = (anchor() || '').match(/^#activities-zoom-.*$/);

  function execute(event) {
    if (event.key === 'Escape') {
      window.location.href = '#activities';
      document.removeEventListener('keydown', execute);
    }
  }

  if (currentAnchor !== null) document.addEventListener('keydown', execute);
}
window.addEventListener('hashchange', closeModal);
closeModal();

/* -------------------------------------------------------------------------- */

(() => {
  // GoogleAnalytics
  const dlPush = (args) => window.dataLayer.push(args);

  window.dataLayer = window.dataLayer || [];
  dlPush({ js: new Date() });
  dlPush({ config: 'UA-143821088-1' });
})();
