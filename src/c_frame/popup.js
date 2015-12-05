var kBTypeKey = "kBTypeKey";
var kFadeOnOff = "kFadeOnOff";

//Get bg_page object
var bgpage = chrome.extension.getBackgroundPage();

function checkboxDidChange(e) {
    // the value of checkbox.checked is the value of the new state
    // of the checkbox (so if the user is unchecking the box,
    // checkbox.checked returns false)
    var checked = e.target.checked;
    chrome.storage.sync.set({kFadeOnOff: checked}, function(result) {
                            if (chrome.runtime.lastError)
                                console.warn(chrome.runtime.lastError.message);
                            });
}

//Add listener for color selections
document.addEventListener('DOMContentLoaded', function () {
                          var span = document.getElementById("s");
                          span.addEventListener('click', click);

                          var checkbox = document.getElementById("FadeToggler");
                          chrome.storage.sync.get(kFadeOnOff, function(result) {
                                                  if (chrome.runtime.lastError)
                                                    console.warn(chrome.runtime.lastError.message);
                                                  else if (typeof result.kFadeOnOff !== "undefined")
                                                    checkbox.checked = result.kFadeOnOff;
                                                  });
                          checkbox.addEventListener('change', checkboxDidChange);
});

//Forward color choice to bg_page.js
function click(e) {
	bgpage.send([e.target.id]);//get the id of the button
	window.close();//close the window
}

