var viewModel = function() {
	// "this" reference saving 
	var that = this;
	var markerPosition;

	//Get sites length to avoid inner calculations
	var sitesLength = sites.length;

	//Set observable for search value binding
	that.searchValue = ko.observable("");
	that.resultSites = ko.observableArray();

	//Toogle classes for display functionality
	that.menuIconOpenClassToggle = function() {
		document.getElementsByClassName("nav-toggle")[0].classList.toggle("nav-open");
		document.getElementsByClassName("side-bar")[0].classList.toggle("side-bar-closed");
	};

	//Susbribe to changes on searchValue observable binded to input text
	that.searchValue.subscribe(function(){
		var siteName;

		//If Search Text is empty, restores default values
		if (!that.searchValue()){
			that.setDefaultSitesValue();
			updateMarkers(sites);
			return;
		}

		//Clear result Array
		that.resultSites([]);

		//Loop through base sites array and fill with results.
	    for (var i = 0; i < sitesLength; i++) {
	    	//Sets upper case value to avoid case sensitive search
	    	siteName = sites[i].name.toUpperCase();
	        if (siteName.indexOf(that.searchValue().toUpperCase()) >= 0) {
	            that.resultSites.push(sites[i]);
	        }
	    }

	    //notify map for update
	    updateMarkers(vm.resultSites());
	});

	//Resets resultSites to contain all sites
	that.setDefaultSitesValue = function() {
		that.resultSites(sites.slice(0));
	};

	that.markClickedListItem = function() {
		
	};

	//Execute by default to get all sites
	that.setDefaultSitesValue();
};

//viewModel Instance
var vm = new viewModel();

//Apply KO Bindings
ko.applyBindings(vm);


