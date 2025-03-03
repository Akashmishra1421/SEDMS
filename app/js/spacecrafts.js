document.addEventListener("DOMContentLoaded", function () {
    fetchSpacecraftData();
});

function fetchSpacecraftData() {
    fetch('/api/spacecrafts')  // Replace with your API endpoint
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#spacecraftTable tbody");
            tableBody.innerHTML = "";  // Clear any existing rows
            (data.response || []).forEach(spacecraft => {
                const row = document.createElement("tr");
                
                // Creating cells for each data field
                row.innerHTML = `
                    <td>${spacecraft.id}</td>
                    <td>${spacecraft.name}</td>
                    <td>${spacecraft.type}</td>
                    <td>${spacecraft.capacity}</td>
                    <td>
                        <button class="btn update-btn" onclick="updateSpacecraft(${spacecraft.id})">Update</button>
                        <button class="btn delete-btn" onclick="confirmDelete(${spacecraft.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching spacecraft data:', error));
}

function updateSpacecraft(spacecraftId) {
    // Redirect to update page with the spacecraft ID
    location.href = `./update_spacecrafts.html?spacecraft_id=${spacecraftId}`;
}

function confirmDelete(spacecraftId) {
    if (confirm("Are you sure you want to delete this spacecraft?")) {
        deleteSpacecraft(spacecraftId);
    }
}

function deleteSpacecraft(spacecraftId) {
    fetch(`/api/spacecrafts/${spacecraftId}`, {  // Replace with your API endpoint
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Spacecraft deleted successfully');
            fetchSpacecraftData();  // Refresh the table data
        } else {
            alert('Failed to delete spacecraft');
        }
    })
    .catch(error => console.error('Error deleting spacecraft:', error));
}
