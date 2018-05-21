#pragma strict

static var TEMPO_ROLETA = 6;

public var numeros: GameObject[];

public var primeiro: GameObject;

public var habilita = true;

public var comecaContagem = false;

public var bloqueador: GameObject;

public var valor = 0;

public var resultado = "";

public var controle = 0;

public var skinConferir: GUISkin;

//Responsavel pela coleta. Vide Script Coletor.js;
public var coletorGame: Coletor;

//Script em C# responsavel por gerar o arquivo csv e colocar os dados dentro do mesmo.
public var csScript : CsColetor;

public var parabens: GameObject;
private var finalizado = false;

private var menuSuperior: MenuSuperior;

private var acertou: AudioSource;
private var errou: AudioSource;

public var array : GameObject[];

function Start() 
{
	errou = GameObject.FindWithTag("errou").GetComponent(AudioSource);

	menuSuperior = FindObjectOfType(typeof(MenuSuperior)) as MenuSuperior;

	coletorGame.SetNomeJogo("S.Número");
	coletorGame.SetNivelJogo(1);

}

function Update () {
	if (habilita) {
		girarRoleta();
	}
	
	if (controle == 2) {
		Inverter(resultado);
		print("final " + resultado);
		controle = -1;
	}
	//Restringir para que comece a contar apenas quando acabar de girar.
	if(comecaContagem){
		coletorGame.SetTempoTotal(Time.timeSinceLevelLoad - TEMPO_ROLETA);
	}
}

function girarRoleta() {
	var limite = Random.Range(1, 12);
	var parar = Random.Range(0, 10);
	
	print(parar);
	
	Sortear(5.5, limite, parar);
	
	limite = Random.Range(13, 19);
	
	if (parar == 0) {
		parar = Random.Range(1, 3);
	} else {
		parar = Random.Range(0, 2);
	}
	
	print(parar);
	Sortear(3.5, limite, parar);
	
	/*
	*Futura implementaçao do nivel 2 com tres casas.
	*
	limite = Random.Range(25, 30);
	Sortear(3.45, limite, 0);
	*/
	habilita = false;	
}

function Inverter(entrada:String) {
	var temp = "";
	for (var i = entrada.length - 1; i >= 0; i--) {
			temp += entrada[i];
	}
	resultado = temp;
	print("Temp " + temp);
}

function Sortear(x:float, limite:int, parar:int) {

	var index = 0;
	
	var contador = 0;

	print("Limite " + limite);
	
	var indexSub = -1;
	
	while (contador < limite || indexSub != parar) {
		print("Valor do index " + (index - 1));
		print("Contador do limite: " + contador + "; limite: " + limite);
		primeiro = Instantiate(numeros[index],  Vector2(x, 2.5), Quaternion.identity);
		
		//if (index == parar) {
		//	break;
		//}
		
		index = (index + 1) % numeros.Length;
		
		
		yield WaitForSeconds(.2);
		contador += 1;
		
		if (index == 0) {
			indexSub = 9;
		} else {
			indexSub = index - 1;
		}
	}
	
	var resultado2 = (index - 1) % numeros.Length;
	
	if (resultado2 == -1) {
		resultado2 = 9;
	}
	
	Instantiate(bloqueador,  Vector2(x, 1.2), Quaternion.identity);
	
	resultado += resultado2;
	controle ++;
}

function OnGUI() {
	if (controle == -1 && !finalizado && !(menuSuperior.showJanelaPre)) { 
	/* showJanelaPre - serve para so aparecer o botao caso nao esteja com a janela presvencao ativada
		deu problema pois ele ficava sobre ela.*/
		var XBOTAO = Screen.width - 228;
		var YBOTAO = Screen.height - 448;
		Debug.Log("Aqui " + XBOTAO + "   " + YBOTAO);
		GUI.skin = skinConferir;
		var confirmar = GUI.Button(Rect(XBOTAO, YBOTAO,168,135),"");
		comecaContagem = true;
		if (confirmar) {
			Verificar();
		}
	}
}

function Verificar() {
	var temp = int.Parse(resultado);
	Debug.Log(temp + " " + valor);
	if (temp == valor) {
		for (var i : int = 0; i < 7; i++) {
			var script = array[i].GetComponent("ObjetoSimbo") as ObjetoSimbo;
			script.SetOk(true);
		}
		coletorGame.SetAcerto();
		PlayerCompletaGame();
		finalizado = true;
	} else {
		coletorGame.SetErro();
		errou.Play();
	}
}

//Funçao para que possa ser apresentado e futuramente armazenado os dados coletados.
function PlayerCompletaGame(){
	Instantiate(parabens, Vector3(0, 0, -2), Quaternion.identity);	
	
	var dadosPopUp = coletorGame.RetornaDados();//Gera um array contendo os dados da partida.
	
	//Passando os dados para o arquivo.
	csScript.SaveToFile(coletorGame.RetornaString());
	
	//Apos definir no PopUp passase dadosPopUp como parametro na funcao abaixo.
	var popupScript = FindObjectOfType(typeof(PopupParabens)) as PopupParabens;
	
	popupScript.setDadosPopUp(dadosPopUp);

	//A nivel de debug.
	coletorGame.ConfereDados();
}