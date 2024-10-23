// Cloudflare Worker URL
 const apiUrl = 'https://corredbr044.npalston.workers.dev/';

// Function to fetch agent data from Google Sheets
async function fetchAgents() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.error) {
            console.error('Google Sheets API Error:', data.error.message);
            return [];
        }
        
        const agents = data.values;
        return agents; // Array of agent data
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        return [];
    }
}

// Function to populate the agent cards dynamically
function populateAgentCards(agents) {
    const agentsGrid = document.querySelector('.agents-grid');

    agents.forEach((agent, index) => {
        if (index === 0) return; // Skip the header row (assuming the first row is headers)

        const agentName = agent[1];       // Name from column 1 (Nombre Corredor)
        const agentDescription = agent[2]; // Description from column 2
        const agentImage = agent[6] ? `images/corredores/${agent[6]}` : 'images/corredores/default.jpg'; // Image file name from column 6 (fallback if empty)

        // Create agent card HTML
        const agentCard = document.createElement('div');
        agentCard.classList.add('agent-card');

        agentCard.innerHTML = `
            <div class="agent-image" style="background-image: url('${agentImage}');"></div>
            <h3>${agentName}</h3>
            <p>${agentDescription}</p>
            <a href="#" class="agent-cta">Ver Perfil</a>
        `;

        // Append the agent card to the grid
        agentsGrid.appendChild(agentCard);
    });
}


// Fetch data and populate cards
fetchAgents().then(agents => populateAgentCards(agents));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.nav-toggle');
    const navList = document.querySelector('nav ul.nav-list');

    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }
});
