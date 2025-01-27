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