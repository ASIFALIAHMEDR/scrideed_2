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