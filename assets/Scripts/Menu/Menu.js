#pragma strict

public var botaoJogar: GUISkin;
public var botaoSobre: GUISkin;
public var botaoColeta: GUISkin;
public var botaoSair: GUISkin;
public var botaoMusica: GUISkin[];
public var botaoFerramentas: GUISkin;

private var habilitaSobre : boolean = false;
private var janela : Rect;
private var largura = 800;
private var altura = 720;

public var imagemFundo : SpriteRenderer;
public var fecharSobre: GUISkin;
public var sobreImagem: GUISkin;
public var sobreInsta: GUISkin;
public var sobreSite: GUISkin;
public var sobreFace: GUISkin;

// Auxiliar ao Botao Ferramentas, proposta suspensa.
//public var clickFerramentas = false;

private var scriptMusica: Musica;

//Janela coletor.
private var janelaColetor: JanelaColetor;

private var login: Login;

function Awake () {	

	janelaColetor = FindObjectOfType(typeof(JanelaColetor)) as JanelaColetor;

}

function Start () {

	scriptMusica = FindObjectOfType(typeof(Musica)) as Musica;
	
	login = FindObjectOfType(typeof(Login)) as Login;
	
	janela = Rect(Screen.width/2 - 410,Screen.height/2 - 350, largura, altura);
}

function Update () {

}

function OnGUI() { 

	if(habilitaSobre) {
		GUI.skin = sobreImagem;
		
		imagemFundo.sortingLayerName = "GUI";
		imagemFundo.sortingOrder = 1;
		
		janela = GUI.Window (0, janela, DoMyWindow, "");
	
	}
	
	if(!habilitaSobre && !janelaColetor.habilitar){
		//Metade da largura da tela
		var x = Screen.width/2;
		//Metade da altura da tela
		var y = Screen.height/2;
		
		//Botao jogar
		GUI.skin = botaoJogar;
		var jogar = GUI.Button(new Rect(x + 180, y - 230, 260, 260), "");
		
		//Botao que representa a coleta de dados.
		GUI.skin = botaoColeta;
		var coleta = GUI.Button(new Rect(x + 60 , y - 10, 210, 210), "");
		
		//Botao sobre
		GUI.skin = botaoSobre;
		var sobre = GUI.Button(new Rect(x + 350, y + 10, 190, 190), "");
		
		//Botao sair
		GUI.skin = botaoSair;
		var sair = GUI.Button(new Rect(Screen.width - 240, Screen.height - 100, 484.0f/2, 174.0f/2), "");
		
		//Botao pause musica
		if(scriptMusica.GetEstado()){
			GUI.skin = botaoMusica[0];
		}else{
			GUI.skin = botaoMusica[1];
		}
		
		var musica = GUI.Button(new Rect(Screen.width - 120, Screen.height - 730, 90, 80), "");
		
		//Gatilho para o click do botao ferramentas.
		/*
		* Botao Ferramentas. Prospota suspensa.
		*
		if(clickFerramentas!= false){
			
		}
		
		GUI.skin = botaoFerramentas;
		var ferramentas = GUI.Button(new Rect(Screen.width - 260, Screen.height - 770, 90, 80), "");
		*/
		
		
		if (jogar) {
		
			if(login.getPassagemLiberada() == true){
				Application.LoadLevel("SuiteJogos");
			}else{
				//login.habilita_Desabilita();
				Application.LoadLevel("SuiteJogos");
			}
		}
		
		else if(coleta){
			janelaColetor.habilitar = true;
			print("Coleta!");
		}
		
		else if(sobre){
			habilitaSobre = true;
		}
			
		else if (sair) {
			print("Saiu!");
			Application.Quit();
		}
		
		/*
		* Botao Ferramentas. Proposta Suspensa.
		*else if(ferramentas){
			if(clickFerramentas == false){
				clickFerramentas = true;
			}else{
				clickFerramentas = false;
			}
		}
		*/
		

		else if(musica){
			if(scriptMusica.GetEstado()){
				scriptMusica.PauseOrPlay();
				print("Musica off");
			}else{
				scriptMusica.PauseOrPlay();
				print("Musica On!");
			}
		}
	}
}


function DoMyWindow (windowID : int) {

	GUI.skin = fecharSobre;
	var fechar = GUI.Button (new Rect (660,600,130,120), "");
	
	/*GUI.skin = sobreInsta;
	var insta = GUI.Button (new Rect (660,12,90,90), "");*/
	
	GUI.skin = sobreFace;
	var face = GUI.Button (new Rect (540,12,90,90), "");
	
	GUI.skin = sobreSite;
	var site = GUI.Button (new Rect (620,12,90,90), "");
	
	if(fechar){
		habilitaSobre = false;
		imagemFundo.sortingLayerName = "Default";
		imagemFundo.sortingOrder = -1;
	}
	
	/*if(insta) {
		Debug.Log("Instgran .. ");
	}*/
	
	if(face) {
		Debug.Log("Facebook..");
	}

	if(site){
		Debug.Log("Site..");
	}

}