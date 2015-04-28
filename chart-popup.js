/**
 * 
 */

function openCharts(){
	document.getElementById('over-div').style.zIndex = "9";
	document.getElementById('pop-up-div').style.zIndex = "10";

}
function closeCharts(){
	document.getElementById('over-div').style.zIndex = "-1";
	document.getElementById('pop-up-div').style.zIndex = "-1";
	document.getElementById('load-run-div').style.zIndex='-1';
}
function loadRunPopup(){
	document.getElementById('over-div').style.zIndex = "9";
	document.getElementById('load-run-div').style.zIndex = "10";
}
function savePopup(){
	document.getElementById('over-div').style.zIndex = "9";
	document.getElementById('save-div').style.zIndex = "10";
}
function closeSavePopup(){
	document.getElementById('over-div').style.zIndex = "-1";
	document.getElementById('save-div').style.zIndex = "-1";
}