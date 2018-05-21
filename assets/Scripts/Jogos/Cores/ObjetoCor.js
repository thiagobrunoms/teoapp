#pragma strict

/**
 * Classe que molda as cores que serao arrastadas do jogo associacao de cores.
 * 
 * Author: Douglas
 * Date: 21/06/15
**/ 
public class ObjetoCor extends Objeto {
	//Script que gerencia o jogo das cores
	private var instanciador: MainCores;
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
		instanciador = FindObjectOfType(typeof(MainCores)) as MainCores;
	}
	
	
	
	/*******************************************************************
	 Metodos que tratam eventos do objeto.
	********************************************************************/
	
	//Evento de quando soltar o mouse
	function OnMouseUp() {
		drag = false;
		//Capturar o tempo entre as jogadas.
		instanciador.jogou = true;
		//se Associacao e valida, entao destroi os dois cubos associados
		if (valida) {
			if (instanciador.tamanho > 1) {
				acertou.Play();
			}
			
			instanciador.AddAcerto();
			Destroy(gameObject);
			Destroy(destino);
			instanciador.erros = 0;
			
		//Ira coletar os erros de peça errada.	
		} else if(colidiuOutraPeca){
			instanciador.erros++;
			instanciador.errosTotais++;
			colidiuOutraPeca = false;
			
			errou.Play();
		
		//Ira coletar o drag and drop em uma area que nao seja pecas.	
		}else{
			instanciador.AddDragDrop();
			errou.Play();
		}
		
		instanciador.coletorGame.VerificaMaiorDelay();
	}
	
	//Detecta quando o cubo encontra outro objeto.
	function OnTriggerEnter2D(colisor: Collider2D) {
		//Se colidir com qualquer outra peca ira ser validar.
		colidiuOutraPeca = true; 
		//Aumenta o tamanho da cor que esta por baixo		
		colisor.gameObject.transform.localScale.x += 0.1;
		colisor.gameObject.transform.localScale.y += 0.1;
		//Cor que colidiu
		var colidiu = colisor.gameObject.tag == gameObject.tag;
		
		if (colidiu && drag) {
			//Destino guarda a cor que foi associada
			destino = colisor.gameObject;
			valida = true;
		} else {
			valida = false;
		}
	}

	//Detecta quando o cubo sai da colicao de outro objeto.
	function OnTriggerExit2D(colisor : Collider2D){

		colidiuOutraPeca = false;
		
		colisor.gameObject.transform.localScale = gameObject.transform.localScale;
		
		if (colisor.gameObject.tag == gameObject.tag && drag) {
	    	valida = false;
	    } else if (!drag) {
	    	instanciador.erros ++;
	    }
	}
}