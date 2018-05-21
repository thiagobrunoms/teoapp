#pragma strict

/**
 * Classe que molda as pecas que serao arrastadas do jogo quebra-cabeca.
 * 
 * Author: Douglas
 * Date: 03/08/15
**/ 
public class ObjetoPeca extends Objeto {

	private var pecasDrag: MainQC;
	//Coletar o DragAndDrop;
	private var colidiuOutraPeca: boolean;
	
	
	
	/*******************************************************************
	 Implementacao dos metodos da classe Objeto
	********************************************************************/
	
	//Implementacao para o metodo start
	public function Criar() {
		super.Criar();
		
		acertou = GameObject.FindWithTag("acertou").GetComponent(AudioSource);
		errou = GameObject.FindWithTag("errou").GetComponent(AudioSource);
		pecasDrag = FindObjectOfType(typeof(MainQC)) as MainQC;
	}



	/*******************************************************************
	 Metodos que tratam eventos do objeto.
	********************************************************************/
	
	//Evento de quando soltar o mouse
	function OnMouseUp() {
		//Capturar o tempo entre as jogadas.
		pecasDrag.jogou = true; 
		drag = false;
		
		//se Associacao e valida, entao destroi as duas pecas associadas
		if (valida) {
			if (pecasDrag.pontos < 3) {
				acertou.Play();
			}
			pecasDrag.AddAcerto();
			var novoSprite = gameObject.GetComponent(SpriteRenderer).sprite;
			destino.GetComponent(SpriteRenderer).sprite = novoSprite;
			Destroy(gameObject);
			pecasDrag.pontos++;
		//Ira coletar os erros de peça errada.	
		} else if(colidiuOutraPeca){
			pecasDrag.erros++;
			colidiuOutraPeca = false;
			errou.Play();
		//Ira coletar o drag and drop em uma area que nao seja pecas.	
		}else{
			pecasDrag.AddDragDrop();
			errou.Play();
		}
	}
	
	//Detecta quando uma peca encontra outra peca.
	function OnTriggerEnter2D(colisor: Collider2D) {
		//Se colidir com qualquer outra peca ira ser validar.
		colidiuOutraPeca = true; 
		//peca que colidiu
		var colidiu = colisor.gameObject.tag == gameObject.tag;
		
		if (colidiu && drag) {
			//Destino guarda a peca que foi associada
			destino = colisor.gameObject;
			valida = true;
		} else {
			valida = false;
		}
	}
	
	//Detecta quando a peca sai da colicao de outra peca.
	function OnTriggerExit2D(colisor : Collider2D){
		colidiuOutraPeca = false;
		
		if (colisor.gameObject.tag == gameObject.tag && drag) {
	    	valida = false;
	    }
	}
}