/* =========================================================
   Theme toggle — system preference -> localStorage override
   ========================================================= */
const html   = document.documentElement;
const toggle = document.getElementById('themeToggle');

function getPreferred() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.removeAttribute('data-theme');
  }
}

// Init
applyTheme(getPreferred());

toggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next    = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// Respect system changes when no manual override
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

/* =========================================================
   Subtle scroll-triggered fade-in for sections
   ========================================================= */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.project-card, .timeline-card, .skill-group').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

/* =========================================================
   Active nav link highlighting on scroll
   ========================================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => navObserver.observe(s));
