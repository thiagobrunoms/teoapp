#pragma strict

public var virada = true;
public var bloquear = false;
public var frente: Sprite;
public var costas: Sprite;
private var memoria: Memoria;
public var acertou: AudioSource;
public var errou: AudioSource;


function Start () {
	memoria = FindObjectOfType(typeof(Memoria)) as Memoria;
	CarregarSprite();
	
	acertou = GameObject.FindWithTag("acertou").GetComponent(AudioSource);
	errou = GameObject.FindWithTag("errou").GetComponent(AudioSource);
}

function CarregarSprite() {
	var sprite = memoria.nivel.jogo + "/" + gameObject.tag;
	frente = Resources.Load(sprite, typeof(Sprite));
	Debug.Log("Executou! " + sprite);
}

/**
 * Trata evento de quando clicar em cima do objeto.
**/
function OnMouseDown() {
	
	if (memoria.a == null && memoria.b != null) {
		if (Virar()) {
			memoria.a = this;
			Avaliar(memoria.a, memoria.b);
		}
	} else if (memoria.b == null  && memoria.a != null) {
		if (Virar()) {
			memoria.b = this;
			Avaliar(memoria.a, memoria.b);
		}
	} else if (memoria.b == null  && memoria.a == null){
		if (Virar()) {
			memoria.a = this;
		}
	}
	
	memoria.coletorGame.VerificaMaiorDelay();
	
}

function Avaliar(a: PecaMemoria, b: PecaMemoria) {

	if (memoria.a.tag == memoria.b.tag) {
		if (memoria.pontos < (memoria.quantidade/2) - 1) {
			acertou.Play();		
		}
		a.bloquear = true;
		b.bloquear = true;
		memoria.pontos += 1;
		
	} else {
		errou.Play();
		yield WaitForSeconds(3);
		a.bloquear = false;
		b.bloquear = false;
		
		a.Virar();
		b.Virar();
		
		memoria.coletorGame.SetErro(); //Vale a pena encapsular?
	}
	memoria.a = null;
	memoria.b = null;
}

public function Virar() {
	if (virada && !bloquear) {
		gameObject.GetComponent(SpriteRenderer).sprite = frente;
		virada = !virada;
		bloquear = true;
		return true;
	} else if (!bloquear){
		gameObject.GetComponent(SpriteRenderer).sprite = costas;
		virada = !virada;
		return false;
	}
}