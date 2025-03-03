document.addEventListener("DOMContentLoaded", function () {
    fetchMissionsData();
});

function fetchMissionsData() {
    fetch('/api/missions')  // Replace with your API endpoint
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#missionsTable tbody");
            tableBody.innerHTML = "";  // Clear any existing rows
            (data.response || []).forEach(mission => {
                const row = document.createElement("tr");
                
                // Creating cells for each data field
                row.innerHTML = `
                    <td>${mission.id}</td>
                    <td>${mission.name}</td>
                    <td>${mission.launch_date}</td>
                    <td>${mission.status}</td>
                    <td>${mission.description}</td>
                    <td>
                        <button class="btn update-btn" onclick="updateMission(${mission.id})">Update</button>
                        <button class="btn delete-btn" onclick="confirmDelete(${mission.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching mission data:', error));
}

function updateMission(missionId) {
    // Redirect to update page with the mission ID
    location.href = `./update_missions.html?mission_id=${missionId}`;
}

function confirmDelete(missionId) {
    if (confirm("Are you sure you want to delete this mission?")) {
        deleteMission(missionId);
    }
}

function deleteMission(missionId) {
    fetch(`/api/missions/${missionId}`, {  // Replace with your API endpoint
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Mission deleted successfully');
            fetchMissionsData();  // Refresh the table data
        } else {
            alert('Failed to delete mission');
        }
    })
    .catch(error => console.error('Error deleting mission:', error));
}
