#pragma strict


public var array: GameObject[];
public var nivel: Nivel;
public var a: PecaMemoria;
public var b: PecaMemoria;
public var parabens: GameObject;
public var pontos = 0;
//Script em C# responsavel por gerar o arquivo csv e colocar os dados dentro do mesmo.
public var csScript : CsColetor;
//Responsavel pela coleta. Vide Script Coletor.js;
public var coletorGame: Coletor;
public var quantidade: int;

function Awake() {
	nivel = FindObjectOfType(typeof(Nivel)) as Nivel;
	quantidade = nivel.nivel * 2 + 2;

}

function Start () {	

	coletorGame.SetNomeJogo("Memória");
	coletorGame.SetNivelJogo(nivel.nivel); //Como só tem um nível por enquanto.
	Embaralhar();
	Instanciar();
}

function Update () {
	
    if (pontos == quantidade/2) {
    	coletorGame.SetAcerto(this.pontos); //?
    	PlayerCompletaGame();	
    	pontos = -1; //flag ruim?
    }else{
        coletorGame.SetTempoTotal(Time.timeSinceLevelLoad);
    }
}

function Instanciar() {
	
    for (var i : int = 0; i < quantidade; i++) {
        var primeiro : int = Random.Range(i, quantidade);
        var segundo = array[i].transform.position;
        
        array[i].transform.position = array[primeiro].transform.position;
        Instantiate(array[i], array[i].transform.position, Quaternion.identity);
        array[primeiro].transform.position = segundo;
    }
}

function Embaralhar() {	
	var pasta = nivel.jogo + "/" + nivel.nivel;
	
	var x = 2.5f - (quantidade);
	var y = 1.7f;
 
    for (var i : int = 0; i < quantidade; i++) {
    	array[i].transform.position = Vector2(x, y);
    	x += 3.5f;
    	if (i + 1 == quantidade / 2.0) {
    		y -= 3.6f;
    		x = 2.5f - (quantidade);
    	}
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