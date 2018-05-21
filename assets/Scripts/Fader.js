#pragma strict

public var logo : GUITexture;
public var ativador = false;

function Update () {
	if(ativador){
		Inicia();
	}
}

function Start (){}
 
function Inicia () {
    yield Fade(0.0, 1.0, 2.0);     // fade up
    yield Fade(1.0, 0.0, 2.0);     // fade down
    //Chama proxima cena.
}
 
function Fade (startLevel :float, endLevel :float, duration :float) {
    var speed : float = 1.0/duration;  
    for (var t :float = 0.0; t < 1.0; t += Time.deltaTime*speed) {
        logo.color.a = Mathf.Lerp(startLevel, endLevel, t);
        yield;
    }
}