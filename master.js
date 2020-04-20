const url = 'http://api.open-notify.org/iss-now.json'

// Initialize and add the map
function initMap() {
  // The location of Uluru
  var uluru = { lat: -25.0354, lng: -45.2767 };
  // The map, centered at Uluru
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: uluru,
  });
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({ position: uluru, map: map });
}