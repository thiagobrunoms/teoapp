#pragma strict

public var claro : Texture2D;
public var escuro : Texture2D;

public var x = 0;
public var y = 0;

public var texto = "";

function OnGUI() {

	GUI.depth = -1;
	GUI.DrawTexture (Rect (x + 38, y - 35, 660, 160), escuro);
	
	GUI.Label(new Rect(300, 100, 100, 20), texto);
	//GUI.DrawTexture (Rect (0, 0, 710, 160), escuro);
}