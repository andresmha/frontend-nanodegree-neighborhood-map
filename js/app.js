var ViewModel = function() {

	//Site Data Definition
	this.sites = [
		{
			name: "Casa Loma",
			latitude: 43.652417,
			longitude: -79.392616
		},
		{
			name: "Museum",
			latitude: 0,
			longitude: 0 
		}
	];

	this.menuIconOpenClassToggle = function() {
		document.getElementsByClassName("nav-toggle")[0].classList.toggle("nav-open");
		document.getElementsByClassName("side-bar")[0].classList.toggle("side-bar-closed");
	};



	
}




//Apply KO Bindings
ko.applyBindings(new ViewModel());