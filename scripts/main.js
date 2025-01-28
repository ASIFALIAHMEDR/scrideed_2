// Add this to your main JavaScript file

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
// Optional: Function to manually show/hide loader
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

document.addEventListener('DOMContentLoaded', () => {
    // Previous JavaScript remains the same, with these additions:

    // Parallax Effect for Hero Section
    const hero = document.getElementById('hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

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


document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqPopup = document.createElement('div');
    faqPopup.classList.add('faq-popup');
    document.body.appendChild(faqPopup);

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling.textContent;
            
            faqPopup.innerHTML = `
                <div class="faq-popup-content">
                    <h3>${question.textContent}</h3>
                    <p>${answer}</p>
                    <button class="close-popup">Close</button>
                </div>
            `;
            
            faqPopup.style.display = 'flex';
        });
    });

    // Close popup
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-popup') || 
            e.target.classList.contains('faq-popup')) {
            faqPopup.style.display = 'none';
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');

            // Slide toggle answer
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
            } else {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
            }
        });
    });
});



//added

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


// added code for the countdown timer
const targetDate = new Date('2025-02-01T00:00:00').getTime();

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