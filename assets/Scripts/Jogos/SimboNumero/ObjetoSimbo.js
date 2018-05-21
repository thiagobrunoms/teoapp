#pragma strict

/**
 * Classe que molda os objetos que serao arrastadas no jogo SimboNumero.
 * 
 * Author: Douglas
 * Date: 22/06/15
**/ 
public class ObjetoSimbo extends Objeto {
	//Script que gerencia o jogo das cores
	private var simboNumero: SimboNumero;
	public var tavaDentro: boolean;
	//Constantes
	public static final var unidade = 1;
	public static final var cinco = 5;
	public static final var dezena = 10;



	/*******************************************************************
	 Implementacao dos metodos da classe Objeto
	********************************************************************/
	
	//Implementacao para o metodo start
	function Awake () {
		simboNumero = FindObjectOfType(typeof(SimboNumero)) as SimboNumero;
		
		acertou = GameObject.FindWithTag("acertou").GetComponent(AudioSource);
		errou = GameObject.FindWithTag("errou").GetComponent(AudioSource);
		posicionou = GameObject.FindWithTag("posicionou").GetComponent(AudioSource);
	}
	
	
	
	/*******************************************************************
	 Metodos que tratam eventos do objeto.
	********************************************************************/
	
	//Evento de quando soltar o mouse
	function OnMouseUp() {
		drag = false;
		
		//se Associacao e valida, entao destroi os dois cubos associados
		if (valida && !tavaDentro) {
			if (gameObject.tag == "Lapis") {
	    		simboNumero.valor += unidade;
	    	} else if (gameObject.tag == "PortaLapis") {
	    		simboNumero.valor += cinco;
	    	} else if (gameObject.tag == "CaixaLapis") {
	    		simboNumero.valor += dezena;
	    	}
			tavaDentro = true;
			posicionou.Play();
		}else if (!valida && !tavaDentro){
			simboNumero.coletorGame.SetDragDrop();
			posicionou.Play();
		}
		
		simboNumero.coletorGame.VerificaMaiorDelay();
	}
	
	//Detecta quando o cubo encontra outro objeto.
	function OnTriggerEnter2D(colisor: Collider2D) {

		var colidiu = colisor.gameObject.tag == "Lousa";

		if (colidiu && drag) {
			valida = true;
		} else {
			valida = false;
		}
	}

	//Detecta quando o cubo sai da colicao de outro objeto.
	function OnTriggerExit2D(colisor : Collider2D){
	
		if (colisor.gameObject.tag == "Lousa" && tavaDentro) {
	    	valida = false;
	    	if (gameObject.tag == "Lapis") {
	    		simboNumero.valor -= unidade;
	    	} else if (gameObject.tag == "PortaLapis") {
	    		simboNumero.valor -= cinco;
	    	} else if (gameObject.tag == "CaixaLapis") {
	    		simboNumero.valor -= dezena;
	    	}
	    	tavaDentro = false;
	    }
	}
}