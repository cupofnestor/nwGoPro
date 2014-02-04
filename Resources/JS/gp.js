


//Create a new GoPro remote from node module
//module must be cupofnestor branch
var Camera = require('gopro').Camera
var cam = new Camera('10.5.5.9', 'goprongl')


//Setup the camera
with (cam){  //with changes the scope, all functions or props in the brackets are cam's
	powerOn()
    mode = "photo";
    beepOff();
    photoResolution = "5mpm"
}

//Main function for snapping an image
var snap = function(){
	//startCapture takes a single image in photo mode.
	//then is a callback provided by the deffered object
	cam.startCapture().then(
		function(d){
			$("#snap").animate({opacity:0});
			//hate hate hate timeouts, but it is necessary to ensure that the image has been saved to memory.
			window.setTimeout(loadImage,2000);  }) 
}

//Load the image using a deffered object 
//http://api.jquery.com/category/deferred-object/

//Some basic vars
var camHost = "http://10.5.5.9:8080"
var imgDir ="/videos/DCIM/100GOPRO/";
var lastImg;
var lastUrl;

var loadImage = function(){
	// ls function returns a deffered.
	cam.ls(imgDir).then(
		function(dfd){
			//console.log(dfd);  //inspect the deferred object
			lastImg = dfd[dfd.length-1];
			lastUrl = camHost+imgDir+lastImg.name;
			$("#snap").attr("src",lastUrl);
			$("#snap").load(function(){
				$("#snap").animate({opacity:1})
				//cam.deleteLast();
			});
		}),
		//then() second arg is a callback for error handling
		function(err){
			console.log(err);
		}
}
