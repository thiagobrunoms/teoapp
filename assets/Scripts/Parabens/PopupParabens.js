#pragma strict

/*
*
* POPUP que aparece no final de cada jogo trazendo as informaçoes sobre o jogo.
*
*
*/


private var janela : Rect;
private var dados : Rect;
//private var pause : boolean;
private var largura = 500;
private var altura = 450;

public var habilitar = false;

private var popUpDados : int[];

public var skin: GUISkin;
public var skinBotao_sim : GUISkin;
public var skinBotao_nao: GUISkin;

function Start () {
	janela = Rect(Screen.width/2 - largura/2, Screen.height/2 - altura/2, largura, altura);
}

function Update () {}

public function setDadosPopUp (dadosPopUp) {
	this.popUpDados = dadosPopUp;
}


function OnGUI () {
	if (habilitar) {
		GUI.depth = 10;
		GUI.skin = skin;
		janela = GUI.Window (0, janela, DoMyWindow, "");
	}
}

function tempoJogo (tempo : int) {

	var segundos = tempo %60 + "";
	var minutos = (tempo/60)%60 + "";
	var horas = tempo/86400 + "";
	if(segundos.Length < 2){
		segundos = "0" + segundos;
	}
	if(minutos.Length < 2){
		minutos = "0" + minutos;
	}
	
	return minutos + ":" + segundos;	
}

// Make the contents of the window
function DoMyWindow (windowID : int) {
	
	//GUI.Box (Rect (55, 100, largura - 110, 90),"Tempo : " + tempoJogo(popUpDados[4]) + "\n" + "Erros: " +  + "\n" + "Tentativas Totais: " + popUpDados[2] + "\n" + "Maior Atraso: " + tempoJogo(popUpDados[5]));
	
	GUI.contentColor = new Color(0.55f, 0.35f, 0.6f, 0.8f);
	
	
	//Acertos
	GUI.Label (Rect (35, 70, largura - 20, 150), "<size=30>" + popUpDados[0] + "</size>");
	
	//Tentativas
	GUI.Label (Rect (70, 92, largura - 20, 200), "<size=30>" + popUpDados[1] + "</size>");
	
	//Erros
	GUI.Label (Rect (-5, 140, largura - 20, 200), "<size=30>" + popUpDados[2] + "</size>");
	
	//Atraso
	GUI.Label (Rect (35, 185, largura - 20, 200), "<size=30>"+ tempoJogo(popUpDados[5]) + "</size>");
	
	//Tempo
	GUI.Label (Rect (60, 230, largura - 20, 200), "<size=30>"+ tempoJogo(popUpDados[4]) + "</size>");
	
	//Ajuda/Step
	GUI.Label (Rect (-5, 275, largura - 20, 200), "<size=30>" + popUpDados[6] + "</size>");
	
	GUI.skin = skinBotao_sim;
	
	if (GUI.Button (Rect (10,300,140,140), "")) {
		print ("Sim");
		Application.LoadLevel(Application.loadedLevelName);
	}
	
	GUI.skin = skinBotao_nao;
	
	if (GUI.Button (Rect (350,330,135,130), "")) {
		print ("Não");
		Application.LoadLevel("SuiteJogos");
	}
	
	GUI.DragWindow (Rect (0,0,10000,10000));
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