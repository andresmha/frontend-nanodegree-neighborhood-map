/**
* Global variable creation
*/
//Google Map variable
var map;

//Array of markers
var markers = [];

//Map boundaries
var bounds;

//Variable to track last Infowindow opened;
var lastInfoWIndow;


/**
* Implementation
*/

//Initialize map with default markers
function initMap() {
	
	//Map initialization
	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: 43.6524174, lng: -79.3926163},
		zoom: 13,
		disableDefaultUI: true
	});

	//initialize markers with default Sites Array
	updateMarkers(sites);
};

//Clean markers on screen and in markers array
function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
};

//Keep markers array updated with current search conditions
function updateMarkers(siteArray){
	var site;

	clearMarkers();

	//Process if incoming array is not empty
	if (siteArray.length > 0) {

		//Loop each site in array to create a marker
		for (var i = 0; i < siteArray.length; i++) {
	        site = siteArray[i];

	        //Creates and adds the marker to the general array
			markers.push(createMarker(site));
		}

		//Recenters map, only valid in this if scope to avoid recentering when search result is empty
		mapRecenter();
	}
};

//Creates a Marker
function createMarker(site) {

	//Defines marker position based on data
	var markerPosition = {lat: site.latitude, lng: site.longitude};

	//Creates marker
	var marker = new google.maps.Marker({
		position: markerPosition,
		map: map,
		title: site.name
	});

	//Creates InfoWindow for the marker
	var infoWindow = new google.maps.InfoWindow({
		content: "Prueba prplknaf asf adsf asdf asdf asdf  asdf sadf sad f asd flnlkdf"
	});

	//Add listener to the infowindow
	marker.addListener("click", function(){
		infoWindow.open(map, marker);

		//Keeps track of last infowindow opened and closes it
		if (lastInfoWIndow) {
			lastInfoWIndow.close();
		}
		lastInfoWIndow = infoWindow;
	});

	return marker;
}

//Recenters map
function mapRecenter() {

	//Sets map bounds based on markers
	bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < markers.length; i++) {
		bounds.extend(markers[i].getPosition());
	}

	//Centers based on bounds
	map.setCenter(bounds.getCenter());

	//Makes map fit within bounds
	map.fitBounds(bounds);

	//Sets Zoom of a maximum of 13 to improve visualization
	if (map.getZoom() > 13) {
		map.setZoom(13);
	}
};

