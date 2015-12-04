//Get bg_page object
var bgpage = chrome.extension.getBackgroundPage();
	
//Add listener for color selections
document.addEventListener('DOMContentLoaded', function () {
	var span = document.getElementById("s")
	span.addEventListener('click', click);
});

//Forward color choice to bg_page.js
function click(e) {
	bgpage.send([e.target.id]);//get the id of the button
	window.close();//close the window
}

