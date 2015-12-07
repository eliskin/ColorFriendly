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
var originalColors;
//Initialize port connection with popup script
console.log("Color blind script ready"); //Inspect the page's console to view


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	//Get 'blind type' from port message
	btype = msg.text;
	//Confirm Message
	console.log("message received: \"" + btype + "\"");
	setColors();
	
});

/**
	*This will call other functions 
	*
	*/
	function setColors()
	{
		//This is a test to show how to compare the btype and change an element
		if (btype == red) 
		{
			contrast = contrastR;
		}
		else if (btype == blue)
		{
			contrast = contrastB;
		}
		
		//now lets traverse all of the elements and check their background and forground colors
		var subElements = document.getElementsByTagName("*");//this gets all elements
		//get the 			
		//traverse all of the children
		console.log("Working...");
		for(var i = 0; i < subElements.length; i++)
		{		
			var currentColor;
			var tinyCurrentColor;		
			//change background colors		
			if(subElements[i].style)
			{
				
				currentColor = getComputedStyle(subElements[i], null);//get the current color	
			//	console.log(currentColor.backgroundColor);
				tinyCurrentColor = tinycolor(currentColor.backgroundColor);
			//	console.log(tinyCurrentColor.toRgbString());
				subElements[i].style.backgroundColor = changeContrast(tinyCurrentColor);//lets change it!
			}
			// change text colors		
			if(subElements[i].style)
			{
				currentColor =  getComputedStyle(subElements[i], null);
				tinyCurrentColor = tinycolor(currentColor.color);
				subElements[i].style.color = changeContrast(tinyCurrentColor);
			}
		}	
		console.log("Done");		
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
        var redThresh = 127;
        var blueThresh = 127;

        theTinyColor.toRgb();
        //is it not very close to white or black?
		if(!theTinyColor.isDark() || !theTinyColor.isLight())
		{

			//tinycolors hex setup: #aarrbbgg 
			 //set the threshholds and change colors
	        if (btype == red) 
			{
				var temp = parseInt(theTinyColor.toHex8String().slice(1,3), 16);//lets try and turn the red hexi value to a number
				if( temp > redThresh)
		        {
		        	theTinyColor.spin(contrast);
		        }
		        else
		        {
		        	theTinyColor.darken(contrast);
		        }
			}
			else if (btype == blue)
			{
				var temp = parseInt(theTinyColor.toHex8String().slice(3,5), 16);//lets try and turn the blue hexi value to a number
				if(temp > blueThresh)
		        {
		        	theTinyColor.spin(contrast);
		        }
		        else
		        {
		        	theTinyColor.darken(contrast);
		        }
			}
		}

       

       	return theTinyColor.toRgbString(); //now lets return the color 
	}