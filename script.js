// Ottoman Empire events by century
const eventsByCentury = {
    "13th": [
        { 
            year: 1299, 
            title: "Foundation", 
            description: "Osman I establishes the Ottoman Empire.",
            location: [39.9, 32.8], // Söğüt, Turkey
            zoom: 6
        }
    ],
    "15th": [
        { 
            year: 1453, 
            title: "Fall of Constantinople", 
            description: "Mehmed II conquers Byzantium.",
            location: [41.0082, 28.9784], // Istanbul
            zoom: 10
        },
        { 
            year: 1480, 
            title: "Conquest of Otranto", 
            description: "Ottomans establish foothold in Italy.",
            location: [40.15, 18.49], // Southern Italy
            zoom: 8
        }
    ],
    "16th": [
        { 
            year: 1517, 
            title: "Conquest of Egypt", 
            description: "Selim I defeats the Mamluks.",
            location: [30.0444, 31.2357], // Cairo
            zoom: 6
        },
        { 
            year: 1526, 
            title: "Battle of Mohács", 
            description: "Ottomans defeat Hungary.",
            location: [46.0, 18.7], // Hungary
            zoom: 7
        },
        { 
            year: 1538, 
            title: "Conquest of Aden", 
            description: "Ottomans control Red Sea trade.",
            location: [12.8, 45.0], // Yemen
            zoom: 7
        }
    ],
    "17th": [
        { 
            year: 1683, 
            title: "Battle of Vienna", 
            description: "Ottoman defeat begins decline.",
            location: [48.2082, 16.3738], // Vienna
            zoom: 8
        }
    ],
    "19th": [
        { 
            year: 1821, 
            title: "Greek War of Independence", 
            description: "Begins loss of territories.",
            location: [37.9838, 23.7275], // Athens
            zoom: 7
        },
        { 
            year: 1922, 
            title: "Dissolution", 
            description: "Empire officially ends.",
            location: [39.9, 32.8], // Ankara
            zoom: 6
        }
    ]
};

// Simplified Ottoman territories by century (GeoJSON format)
const territoryData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": { "name": "Early Ottoman (1300)", "century": "13th" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [26.5, 40.2], [32.0, 40.2], [32.0, 39.5], [26.5, 39.5], [26.5, 40.2]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Expansion (1453)", "century": "15th" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [20.0, 35.0], [44.0, 35.0], [44.0, 42.0], [20.0, 42.0], [20.0, 35.0]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Peak (1683)", "century": "17th" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [12.0, 30.0], [50.0, 30.0], [50.0, 48.0], [12.0, 48.0], [12.0, 30.0]
                ]]
            }
        }
    ]
};

// Initialize map
const map = L.map('map').setView([39.9, 32.8], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Create layer groups
const markers = L.layerGroup().addTo(map);
const territoryLayers = L.layerGroup().addTo(map);

// Function to update map view
function updateMap(location, zoom) {
    map.setView(location, zoom);
    markers.clearLayers();
    L.marker(location).addTo(markers)
        .bindPopup(`<b>${location[0].toFixed(2)}, ${location[1].toFixed(2)}</b>`)
        .openPopup();
}

// Function to load territories for a century
function loadTerritories(century) {
    territoryLayers.clearLayers();
    
    const centuryTerritories = territoryData.features.filter(
        f => f.properties.century === century
    );
    
    if (centuryTerritories.length > 0) {
        L.geoJSON(centuryTerritories, {
            style: {
                fillColor: 'red',
                fillOpacity: 0.15,
                color: '#d62728',
                weight: 3,
                opacity: 0.8
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(`<b>${feature.properties.name}</b>`);
            }
        }).addTo(territoryLayers);
        
        // Auto-zoom to show territories
        const bounds = territoryLayers.getBounds();
        if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }
}

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
    
    // Load territories and center on first event
    loadTerritories(century);
    if (events.length > 0) {
        updateMap(events[0].location, events[0].zoom);
    }
}

// Initialize century selector
document.querySelectorAll('.century').forEach(century => {
    century.addEventListener('click', function() {
        document.querySelectorAll('.century').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        updateTimeline(this.dataset.century);
    });
});

// Start with 13th century
updateTimeline('13th');