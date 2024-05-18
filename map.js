// Mapbox Public Access Key
mapboxgl.accessToken = 'pk.eyJ1IjoiYmFkcmVkZGluZTAwIiwiYSI6ImNsdzJ0cDJ1bTBtMnQyaW11NjBxczE3Z2kifQ.ockRcbgDpqVyMLsAv_tMgw';

// Initializing Map
var map = new mapboxgl.Map({
    // Map Container ID
    container: 'map',
    // Mapbox Style URL
    style: 'mapbox://styles/badreddine00/clwb8y9ii008z01pg0umkd2e3',
    zoom: 5, // Default Zoom
    center: [-1.617439, 37.177336] // Default centered coordinate (somewhere between Berkane and Perpignan)
});

// Direction Form
var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric', // Use metric units
    profile: 'mapbox/driving', // Use driving profile
    interactive: false // Disable interactive mode
});

// Add Directions Control to the Map
map.addControl(directions, 'top-left');

// Function to set default directions and save them to localStorage
function setDefaultDirections() {
    const origin = [-2.32, 34.92]; // Coordinates for Berkane, Morocco
    const destination = [2.8956, 42.6886]; // Coordinates for Perpignan, France

    directions.setOrigin(origin);
    directions.setDestination(destination);

    // Save route to localStorage
    localStorage.setItem('origin', JSON.stringify(origin));
    localStorage.setItem('destination', JSON.stringify(destination));
}

// Function to load directions from localStorage
function loadDirectionsFromStorage() {
    const origin = localStorage.getItem('origin');
    const destination = localStorage.getItem('destination');
    if (origin && destination) {
        directions.setOrigin(JSON.parse(origin));
        directions.setDestination(JSON.parse(destination));
    } else {
        setDefaultDirections();
    }
}

// Check if route exists in localStorage and load it
loadDirectionsFromStorage();

// Adding navigation control on Map
map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
