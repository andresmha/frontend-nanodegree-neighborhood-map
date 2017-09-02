var ViewModel = function() {
	// "this" reference saving 
	var that = this;
	var markerPosition;

	//Get sites length to avoid inner calculations
	var sitesLength = sites.length;

	//Set observable for search value binding
	that.searchValue = ko.observable("");
	that.resultSites = ko.observableArray();
	that.selectedSite = ko.observable(0);

	//Toogle classes for display functionality
	that.menuIconOpenClassToggle = function() {
		document.getElementsByClassName("nav-toggle")[0].classList.toggle("nav-open");
		document.getElementsByClassName("side-bar")[0].classList.toggle("side-bar-closed");
	};

	//Susbribe to changes on searchValue observable binded to input text
	that.searchValue.subscribe(function(){
		var siteName;

		//Clear result Array
		that.resultSites([]);

		//Clear selected item
	    that.clearListItemSelection();

		//If Search Text is empty, restores default values
		if (!that.searchValue()){
			that.setDefaultSitesValue();
			updateMarkers(sites);
			return;
		}

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

	//Set the id of the selected item
	that.selectListItem = function(site) {
		//Set selected site
		that.selectedSite(site.id);
		
		//selectMarker
		selectMarker(site);
	};

	//Clears the id of the selected item
	that.clearListItemSelection = function() {
		//Mark site selection as empty
		that.selectedSite(0);

		//Clear animations and infowindow
		clearSelectedMarker();
	};

	//Execute by default to get all sites
	that.setDefaultSitesValue();
};

//viewModel Instance
var vm = new ViewModel();

//Apply KO Bindings
ko.applyBindings(vm);


