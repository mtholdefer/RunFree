/**
 * 
 */

function initializePolylines() {
	polyOptions = {
		strokeColor : '#7CF574',
		strokeOpacity : 1.0,
		strokeWeight : 3,
		clickable : false,
		geodesic : true
	};

	poly = new google.maps.Polyline(polyOptions);
	poly.setMap(map);
	climb = 0;

	i = 0;
	on = false;
}

function clearRunInformation(event) {

	poly.setMap(null);
	poly = new google.maps.Polyline(polyOptions);
	poly.setMap(map);
	climb = 0;
	relativeData = new google.visualization.DataTable();
	absoluteData = new google.visualization.DataTable();
	climbData = new google.visualization.DataTable();

	initializeDataTable(relativeData);
	initializeDataTable(absoluteData);
	initializeDataTable(climbData);

	drawRelativeElevationChart(relativeData);
	drawAbsoluteElevationChart(absoluteData);
	drawClimbChart(climbData);

	on = false;

	document.getElementById('distance-string-km').innerHTML = "Kilometers"
	document.getElementById('distance-string-miles').innerHTML = "Miles";
	document.getElementById('elevation-box').innerHTML = "Climb (ft)";
}

function mouseTrack(event) {
	var path = poly.getPath();

	if (on === true) {
		if (i % 5 === 0) {
			path.push(event.latLng);
			if (i % 10 === 0) {
				getClimb(path.getArray());
			}
			document.getElementById('distance-string-km').innerHTML = ""
					+ toKm(poly.inKm()) + " km"
			document.getElementById('distance-string-miles').innerHTML = ""
					+ toMiles(poly.inKm()) + " mi"
		}
		i++;
	}
	if (i > 100) {
		i = 0;
	}
}

function toggleOnOff(event) {
	if (on === true) {
		// console.log("TURN OFF");
		document.getElementById('tracker-status').innerHTML = "Off";
		document.getElementById('tracker-status-container').style.backgroundColor = "red";
		on = false;
	} else if (on === false) {
		document.getElementById('tracker-status').innerHTML = "On";
		document.getElementById('tracker-status-container').style.backgroundColor = "green";
		// console.log("TURN ON");
		on = true;
	}
}

function undo(event) {
	poly.getPath().pop();
	document.getElementById('distance-string-km').innerHTML = ""
			+ toKm(poly.inKm()) + " km"
	document.getElementById('distance-string-miles').innerHTML = ""
			+ toMiles(poly.inKm()) + " mi"
}
