#pragma strict

public var textura : Texture2D;

public var linha: GameObject;

public var x = 0;
public var y = 0;

private var linhaScript : GuiBar;

function Start() {
	var objeto = Instantiate(linha, Vector2(0, 0), Quaternion.identity);
	linhaScript = objeto.GetComponent("GuiBar") as GuiBar;
	linhaScript.escuro = linhaScript.claro;
	linhaScript.x = x;
	linhaScript.y = y;
}

function OnGUI () {
	GUI.depth = -2;

	GUI.DrawTexture (Rect (x, y, 100, 90), textura);
}

public function setLinha(jogo : String) {
	//linhaScript;
}