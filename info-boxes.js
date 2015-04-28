function initializeDistanceBox(){
	var infoDiv = document.getElementById('info-div');
	//infoDiv.id = "distance-div";
	var newRunButton= document.createElement('div');
	
	
	var km = new kmBox(infoDiv, map);
	var miles = new mileBox(infoDiv, map);
	var elevation = new elevationBox(infoDiv, map);
	var newRun = new newRunButtonCreator(newRunButton,map);
	
	
	
	infoDiv.index = 1;
	newRunButton.index = 1;
	infoDiv.style.cursor = 'default';
	//map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(infoDiv);
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(newRunButton);
	
}

 function newRunButtonCreator(controlDiv, map){
// 	controlDiv.style.padding = '5px';

// 	// Set CSS for the control border
// 	var controlUI = document.createElement('button');
// 	controlUI.clickable = 'true';
// 	controlUI.style.backgroundColor = '#FFBC66';
// 	controlUI.style.borderColor = '#727272';
// 	controlUI.style.borderStyle = 'solid';
// 	controlUI.style.borderRadius = '7px'
// 	controlUI.style.borderWidth = '2px';
// 	controlUI.style.cursor = 'pointer';
// 	controlUI.style.textAlign = 'center';
// 	controlUI.style.boxShadow = '5px 5px 5px #616363';
// 	controlUI.title = 'Distance of your run in Kilometers';
// 	controlUI.id = 'new-run-button';
// 	controlUI.addEventListener('click',clearRunInformation);
// 	controlDiv.appendChild(controlUI);

// 	// Set CSS for the control interior
// 	var controlText = document.createElement('div');
// 	controlText.clickable = 'false';
// 	//controlText.id = 'new-run-button';
// 	controlText.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
// 	controlText.style.fontSize = '20px';
// 	controlText.style.paddingLeft = '4px';
// 	controlText.style.paddingRight = '4px';
// 	controlText.innerHTML = '<b>New Route</b>';
// 	controlUI.appendChild(controlText);
 }

function kmBox(controlDiv, map) {

	// Set CSS styles for the DIV containing the control
	// Setting padding to 5 px will offset the control
	// from the edge of the map
	controlDiv.style.padding = '5px';

	// Set CSS for the control border
	var controlUI = document.createElement('div');
	controlUI.clickable = 'false';
	controlUI.style.backgroundColor = '#F4F4F4';
	controlUI.style.borderColor = '#727272';
	controlUI.style.borderStyle = 'solid';
	controlUI.style.borderRadius = '7px'
	controlUI.style.borderWidth = '2px';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	controlUI.style.boxShadow = '5px 5px 5px #616363';
	controlUI.title = 'Distance of your run in Kilometers';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior
	var controlText = document.createElement('div');
	controlText.clickable = 'false';
	controlText.id = 'distance-string-km';
	controlText.style.fontFamily = 'Arial,sans-serif';
	controlText.style.fontSize = '20px';
	controlText.style.paddingLeft = '4px';
	controlText.style.paddingRight = '4px';
	controlText.innerHTML = '<b>Kilometers</b>';
	controlUI.appendChild(controlText);
}

function mileBox(controlDiv, map) {

	// Set CSS styles for the DIV containing the control
	// Setting padding to 5 px will offset the control
	// from the edge of the map
	controlDiv.style.padding = '5px';

	// Set CSS for the control border
	var controlUI = document.createElement('div');
	controlUI.clickable = 'false';
	controlUI.style.backgroundColor = '#F4F4F4';
	controlUI.style.borderColor = '#727272';
	controlUI.style.borderStyle = 'solid';
	controlUI.style.borderRadius = '7px'
	controlUI.style.borderWidth = '2px';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	controlUI.style.boxShadow = '5px 5px 5px #616363';
	controlUI.title = 'Distance of your run in miles';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior
	var controlText = document.createElement('div');
	controlText.clickable = 'false';
	controlText.id = 'distance-string-miles';
	controlText.style.fontFamily = 'Arial,sans-serif';
	controlText.style.fontSize = '20px';
	controlText.style.paddingLeft = '4px';
	controlText.style.paddingRight = '4px';
	controlText.innerHTML = '<b>Miles</b>';
	controlUI.appendChild(controlText);
}

function elevationBox(controlDiv, map){
	// Set CSS styles for the DIV containing the control
	// Setting padding to 5 px will offset the control
	// from the edge of the map
	controlDiv.style.padding = '5px';

	// Set CSS for the control border
	var controlUI = document.createElement('div');
	controlUI.clickable = 'false';
	controlUI.style.backgroundColor = '#F4F4F4';
	controlUI.style.borderColor = '#727272';
	controlUI.style.borderStyle = 'solid';
	controlUI.style.borderRadius = '7px'
	controlUI.style.borderWidth = '2px';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	controlUI.style.boxShadow = '5px 5px 5px #616363';
	controlUI.title = 'Elevation climbed on your run in feet';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior
	var controlText = document.createElement('div');
	controlText.clickable = 'false';
	controlText.id = 'elevation-box';
	controlText.style.fontFamily = 'Arial,sans-serif';
	controlText.style.fontSize = '20px';
	controlText.style.paddingLeft = '4px';
	controlText.style.paddingRight = '4px';
	controlText.innerHTML = '<b>Climb (ft)</b>';
	controlUI.appendChild(controlText);
}

