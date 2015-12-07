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
//var originalColors = ["nothing"];
//Initialize port connection with popup script
console.log("Color blind script ready"); //Inspect the page's console to view


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	//Get 'blind type' from port message
	btype = msg.text;
	//Confirm Message
	console.log("message received: \"" + btype + "\"");
	saveColors();
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
		//traverse all of the children
		console.log("Working...");
		for(var i = 0; i < subElements.length; i++)
		{		
			var currentColor;
			var tinyCurrentColor;		
			//change background colors		
			if(subElements[i].style)
			{
				
				currentColor = getComputedStyle(subElements[i], null);//get the current cumpoted style based on css and html
				tinyCurrentColor = tinycolor(currentColor.backgroundColor);//get just the color
				subElements[i].style.backgroundColor = changeContrast(tinyCurrentColor);//lets change it!
			}
			// change forground colors		
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
		//set these thresh hold values
        var redThresh = 127;
        var blueThresh = 127;
        //change it ro rgb
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
		        	theTinyColor.spin(contrast);//if its too much, we will spin the colors
		        }
		        else
		        {
		        	theTinyColor.darken(contrast);//if its below we can darken
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