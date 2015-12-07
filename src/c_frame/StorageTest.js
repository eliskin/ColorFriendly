var kBTypeKey = "kBTypeKey";
var kFadeOnOff = "kFadeOnOff";

var x = false;

chrome.storage.sync.set({kBTypeKey: x}, function(result) {
                            if (chrome.runtime.lastError)
                                console.warn(chrome.runtime.lastError.message);
                        });


chrome.storage.sync.get(kBTypeKey, function(result) {
                            if (chrome.runtime.lastError)
                                console.warn(chrome.runtime.lastError.message);
                            else
                                alert(result.kBTypeKey);
                        });