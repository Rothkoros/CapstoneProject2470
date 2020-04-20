const http = new XMLHttpRequest();
const url = "http://api.open-notify.org/iss-now.json";
let marker,
	center,
	map = undefined;

http.open("GET", url);
http.send();

function initMap() {
	center = { lat: 40.7608, lng: -111.891 };

	map = new google.maps.Map(document.getElementById("map"), {
		zoom: 6,
		center,
	});

	marker = new google.maps.Marker({
		map: map,
		icon: "./images/iss.png",
	});
}

http.onreadystatechange = function () {
	if (this.readyState === 4 && this.status === 200) {
		if (map) {
			let {
				iss_position: { latitude, longitude },
				timestamp,
			} = JSON.parse(http.responseText);

			let centerLat = map.getCenter().lat();
			let centerLng = map.getCenter().lng();

			var newLatLng = new google.maps.LatLng(
				parseFloat(latitude),
				parseFloat(longitude)
			);

			if (centerLat === center.lat && centerLng === center.lng) {
				map.setCenter(newLatLng);
			}

			marker.setPosition(newLatLng);
			marker.setTitle(
				"The position of the International Space Station as of " +
					new Date(timestamp * 1000)
			);
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
setInterval(() => {
	http.open("GET", url);
	http.send();
}, 500);
