const http = new XMLHttpRequest();
const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson
		&starttime=${formatDate(new Date().setDate(new Date().getDate() - 30))}
		&endtime=${formatDate(new Date())}
		&latitude=39.419220
		&longitude=-111.950684
		&maxradiuskm=175`;
let markers,
  center,
  map = undefined;

http.open("GET", url);
http.send();

// Formatting date to YYYY-MM-DD for the API
function formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function initMap() {
  center = { lat: 40.7608, lng: -111.891 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center,
  });

  marker = new google.maps.Marker({
    map: map,
  });
}

http.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    if (map) {
      let response = JSON.parse(http.responseText);
      console.log(response);

      markers = response.features.map((feature) => {
        return new google.maps.Marker({
          map: map,
          position: {
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0],
          },
          title: feature.properties.title,
        });
      });
    } else {
      http.open("GET", url);
      http.send();
    }
  }
};

function centerMapToMarker() {
  map.setCenter(marker.getPosition());
}

// refreshes map and iss location every 6 minutes
// setInterval(() => {
// 	http.open("GET", url);
// 	http.send();
// }, 50000);
