#pragma strict

/*
 * Script que organiza o jogo e faz uso de dois outros scripts, Cores (tabela) e cubo (deck).
 *
 * Author: Diogenes e Douglas
 * Date: 08/09/15
**/
import System.Collections.Generic;
//--- scripts ---//
//Script em C# responsavel por gerar o arquivo csv e colocar os dados dentro do mesmo.
public var csScript : CsColetor;
//Responsavel pela coleta. Vide Script Coletor.js;
public var coletorGame: Coletor;

public static final var x = 6;
public static final var y = -4.5;
public static final var z = 0;

public var cores: List.<GameObject>;
public var tamanho: int;
private var cubo: GameObject;
public var coresScript:Cores;
private var index: int;

//Duas variaveis pois em algum momento erros sera setado como 0.
public var erros = 0;
public var errosTotais = 0;

public var botao: GUISkin;

public var jogou: boolean;

public var areaDeli: GameObject;


public var parabens: GameObject;

function Start() {

	coletorGame.SetNomeJogo("A. Cores");
	coletorGame.SetNivelJogo(coresScript.nivelScript.nivel);

	tamanho = coresScript.tamanho;
	
	index = Random.Range(0.0, tamanho);
	cubo = Instantiate(cores[index],  Vector2(x, y), Quaternion.identity);
	
	//Definindo area em que a peça delimitadora branca ira ficar.
	areaDeli.transform.position = Vector3(5.85, -2.5f,0);
}

function Update() {
	if (cubo == null && tamanho > 0) {
		cores.RemoveAt(index);
		tamanho--;
		if (tamanho > 0) {
			index = Random.Range(0.0, tamanho);
			cubo = Instantiate(cores[index],  Vector2(x, y), Quaternion.identity);
		} else {
			temporizador();
			coletorGame.SetErro(errosTotais);
			PlayerCompletaGame();
		}
	temporizador();
	}
}

function MudarCor() {

	AddStep();
	var antigoIndex = index;
	
	if (tamanho > 0) {
		Destroy(cubo);
		
		do {
			index = Random.Range(0.0, tamanho);
		} while(antigoIndex == index);
		cubo = Instantiate(cores[index],  Vector2(x, y), Quaternion.identity);
	}
	erros = 0;
}

function OnGUI() {
	
	if (erros >= 3) { 
		GUI.skin = botao;
		var largura = 164.0f;
		var altura = 41.0f;
	
		var cuboPosicao = Camera.main.WorldToScreenPoint(Vector2(5, -4));
	
		var posX = cuboPosicao.x - 164/2;
		//var posY = Screen.height - (cuboPosicao.y + 250);
		var posY = (Screen.height/1.5 - cuboPosicao.y);
		var sair = GUI.Button(new Rect(posX, posY, largura, altura), "");
	
		if (sair) {
			MudarCor();
		}
	}
}

//Apenas para saber quanto tempo de jogo e fazer o calculo do delay.
function temporizador () {
	coletorGame.SetTempoTotal(Time.timeSinceLevelLoad);
}

//Funcao que escreve os dados e apresenta ao final da partida.
function PlayerCompletaGame(){

	 Instantiate(parabens, Vector3(0, 0, -2), Quaternion.identity);	

	
	var dadosPopUp = coletorGame.RetornaDados();//Gera um array contendo os dados da partida.
	
	csScript.SaveToFile(coletorGame.RetornaString()); //Escreve os dados da partida no arquivo.csv
	
	//Apos definir no PopUp passase dadosPopUp como parametro na funcao abaixo.
	var popupScript = FindObjectOfType(typeof(PopupParabens)) as PopupParabens;
	
	popupScript.setDadosPopUp(dadosPopUp);
	
	coletorGame.ConfereDados();
	//Entrada para o banco de dados.
}

//Usados para comunicaçao entre os 3 scripts. Cubo -> Instanciador -> Coletor.
public function AddAcerto () {
	coletorGame.SetAcerto();
}

public function AddErro () {
	coletorGame.SetErro();
}

public function AddDragDrop () {
	coletorGame.SetDragDrop();
}

public function AddStep () {
	coletorGame.SetStep();
}