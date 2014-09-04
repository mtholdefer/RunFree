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

google.maps.event.addDomListener(window, 'load', initialize);
