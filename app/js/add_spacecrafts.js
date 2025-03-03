document.getElementById('spacecraftForm').addEventListener('submit', async (event) => { 
    event.preventDefault(); 
 
    const formData = new FormData(event.target); 
     
    const data = {
        name: formData.get('spacecraft_name'), 
        type: formData.get('type'), 
        capacity: formData.get('capacity') 
    }; 
 
    try { 
        const response = await fetch('/api/spacecrafts', { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify(data) 
        }); 
 
        const result = await response.json(); 
        const messageContainer = document.getElementById('message'); 
 
        if (result.status === 201) { 
            messageContainer.innerText = "Spacecraft details updated successfully!"; 
            messageContainer.style.color = 'green'; 
 
            // Clear the form fields 
            event.target.reset(); 
 
            // Redirect to spacecrafts.html after 3 seconds
            setTimeout(() => { 
                window.location.href = './spacecrafts.html';
            }, 1000); 
        } else { 
            messageContainer.innerText = result.message || 'An error occurred.'; 
            messageContainer.style.color = 'red'; 
        } 
    } catch (error) { 
        console.error('Error:', error); 
        const messageContainer = document.getElementById('message'); 
        messageContainer.innerText = 'An error occurred.'; 
        messageContainer.style.color = 'red'; 
    } 
});
