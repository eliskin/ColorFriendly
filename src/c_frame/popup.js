var kBTypeKey = "kBTypeKey";
var kFadeOnOff = "kFadeOnOff";
var kDefaultButtonBGColor = "#cccccc";
var kSelectedButtonBGColor = "#aaaaaa";
var kRedBlue = "redBlue";
var kBlueGreen = "blueGreen";

//Get bg_page object
var bgpage = chrome.extension.getBackgroundPage();

// Persist user selection of whether the fade animation should be shown
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

// Persist user color blindness type of red-blue
function redBlueButtonSelected(e) {
    redBlueButton.style.background = kSelectedButtonBGColor;
    blueGreenButton.style.background = kDefaultButtonBGColor;

    chrome.storage.sync.set({kBTypeKey: kRedBlue}, function(result) {
        if (chrome.runtime.lastError)
            console.warn(chrome.runtime.lastError.message);
    });
}

// Persist user color blindness type of blue-green
function blueGreenButtonSelected(e) {
    redBlueButton.style.background = kDefaultButtonBGColor;
    blueGreenButton.style.background = kSelectedButtonBGColor;

    chrome.storage.sync.set({kBTypeKey: kBlueGreen}, function(result) {
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
        // the first time this runs, undefined is returned,
        // and we don't need another if for that case because
        // the default value of the checkbox will just be true
        else if (typeof result.kFadeOnOff !== "undefined")
            checkbox.checked = result.kFadeOnOff;
    });
    checkbox.addEventListener('change', checkboxDidChange);

    var redBlueButton = document.getElementById("redBlueButton");
    var blueGreenButton = document.getElementById("blueGreenButton");
    redBlueButton.addEventListener('click', redBlueButtonSelected);
    blueGreenButton.addEventListener('click', blueGreenButtonSelected);

    chrome.storage.sync.get(kBTypeKey, function(result) {
        if (chrome.runtime.lastError)
            console.warn(chrome.runtime.lastError.message);
        // the first time this runs, undefined is returned,
        // and we don't need another if for that case because
        // the default background color will be kDefaultButtonBGColor
        else if (typeof result.kBTypeKey !== "undefined")
        {
            if (result.kBTypeKey == kRedBlue)
                redBlueButton.style.background = kSelectedButtonBGColor;
            else
                blueGreenButton.style.background = kSelectedButtonBGColor;
        }
    });
});

//Forward color choice to bg_page.js
function click(e) {
	bgpage.send([e.target.id]);//get the id of the button
	window.close();//close the window
}

