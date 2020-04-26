const http = new XMLHttpRequest();
const url =
	"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
let markers,
	center,
	map = undefined;

http.open("GET", url);
http.send();

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
