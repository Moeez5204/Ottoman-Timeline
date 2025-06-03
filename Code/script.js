// Ottoman Empire events by century
const eventsByCentury = {
    "13th": [
        { 
            year: 1299, 
            title: "Foundation", 
            description: "Osman I establishes the Ottoman Empire.",
            location: [39.9, 32.8],
            zoom: 6
        }
    ],
    "15th": [
        { 
            year: 1453, 
            title: "Fall of Constantinople", 
            description: "Mehmed II conquers Byzantium.",
            location: [41.0082, 28.9784],
            zoom: 10
        }
    ],
    "16th": [
        { 
            year: 1517, 
            title: "Conquest of Egypt", 
            description: "Selim I defeats the Mamluks.",
            location: [30.0444, 31.2357],
            zoom: 6
        },
        { 
            year: 1526, 
            title: "Battle of Mohács", 
            description: "Ottomans defeat Hungary.",
            location: [46.0, 18.7],
            zoom: 7
        }
    ],
    "17th": [
        { 
            year: 1683, 
            title: "Battle of Vienna", 
            description: "Ottoman defeat begins decline.",
            location: [48.2082, 16.3738],
            zoom: 8
        }
    ],
    "19th": [
        { 
            year: 1821, 
            title: "Greek War of Independence", 
            description: "Begins loss of territories.",
            location: [37.9838, 23.7275],
            zoom: 7
        },
        { 
            year: 1922, 
            title: "Dissolution", 
            description: "Empire officially ends.",
            location: [39.9, 32.8],
            zoom: 6
        }
    ]
};

// Initialize map
const map = L.map('map').setView([39.9, 32.8], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Marker layer
const markers = L.layerGroup().addTo(map);

// Function to update timeline
function updateTimeline(century) {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';
    
    const events = eventsByCentury[century] || [];
    document.getElementById('current-century').textContent = 
        `${century.replace('th', 'th')} Century`;
    
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event';
        eventElement.innerHTML = `
            <h3>${event.year}: ${event.title}</h3>
            <p>${event.description}</p>
        `;
        
        eventElement.addEventListener('click', () => {
            updateMap(event.location, event.zoom);
        });
        
        timeline.appendChild(eventElement);
    });
    
    // Center on first event if available
    if (events.length > 0) {
        updateMap(events[0].location, events[0].zoom);
    }
}

// Function to update map
function updateMap(location, zoom) {
    map.setView(location, zoom);
    markers.clearLayers();
    L.marker(location).addTo(markers)
        .bindPopup(`<b>${location[0].toFixed(2)}, ${location[1].toFixed(2)}</b>`)
        .openPopup();
}

// Century selector functionality
document.querySelectorAll('.century').forEach(century => {
    century.addEventListener('click', function() {
        document.querySelectorAll('.century').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        updateTimeline(this.dataset.century);
    });
});

// Initialize with first century
updateTimeline('13th');