document.getElementById('missionForm').addEventListener('submit', async (event) => { 
    event.preventDefault(); 
     
    const formData = new FormData(event.target); 
         
    const data = { 
        name: formData.get('mission_name'), 
        launch_date: formData.get('launch_date'), 
        status: formData.get('status'), 
        description: formData.get('description') 
    }; 
     
    try { 
        const response = await fetch('/api/missions', { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify(data) 
        }); 
     
        const result = await response.json(); 
        const messageContainer = document.getElementById('message'); 
     
        if (result.status === 201) { 
            messageContainer.innerText = "Mission details updated successfully!"; 
            messageContainer.style.color = 'green'; 
     
            // Clear the form fields 
            event.target.reset(); 
     
            // Remove the message after 3 seconds and redirect
            setTimeout(() => { 
                messageContainer.innerText = ''; 
                window.location.href = './missions.html'; // Redirect to mission.html
            }, 1000); 
        } else { 
            messageContainer.innerText = result.message; 
            messageContainer.style.color = 'red'; 
        } 
    } catch (error) { 
        console.error('Error:', error); 
        const messageContainer = document.getElementById('message'); 
        messageContainer.innerText = 'An error occurred.'; 
        messageContainer.style.color = 'red'; 
    } 
});
