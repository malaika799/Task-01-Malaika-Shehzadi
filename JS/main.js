/* ============================================
   DECODELABS PROJECT 1 — MAIN JS
   Malaika Shehzadi | 2026
   ============================================ */

'use strict';

// ─── Navbar Scroll Effect ──────────────────────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ─── Mobile Menu Toggle ────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.querySelector('.nav-menu');
const overlay   = document.querySelector('.nav-overlay');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ─── Active Nav Link ───────────────────────────────────────────
(function setActiveNav() {
  const links = document.querySelectorAll('.nav-link');
  const path  = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ─── Scroll Reveal ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Don't unobserve — keep class
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ─── Progress Bars Animation ───────────────────────────────────
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.progress-fill');
      fills.forEach(fill => {
        const target = fill.getAttribute('data-width');
        if (target) {
          setTimeout(() => {
            fill.style.width = target + '%';
          }, 200);
        }
      });
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.hero-progress-wrap, .skills-detail-grid').forEach(el => {
  progressObserver.observe(el);
});

// ─── Project Filter ────────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-cat]');

if (filterBtns.length && projectCards.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-cat') === cat) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeUp 0.4s ease both';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ─── Contact Form ──────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn     = contactForm.querySelector('button[type="submit"]');
    const success = document.querySelector('.form-success');

    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate async send
    setTimeout(() => {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#16a34a';
      if (success) success.classList.add('show');
      contactForm.reset();

      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
        if (success) success.classList.remove('show');
      }, 4000);
    }, 1200);
  });
}

// ─── Smooth Scroll for anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Typing Effect (Hero) ──────────────────────────────────────
const typingEl = document.querySelector('.typing-effect');
if (typingEl) {
  const words = ['Full Stack Developer', 'UI/UX Enthusiast', 'IT Student @ VUP', 'Problem Solver'];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const current = words[wordIdx];
    typingEl.textContent = isDeleting
      ? current.slice(0, charIdx--)
      : current.slice(0, charIdx++);

    let delay = isDeleting ? 60 : 110;

    if (!isDeleting && charIdx > current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx < 0) {
      isDeleting = false;
      charIdx = 0;
      wordIdx = (wordIdx + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }
  type();
}

// ─── Counter Animate ───────────────────────────────────────────
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.count-up');
      counters.forEach(el => {
        const end   = +el.getAttribute('data-count');
        const dur   = 1400;
        const step  = Math.ceil(end / (dur / 16));
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= end) {
            el.textContent = end + (el.getAttribute('data-suffix') || '');
            clearInterval(timer);
          } else {
            el.textContent = current + (el.getAttribute('data-suffix') || '');
          }
        }, 16);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats, .stats-bar').forEach(el => {
  counterObserver.observe(el);
});

// ─── Tooltip ───────────────────────────────────────────────────
document.querySelectorAll('[data-tooltip]').forEach(el => {
  el.style.position = 'relative';
  el.addEventListener('mouseenter', () => {
    const tip = document.createElement('div');
    tip.className = 'tooltip-pop';
    tip.textContent = el.getAttribute('data-tooltip');
    Object.assign(tip.style, {
      position: 'absolute',
      bottom: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--charcoal)',
      color: '#fff',
      padding: '0.35rem 0.8rem',
      borderRadius: '6px',
      fontSize: '0.78rem',
      whiteSpace: 'nowrap',
      zIndex: '999',
      pointerEvents: 'none',
      animation: 'fadeIn 0.2s ease',
    });
    el.appendChild(tip);
  });
  el.addEventListener('mouseleave', () => {
    const tip = el.querySelector('.tooltip-pop');
    if (tip) tip.remove();
  });
});

console.log('%c⚡ DecodeLabs Project 1 — Malaika Shehzadi', 
  'color:#A5856E;font-size:14px;font-weight:bold;');
console.log('%cBatch 2026 | Full Stack Development', 
  'color:#A0D4E0;font-size:12px;');
