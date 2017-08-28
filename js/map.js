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
var lastInfoWindow;

//Unique InfoWindow
var infoWindow;


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

	//Initialize unique infoWindow
	infoWindow = new google.maps.InfoWindow({});

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
		title: site.name,
		//ID for reference
		id: site.id
	});

	//Add listener to the infowindow
	marker.addListener("click", function(){
		//Add animation to marker
		//Set the id of the selected item
		vm.selectListItem(site);

		//Open Associated InfoWindow
		infoWindow.open(map, marker);

		//change content of info window
		infoWindow.setContent("<h2>" + site.name + "</h2>");
	});

	return marker;
}

//Animate marker
function animateMarker(id) {
	for (var i = 0; i < markers.length; i++) {
		if (markers[i].id == id) {
			markers[i].setAnimation(google.maps.Animation.BOUNCE);		
		} else {
			markers[i].setAnimation(null);		
		}
	}
	
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



