// newsletter.js

// Initialize EmailJS with your user ID
emailjs.init("YOUR_USER_ID");

// Newsletter subscription handler
function handleNewsletterSubscription(event) {
  event.preventDefault();
  
  const emailInput = document.querySelector('#newsletter-email');
  const submitButton = document.querySelector('#newsletter-submit');
  const email = emailInput.value;
  
  if (!validateEmail(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }
  
  // Disable form while submitting
  emailInput.disabled = true;
  submitButton.disabled = true;
  
  // Send email using EmailJS
  emailjs.send("service_id", "template_id", {
    email_to: email,
    reply_to: email,
  })
  .then(() => {
    showNotification('Successfully subscribed to newsletter!', 'success');
    emailInput.value = '';
  })
  .catch((error) => {
    showNotification('Failed to subscribe. Please try again.', 'error');
    console.error('EmailJS Error:', error);
  })
  .finally(() => {
    emailInput.disabled = false;
    submitButton.disabled = false;
  });
}

// Email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Notification system
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Add entrance animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Add necessary styles
const styles = `
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 1rem 2rem;
  border-radius: 4px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1000;
}

.notification.show {
  transform: translateY(0);
  opacity: 1;
}

.notification.success {
  border-left: 4px solid #10B981;
}

.notification.error {
  border-left: 4px solid #EF4444;
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#newsletter-form');
  if (form) {
    form.addEventListener('submit', handleNewsletterSubscription);
  }
});