//Get bg_page object
var bgpage = chrome.extension.getBackgroundPage();
var choice = "default";

var kBTypeKey = "kBTypeKey";
var kFadeOnOff = "kFadeOnOff";

var kDefaultButtonBGColor = "#cccccc";
var kSelectedButtonBGColor = "#aaaaaa";
	
	
//Add listener for color selections
document.addEventListener('DOMContentLoaded', function () {
    var span = document.getElementById("s")
  	span.addEventListener('click', click);
	
    var checkbox = document.getElementById("FadeToggler");
    checkbox.addEventListener('change', checkboxDidChange);	

    chrome.storage.sync.get(kBTypeKey, function(result) {
        if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError.message);
            return;
  	    }
        // the first time this runs, undefined is returned,
        // and we don't need another if for that case because
        // the default value of the checkbox will just be true		
  	    if (typeof result.kBTypeKey == "string" && result.kBTypeKey != "default") {
  	        choice = document.getElementById(result.kBTypeKey);
  	        choice.style.background = kSelectedButtonBGColor;
  	    }
    });
	
  	chrome.storage.sync.get(kFadeOnOff, function(result) {
        if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError.message);
            return;
  	    }
        // the first time this runs, undefined is returned,
        // and we don't need another if for that case because
        // the default value of the checkbox will just be true
        else if (typeof result.kFadeOnOff !== "undefined")		
            checkbox.checked = result.kFadeOnOff;
    });
});

//Forward color choice to bg_page.js
function click(e) {
    console.log(choice);
    if (choice !== e.target && e.target.id != "break") {
        //Highlight Selected Choice
        if (typeof choice != "string")
            choice.style.background = kDefaultButtonBGColor;
        e.target.style.background = kSelectedButtonBGColor;
        choice = e.target;
        bgpage.send([choice.id]);//get the id of the button

        //Save new btype choice
        chrome.storage.sync.set({kBTypeKey: choice.id}, function(result) {
        if (chrome.runtime.lastError)
            console.warn(chrome.runtime.lastError.message);
        });
    }
    else {
        choice.style.background = kDefaultButtonBGColor;
        choice = "default";
        bgpage.send([choice]); //send default change message

        //Save new btype choice
        chrome.storage.sync.set({kBTypeKey: choice}, function(result) {
        if (chrome.runtime.lastError)
            console.warn(chrome.runtime.lastError.message);
        });
    }
    //window.close();//close the window
}

function checkboxDidChange(e) {
    // the value of checkbox.checked is the value of the new state
    // of the checkbox (so if the user is unchecking the box,
    // checkbox.checked returns false)
    var checked = e.target.checked;
    bgpage.send(checked);
    chrome.storage.sync.set({kFadeOnOff: checked}, function(result) {
        if (chrome.runtime.lastError)
            console.warn(chrome.runtime.lastError.message);
    });
}


