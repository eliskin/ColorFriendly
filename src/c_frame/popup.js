
var btype;

//Accept port connection with content script
chrome.runtime.onConnect.addListener(function(port) {
	if (port.name != "color_port") return;//Confirm port name

	function click(e) {
		btype = e.target.id;//get the id of the button (btype is short for 'blind type')
		port.postMessage({text: btype});
		window.close();//close the window

	}

});