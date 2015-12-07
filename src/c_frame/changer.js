
//Color Type Constants
var blue = "blueGreenButton";
var red  = "redBlueButton";
//RED AND BLUE HUE/COLOR MODIFIERS
var contrastR = 100;// red green colorblind value
var contrastB = -45;//blue green colorblind value
var contrast;
var btype = "UNDEF";

//Initialize port connection with popup script
var port = chrome.runtime.connect({name: "color_port"});
console.log("Hello World!"); //Inspect the page's console to view
//document.body.style.backgroundColor = "red";
console.log(test2);
//Receive and service color change requests
port.onMessage.addListener(function(msg) {

	//lets check and see are we getting the color type or an array of objects
	console.log("Got a message");
	if(msg.text == red || msg.text == blue)
	{
		btype = msg.text;
		console.log("message received: \"" + btype + "\"");
		port.postMessage({text: "give"});
	}
	// else
	// {
	// 	setColors();
	// }

	/**
	*This will call other functions 
	*
	*/
	function setColors()
	{
		//This is a test to show how to compare the btype and change an element
		var d2array = msg.text;
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
			
		/*
		*How the color objects are set up:
		*object{
		*	n 
		*	r
		*	g
		*	b
		*	c
		*	}
		*The array is 2D, each section
		*represents the background and forground color of an html object
		*So for example, [x][0] is the forground color of some objext x
		*and [x][1] is the background color of some object x
		*/

		//This will traverse every html object
		for(var i = 0; i < d2array.length; i++)
		{
			//This will traverse the background and the forgeround color of an object
		//	var oldc = d2array[i][0].c;
			d2array[i][0] = changeValue(d2array[i][0].c);
			d2array[i][1] = changeValue(d2array[i][1].c);
			//This section can be changed to manipulate different color values in differnet ways
		}
		//now that we have changed the values lets send it back
		port.postMessage({text: d2array});
	}
	/**
	*This will change the value given by adding contrast to it. If the
	*new value is too low or too high we will wrap the number around.
	*This is very simple, as it is currently for testing purposes. 
	*/
	function changeValue(value)
	{
		var lowest = 0; //the lowest we can go
		var highest = 255;//the highest we can go

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
	
	function changeContrast(r, g, b)
	{
        

	}
});


