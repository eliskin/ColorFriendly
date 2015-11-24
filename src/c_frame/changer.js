
/**
*This adds an event listener o the drop down menu
*/
document.addEventListener('DOMContentLoaded', function () {
  var span = document.getElementById("s")
  span.addEventListener('click', click);
});

var btype;

function click(e) {
	btype = e.target.id;//get the id of the button (btype is short for 'blind type')
  	setColors();
}

/**
*This will call other functions 
*such as retrieve elements. 
*/
function setColors()
{
	//This is a test to show how to compare the btype and change an element
	if(btype == "red")
	{
		chrome.tabs.executeScript(null,
      {code:"document.body.style.backgroundColor='red'"});//we change the color of background element
	}
	else if(btype == "blue")
	{
		chrome.tabs.executeScript(null,
      {code:"document.body.style.backgroundColor='blue'"});//we change the color of background element
	}



	//close the window
	window.close();
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
	if(btype == "red")
	{
		contrast = 1;
	}
	else if(btype == "blue")
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