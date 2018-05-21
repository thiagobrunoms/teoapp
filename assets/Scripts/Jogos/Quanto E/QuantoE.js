#pragma strict

//Unidades.
public var unidade: GameObject;
public var qtUnidades: int; 
public var frutas: GameObject[];

//Usado para saber se e uma nova peça ou nao, para poder ser criado outra. Ver Maca.js
public var seNovo: boolean;

//Conta que sera impressa na tela.
public var primeiroValor: GUIText;
public var segundoValor: GUIText;
public var valorTotal: GUIText;

public var primeiro_valor: int;
public var segundo_valor: int;
private var valor_total: int;

//Futuramente gerar gets e sets.
public var primeiroValor_corrente: int;
public var segundoValor_corrente: int;

//Guarda o valor do primeiro e segundo circulo consecutivamente.
private var primeiroCirculo :int;
private var segundoCirculo: int;

//Responsavel pela coleta. Vide Script Coletor.js;
public var coletorGame: Coletor;

//Script em C# responsavel por gerar o arquivo csv e colocar os dados dentro do mesmo.
public var csScript : CsColetor;
public var parabens: GameObject;

function Start () {

	coletorGame.SetNomeJogo("Quanto É?");
	coletorGame.SetNivelJogo(1); //Como só tem um nível por enquanto.

	DefinirConta();
	
	primeiroValor_corrente = 0;
	segundoValor_corrente = 0;
}

function Update () {


	if((primeiro_valor == primeiroValor_corrente) && (segundo_valor == segundoValor_corrente)){
		coletorGame.SetAcerto(2); //Dois pratos, logo dois acertos.
		PlayerCompletaGame();
		primeiro_valor *= -1; //evitar que fique chamando a tela de parabens varias vezes
	}else{
		//Verificando o tempo para informar ao termino.
		coletorGame.SetTempoTotal(Time.timeSinceLevelLoad);
	}

}

/**
 *Definindo os valores que serao apresentados e armazenados para serem conferidps.
**/
function DefinirConta () {
	
	this.primeiro_valor = Random.Range(1, 4);
	this.primeiroValor.text = primeiro_valor.ToString();
	
	this.segundo_valor = Random.Range(1,4);
	this.segundoValor.text = segundo_valor.ToString();
	
	this.valor_total = primeiro_valor + segundo_valor;
	this.valorTotal.text = valor_total.ToString();
	
	Debug.Log(primeiro_valor);
	Debug.Log(segundo_valor);
	Debug.Log(valor_total);
	
}

/**
 *Funçao para que possa ser apresentado e futuramente armazenado os dados coletados.
**/
	
function PlayerCompletaGame(){

	OKFrutas();

	Instantiate(parabens, Vector3(0, 0, -2), Quaternion.identity);	
	
	var dadosPopUp = coletorGame.RetornaDados();//Gera um array contendo os dados da partida.
	
	//Passando os dados para o arquivo.
	csScript.SaveToFile(coletorGame.RetornaString());
	
	//Apos definir no PopUp passase dadosPopUp como parametro na funcao abaixo.
	var popupScript = FindObjectOfType(typeof(PopupParabens)) as PopupParabens;
	
	popupScript.setDadosPopUp(dadosPopUp);

	//A nivel de debug.
	coletorGame.ConfereDados();
	
	/**
	* Codigo usado para deixar os numeros com transparencia.
	*
	primeiroValor.color.a = 0.2;
	segundoValor.color.a = 0.2;
	valorTotal.color.a = 0.2;
	*/
}

//Usados na comunicacao entre maca -> Principal -> Coletor.
public function AddErro () {
	coletorGame.SetErro();
}

public function AddDragDrop () {
	coletorGame.SetDragDrop();
}

public function OKFrutas () {
	
	var obj: ObjetoFruta;
	
	for (var x = 0; x < frutas.Length; x++) {
		obj = frutas[x].GetComponent("ObjetoFruta");
		obj.SetOk(true);
	}
}