/**
 * contact.js — Intercepts contact form submission and renders response
 */

const contactForm = document.getElementById('contact_form');
const formResponse = document.getElementById('form_response');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Gather form data
    const formData = new FormData(contactForm);
    const body = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    try {
        const res = await fetch('/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (data.success) {
            formResponse.innerHTML = `
        <div class="success-message">${data.message}</div>
      `;
            contactForm.reset(); // Clear form fields on success
        } else {
            formResponse.innerHTML = `
        <div class="error-message">${data.message}</div>
      `;
        }
    } catch (err) {
        formResponse.innerHTML = `
      <div class="error-message">Something went wrong. Please try again later.</div>
    `;
        console.error('Contact form error:', err);
    }
});
