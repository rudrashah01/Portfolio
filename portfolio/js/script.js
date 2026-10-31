document.addEventListener('DOMContentLoaded', function () {

  /* Mobile navigation toggle */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    primaryNav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* Scroll-spy: highlight the nav link of the section in view */
  var sections = document.querySelectorAll('.section');
  var navLinks = document.querySelectorAll('.nav-link');
  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var on = link.dataset.section === id;
      link.classList.toggle('active', on);
      if (on) { link.setAttribute('aria-current', 'true'); } else { link.removeAttribute('aria-current'); }
    });
  }
  if ('IntersectionObserver' in window && sections.length) {
    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) setActiveLink(entry.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (section) { spyObserver.observe(section); });
  }

  /* Timeline reveal on scroll (About page) */
  var timelineItems = document.querySelectorAll('.timeline-item');
  if ('IntersectionObserver' in window && timelineItems.length) {
    var timelineObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    timelineItems.forEach(function (item, index) {
      item.style.transitionDelay = (index * 0.1) + 's';
      timelineObserver.observe(item);
    });
  } else {
    timelineItems.forEach(function (item) { item.classList.add('in-view'); });
  }

  /* Certificate modal (Certifications page) */
  var certData = {
    aws: { src: 'assets/certificates/aws-certificate.png', alt: 'AWS Cloud Practitioner Essentials certificate awarded to Rudra Shah', title: 'AWS Cloud Practitioner Essentials — AWS Training & Certification' },
    ibm: { src: 'assets/certificates/ibm-generative-ai.png', alt: 'Generative AI: Prompt Engineering Basics certificate awarded to Rudra Shah', title: 'Generative AI: Prompt Engineering Basics — IBM, via Coursera' },
    swe: { src: 'assets/certificates/software-engineering.png', alt: 'Software Engineering Essentials digital badge', title: 'Software Engineering Essentials — IBM Developer Skills Network / Coursera' }
  };

  var modal = document.getElementById('certModal');
  if (!modal) return;
  var modalImg = document.getElementById('certModalImg');
  var modalTitle = document.getElementById('certModalTitle');
  var lastFocused = null;

  function openModal(key) {
    var data = certData[key];
    if (!data) return;
    lastFocused = document.activeElement;
    modalImg.src = data.src;
    modalImg.alt = data.alt;
    modalTitle.textContent = data.title;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.cert-modal-close').focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalImg.removeAttribute('src');
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('[data-cert]').forEach(function (t) {
    t.addEventListener('click', function () { openModal(t.dataset.cert); });
  });
  modal.querySelectorAll('[data-close]').forEach(function (c) { c.addEventListener('click', closeModal); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
});
