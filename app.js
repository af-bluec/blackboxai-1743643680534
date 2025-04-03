document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Function to validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) || email.length >= 3; // Accept either email or username (min 3 chars)
    };

    // Function to show error message
    const showError = (element, message) => {
        element.textContent = message;
        element.classList.remove('hidden');
        element.classList.add('error-message');
    };

    // Function to hide error message
    const hideError = (element) => {
        element.classList.add('hidden');
        element.classList.remove('error-message');
    };

    // Function to handle loading state
    const setLoadingState = (isLoading) => {
        const submitButton = loginForm.querySelector('button[type="submit"]');
        if (isLoading) {
            submitButton.classList.add('loading');
            submitButton.disabled = true;
        } else {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    };

    // Real-time validation for email/username
    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() === '') {
            showError(emailError, 'Email or username is required');
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email or username');
        } else {
            hideError(emailError);
        }
    });

    // Real-time validation for password
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.trim() === '') {
            showError(passwordError, 'Password is required');
        } else if (passwordInput.value.length < 6) {
            showError(passwordError, 'Password must be at least 6 characters');
        } else {
            hideError(passwordError);
        }
    });

    // Form submission handler
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;

        // Validate email/username
        if (email === '') {
            showError(emailError, 'Email or username is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailError, 'Please enter a valid email or username');
            isValid = false;
        } else {
            hideError(emailError);
        }

        // Validate password
        if (password === '') {
            showError(passwordError, 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordError, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            hideError(passwordError);
        }

        if (isValid) {
            try {
                // Show loading state
                setLoadingState(true);

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Simulate successful login
                console.log('Login successful!', {
                    email,
                    rememberMe: document.getElementById('remember').checked
                });

                // Add success animation to form
                loginForm.classList.add('animate-fadeIn');
                
                // Show success message (you could redirect here in a real application)
                const submitButton = loginForm.querySelector('button[type="submit"]');
                submitButton.innerHTML = '<i class="fas fa-check"></i> Success!';
                submitButton.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
                submitButton.classList.add('bg-green-600', 'hover:bg-green-700');

            } catch (error) {
                console.error('Login error:', error);
                // Show error message
                showError(emailError, 'An error occurred. Please try again.');
            } finally {
                // Hide loading state
                setLoadingState(false);
            }
        }
    });

    // Add some nice focus effects
    const inputs = loginForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('custom-focus');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('custom-focus');
        });
    });
});