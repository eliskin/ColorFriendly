
//Color Type Constants
var blue = "blue";
var red  = "red";
//RED AND BLUE HUE/COLOR MODIFIERS
var contrastR = 1;// red green colorblind value
var contrastB = 1;//blue green colorblind value
var contrast;
var btype = "UNDEF";
//Initialize port connection with popup script
var port = chrome.runtime.connect({name: "color_port"});
console.log("Hello World!"); //Inspect the page's console to view
//Receive and service color change requests
port.onMessage.addListener(function(msg) {

	//lets check and see are we getting the color type or an array of objects
	if(msg.text == red || msg.text == blue)
	{
		btype = msg.text;
		console.log("message received: \"" + btype + "\"");

		port.postMessage({text: "give"});
	}
	else
	{
		setColors();
	}

	/**
	*This will call other functions 
	*
	*/
	function setColors()
	{
		//This is a test to show how to compare the btype and change an element
		var 2darray = msg.text;
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
		*	name 
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
		for(int i = 0; i < 2darray; i++)
		{
			//This will traverse the background and the forground color of an object
			var oldc = 2darray[i][0].c;

		}
	}
	/**
	*This will change the value given by adding contrast to it. If the
	*new value is too low or too high we will wrap the number around
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
	
});