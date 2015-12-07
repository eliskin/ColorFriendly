
var color_port; //'blind type'
// var code_fetchColor = "var a = document.body.style.backgroundColor;";
//Accept port connection with content script
chrome.runtime.onConnect.addListener(function(port) {
	if (port.name != "color_port") return;//Confirm port name
	color_port = port;

	/*
	*if we get a message we will be doing 1 of 2 things:
	*A: getting the elements colors and sending them back or
	*B: setting the colors of elememnts
	*/
	color_port.onMessage.addListener(function(msg) {
		if(msg.text == "get")
		{
			// getColor();//lets run the get color function
		}
		else//if its not get then it must be an array
		{
			// bsetColor(msg.text);
		}
	});
});

//Forward color choice to changer.js
function send(btype) {
	color_port.postMessage({text: btype});
	//color_port.postMessage({text: a});
}

/**
*This will take an array of objects that contain the name of the object to change and the color value
**/
function bsetColor(toChange)
{

	// chrome.tabs.executeScript(null,
	// 			{code:"document.body.style.backgroundColor='" +  +"'"});//we change the color of background element
//	getColor();
}

/**
*This will get the background and forground colors of all objects and send that array
*to the changer.js file
**/
function getColor()
{
	// chrome.tabs.executeScript(null,
	// // 			{code:"var a = document.body.style.backgroundColor"});
	// var a = document.getElementById("A");
	// var b = a.style.backgroundColor;
	// send(b);
}

