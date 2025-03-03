document.getElementById('astronautForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('astronauts_name'),
        dob: formData.get('birth_date'),
        nationality: formData.get('nationality')
    };

    try {
        // Send a POST request to the server to add the astronaut
        const response = await fetch('/api/astronauts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const messageContainer = document.getElementById('message');

        // Show a success or error message
        if (result.status === 201) {
            messageContainer.innerText = 'Astronaut added successfully!';
            messageContainer.style.color = 'green';

            // Clear the form fields
            event.target.reset();

            // Redirect to astronauts.html after 3 seconds
            setTimeout(() => {
                window.location.href = './astronauts.html';
            }, 1000);
        } else {
            messageContainer.innerText = result.message || 'Failed to add astronaut.';
            messageContainer.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        const messageContainer = document.getElementById('message');
        messageContainer.innerText = 'An error occurred while adding the astronaut.';
        messageContainer.style.color = 'red';
    }
});
