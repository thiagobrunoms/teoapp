#pragma strict

public var pecas: GameObject[];

//Responsavel pela coleta. Vide Script Coletor.js;
public var coletorGame: Coletor;

public var erros = 0;
public var jogou: boolean;

//Script em C# responsavel por gerar o arquivo csv e colocar os dados dentro do mesmo.
public var csScript : CsColetor;
public var parabens: GameObject;

private var elementos: Elementos;
public var texturas: Object[];
public var pontos = 0;


function Start () {
	
	elementos = FindObjectOfType(typeof(Elementos)) as Elementos;
	
	coletorGame.SetNomeJogo("Quebra-C.");
	coletorGame.SetNivelJogo(elementos.nivel.nivel);
	
	embaralhar();
}

function Update () {
	if(jogou){
		coletorGame.VerificaMaiorDelay();
		jogou = false;
	}
	if (pontos == 4) { // So completou quando passar por essa funcao. Porem e a mesma coisa de ja ter completado, apenas para parar o update.
		coletorGame.SetErro(erros);
		PlayerCompletaGame();
		pontos = -1;
	}else{
	
		coletorGame.SetTempoTotal(Time.timeSinceLevelLoad);
	}
}

function embaralhar() {
	var pasta = elementos.nivel.jogo + "/Pecas";
	texturas = Resources.LoadAll(pasta, typeof(Sprite));
 
    for (var i : int = 0; i < pecas.Length; i++) {
        var primeiro : int = Random.Range(i, pecas.Length);
        var segundo = pecas[i].transform.position;
        
        pecas[i].transform.position = pecas[primeiro].transform.position;
        pecas[i].GetComponent(SpriteRenderer).sprite = texturas[i];
        var script = pecas[i].GetComponent(ObjetoPeca);
        Instantiate(pecas[i], pecas[i].transform.position, Quaternion.identity);
        script.x = pecas[primeiro].transform.position.x;
        script.y = pecas[primeiro].transform.position.y;
        pecas[primeiro].transform.position = segundo;
    }
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

//Usados para coleta.
public function AddAcerto () {
	coletorGame.SetAcerto();
}

public function AddErro () {
	coletorGame.SetErro();
}

public function AddDragDrop () {
	coletorGame.SetDragDrop();
}