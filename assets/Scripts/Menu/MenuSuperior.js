#pragma strict

public var botaoHome: GUISkin;
public var botaoJogos: GUISkin;
public var botaoJogarNovamente: GUISkin;

public var botaoSim: GUISkin;
public var botaoNao: GUISkin;
public var janelaSkin: GUISkin;

private var janela : Rect;
private var largura = 700;
private var altura = 400;

public var showJanelaPre : boolean =  false;
private var carregaCena : String = "";

public var imagemFundo : SpriteRenderer;


//public var logo: Texture2D;
private var nivel: Nivel;
private var habilita = true;

function Start () {
	nivel = FindObjectOfType(typeof(Nivel)) as Nivel;
	
	//Debug.Log("Wd: " + Screen.width + " L" + Screen.height);
	
	janela = Rect(Screen.width/2 - 330,Screen.height/2 - 220, largura, altura);
}

function OnGUI() {
	
	
	if(showJanelaPre){
	
		GUI.skin = janelaSkin;
		
		imagemFundo.sortingLayerName = "GUI";
		imagemFundo.sortingOrder = 1;
		
		janela = GUI.Window (0, janela, DoMyWindow, "");
	}

	if (!habilita) {
	
		GUI.skin = botaoJogarNovamente;
		
		var jogarNovamente = GUI.Button(new Rect(Screen.width - 175, Screen.height - 155, 200, 180), "");
		
		if (jogarNovamente) {
			Application.LoadLevel(Application.loadedLevelName);
		}
		//GUI.enabled = false;
		//GUI.color.a = 0.5f;
	}
	
	if(!showJanelaPre){
		//Define skin do menu
		GUI.skin = botaoHome; 
		var home = GUI.Button(new Rect(-40 , -15, 791/3.2, 440/2.8), "");
		
		GUI.skin = botaoJogos;
		var jogos = GUI.Button(new Rect(-52, Screen.height - 145, 220, 180), "");
			
		if (home) {
			showJanelaPre = true;
			carregaCena = "Menu";
		}
		
		if (jogos) {
			showJanelaPre = true;
			carregaCena = "SuiteJogos";
		}
	}
}

function DoMyWindow (windowID : int) {
	
	GUI.skin = botaoSim;
	var sim = GUI.Button (new Rect (130,190,160,130), "");
	
	GUI.skin = botaoNao;
	var nao = GUI.Button (new Rect (405,190,160,130), "");
	
	if(sim) 
	{
		Application.LoadLevel(this.carregaCena);
		nivel.Destruir();
		showJanelaPre = false;
		
		imagemFundo.sortingLayerName = "Default";
		imagemFundo.sortingOrder = -1;
	}
	
	if(nao)
	{
		showJanelaPre = false;
		imagemFundo.sortingLayerName = "Default";
		imagemFundo.sortingOrder = -1;
	}
}

public function Desabilitar() {
	habilita = false;
}