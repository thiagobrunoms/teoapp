#pragma strict

//--- scripts ---//
//Script em C# responsavel por gerar o arquivo csv e colocar os dados dentro do mesmo.
public var csScript : CsColetor;
//Responsavel pela coleta. Vide Script Coletor.js;
public var coletorGame: Coletor;

public var roupas: GameObject[];
public var parabens: GameObject;
public var pontos = 0;
public var tenis = false;

function Start () {
	coletorGame.SetNomeJogo("AVD");
	coletorGame.SetNivelJogo(1); //Como só tem um nível por enquanto.
	Embaralhar();
}

function Update () {
	if (pontos == 4) {
		coletorGame.SetAcerto(this.pontos);
		PlayerCompletaGame();
		pontos = -1;
	}else {
		//Verificando o tempo para informar ao termino.
		coletorGame.SetTempoTotal(Time.timeSinceLevelLoad);
	}
}

function Embaralhar() {
    for (var i : int = 0; i < roupas.Length; i++) {
        var primeiro : int = Random.Range(i, roupas.Length);
        var segundo = roupas[i].transform.position;
        
        roupas[i].transform.position = roupas[primeiro].transform.position;
        //roupas[i].GetComponent(SpriteRenderer).sprite = texturas[i];
        var script = roupas[i].GetComponent(ObjetoVestir);
        //Instantiate(pecas[i], pecas[i].transform.position, Quaternion.identity);
        script.x = roupas[primeiro].transform.position.x;
        script.y = roupas[primeiro].transform.position.y;
        roupas[primeiro].transform.position = segundo;
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