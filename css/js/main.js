// Form Validation for Contact Page
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop form from submitting
            
            let isValid = true;
            
            // Get values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Clear previous errors
            document.getElementById('nameError').textContent = '';
            document.getElementById('emailError').textContent = '';
            document.getElementById('messageError').textContent = '';
            
            // Validate Name
            if (name === '') {
                document.getElementById('nameError').textContent = 'Please enter your name.';
                isValid = false;
            }
            
            // Validate Email
            if (email === '') {
                document.getElementById('emailError').textContent = 'Please enter your email.';
                isValid = false;
            } else if (!email.includes('@') || !email.includes('.')) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address.';
                isValid = false;
            }
            
            // Validate Message
            if (message === '') {
                document.getElementById('messageError').textContent = 'Please enter your message.';
                isValid = false;
            }
            
            // If valid, show success message
            if (isValid) {
                document.getElementById('successMessage').textContent = '✅ Message sent successfully! We\'ll get back to you soon.';
                document.getElementById('successMessage').style.color = 'green';
                form.reset(); // Clear the form
            }
        });
    }
});