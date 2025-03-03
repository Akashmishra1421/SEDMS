document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        username: formData.get('username'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        email: formData.get('email')
    };

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const messageContainer = document.getElementById('message');

        if (result.status === 200) {
            messageContainer.innerText = "User registered. Please login";
            messageContainer.style.color = 'green';
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            messageContainer.innerText = result.message;
            messageContainer.style.color = 'red';
        }
    } catch (error) {
        const messageContainer = document.getElementById('message');
        messageContainer.innerText = 'An error occurred.';
        messageContainer.style.color = 'red';
    }
});
