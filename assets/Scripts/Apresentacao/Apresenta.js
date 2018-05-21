#pragma strict

public var logo : GUITexture;

function Update (){}
 
function Start () {
//<<<<<<< HEAD
//=======

	
//>>>>>>> origin/master
	Screen.SetResolution(1280, 775, true);
	
	Screen.autorotateToPortrait = true;

	Screen.autorotateToPortraitUpsideDown = true;

	Screen.orientation = ScreenOrientation.LandscapeLeft;
//<<<<<<< HEAD

//=======
	
//>>>>>>> origin/master
    yield Fade(0.0, 1.0, 2.0);     // fade up
    yield Fade(1.0, 0.0, 2.0);     // fade down
    Application.LoadLevel("Menu");
}
 
function Fade (startLevel :float, endLevel :float, duration :float) {
    var speed : float = 1.0/duration;  
    for (var t :float = 0.0; t < 1.0; t += Time.deltaTime*speed) {
        logo.color.a = Mathf.Lerp(startLevel, endLevel, t);
        yield;
    }
}