/**
* Global variable creation
*/
//Google Map variable
var map;

//Array of markers
var markers = [];

//Map boundaries
var bounds;

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

//Error Handling for Google Maps
function mapLoadingError() {
	document.getElementById("map").innerHTML = "<span class='map-error'>Map couldn't load, please check your internet connection and Refresh the page.</span>";
}

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
	});

	return marker;
}

//Select marker
function selectMarker(site) {
	var content;

	//Loop throug each marker
	for (var i = 0; i < markers.length; i++) {

		if (markers[i].id == site.id) {

			//Animate selected marker
			markers[i].setAnimation(google.maps.Animation.BOUNCE);

			//Get content to display on infoWindow
			content = getInfoWindowContent(site.name);

			//change content of info window
			infoWindow.setContent(content);

			//Open Associated InfoWindow
			infoWindow.open(map, markers[i]);
		} else {

			//remove animation from other than selected
			markers[i].setAnimation(null);		
		}
	}
}

//Clear marker selection
function clearSelectedMarker() {
	//Loop throug each marker
	for (var i = 0; i < markers.length; i++) {

		//remove animation from every marker
		markers[i].setAnimation(null);		

		//Close InfoWindow
		infoWindow.close();

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

//Make request to Wikipedia API and returns HTML for infowindow
function getInfoWindowContent(searchText) {
	//default error value
	var errorHTML = "<h3>" + searchText + "</h3><br>Wiki not available at the moment..";

	try {
		//Crear HTTP Request object
		var xhr = new XMLHttpRequest();

		//Open URL vie GET and async
		xhr.open("GET", "https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&format=json&search=" + searchText, true);
		xhr.setRequestHeader("Origin", "https://en.wikipedia.org");

		//Send Request
	    xhr.send()
	}
	catch(err) {
	    return errorHTML;
	};

	//When response returned
	xhr.onreadystatechange = function() {

		//Validate if status done, HTTP Status ok and response not empty
		if (xhr.readyState == 4 && xhr.status === 200 && xhr.responseText) {
			var responseArray = JSON.parse(xhr.responseText);
			var infoWindowHTML = prepareInfoWindowHTML(responseArray);
			return infoWindowHTML;
		} else {
			//Error handling if request fails
			return errorHTML;
		}
	}
}

//Generates HTML for InfoWindow based on array
function prepareInfoWindowHTML(JSONAray) {
	var formattedHTML = "<h3>" + JSONArray[0] + "</h3><br>";
	formattedHTML += "<span>" + JSONArray[2][0] + "</span><br>";
	formattedHTML += "<a href='" + JSONArray[3][0] + "'>Más info...</a>";

	return formattedHTML;
}