document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayAstronauts();
});

async function fetchAndDisplayAstronauts() {
    try {
        const response = await fetch('/api/astronauts');
        const astronauts = await response.json();
        if (astronauts.status === 200) {
            populateAstronautTable(astronauts.response);
        } else {
            document.getElementById('message').innerText = 'Failed to load astronauts';
        }
    } catch (error) {
        console.error('Error fetching astronauts:', error);
        document.getElementById('message').innerText = 'An error occurred while fetching astronauts.';
    }
}

function populateAstronautTable(astronauts) {
    const tableBody = document.getElementById('astronautsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing content

    astronauts.forEach(astronaut => {
        const row = tableBody.insertRow();

        row.insertCell().innerText = astronaut.id;
        row.insertCell().innerText = astronaut.name;
        row.insertCell().innerText = astronaut.dob;
        row.insertCell().innerText = astronaut.nationality;

        const actionCell = row.insertCell();
        actionCell.innerHTML = `
            <button class="btn" onclick="location.href='./update_astronauts.html?id=${astronaut.id}'">Update</button>
            <button class="btn" onclick="deleteAstronaut('${astronaut.id}')">Delete</button>
        `;
    });
}

async function deleteAstronaut(astronautId) {
    if (confirm('Are you sure you want to delete this astronaut?')) {
        try {
            const response = await fetch(`/api/astronauts/${astronautId}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (result.status === 200) {
                document.getElementById('message').innerText = 'Astronaut deleted successfully';
                fetchAndDisplayAstronauts(); // Refresh the list
            } else {
                document.getElementById('message').innerText = 'Error deleting astronaut';
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('message').innerText = 'An error occurred.';
        }
    }
}
