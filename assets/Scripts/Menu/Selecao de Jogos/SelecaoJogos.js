#pragma strict

/**
 * Script responsavel pela tela de seleçao de jogos, conta 
 * Objeto possui um ponto de origem e retorna ao mesmo sempre que for associado
 * ao objeto errado.
 *
 * Author: Douglas
 * Date: 21/06/15
**/ 

public var skins: GUISkin[]; //Array com as skins das categorias
public var botoes: boolean[]; //Array com o valor bool dos botoes das categorias
public var jogos: String[]; //Nome das categorias dos jogos

//Demais Skins
public var skinPopUp: GUISkin;
public var skinTitulo: GUISkin;
public var skinJogar: GUISkin;
public var skinVoltar: GUISkin;
public var skinLista: GUISkin;
public var infoSkin: GUISkin;

//Constantes
public static final var ASSOCIACAO = "Associação";
public static final var MATEMATICA = "Matemática";
public static final var PUZZLE = "Quebra-cabeça";
public static final var MEMORIA = "Memória";
public static final var ONDE_ESTA = "Onde Está?";
public static final var AVD = "Atividade Diária";

private var lista: Lista; //Script que gerencia a lista de jogos
private var nivelGUI: NivelGUI; //Script que gerencia a visualizacao do nivel

private var popUp = false;
private var janela : Rect;

private var jogo: String;

private var scrollPosition : Vector2 = Vector2.zero;

function Start () {
	janela = Rect(Screen.width/2 - 750/2.7, Screen.height/2 - 560/2.2, 800, 600);
	lista = FindObjectOfType(typeof(Lista)) as Lista;
	nivelGUI = FindObjectOfType(typeof(NivelGUI)) as NivelGUI;
	
			Debug.Log("----Lista " + lista.jogo.GetNome());

}

function OnGUI () {
		
	Categorias();
	
	if (popUp) {
		GUI.skin = skinPopUp;
		janela = GUI.Window (0, janela, DoMyWindow, "");
	}
}

function Categorias() {
	var largura = 450;
	var altura = 198;
	
	for (var i: int = 0; i < 6; i++) {
		GUI.skin = skins[i];
		botoes[i] = GUI.Button(new Rect(largura, altura, 577/3, 577/3), "");
		
		largura += 200;
		
		if (i == 2) {
			largura = 450;
			altura += 200;
		}
		
		if (!popUp) {
			if (botoes[i]) {
				popUp = true;
				jogo = jogos[i];
			}
		}
	}
}

function DoMyWindow (windowID : int) {

	//Label responsavel pelo info do jogo.
	GUI.skin = infoSkin;
	GUI.Label(Rect (360, 170, 345, 290), lista.info);

	GUI.skin = skinTitulo;
	GUI.Label (Rect (210, 45, 370, 70), jogo);
	
	GUI.skin = skinLista;
	
	scrollPosition = GUI.BeginScrollView (Rect (70,155,265,330),
			scrollPosition, Rect (10, 0, 155, 380));
			
	for (var categoria : String in jogos) {
		if (jogo == categoria) {
			Selecionar(jogo);	
		}
	}
	
	GUI.EndScrollView ();
	
	if (lista.jogo != null) {
		nivelGUI.Exibir(lista.jogo.getNivel());
	} else {
		nivelGUI.Exibir(0);
	}
	
	GUI.skin = skinJogar;
	var jogar = GUI.Button(new Rect(645 , 437, 537/4.0, 500/4.0), "");
	
	GUI.skin = skinVoltar;
	var voltar = GUI.Button(new Rect(562 , 466, 537/4.5, 500/4.15), "");
	
	if (voltar) {
		lista.Validar(-1);
		lista.jogo = null;
		nivelGUI.nivel.nivel = 0;
		popUp = false;
	}
	
	if (jogar) {
//		Debug.Log("Nivel " + nivelGUI.nivel.nivel);
		Debug.Log("Lista " + lista.jogo);
		if (lista.jogo == null) {
			lista.info = "\n\n\nSelecione um Jogo!";
		} else if (nivelGUI.nivel.nivel == 0) {
			lista.info = "\n\n\nSelecione um Nível!";
		} else {
			var jogo = lista.jogo.getCena();
			nivelGUI.nivel.jogo = lista.jogo.GetNome();
			Application.LoadLevel(jogo);
		}
	}
}

public function Selecionar(categoria : String) {
	switch (categoria) {
		case ASSOCIACAO:
			lista.Listar(0, 1);
			break;
		case MATEMATICA:
			lista.Listar(1, 3);
			break;
		case PUZZLE:
			lista.Listar(3, 7);
			break;
		case MEMORIA:
			lista.Listar(7, 11);
			break;
		case AVD:
			lista.Listar(11, 12);
			break;
		default:
			lista.Listar(12, 13);
	}
}