/**
*This program uses the tinycolor open source project. For more information, consult
*the TINYCOLOR_LICENSE file
**/
//Color Type Constants
var blue = "blueGreenButton";
var red  = "redBlueButton";
//RED AND BLUE HUE/COLOR MODIFIERS
var contrastR = 25;// red green colorblind value
var contrastB = -10;//blue green colorblind value
var contrast = 100;// default value for testing 
var btype = "UNDEF";

//Initialize port connection with popup script
var port = chrome.runtime.connect({name: "color_port"});
console.log("Hello World!"); //Inspect the page's console to view

//FOR TESTING 
setColors();
console.log("we did it");
//Receive and service color change requests
port.onMessage.addListener(function(msg) {

	//lets check and see are we getting the color type or an array of objects
	console.log("Got a message");
	if(msg.text == red || msg.text == blue)
	{
		btype = msg.text;
		console.log("message received: \"" + btype + "\"");
		port.postMessage({text: "give"});
		setColors();//once we get the message lets begin chaning the colors
	}

	
});

/**
	*This will call other functions 
	*
	*/
	function setColors()
	{
		console.log("Inside of set colors");
		//This is a test to show how to compare the btype and change an element
		if (btype == red) 
		{
			console.log("Setting for red...")
			contrast = contrastR;
		}
		else if (btype == blue)
		{
			console.log("Setting for blue...")
			contrast = contrastB;
		}
		
		//now lets traverse all of the elements and check their background and forground colors
		var subElements = document.body.children;
		for(var i = 0; i < subElements.length; i++)
		{
			console.log("element");
			//change background colors
			var currentColor = subElements[i].style.backgroundColor;//get the current color
			var tinyCurrentColor = tinycolor(currentColor);
			subElements[i].style.backgroundColor = changeContrast(tinyCurrentColor);//lets change it!
			//change text colors
			currentColor = subElements[i].style.color;
			tinyCurrentColor = tinycolor(currentColor);
			subElements[i].style.color = changeContrast(tinyCurrentColor);
		}
	}
	/**
	*This will change the value given by adding contrast to it. If the
	*new value is too low or too high we will wrap the number around.
	*This is very simple, as it is currently for testing purposes. 
	*/
	function changeValue(value)
	{
		var lowest = 0; //the lowest we can go
		var highest = 100;//the highest we can go

		//may change this to multiplication or something
		var newValue = value + contrast;

		if(newValue > highest)//if too high
		{
			newValue = newValue - highest;
		}
		else if(newValue < lowest) // if too low
		{
			newValue = newValue + highest;
		}
		return newValue;
	}
	
	function changeContrast(theTinyColor)
	{
        // var theColor = tinycolor({ r: re, g: ge, b: be });//set up the color
        theTinyColor.toHsl();
       	theTinyColor.darken(contrast);//now lets lighten the color based on the contrast
       	return theTinyColor.toRgbString(); //now lets return the color 
	}


