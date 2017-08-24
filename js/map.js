//Map funcionality
var map;

function initMap() {
	

	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: 43.6524174, lng: -79.3926163},
		zoom: 13
		//disableDefaultUI: true
	});


	//MARKERS
	var firstMarker = {lat: 43.678041, lng: -79.4116326};

	var marker = new google.maps.Marker({
		position: firstMarker,
		map: map,
		title: "Casa Loma"
	});

	//InfoWindow
	var infoWindow = new google.maps.InfoWindow({
		content: "Prueba prplknaf asf adsf asdf asdf asdf  asdf sadf sad f asd flnlkdf"
	});

	//it wont start automatically so ill bind it to a click listener
	marker.addListener("click", function(){
		infoWindow.open(map, marker);
	});


}

