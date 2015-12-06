
//Color Type Constants
var blue = "blue";
var red  = "red";
//RED AND BLUE HUE/COLOR MODIFIERS
var contrastR = 1;// red green colorblind value
var contrastB = 1;//blue green colorblind value
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
		if(btype == red)
		{
			console.log("Setting for red...")
		}
		else if(btype == blue)
		{
			console.log("Setting for blue...")
		}
	}
	/**
	*This will analyze the colors values of a specific element and change those
	*values to something that is easier to read. It will determine if it needs
	*/
	function changeValues()
	{
		/**
		*This will be the variable(s) used in calculating the new color
		*values. Depending on what btype is we will set the contrast
		*to a certain value.
		*/

		//set contrast
		var contrast;
		if(btype == red)
		{
			contrast = 1;
		}
		else if(btype == blue)
		{
			contrast = 2;
		}


	}
	
});