document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const formData = new FormData(event.target);
    const data = {
        username: formData.get('username'),
        password: formData.get('password')
    };

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const messageContainer = document.getElementById('message');

        if (result.status === 200) {
            messageContainer.innerText = 'Logged in successfully!';
            messageContainer.style.color = 'green';
            setTimeout(() => {
                window.location.href = 'home.html'; // Redirect to home page
            }, 2000); // Wait 2 seconds before redirecting
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
