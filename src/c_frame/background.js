
var color_port; //'blind type'

//Accept port connection with content script
chrome.runtime.onConnect.addListener(function(port) {
	if (port.name != "color_port") return;//Confirm port name
	color_port = port;
	color_port.onMessage.addListener(function(msg) {
		bsetC(msg);
	});
});

//Forward color choice to changer.js
function send(btype) {
	var a = document.body.style.backgroundColor;
	color_port.postMessage({text: a});
}

function bsetC(toChange)
{
	chrome.tabs.executeScript(null,
				{code:"document.body.style.backgroundColor='" + toChange.text +"'"});//we change the color of background element
	getColor();
}

function getColor()
{
	// chrome.tabs.executeScript(null,
	// 			{code:"var a = document.body.style.backgroundColor"});
	var a = document.getElementById("A");
	var b = a.style.backgroundColor;
	send(b);
}

