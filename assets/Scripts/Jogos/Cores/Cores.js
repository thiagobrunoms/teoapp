#pragma strict

public static final var deslocamento = 3.8f;

public var tamanho: int;
public var cores: GameObject[];

public var nivelScript: Nivel;

function Awake() {
	nivelScript = FindObjectOfType(typeof(Nivel)) as Nivel;
	if (nivelScript.nivel == 1) {
		tamanho = 4;
	} else {
		tamanho = 6;
	}
	//nivelScript.Destruir();
}

function Start () {
	transform.position.x = -5.5;
	transform.position.y = 1.2;
	embaralhar();
	criarCubos();
}

function criarCubos() {
	var x = transform.position.x;
	var y = transform.position.y;
	var metadeTamanho = (tamanho/2) - 1;
	
	// Indicando nivel 1.
	if(this.tamanho == 4){
		for (var i = 0; i < tamanho; i++) {
			cores[i].layer = 1;
			Instantiate(cores[i], Vector2(x, y), cores[i].transform.rotation);
			x += deslocamento;
			if (i == metadeTamanho) {
					y -= deslocamento;
					x = transform.position.x + 1;
			}
		}
	//Indicando nivel 2
	}else{
		for (var w = 0; w < tamanho; w++) {
			Instantiate(cores[w], Vector2(x, y), cores[w].transform.rotation);
			x += deslocamento;
			if (w == metadeTamanho + 1) {
					y -= deslocamento;
					x = transform.position.x + 2;
			}
		}
	
	}
}

function jaSaiu(index: int, array: int[]) {
	for (var i = 0; i < array.Length; i++) {
		if (index == array[i]) {
			return true;
		}
	}
	return false;
}

function embaralhar() {  
 
    for (var i : int = 0; i < tamanho; i++) {
        var primeiro : int = Random.Range(i, tamanho);
        var segundo = cores[i];
        cores[i] = cores[primeiro];
        cores[primeiro] = segundo;
    }
}