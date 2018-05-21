#pragma strict

public var erros = 0;
public var maximo = 3;

public var botao: GUISkin;

private var habilita = false;

private var instanciador:MainCores;

function Start () {
	instanciador = FindObjectOfType(typeof(MainCores)) as MainCores;
}

function Update () {
	if (erros >= maximo) {
		habilita = true;
	} else {
		habilita = false;
	}
}

function OnGUI() {
	if (habilita) { 
		GUI.skin = botao;
		var largura = 164.0f;
		var altura = 41.0f;
	
		var cuboPosicao = Camera.main.WorldToScreenPoint(Vector2(5, -4));
	
		var posX = cuboPosicao.x - 164/2;
		var posY = Screen.height - (cuboPosicao.y + 250);
		var sair = GUI.Button(new Rect(posX, posY, largura, altura), "");
	
		if (sair) {
			//Instanciador.MudarCor();
		}
	}
}


