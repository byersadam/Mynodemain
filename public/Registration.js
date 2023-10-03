// registration.js

document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const messageDiv = document.getElementById('message');

    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(registrationForm);
        const userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                messageDiv.innerHTML = `<p>${data.message}</p>`;
            } else {
                messageDiv.innerHTML = `<p>Error: ${data.error}</p>`;
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.innerHTML = '<p>An error occurred during registration.</p>';
        }
    });
});
