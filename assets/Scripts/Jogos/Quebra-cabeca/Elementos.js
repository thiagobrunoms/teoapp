#pragma strict

public var pecas: GameObject[];
public var nivel: Nivel;
public var texturas: Object[];

function Start () {
	nivel = FindObjectOfType(typeof(Nivel)) as Nivel;
	
	Carregar();
}

function Update () {
	
}

function Carregar () {
	var pasta = nivel.jogo + "/" + nivel.nivel;
	Debug.Log("Pasta " + pasta);
	texturas = Resources.LoadAll(pasta, typeof(Sprite));
	Debug.Log("Array " + texturas);
			
	for (var i in range(0, pecas.Length)) {
		pecas[i].GetComponent(SpriteRenderer).sprite = texturas[i];	
		Instantiate(pecas[i], pecas[i].transform.position, Quaternion.identity);
	}
}