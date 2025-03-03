document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayData();
});

async function fetchAndDisplayData() {
    try {
        const [missionsResponse, astronautsResponse, spacecraftsResponse] = await Promise.all([
            fetch('/api/missions'),
            fetch('/api/astronauts'),
            fetch('/api/spacecrafts')
        ]);

        const missions = await missionsResponse.json();
        const astronauts = await astronautsResponse.json();
        const spacecrafts = await spacecraftsResponse.json();

        populateTable('missionsTable', missions, 'mission');
        populateTable('astronautsTable', astronauts, 'astronaut');
        populateTable('spacecraftTable', spacecrafts, 'spacecraft');

    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('message').innerText = 'An error occurred while fetching data.';
    }
}

function populateTable(tableId, data, type) {
    const tableBody = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing content

    data.forEach(item => {
        const row = tableBody.insertRow();
        Object.values(item).forEach(value => {
            const cell = row.insertCell();
            cell.innerText = value;
        });

        const actionCell = row.insertCell();
        actionCell.innerHTML = `
            <button class="btn" onclick="update${capitalize(type)}('${item.id}')">Update</button>
            <button class="btn" onclick="delete${capitalize(type)}('${item.id}')">Delete</button>
        `;
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

async function updateMission(id) {
    window.location.href = `mission.html?id=${id}`;
}

async function deleteMission(id) {
    try {
        const response = await fetch(`/api/missions/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        if (result.status === 200) {
            document.getElementById('message').innerText = 'Mission deleted successfully';
            fetchAndDisplayData();
        } else {
            document.getElementById('message').innerText = 'Error deleting mission';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred.';
    }
}

async function updateAstronaut(id) {
    window.location.href = `astronaut.html?id=${id}`;
}

async function deleteAstronaut(id) {
    try {
        const response = await fetch(`/api/astronauts/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        if (result.success) {
            document.getElementById('message').innerText = 'Astronaut deleted successfully';
            fetchAndDisplayData();
        } else {
            document.getElementById('message').innerText = 'Error deleting astronaut';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred.';
    }
}

async function updateSpacecraft(id) {
    window.location.href = `spacecraft.html?id=${id}`;
}

async function deleteSpacecraft(id) {
    try {
        const response = await fetch(`/api/spacecrafts/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        if (result.success) {
            document.getElementById('message').innerText = 'Spacecraft deleted successfully';
            fetchAndDisplayData();
        } else {
            document.getElementById('message').innerText = 'Error deleting spacecraft';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred.';
    }
}
