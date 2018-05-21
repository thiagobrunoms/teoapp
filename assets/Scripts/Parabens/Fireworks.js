#pragma strict

public var fogos1: GameObject;
public var fogos2: GameObject;
public var animacao: GameObject[];
public var x: float[];
public var y: float[];
public var quantidade: int;
private var script: PopupParabens;
private var script2: MenuSuperior;

function Start () {
	Criar();
	script = FindObjectOfType(typeof(PopupParabens)) as PopupParabens;
	script2 = FindObjectOfType(typeof(MenuSuperior)) as MenuSuperior;
	script2.Desabilitar();
}

function Criar() {
	for (var i = 0; i < quantidade; i++) {
		Instantiate(fogos1, Vector3(Random.Range(-6.0, 6.0), Random.Range(2.0, 4.0), 2), Quaternion.identity);
		yield WaitForSeconds(1.0);
		Instantiate(fogos2, Vector3(Random.Range(-6.0, 6.0), Random.Range(2.0, 4.0), 2), Quaternion.identity);
		yield WaitForSeconds(0.8);
	}
	
	for (var o = 0; o < animacao.Length; o++) {
		Destroy(animacao[o]);
	}
	
	Destroy (GameObject.FindGameObjectWithTag("FundoParabens"));
	
	/**
	* Comentando pois nao ira ser criado o pop up por enquanto (22.10.2015) , caso queira ativar so descomentar.
	**/
	//script.Habilita();
	
	
}