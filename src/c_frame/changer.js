/**
*This program uses the tinycolor open source project. For more information, consult
*the TINYCOLOR_LICENSE file
**/
//Color Type Constants
var blue = "blueGreenButton";
var red  = "redBlueButton";
//RED AND BLUE HUE/COLOR MODIFIERS
var contrastR = 25;// red green colorblind value
var contrastB = 10;//blue green colorblind value
var contrast = 20;// default value for testing 
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
		var subElements = document.getElementsByTagName("*");//this gets all elements
		//get the 			
		//traverse all of the children
		for(var i = 0; i < subElements.length; i++)
		{		
			console.log("element");
			var currentColor;
			var tinyCurrentColor;		
			//change background colors		
			if(subElements[i].style)
			{
				console.log("Working...");
				currentColor = getComputedStyle(subElements[i], null);//get the current color
				
				console.log(currentColor.backgroundColor);
				tinyCurrentColor = tinycolor(currentColor);
				subElements[i].style.backgroundColor = changeContrast(tinyCurrentColor);//lets change it!
			}
			// change text colors		
			if(subElements[i].style)
			{
				currentColor = subElements[i].style.color;
				// if(currentColor)
				// {
				// 	console.log("SOMETHING HERE");
				// }
				// console.log(currentColor);
				tinyCurrentColor = tinycolor(currentColor);
				subElements[i].style.color = changeContrast(tinyCurrentColor);
			}
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
		/*
		*So we need to first not change the contrast if an elements light value is already
		*too high or too low. 
		*
		*Second we need to ensure that either blue green or red green dont turn out to be the
		*same color. So to do this we need to check the red value, and if its below
		*a certian threshhold then we, IE if there is a lot of red, then we need to darken,
		*if there is a lot of green then we need to lighten. If there is a lot of both,
		*then we will spin the colors
		*/
        // var theColor = tinycolor({ r: re, g: ge, b: be });//set up the color
        var redThresh = 127;
        var greenThresh = 127; //this will stay the same 
        var blueThresh = 127;
        //set the threshholds
        if (btype == red) 
		{
			redThresh = 127;
		}
		else if (btype == blue)
		{
			blueThresh = 127;
		}
		//is this too bright or dark? 
		// if()
		// {

		// }

        theTinyColor.toRgb();
      //  console.log(theTinyColor.toRgbString());
        if(theTinyColor.r > redThresh)
        {
        	theTinyColor.spin(180);
        }
        else
        {
        	theTinyColor.darken(contrast);
        }
      // 	theTinyColor.lighten(contrast);//now lets lighten the color based on the contrast
       	return theTinyColor.toRgbString(); //now lets return the color 
	}