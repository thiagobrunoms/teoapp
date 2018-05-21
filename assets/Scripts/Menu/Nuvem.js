#pragma strict

public var velocidade: float;
public var coordenadas: Transform;

function Start () {

}

function Update () {
	
	if (coordenadas.position.x <= 10) {
		coordenadas.position.x += velocidade * Time.deltaTime;
	} else {
		coordenadas.position.x = -20;
	}
}