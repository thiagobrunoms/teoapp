#pragma strict

function Start () {
	Destruir();
}

function Destruir() {
	yield WaitForSeconds(1);
	Destroy(gameObject);
}