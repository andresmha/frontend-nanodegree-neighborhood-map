/**
* Global variable creation
*/
//Google Map variable
var map;
var markers = [];
var bounds;
var infoWindow;
var infoWindowContent;
var selectedMarker;


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

	//Loop throug each marker
	for (var i = 0; i < markers.length; i++) {
		//if selected
		if (markers[i].id == site.id) {

			//mark global selection
			selectedMarker = markers[i];

			//Animate selected marker
			selectedMarker.setAnimation(google.maps.Animation.BOUNCE);

			//Get content to display on infoWindow
			setInfoWindow(site.name);

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

		//empty marker selection
		selectedMarker = null;

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
function setInfoWindow(searchText) {
	infoWindowContent = ''

	//Creates Script TAg
	var scriptTag = document.createElement("script");

	//Set src for sript tag with callback for jsonp
	scriptTag.setAttribute("src", "https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&callback=getJSONP&format=json&search=" + searchText);

	//Set Async to script tag
	scriptTag.setAttribute("async", '');

	//Error handling
	scriptTag.onerror = function() {
		infoWindowContent = "<h3>" + searchText + "</h3><br>";
		infoWindowContent += "Wiki no disponible en este momento.";
		openInfoWindow();
	}

	//Append element to body tag
	document.body.appendChild(scriptTag);
}

//Callback function for json parsing
function getJSONP(data){
	//fill infowindow accordingly based on data content
	if(data) {
		infoWindowContent = prepareInfoWindowHTML(data);
	} else {
		infoWindowContent = "Wiki no disponible en este momento.";
	}

	//Actually opens infowindow
	openInfoWindow();
}


//Generates HTML for InfoWindow based on array
function prepareInfoWindowHTML(JSONArray) {
	var formattedHTML = "<h3>" + JSONArray[0] + "</h3>";
	formattedHTML += "<span>" + JSONArray[2][0] + "</span><br>";
	formattedHTML += "<a href='" + JSONArray[3][0] + "' target='_blank'>More info...</a>";

	return formattedHTML;
}

//Opens infowindow on selected marker
function openInfoWindow(){
	infoWindow.open(map, selectedMarker);

	//change content of info window
	infoWindow.setContent(infoWindowContent);
}