
var color_port; //'blind type'

//Accept port connection with content script
chrome.runtime.onConnect.addListener(function(port) {
    if (port.name != "color_port") return;//Confirm port name
    color_port = port;

    var kBTypeKey = "kBTypeKey";
    var kFadeOnOff = "kFadeOnOff";

    chrome.storage.sync.get(kBTypeKey, function(result) {
        send(result.kBTypeKey);
    });
    chrome.storage.sync.get(kFadeOnOff, function(result) {
        send(result.kFadeOnOff);
    });
});

//Forward color choice to changer.js
function send(btype) {
	  color_port.postMessage({text: btype});
}