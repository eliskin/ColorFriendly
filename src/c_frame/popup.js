//Get bg_page object
var bgpage = chrome.extension.getBackgroundPage();
var choice = "default";
var adjustmentEnabled = true;

var kBTypeKey = "kBTypeKey";
var kAdjustmentOnOff = "kAdjustmentOnOff";

var kDefaultButtonBGColor = "#cccccc";
var kSelectedButtonBGColor = "#aaaaaa";
	
//Add listener for color selections
document.addEventListener('DOMContentLoaded', function () {
    var span = document.getElementById("s")
  	span.addEventListener('click', click);

    var adjustmentCheckbox = document.getElementById("AdjustmentToggler");
    adjustmentCheckbox.addEventListener('change', adjustmentCheckboxDidChange);

    chrome.storage.sync.get(kBTypeKey, function(result) {
        if (chrome.runtime.lastError)
            console.warn(chrome.runtime.lastError.message);
        // the first time this runs, undefined is returned,
        // and we don't need another if for that case because
        // the default value of the checkbox will just be true
        else if (typeof result.kBTypeKey == "string" && result.kBTypeKey != "default") {
  	        choice = document.getElementById(result.kBTypeKey);
  	        choice.style.background = kSelectedButtonBGColor;
  	    }
    });

    chrome.storage.sync.get(kAdjustmentOnOff, function(result) {
        if (chrome.runtime.lastError)
            console.warn(chrome.runtime.lastError.message);
        // the first time this runs, undefined is returned,
        // and we don't need another if for that case because
        // the default value of the checkbox will just be true
        else if (typeof result.kAdjustmentOnOff !== "undefined")
        {
            adjustmentCheckbox.checked = result.kAdjustmentOnOff;
            activateOrDeactivateButtons(result.kAdjustmentOnOff);
            adjustmentEnabled = result.kAdjustmentOnOff;
        }
    });
});

//Forward color choice to bg_page.js
function click(e) {
    console.log(choice);
    if (adjustmentEnabled && choice !== e.target && e.target.id != "break") {
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
    //window.close();//close the window
}

function adjustmentCheckboxDidChange(e) {
    // the value of checkbox.checked is the value of the new state
    // of the checkbox (so if the user is unchecking the box,
    // checkbox.checked returns false)
    var checked = e.target.checked;
    if (!checked) {
        choice = "default";
        bgpage.send(choice);
    } else {
        chrome.storage.sync.get(kBTypeKey, function(result) {
            if (chrome.runtime.lastError)
                console.warn(chrome.runtime.lastError.message);
            else if (typeof result.kBTypeKey == "string" && result.kBTypeKey != "default")
                choice = document.getElementById(result.kBTypeKey);
        });
    }
    bgpage.send(checked);
    chrome.storage.sync.set({kAdjustmentOnOff: checked}, function(result) {
        if (chrome.runtime.lastError)
            console.warn(chrome.runtime.lastError.message);
    });

    activateOrDeactivateButtons(checked);
}

function activateOrDeactivateButtons(checked) {
    adjustmentEnabled = checked;
    var redBlueButton = document.getElementById("redBlueButton");
    var blueGreenButton = document.getElementById("blueGreenButton");

    if (!checked) {
        redBlueButton.className = "deactivatedButton";
        blueGreenButton.className = "deactivatedButton";
        redBlueButton.style.opacity = 0.6;
        blueGreenButton.style.opacity = 0.6;
    } else {
        redBlueButton.className = "activatedButton";
        blueGreenButton.className = "activatedButton";
        redBlueButton.style.opacity = 1.0;
        blueGreenButton.style.opacity = 1.0;
    }
}


