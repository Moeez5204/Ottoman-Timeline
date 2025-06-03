// Ottoman Empire timeline events
const events = [
    { 
        year: 1299, 
        title: "Foundation", 
        description: "Osman I establishes the Ottoman Empire.",
        location: [39.9, 32.8], // Coordinates for Söğüt, Turkey
        zoom: 6
    },
    { 
        year: 1453, 
        title: "Fall of Constantinople", 
        description: "Mehmed II conquers Byzantium, marking the end of the Byzantine Empire.",
        location: [41.0082, 28.9784], // Istanbul
        zoom: 10
    },
    { 
        year: 1517, 
        title: "Conquest of Egypt", 
        description: "Selim I defeats the Mamluks, bringing Egypt into the empire.",
        location: [30.0444, 31.2357], // Cairo
        zoom: 6
    },
    { 
        year: 1683, 
        title: "Battle of Vienna", 
        description: "Ottoman defeat marks the beginning of decline.",
        location: [48.2082, 16.3738], // Vienna
        zoom: 8
    },
    { 
        year: 1922, 
        title: "Dissolution", 
        description: "Empire officially ends after WWI.",
        location: [39.9, 32.8], // Back to origin
        zoom: 6
    }
];

// Initialize the map
const map = L.map('map').setView([39.9, 32.8], 6);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create a marker layer group
const markers = L.layerGroup().addTo(map);

// Function to update map based on selected event
function updateMap(location, zoom) {
    map.setView(location, zoom);
    markers.clearLayers();
    L.marker(location).addTo(markers)
        .bindPopup(`<b>${location[0].toFixed(2)}, ${location[1].toFixed(2)}</b>`)
        .openPopup();
}

// Create timeline events
const timeline = document.getElementById('timeline');
events.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.className = 'event';
    eventElement.innerHTML = `
        <h3>${event.year}: ${event.title}</h3>
        <p>${event.description}</p>
    `;
    
    // Add click event to update map
    eventElement.addEventListener('click', () => {
        updateMap(event.location, event.zoom);
    });
    
    timeline.appendChild(eventElement);
});

// Initialize with first event
updateMap(events[0].location, events[0].zoom);