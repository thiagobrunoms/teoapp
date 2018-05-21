#pragma strict

//Constante contém a velocidade que o número ira passar.
public static final var velocidade = 5;

//X é a posição no eixo horizontal do número.
private var x: float;
//Y é a posição no eixo Vertical.
//O número deve descer até essa coordenada.
private var y = -3.8;

//Habilitar irá permitir que o número desça
var habilitar = true;

function Start () {
	//X irá receber a posição em que o número foi instanciado.
	//Existem três posições possíveis para X.
	x = transform.position.x;
	//Physics2D.IgnoreLayerCollision(19, 22,true);
}

function Update () {
	//Se habilitar for verdadeiro, então o numero irá descer.
	if (habilitar) {
		Descer();
	}
}

//Verifica se o número colidiu com o destruidor.
function OnTriggerEnter2D(colisor: Collider2D) {
	//Caso haja colisão, o número será destruido.
	if (colisor.gameObject.tag == "Destruidor") {
		Destroy(gameObject);	
	}
}

//Verifica se o número colidiu com o bloqueador.
function OnCollisionEnter2D(colisor: Collision2D) {
	//Caso haja colisão, habilitar descida será falso. 
	if (colisor.gameObject.tag == "Bloqueador") {
		habilitar = false;
	} else {
		Physics2D.IgnoreCollision(gameObject.collider2D, colisor.collider);
	}
}

//Função responsável por descer o número.
function Descer () {
	//x2 é a posição atual do número no eixo x.
	var x2 = transform.position.x;
	//y2 é a posição atual do número no eixo y.
	var y2 = transform.position.y;
	
	//Distancia dos dois pontos
	var distancia = Mathf.Sqrt(Mathf.Pow((x - x2), 2) + Mathf.Pow((y - y2), 2));
	
	//Fracao relaciona o tempo com a velocidade e distância.
	var fracao = Time.deltaTime * velocidade/distancia;
	
	//Desloca o objeto de um ponto a outro de acordo com uma fracao
	transform.position = Vector2.Lerp(transform.position, Vector2(x, y), fracao);
}