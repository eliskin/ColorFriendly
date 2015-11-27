
var btype;

function click(e) {
	btype = e.target.id;//get the id of the button (btype is short for 'blind type')
  	setColors();
	//close the window
	window.close();
}