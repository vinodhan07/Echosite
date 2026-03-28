// ============================================================
//  ECHO SITE – Main JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Splash Screen ─────────────────────────────────────────
  const splash = document.getElementById('splash');
  if (splash) {
    // Hide splash after loading animation completes (~2s)
    setTimeout(() => {
      splash.classList.add('hidden');
      // Remove from DOM after transition
      setTimeout(() => splash.remove(), 700);
    }, 2200);
  }

  // ── Sticky Nav ───────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ── Mobile Menu ──────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Scroll Reveal ─────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement
          ? [...entry.target.parentElement.querySelectorAll('.reveal')]
          : [];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // ── Portfolio Filter ──────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portCards = document.querySelectorAll('.port-full-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ── Contact Form Validation ───────────────────────────────
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      if (!name.value.trim()) {
        document.getElementById('nameError').textContent = 'Please enter your name.';
        name.style.borderColor = '#ef4444';
        valid = false;
      } else { name.style.borderColor = ''; }

      if (!email.value.trim() || !isValidEmail(email.value)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        email.style.borderColor = '#ef4444';
        valid = false;
      } else { email.style.borderColor = ''; }

      if (!message.value.trim() || message.value.trim().length < 10) {
        document.getElementById('messageError').textContent = 'Please describe your project (at least 10 characters).';
        message.style.borderColor = '#ef4444';
        valid = false;
      } else { message.style.borderColor = ''; }

      if (valid) {
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending…</span>';

        setTimeout(() => {
          contactForm.style.display = 'none';
          formSuccess.classList.add('show');
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1200);
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ── Smooth Anchor Scrolling ───────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Hero counter animation ────────────────────────────────
  const statsEl = document.querySelectorAll('.stat strong');
  let statsAnimated = false;
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statsEl.forEach(el => {
        const final = el.textContent;
        const num = parseInt(final);
        if (!isNaN(num)) {
          animateCount(el, 0, num, final.replace(String(num), ''), 1200);
        }
      });
    }
  });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  function animateCount(el, start, end, suffix, duration) {
    const startTime = performance.now();
    const update = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * (end - start) + start) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  // ── Cursor glow effect ────────────────────────────────────
  const body = document.body;
  body.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    body.style.setProperty('--cursor-x', x + '%');
    body.style.setProperty('--cursor-y', y + '%');
  });

  // ── Nav active state on scroll ────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${id}`) a.classList.add('active');
          });
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(s => navObserver.observe(s));
  }

});

// ── Add CSS keyframe for filter animation ──────────────────
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
