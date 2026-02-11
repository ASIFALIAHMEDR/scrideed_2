// ===== LOADER FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader when page is loaded
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        
        // Add fade-out class
        loader.classList.add('fade-out');
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    });

    // Show loader when navigating to new pages
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Only show loader for internal links
            if (link.origin === window.location.origin) {
                const loader = document.getElementById('loader');
                loader.classList.remove('fade-out');
                loader.style.display = 'flex';
            }
        });
    });
});

// ===== MOBILE MENU TOGGLE =====
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

// ===== MANUAL LOADER FUNCTIONS =====
function showLoader() {
    const loader = document.getElementById('loader');
    loader.classList.remove('fade-out');
    loader.style.display = 'flex';
}

function hideLoader() {
    const loader = document.getElementById('loader');
    loader.classList.add('fade-out');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
}

// ===== HERO PARALLAX & ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
    // Parallax Effect for Hero Section
    const hero = document.getElementById('hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // Scroll-Triggered Reveal Animations
    const revealElements = document.querySelectorAll('#timeline .timeline-item, #judges .judge-card, #panelists .panelist-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Animated Counter for Hero Stats
    const statsElements = document.querySelectorAll('.hero-stats h3');
    statsElements.forEach(stat => {
        const target = parseInt(stat.textContent);
        if (isNaN(target)) return;
        
        let current = 0;

        const updateCounter = () => {
            const increment = target / 100;
            if (current < target) {
                current += increment;
                stat.textContent = Math.round(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };

        updateCounter();
    });
});

// ===== FAQ ACCORDION =====
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            
            // Toggle active state
            question.parentElement.classList.toggle('active');
            
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});

// ===== COUNTDOWN TIMER =====
const targetDate = new Date('2025-04-14T00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    updateFlipCard('days', days);
    updateFlipCard('hours', hours);
    updateFlipCard('minutes', minutes);
    updateFlipCard('seconds', seconds);
}

function updateFlipCard(unit, value) {
    const card = document.querySelector(`.${unit}`);
    if (!card) return;
    
    const currentValue = card.querySelector('.flip-card-top').textContent;
    const newValue = value.toString().padStart(2, '0');

    if (currentValue !== newValue) {
        const flipCardInner = card.querySelector('.flip-card-inner');
        
        // Remove existing flip class
        flipCardInner.classList.remove('flip');
        
        // Update back card values first
        card.querySelector('.flip-card-back-top').textContent = newValue;
        card.querySelector('.flip-card-back-bottom').textContent = newValue;
        
        // Force a reflow to ensure the removal of the class takes effect
        void flipCardInner.offsetWidth;
        
        // Add flip class to trigger animation
        flipCardInner.classList.add('flip');
        
        // Update front card values after animation
        setTimeout(() => {
            card.querySelector('.flip-card-top').textContent = newValue;
            card.querySelector('.flip-card-bottom').textContent = newValue;
            flipCardInner.classList.remove('flip');
        }, 600);
    }
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Initial update
updateCountdown();

// Add card tilt effect on hover (optional)
document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// ===== KITS SECTION - INTERSECTION OBSERVER & ANIMATIONS =====
// THIS IS THE CRITICAL FIX - Adds the 'visible' class to kit cards
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Make section header visible
          const header = entry.target.querySelector('.section-header');
          if (header) header.classList.add('visible');
          
          // Make cards visible with staggered delay - THIS IS KEY!
          const cards = entry.target.querySelectorAll('.kit-card');
          cards.forEach(card => {
            card.classList.add('visible');
          });
          
          // Make scroll indicator visible
          const scrollIndicator = entry.target.querySelector('.scroll-indicator');
          if (scrollIndicator) scrollIndicator.classList.add('visible');
          
          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2 // Trigger when 20% of the section is visible
    });
    
    
    // Observe the kits section
    const kitsSection = document.getElementById('kits-section');
    if (kitsSection) {
      observer.observe(kitsSection);
    }
    
    // Lazy loading images (for browsers that don't support native lazy loading)
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      console.log('Browser supports native lazy loading');
    } else {
      // Fallback lazy loading implementation
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      
      const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            lazyImageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
      });
    }
    
    // Add scroll buttons functionality
    function checkScroll() {
      const container = document.getElementById('kits-container');
      if (container) {
        // Check if scrollable content is wider than container
        const isScrollable = container.scrollWidth > container.clientWidth;
        
        // Show/hide scroll indicator based on scrollability
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
          if (!isScrollable) {
            scrollIndicator.style.display = 'none';
          }
        }
        
        // Check if we're at the end of scrolling to potentially hide right arrow
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
      }
    }
    
    // Run on load and on resize
    window.addEventListener('load', checkScroll);
    window.addEventListener('resize', checkScroll);
    
    // Optional: Add keyboard navigation for accessibility
    const container = document.getElementById('kits-container');
    if (container) {
      container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          container.scrollBy({ left: 320, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
          container.scrollBy({ left: -320, behavior: 'smooth' });
        }
      });
    }
  });