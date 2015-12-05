
//Color Type Constants
var blue = "blueGreenButton";
var red  = "redBlueButton";

//Initialize port connection with popup script
var port = chrome.runtime.connect({name: "color_port"});
console.log("Hello World!"); //Inspect the page's console to view

//Receive and service color change requests
port.onMessage.addListener(function(msg) {
	//Get 'blind type' from port message
	var btype = msg.text;
	//Confirm Message
	console.log("message received: \"" + btype + "\"");
	
	/**
	*This will call other functions 
	*such as retrieve elements. 
	*/
	function setColors()
	{
		//This is a test to show how to compare the btype and change an element
		if(btype == red)
		{
			chrome.tabs.executeScript(null,
				{code:"document.body.style.backgroundColor='red'"});//we change the color of background element
		}
		else if(btype == blue)
		{
			chrome.tabs.executeScript(null,
				{code:"document.body.style.backgroundColor='blue'"});//we change the color of background element
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
	/**
	*This will get the elements of the page, and then call
	*changeValues() on each element. Will require traversing the dom tree
	*/
	function retrieveElements()
	{

	}
	
});