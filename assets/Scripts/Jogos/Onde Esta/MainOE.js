#pragma strict

/*
* Principal script do jogo "Onde Esta?".
* Variaveis de coleta de dados 25-29. Todas recebem valores durante o jogo.
* Todas as funçoes estao implementadas.
* Codigo ja refatorado.
 *
* @author Douglas Moura e Diogenes Laertius.
* @date 16.09.2014
*/

//Camera do jogo
public var cam:Camera;
//String indicando a parte sorteada
public var ondeEsta:GameObject;
//Resultado do jogo
//public var resultado:GUIText;
//Array com as partes do rosto
//Array contendo as partes do corpo sorteadas.
private var partesCorpo = ["Olho", "Nariz", "Boca"];
//Parte sorteada
private var parte:String;
//Contador para sortear apenas 4 partes. Iniciado na funçao start();
private var contador:int;

public var textura:Sprite[];

//Variavel auxiliar para sair da funcao update.
public var completou = false;

private var nivelScript: Nivel;

//Responsavel por Coletar os dados.
public var coletorGame: Coletor;

//Script em C# responsavel por gerar o arquivo csv e colocar os dados dentro do mesmo.
public var csScript : CsColetor;

public var parabens: GameObject;

public var acertou: AudioSource;
public var errou: AudioSource;

public var sprite: Sprite[];

public static final var BOCA = 0;
public static final var NARIZ = 1;
public static final var OLHO = 2;


function Awake() {

	nivelScript = FindObjectOfType(typeof(Nivel)) as Nivel;
	if (nivelScript.nivel == 2) {
		var qualRostoEscolher = Random.Range(1,6);
		GetComponent(SpriteRenderer).sprite = textura[qualRostoEscolher];
	}
}

function Start () {
	acertou = GameObject.FindWithTag("acertou").GetComponent(AudioSource);
	errou = GameObject.FindWithTag("errou").GetComponent(AudioSource);
		
	coletorGame.SetNomeJogo("Onde Está?");
	coletorGame.SetNivelJogo(nivelScript.nivel);
		
	contador = partesCorpo.Length;
	
	ProcurandoLocal();
}

function Update () {

	if(!completou){
 		verificaClick();
 	}
}

//------------------------------------------
function ProcurandoLocal(){

	parte = partesCorpo[Random.Range(0, partesCorpo.Length)];
	
	//Verificador.
	do{
		parte = partesCorpo[Random.Range(0, partesCorpo.Length)];
	}while(parte == "0" && contador > 0);
	
	//Marcando parte usada para nao ser repetida. Talvez um indexOf resolva, como melhoria.
	for(var i = 0; i < partesCorpo.Length; i++){
		if(parte == partesCorpo[i]){
			partesCorpo[i] = "0";
		}
	}
	//Caracter de teste, enquanto nao ha o audio.
	if (parte == "Olho") {
		ondeEsta.GetComponent(SpriteRenderer).sprite = sprite[OLHO];
	} else if (parte == "Nariz") {
		ondeEsta.GetComponent(SpriteRenderer).sprite = sprite[NARIZ];
	} else {
		ondeEsta.GetComponent(SpriteRenderer).sprite = sprite[BOCA];
	}
}

//------------------------------------------
function verificaClick(){
	if(contador > 0){
		var mouse = cam.main.ScreenPointToRay(Input.mousePosition);
	    if (Input.GetMouseButtonDown(0)) {
	        var hit : RaycastHit2D = Physics2D.Raycast(cam.ScreenToWorldPoint(Input.mousePosition), Vector2.zero);
	        if(hit.collider != null) {
	        	if (hit.collider.tag == parte) {
	        		coletorGame.SetAcerto();
	        		if (contador > 1) {
						acertou.Play();
					}
	        		contador--;
	        		if(contador!= 0){ //Caso contador se torne 0 ele nao ira repetir essa funcao porem ira sortear novamente outro local.
	        			ProcurandoLocal();
	        		}	
	            	} else {
	        		coletorGame.SetErro();
	        		errou.Play();
	        		yield WaitForSeconds(1);		
	        	}
	        } else {
				coletorGame.SetErro();
				errou.Play();
	        	yield WaitForSeconds(1);
	        }
	   	coletorGame.SetTempoTotal(Time.timeSinceLevelLoad);
	    coletorGame.VerificaMaiorDelay();
	    }
	//Se todos os locais tivereme acabado, ou seja contador = 0.    
	}else{
		PlayerCompletaGame();
		completou = true;
	}
}


//------------------------------------------
//Funcao que escreve os dados e apresenta ao final da partida.
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
	Destroy(ondeEsta);
}