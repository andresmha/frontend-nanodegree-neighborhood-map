var ViewModel = function() {

	this.menuIconOpenClassToggle = function() {
		document.getElementsByClassName("nav-toggle")[0].classList.toggle("nav-open");
		document.getElementsByClassName("side-bar")[0].classList.toggle("side-bar-closed");
	};
}




//Apply KO Bindings
ko.applyBindings(new ViewModel());