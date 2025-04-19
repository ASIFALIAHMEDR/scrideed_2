
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.toggle-theme');
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
  });

  // Fade-in on scroll animation
  const faders = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  faders.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // Light/Dark Mode Toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      document.body.classList.toggle('dark-mode');
      themeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
    });
  }

  // Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
      }
  });

  // Close menu when clicking a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
      link.addEventListener('click', () => {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
      });
  });
});
