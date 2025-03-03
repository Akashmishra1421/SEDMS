document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('astronautUpdateForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const url = new URLSearchParams(location.search)
        const astronaut_id = url.get("id");
        const name = document.getElementById('astronaut_name').value;
        const dob = document.getElementById('birth_date').value;
        const nationality = document.getElementById('nationality').value;

        fetch(`/api/astronauts/${astronaut_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                dob,
                nationality
            })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').textContent = 'Astronaut updated successfully!';
            setTimeout(() => {
                window.location.href = 'astronauts.html'; // Redirect to astronauts list page
            }, 2000);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'Error updating astronaut.';
        });
    });
});
