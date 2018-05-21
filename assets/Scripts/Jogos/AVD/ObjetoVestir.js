#pragma strict

/**
 * Classe que molda as roupas que serao arrastadas do jogo Vestir.
 * 
 * Author: Douglas
 * Date: 11/09/15
**/ 
public class ObjetoVestir extends Objeto {

	private var vestir: Vestir;
	//Coletar o DragAndDrop;
	public var colidiuOutraPeca: boolean;
		
	public static final var MEIA = "Tres";
	public static final var TENIS = "Quatro";
	
	
	/*******************************************************************
	 Implementacao dos metodos da classe Objeto
	********************************************************************/
	
	
	//Implementacao para o metodo start
	public function Criar() {
		super.Criar();
		
		vestir = FindObjectOfType(typeof(Vestir)) as Vestir;
	}


	/*******************************************************************
	 Metodos que tratam eventos do objeto.
	********************************************************************/
	
	//Evento de quando soltar o mouse
	function OnMouseUp() {
		drag = false;
		
		if (valida) {
			
			if (!ok && Validar()) {
				gameObject.transform.position = destino.transform.position;
				drag = true;
				vestir.pontos += 1;
				if (gameObject.tag == MEIA) {
					vestir.tenis = true;
					gameObject.transform.position.x += 0.65;
					gameObject.transform.position.y -= 0.01;		
				}
				
				//Audio
				if (vestir.pontos < 4) {
					acertou.Play();
				}
				
			} else if (!Validar()){
				valida = false;
				vestir.coletorGame.SetErro();
				errou.Play();
			}
		//Ira coletar os erros de peça errada.	
		}else{
			if (colidiuOutraPeca) {
				valida = false;
				vestir.coletorGame.SetErro();
			} else {
				vestir.coletorGame.SetDragDrop(); //Avaliar se esta correto aqui.
			}
			errou.Play();
		}
		
		vestir.coletorGame.VerificaMaiorDelay();
	}
	
	//Detecta quando uma peca encontra outra peca.
	function OnTriggerEnter2D(colisor: Collider2D) {
		colidiuOutraPeca = true;
		
		//peca que colidiu
		var colidiu;
		if (gameObject.tag != MEIA) {
			colidiu = colisor.gameObject.tag == gameObject.tag;
			
			if (gameObject.tag == TENIS && colisor.gameObject.tag == MEIA) {
				colidiu = true;
			}
		} else {
			
			if (!vestir.tenis) {
				colidiu = colisor.gameObject.tag == gameObject.tag;
			}
		}
		
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
	
	/**
	 * Metodo para validar a meia e o tenis.
	 *
	**/
	function Validar() {
		if (gameObject.tag == TENIS) {
			 var meia = GameObject.FindGameObjectsWithTag(MEIA) as GameObject[];
			 
			 var meiaScript: ObjetoVestir = null;
			 var cont = 0;
			 while (meiaScript == null) {
			 	meiaScript = meia[cont++].GetComponent(ObjetoVestir);	 	
			 }
			 
			 if (meiaScript.ok) {
			 	ok = true;
			 	return true;	
			 } else {
			 	return false;
			 }
		}
		ok = true;
		return true;
	}
}