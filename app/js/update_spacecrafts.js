document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('spacecraftUpdateForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const url = new URLSearchParams(location.search)
        const spacecraft_id = url.get("spacecraft_id");
        const name = document.getElementById('spacecraft_name').value;
        const type = document.getElementById('type').value;
        const capacity = document.getElementById('capacity').value;

        fetch(`/api/spacecrafts/${spacecraft_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                type,
                capacity
            })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').textContent = 'Spacecraft updated successfully!';
            setTimeout(() => {
                window.location.href = 'spacecrafts.html'; // Redirect to spacecrafts list page
            }, 2000);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'Error updating spacecraft.';
        });
    });
});
