#pragma strict

public static final var x_Tela = Screen.width;
public static final var y_Tela = Screen.height;

private var janela : Rect;
public var habilitar = false;

private var largura = 300;
private var altura = 280;

public var skinJanela: GUISkin;
public var skinSair: GUISkin;
public var skinOk: GUISkin;
public var skinNovoRegistro: GUISkin;
public var skinLogin: GUISkin;

private var loginName : String;

private var passagemLiberada = false;
private var showButton = true;


//Script em C# responsavel por ler o arquivo csv e colocar os dados dentro da janela.
private var csScript : CsColetor;

function Awake (){
	csScript = this.GetComponent("CsColetor");
}

function Start () {

	janela = Rect(x_Tela/1.1 - largura/10, y_Tela/1.35 - altura/2, largura, altura);

}

function Update () {}

function OnGUI () {
	
	if(habilitar){
		GUI.skin = skinJanela;
		janela = GUI.Window(0,janela,WindowFunction, "");
	}
}

function WindowFunction (windowID : int) {
	
	var dados = csScript.ReadFromFile();
	
	GUI.skin = skinSair;
	var xSair = largura-40;
	var ySair = altura/23;
	var sair = GUI.Button (Rect (xSair,ySair,35,35), "");
	
	if(showButton){
		GUI.skin = skinLogin;
		var xLogin = largura - 200;
		var yLogin = altura/3.2; 
		var login = GUI.Button (Rect (xLogin,yLogin,100,35), "Entrar");
	}
		
	GUI.skin = skinNovoRegistro;
	var xReg = largura - 200;
	var yReg = altura/1.7;
	var registrar = GUI.Button (Rect (xReg,yReg,100,35), "Registrar");
	
	GUI.skin = skinOk;
	var xOk = largura - 190;
	var yOk = altura/1.25;
	var okBT = GUI.Button (Rect (xOk,yOk,200,135), "");
	
	
	if(sair){
		setHabilita(false);
		
	}else if(okBT){
		Application.LoadLevel("SuiteJogos");
		
		
	}else if(login){
		showButton = false;
		
		//Sumiria o botao criar e so seria colocado o login apos isso ok e ja iria pra suite.
		var xField = largura - 200;
		var yField = altura/3.2; 
		loginName = GUI.TextField (Rect (xField, yField, 100, 20), "", 25);
	}
}

//--------------------------------------------
//Habilitar e desabilitar o pop-up.
function habilita_Desabilita(){
	if(habilitar != true){
		habilitar = true;
	}else{
		habilitar = false;
		livrePassagem();
	}
}

//-------------------------------------------
//--Get e Set do controlador para poder passar da tela de login para a suite.
function getPassagemLiberada(){
	return passagemLiberada;
}

function setPassagemLiberada ( valor : boolean){
	passagemLiberada = valor;
}
//-------------------------------------------
//Conferidor da permissao para passar para tela suite jogos.

function livrePassagem(){
	if (getPassagemLiberada() != true){
		setPassagemLiberada(true);
	}else{
		setPassagemLiberada(false);
	}
}

function setHabilita(valor: boolean){
	habilitar = valor;
}




