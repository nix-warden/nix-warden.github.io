/**
 * NixWarden — Security Platform Architect Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.getElementById('navbar');
  const toast = document.getElementById('toast');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const contactEmail = document.getElementById('contactEmail');

  const syncThemeToggle = (isDark) => {
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');

    const label = themeToggle.querySelector('.theme-toggle-label');
    if (label) {
      label.textContent = isDark ? 'Light' : 'Dark';
    }
  };

  syncThemeToggle(document.documentElement.dataset.theme === 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextIsDark = document.documentElement.dataset.theme !== 'dark';
      if (nextIsDark) {
        document.documentElement.dataset.theme = 'dark';
      } else {
        delete document.documentElement.dataset.theme;
      }
      try {
        localStorage.setItem('nw-theme', nextIsDark ? 'dark' : 'light');
      } catch {
        // Ignore storage restrictions
      }
      syncThemeToggle(nextIsDark);
    });
  }

  if (mobileToggle && navLinks) {
    const syncMenuIcon = (isOpen) => {
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileToggle.classList.toggle('is-open', isOpen);
    };

    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      syncMenuIcon(isOpen);
    });

    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        syncMenuIcon(false);
      });
    });
  }

  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  if (copyEmailBtn && contactEmail) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = contactEmail.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email address copied to clipboard.');
      } catch {
        showToast('Unable to copy automatically.');
      }
    });
  }

  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});
