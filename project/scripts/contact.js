// Contact form handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            projectType: document.getElementById('project-type').value,
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };

        // Validate form
        if (validateContactForm(formData)) {
            // Save to localStorage
            saveFormData(formData);

            // Redirect to thank you page
            window.location.href = 'thank-you.html';
        }
    });
}

// Form validation
function validateContactForm(formData) {
    const errors = [];

    // Name validation
    if (!formData.name) {
        errors.push('Name is required');
    } else if (formData.name.length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    // Email validation
    if (!formData.email) {
        errors.push('Email is required');
    } else if (!validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }

    // Phone validation (optional but validate if provided)
    if (formData.phone && !validatePhone(formData.phone)) {
        errors.push('Please enter a valid phone number');
    }

    // Message validation
    if (!formData.message) {
        errors.push('Message is required');
    } else if (formData.message.length < 10) {
        errors.push('Message must be at least 10 characters long');
    }

    // Display errors or return true
    if (errors.length > 0) {
        alert('Please fix the following errors:\n\n' + errors.join('\n'));
        return false;
    }

    return true;
}

// Email validation helper (reuse from main.js)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation helper (reuse from main.js)
function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Save form data to localStorage
function saveFormData(formData) {
    let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
    submissions.push(formData);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

    // Also save the most recent submission for potential pre-filling
    localStorage.setItem('lastContactSubmission', JSON.stringify(formData));
}

// Pre-fill form with last submission if available
document.addEventListener('DOMContentLoaded', function () {
    const lastSubmission = localStorage.getItem('lastContactSubmission');

    if (lastSubmission && contactForm) {
        const formData = JSON.parse(lastSubmission);

        // Don't pre-fill sensitive data, but keep project type
        if (formData.projectType) {
            document.getElementById('project-type').value = formData.projectType;
        }
    }

    // Add character counters
    const messageField = document.getElementById('message');
    if (messageField) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.fontSize = '0.8rem';
        counter.style.color = 'var(--gray)';
        counter.style.textAlign = 'right';
        counter.style.marginTop = '0.5rem';

        messageField.parentNode.appendChild(counter);

        function updateCounter() {
            const length = messageField.value.length;
            counter.textContent = `${length} characters (minimum 10)`;

            if (length < 10) {
                counter.style.color = 'var(--secondary)';
            } else {
                counter.style.color = 'var(--gray)';
            }
        }

        messageField.addEventListener('input', updateCounter);
        updateCounter(); // Initial update
    }
});