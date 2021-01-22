'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const index = new Index();
});

class Index {
  constructor() {
    this.navbar = document.querySelector('.navbar'); 
    this.menuButton = document.querySelector('.js-menu-button'); 
    this.options = {
      slidesPerView: 'auto',
      spaceBetween: 30,
      centeredSlides: true,
      // loop: true,
      loopedSlides: 2,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    }
    this._init();
  }
  _init() {
    this._addEvent();
    this._scrollInit();
    this._initHoverEffect();
    this._initSwiper();
  }

  _initSwiper() {
    new Swiper('.swiper-container.coach', this.options);
    new Swiper('.swiper-container.sns', this.options);
    new Swiper('.swiper-container.others', this.options);
  }

  _initHoverEffect() {
  }

  _inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add('inview');
    } else {
      el.classList.remove('inview');
    }
  }
  _navAnimation(el, inview) {
    if (inview) {
      this.navbar.classList.remove('triggered');
      this.navbar.classList.remove('open');
    } else {
      this.navbar.classList.add('triggered');
    }
  }
  _scrollInit() {
    this.observers = new ScrollObserver('.js-nav-trigger', this._navAnimation.bind(this), { once: false });
    this.observers = new ScrollObserver('section', this._inviewAnimation, { once: true });
  }

  _openMenu() {
    this.navbar.classList.toggle('open');
  }
  _addEvent() {
    this.menuButton.addEventListener('click', this._openMenu.bind(this));
  }
}