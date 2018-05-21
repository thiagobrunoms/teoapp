#pragma strict

private var janela : Rect;

public var skin: GUISkin;

public var habilitar = false;

private var largura = 800;
private var altura = 700;

function Start () {
	janela = Rect(Screen.width/2 - largura/2, Screen.height/2 - altura/2, largura, altura);
}

function Update () {

}

function DoMyWindow () {

}

function OnGUI () {
	if (habilitar) {
		GUI.skin = skin;
		janela = GUI.Window (1, janela, DoMyWindow, "");
	}
}

function Habilita () {
	if(!habilitar){
		habilitar = true;
	}else{
		Debug.Log("Ja esta ativo!");
	}
}

function Desabilita () {
	if(habilitar){
		habilitar = false;
	}else{
		Debug.Log("Ja esta desativado!");
	}
}	