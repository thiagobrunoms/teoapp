#pragma strict

public var skinHome: GUISkin;

function Start () {

}

function Update () {

}

function OnGUI() {
	GUI.skin = skinHome;
	var home = GUI.Button(new Rect(-40 , -15, 791/3.2, 440/2.8), "");
	
	if (home) {
		Application.LoadLevel("Menu");
	}
}