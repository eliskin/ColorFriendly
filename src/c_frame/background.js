
var color_port; //'blind type'

//Accept port connection with content script
chrome.runtime.onConnect.addListener(function(port) {
	  if (port.name != "color_port") return;//Confirm port name
	  color_port = port;
});

//Forward color choice to changer.js
function send(btype) {
	  color_port.postMessage({text: btype});
}
