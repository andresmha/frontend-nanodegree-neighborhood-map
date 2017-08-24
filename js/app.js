var ViewModel = function() {

	this.menuIconOpenClassToggle = function() {
		document.getElementsByClassName("nav-toggle")[0].classList.toggle("nav-open");
		document.getElementsByClassName("side-bar")[0].classList.toggle("side-bar-closed");
	};

	this.resultList = [{name: "Casa Loma"},{name: "Casa Loma"}]; 
}




//Apply KO Bindings
ko.applyBindings(new ViewModel());