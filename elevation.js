/**
 * 
 */
var initialElevation;
var previousElevation;
function getClimb(pathArray) {
	var elevationArray;
	if (pathArray.length >= 2) {
		elevationArray = [ pathArray[pathArray.length - 2],
				pathArray[pathArray.length - 1] ];
	} else {
		elevationArray = pathArray;
	}
	var elevationRequest = {
		'locations' : elevationArray
	}

	elevator.getElevationForLocations(
					elevationRequest,
					function(results, status) {
						if (status == google.maps.ElevationStatus.OK) {
							var absoluteElevation;
							if (results[0]) {

								if (results.length < 2) {
									previousElevation = results[0].elevation;
									initialElevation = results[0].elevation;
									console.log(initialElevation);
								}

								absoluteElevation = results[results.length - 1].elevation;
								var currentElevation = results[results.length - 1].elevation
										- initialElevation;

								if (currentElevation > previousElevation) {
									climb += (currentElevation - previousElevation);
									document.getElementById('elevation-box').innerHTML = toFeet(climb)
											+ " ft";
								}
								relativeData.addRow([ '', toFeet(currentElevation) ]);
								absoluteData.addRow([ '', toFeet(absoluteElevation) ]);
								climbData.addRow([ '', toFeet(climb)]);
								previousElevation = currentElevation;
							} else {
								console.log("No results found");
							}
						} else {
							console.log("Elevation service failed due to: "
									+ status);
						}
						drawRelativeElevationChart(relativeData);
						drawAbsoluteElevationChart(absoluteData);
						drawClimbChart(climbData);

					});
}
