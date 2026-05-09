/* ═══════════════════════════════════════════════════════════
   8:18 ROOFING LLC — Main JavaScript
   GSAP + ScrollTrigger animations, nav, form validation
═══════════════════════════════════════════════════════════ */

'use strict';

/* ── NAV ──────────────────────────────────────────────────── */
(function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  let menuOpen = false;

  // Scroll: make nav opaque
  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  toggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    menu.classList.toggle('is-open', menuOpen);
    toggle.setAttribute('aria-expanded', String(menuOpen));
    toggle.setAttribute('aria-label', menuOpen ? 'Close menu' : 'Open menu');
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  });

  // Close on link click
  menu.querySelectorAll('.nav__link, .nav__cta').forEach(link => {
    link.addEventListener('click', () => {
      if (menuOpen) toggle.click();
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuOpen) toggle.click();
  });
})();

/* ── FOOTER YEAR ──────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── GSAP SCROLL ANIMATIONS ───────────────────────────────── */
(function initAnimations() {
  // Bail out if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // Fallback: show everything if GSAP fails to load
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Reveal elements on scroll
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        delay: (i % 4) * 0.08, // Subtle stagger for sibling elements
      }
    );
  });

  // Hero heading — cinematic entrance
  const heroHeading = document.querySelector('.hero__heading');
  if (heroHeading) {
    gsap.fromTo(heroHeading,
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 1, ease: 'power4.out', delay: 0.3 }
    );
  }

  // Insurance stats — count-up feel via stagger
  gsap.utils.toArray('.insurance__stat').forEach((stat, i) => {
    gsap.fromTo(stat,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
        },
        delay: i * 0.12,
      }
    );
  });

  // Insurance steps — sequential reveal
  gsap.utils.toArray('.insurance__step').forEach((step, i) => {
    gsap.fromTo(step,
      { opacity: 0, x: -24 },
      {
        opacity: 1,
        x: 0,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 88%',
        },
        delay: i * 0.1,
      }
    );
  });

  // Subtle parallax on hero background
  const heroBg = document.querySelector('.hero__bg-img');
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Service cards — cascade
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
        },
        delay: i * 0.1,
      }
    );
  });

  // Value items — cascade
  gsap.utils.toArray('.value-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
        },
        delay: i * 0.07,
      }
    );
  });

})();

/* ── FORM VALIDATION & SUBMIT ─────────────────────────────── */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');

  const rules = {
    firstName: { required: true, label: 'First name' },
    lastName:  { required: true, label: 'Last name' },
    phone:     { required: true, label: 'Phone', pattern: /[\d\s\-\(\)\+]{7,}/, patternMsg: 'Enter a valid phone number' },
    email:     { required: false, label: 'Email', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, patternMsg: 'Enter a valid email address' },
    address:   { required: true, label: 'Property address' },
    service:   { required: true, label: 'Service selection' },
  };

  const getError = id => document.getElementById(`${id}Error`);
  const getField = id => document.getElementById(id);

  function validateField(id) {
    const rule = rules[id];
    if (!rule) return true;
    const field = getField(id);
    const errorEl = getError(id);
    const value = field.value.trim();

    if (rule.required && !value) {
      showError(field, errorEl, `${rule.label} is required.`);
      return false;
    }
    if (value && rule.pattern && !rule.pattern.test(value)) {
      showError(field, errorEl, rule.patternMsg);
      return false;
    }
    clearError(field, errorEl);
    return true;
  }

  function showError(field, errorEl, msg) {
    field.classList.add('is-error');
    if (errorEl) errorEl.textContent = msg;
  }

  function clearError(field, errorEl) {
    field.classList.remove('is-error');
    if (errorEl) errorEl.textContent = '';
  }

  // Validate on blur
  Object.keys(rules).forEach(id => {
    const field = getField(id);
    if (field) {
      field.addEventListener('blur', () => validateField(id));
      field.addEventListener('input', () => {
        if (field.classList.contains('is-error')) validateField(id);
      });
    }
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Validate all fields
    const valid = Object.keys(rules).map(id => validateField(id)).every(Boolean);
    if (!valid) {
      // Focus first error
      const firstError = form.querySelector('.is-error');
      if (firstError) firstError.focus();
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn__text').hidden = true;
    submitBtn.querySelector('.btn__loading').hidden = false;

    // Simulate submission (replace with actual endpoint)
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Show success
    form.reset();
    form.style.display = 'none';
    successMsg.hidden = false;
    successMsg.focus();

    // Reset button state
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn__text').hidden = false;
    submitBtn.querySelector('.btn__loading').hidden = true;
  });
})();

/* ── SMOOTH ANCHOR SCROLLING ──────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navHeight = document.getElementById('nav').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
