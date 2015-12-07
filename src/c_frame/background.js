
var kBTypeKey = "kBTypeKey";		
var kFadeOnOff = "kFadeOnOff";

//forward color choice to all tabs
function send(msg) {
    chrome.tabs.query({status: "complete"}, function(tabs) {
        var i;
        for(i=0; i < tabs.length; i++) {
            chrome.tabs.sendMessage(tabs[i].id, {text: msg});
        }
		});
}


chrome.tabs.onUpdated.addListener(function(changeinfo) {
    if (changeinfo.status == "complete") {
        //load previous settings
        chrome.storage.sync.get(kBTypeKey, function(result) {
            send(result.kBTypeKey);
        });
        chrome.storage.sync.get(kFadeOnOff, function(result) {
            send(result.kFadeOnOff);
        });
    }
});