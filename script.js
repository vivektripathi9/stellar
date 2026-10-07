/* Stellar Heights — page behaviour. Plain JS, no dependencies. */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* Nav: solid background after the hero, mobile menu toggle */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  function onScroll() {
    nav.classList.toggle('nav--solid', window.scrollY > 10);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('nav--open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('nav--open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* Amenities scroller arrows */
  var gallery = document.getElementById('gallery');
  if (gallery) {
    var step = function () {
      var first = gallery.querySelector('figure');
      return first ? first.getBoundingClientRect().width + 28 : 400;
    };
    document.getElementById('galPrev').addEventListener('click', function () { gallery.scrollBy({ left: -step(), behavior: 'smooth' }); });
    document.getElementById('galNext').addEventListener('click', function () { gallery.scrollBy({ left: step(), behavior: 'smooth' }); });
  }

  /* Floor plan tabs */
  var plans = [
    { name: 'Type A1 · Flat 01', desc: '3 BHK · Exclusive · East facing', img: 'assets/plan-2.jpg',
      link: 'https://surbhi-infotech.s3.ap-south-1.amazonaws.com/Jankal_Stellar/jankal_stellar_3bhk_flat-01_type-a1/index.html' },
    { name: 'Type B1 · Flat 10', desc: '3 BHK · Premium', img: 'assets/plan-1.jpg',
      link: 'https://surbhi-infotech.s3.ap-south-1.amazonaws.com/Jankal_Stellar/jankal_stellar_3bhk_flat-10_type-b1/index.html' },
    { name: 'Type C · Flat 14', desc: '3 BHK · Premium', img: 'assets/plan-3.jpg',
      link: 'https://surbhi-infotech.s3.ap-south-1.amazonaws.com/Jankal_Stellar/jankal_stellar_3bhk_flat-14_type-c/index.html' },
    { name: 'Type D · Flat 13', desc: '3 BHK · Exclusive corner home', img: 'assets/plan-4.jpg',
      link: 'https://surbhi-infotech.s3.ap-south-1.amazonaws.com/Jankal_Stellar/jankal_stellar_3bhk_flat-13_type-d/index.html' },
    { name: 'Type E · Flat 15', desc: '3 BHK · Exclusive corner home', img: 'assets/plan-5.jpg',
      link: 'https://surbhi-infotech.s3.ap-south-1.amazonaws.com/Jankal_Stellar/jankal_stellar_3bhk_flat-15_type-e/index.html' }
  ];
  var tabs = document.getElementById('planTabs');
  var planImg = document.getElementById('planImg');
  var planName = document.getElementById('planName');
  var planDesc = document.querySelector('.plans__desc');
  var planLink = document.getElementById('planLink');

  if (tabs) tabs.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-plan]');
    if (!btn) return;
    var p = plans[+btn.dataset.plan];
    tabs.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
    planImg.classList.add('is-fading');
    setTimeout(function () {
      planImg.src = p.img;
      planImg.alt = '3 BHK ' + p.name + ' floor plan';
      planName.textContent = p.name;
      planDesc.textContent = p.desc;
      planLink.href = p.link;
      planImg.onload = function () { planImg.classList.remove('is-fading'); };
    }, 200);
  });

  /* Enquiry popup — brochure details + form (opens from Enquire now) */
  var modalHtml =
    '<div class="enq-modal" id="enqModal" hidden>' +
      '<button type="button" class="enq-modal__backdrop" data-enq-close aria-label="Close enquiry form"></button>' +
      '<div class="enq-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="enqModalTitle">' +
        '<button type="button" class="enq-modal__close" data-enq-close aria-label="Close">&times;</button>' +
        '<aside class="enq-modal__info">' +
          '<p class="enq-modal__eyebrow">Jankal Stellar Heights</p>' +
          '<h2 class="h-serif" id="enqModalTitle">Building For <em>Eternity</em></h2>' +
          '<p class="enq-modal__lead">Exclusively 3 BHK on Sarjapura–Attibele Road, beside Indus International School. Spacious layouts from 1655 to 1990 sq ft.</p>' +
          '<ul class="enq-modal__facts">' +
            '<li><strong>3 BHK</strong><span>1655 – 1990 sq ft</span></li>' +
            '<li><strong>2 acres</strong><span>total land area</span></li>' +
            '<li><strong>G + 10</strong><span>floors</span></li>' +
            '<li><strong>70%</strong><span>open space</span></li>' +
            '<li><strong>100%</strong><span>Vastu compliant</span></li>' +
            '<li><strong>Bali clubhouse</strong><span>banquet &amp; bar</span></li>' +
          '</ul>' +
          '<div class="enq-modal__meta">' +
            '<a href="tel:+919594959014">+91 95949 59014</a>' +
            '<a href="https://www.jankalstellarheights.in" target="_blank" rel="noopener">www.jankalstellarheights.in</a>' +
            '<p class="enq-modal__rera">RERA PRM/KA/RERA/1251/308/PR/220126/008422</p>' +
          '</div>' +
        '</aside>' +
        '<div class="enq-modal__form-wrap">' +
          '<h3>Enquire Now</h3>' +
          '<p>Share your details and we\'ll call you back within one working day.</p>' +
          '<form class="form enq-modal__form" id="enqPopupForm" novalidate>' +
            '<div class="form__row">' +
              '<label>Your name<input type="text" name="name" required autocomplete="name"></label>' +
              '<label>Phone<input type="tel" name="phone" required autocomplete="tel"></label>' +
            '</div>' +
            '<label>Email<input type="email" name="email" autocomplete="email"></label>' +
            '<label>Anything we should know?<textarea name="message" rows="2" placeholder="Preferred visit time, flat type…"></textarea></label>' +
            '<button type="submit" class="btn btn--gold">Submit enquiry</button>' +
            '<p class="form__note">Sy No.s 236 &amp; 237, S. Medahalli Village, Sarjapur Hobli, Bengaluru 562125</p>' +
          '</form>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  var enqModal = document.getElementById('enqModal');
  var enqDialog = enqModal.querySelector('.enq-modal__dialog');
  var lastFocus = null;

  function openEnquiry(e) {
    if (e) e.preventDefault();
    if (nav && nav.classList.contains('nav--open')) {
      nav.classList.remove('nav--open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
    lastFocus = document.activeElement;
    enqModal.hidden = false;
    requestAnimationFrame(function () { enqModal.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    var first = enqModal.querySelector('input[name="name"]');
    if (first) setTimeout(function () { first.focus(); }, 50);
  }

  function closeEnquiry() {
    enqModal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () { enqModal.hidden = true; }, 300);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelectorAll('a.nav__cta, a[href="#enquire"], a[href$="#enquire"]').forEach(function (link) {
    link.addEventListener('click', openEnquiry);
  });

  enqModal.querySelectorAll('[data-enq-close]').forEach(function (el) {
    el.addEventListener('click', closeEnquiry);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && enqModal.classList.contains('is-open')) closeEnquiry();
  });

  enqDialog.addEventListener('click', function (e) { e.stopPropagation(); });

  window.openEnquiry = openEnquiry;

  /* Show enquiry popup on every page load / refresh */
  setTimeout(function () { openEnquiry(); }, 600);

  /* Enquiry forms (popup + footer + contact) — client-side check, then hand off (swap the fetch for your endpoint) */
  document.querySelectorAll('form.form').forEach(function (form) {
    var note = form.querySelector('.form__note');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      if (!name || !phone) {
        note.textContent = 'Please add your name and a phone number so we can call you back.';
        note.className = 'form__note is-error';
        return;
      }
      /* Example: send to your backend / CRM
         fetch('/api/enquiry', { method: 'POST', headers: {'Content-Type':'application/json'},
                body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      */
      note.textContent = 'Thank you, ' + name.split(' ')[0] + '. We\'ll call ' + phone + ' within one working day.';
      note.className = 'form__note is-success';
      form.reset();
    });
  });

  /* Smooth scroll reveals for each section */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function markReveal(el, extra) {
    if (!el) return;
    el.classList.add('reveal');
    if (extra) el.classList.add(extra);
  }

  /* Section shells */
  [
    '.overview .wrap',
    '.intro .wrap',
    '.homefeat .wrap',
    '.specs .wrap',
    '.plans .wrap',
    '.location .wrap',
    '.amenities--lead .wrap',
    '.amenities--gallery .wrap',
    '.additions .wrap',
    '.life .wrap',
    '.about .wrap',
    '.stats .wrap',
    '.vm .wrap',
    '.contact .wrap',
    '.blog .wrap',
    '.article .wrap',
    '.pagehero .wrap',
    '.footer__grid'
  ].forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) { markReveal(el); });
  });

  /* Directional pieces */
  document.querySelectorAll('.intro__text, .homefeat__list, .life__text, .about__text, .vm__text').forEach(function (el) {
    markReveal(el, 'reveal--left');
  });
  document.querySelectorAll('.intro__figure, .homefeat__figure, .about__figure, .vm__media, .master__figure').forEach(function (el) {
    markReveal(el, 'reveal--right');
  });
  document.querySelectorAll('.life__pair, .life__row, .life__stage, .master__legend, .location__map').forEach(function (el) {
    markReveal(el, 'reveal--scale');
  });

  /* Section heads */
  document.querySelectorAll('.section-head, .intro__text').forEach(function (el) {
    el.classList.add('reveal');
  });

  /* Staggered grids / lists */
  [
    '.overview__list',
    '.amenities__overview',
    '.additions__grid',
    '.features',
    '.strips',
    '.future ul',
    '.stats__list',
    '.blog__grid',
    '.life__pair',
    '.scroller'
  ].forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add('reveal', 'reveal-stagger');
    });
  });

  var targets = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    targets.forEach(function (t) { t.classList.add('is-in'); });
  } else if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('is-in'); });
  }
})();
