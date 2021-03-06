var map;
var poly;
var on;
var i;
var elevator;
var climb;
var data;
var geocoder;
var relativeElevationChart;
var absoluteElevationChart;
var climbChart;
var relativeData;
var startLocatoin;

google.load('visualization', '1', {
	packages : [ 'corechart' ]
});

function initialize() {
	var mapOptions = {
		zoom : 15,
		dragable : false,
	    center : new google.maps.LatLng(38.186434, -76.429155),
		mapTypeId : 'terrain'
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	elevator = new google.maps.ElevationService();
	
	 relativeElevationChart = new google.visualization.LineChart(document
			.getElementById('relative-elevation-chart'));
	absoluteElevationChart = new google.visualization.LineChart(document
			.getElementById('absolute-elevation-chart'));
	climbChart = new google.visualization.LineChart(document
			.getElementById('climb-chart'));

  var searchInput = document.getElementById('search-input');
  

  var saveButton = document.getElementById('save-button');
  var loadButton = document.getElementById('load-button');
  var newRouteButton = document.getElementById('new-route-button');
  var undoButton = document.getElementById('undo-button');
  var topControlsDiv = document.getElementById('top-controls-div');
  var trackerStatus = document.getElementById('tracker-status-container');
  var showChartsButton = document.getElementById('chart-button-div');
  var popupSaveButton = document.getElementById('pop-up-save-button');
  var username = document.getElementById('username');
  var popupCancelButton = document.getElementById('pop-up-cancel-button');

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInput);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(topControlsDiv);
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(trackerStatus);
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(showChartsButton);
  

  var searchBox = new google.maps.places.SearchBox((searchInput));

  showChartsButton.addEventListener('click', function(){
  	openCharts();
  });

  newRouteButton.addEventListener('click', function(){
  		clearRunInformation();
  });

  undoButton.addEventListener('click', function(event){
  		undo(event);
  });

  loadButton.addEventListener('click', function(){
  		loadRunPopup();
  });

  saveButton.addEventListener('click', function(){
  		savePopup();
  		saveRoute();
  });

  popupCancelButton.addEventListener('click',function(){
  		closeSavePopup();
  });

  popupSaveButton.addEventListener('click',function(){
 	 	closeSavePopup();
  });


  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();
    var bounds = new google.maps.LatLngBounds();

    if (places.length == 0) {
      return;
    }

    for (var i = 0, place; place = places[i]; i++) {

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
    map.setZoom(16);
  });

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
	
	relativeData = new google.visualization.DataTable();
	absoluteData = new google.visualization.DataTable();
	climbData = new google.visualization.DataTable();
	
	geocoder  = new google.maps.Geocoder();
	initializeDataTable(relativeData);
	initializeDataTable(absoluteData);
	initializeDataTable(climbData);
	
	drawRelativeElevationChart(relativeData);
	drawAbsoluteElevationChart(absoluteData);
	drawClimbChart(climbData);
	
	initializeDistanceBox();
	initializePolylines();

	google.maps.event.addListener(map, 'click', toggleOnOff);
	google.maps.event.addListener(map, 'mousemove', mouseTrack);
	document.addEventListener('keypress',function (e) {
	    var key = e.which || e.keyCode;
	    if (key == 13) { // 13 is enter
	      newLocation();
	    }
	});
	
}

function newLocation(){
	var address = document.getElementById('address').value;
	  geocoder.geocode( { 'address': address}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	      map.setCenter(results[0].geometry.location);
	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
}


function initializeDataTable(dataTable) {
	dataTable.addColumn('string', 'Sample');
	dataTable.addColumn('number', 'Elevation');
}

function drawRelativeElevationChart(dataTable) {
	relativeElevationChart.draw(dataTable, {
		curveType : 'function',
		legend : 'none',
		titleY : 'Relative Elevation (ft)'
	});
} 

function drawAbsoluteElevationChart(dataTable) {
	absoluteElevationChart.draw(dataTable, {
		curveType : 'function',
		legend : 'none',
		titleY : 'Absolute Elevation (ft)'
	});
} 

function drawClimbChart(dataTable) {
	climbChart.draw(dataTable, {
	
		legend : 'none',
		titleY : 'Climb (ft)'
	});
} 

function toMiles(km) {
	var dist = km * 0.62137;
	return Math.round(dist * 1000) / 1000;
}

function toKm(dist) {
	return Math.round(dist * 1000) / 1000;
}

function toMeters(meters) {
	return Math.round(meters * 1000) / 1000;
}

function toFeet(meters) {
	var feet = meters * 3.28084;
	return Math.round(feet * 10) / 10;
}

function saveRoute() {

	 var locationString = document.getElementById('form-location');
	 geocoder.geocode({'latLng': startLocation}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var fullAddress = results[0].formatted_address;
      var  value=fullAddress.split(",");
      count=value.length;
      state=value[count-2];
      city=value[count-3];
      locationString.innerHTML = city + ", " + state + " : " + toMiles(poly.inKm()) + " miles";
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
