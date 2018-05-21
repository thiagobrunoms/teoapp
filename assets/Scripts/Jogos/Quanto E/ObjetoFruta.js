#pragma strict

public var textura: Sprite;


public class ObjetoFruta extends Objeto {

	/*
	* Necessario para acessar diretamente os valores correntes dos pratos.
	*/

	private var comunicadorQuantoE : QuantoE;
	
	/*
	* Variavel responsavel por manter a ordem caso a fruta entre e saia e assim diminuir a quantidade
	* do somatorio do prato.
	*/
	public var estavaDentro: boolean;
	
	/*
	* Variavel que armazena o ID do prato,(0) para o primeiro prato e (1) para o segundo prato, para adicionar
	* a fruta (unidade) a sua soma.
	*/
	private var idPrato: int;
	
	/*
	* Variavel que salva o ID do prato para que seja possivel subtrair quando a fruta sair do prato.
	*/
	private var idPrato_Diminuindo: int;

	public function Criar() {
		acertou = GameObject.FindWithTag("acertou").GetComponent(AudioSource);
		errou = GameObject.FindWithTag("errou").GetComponent(AudioSource);
		posicionou = GameObject.FindWithTag("posicionou").GetComponent(AudioSource);
		
		comunicadorQuantoE = FindObjectOfType(typeof(QuantoE)) as QuantoE;
		
		estavaDentro = false;
		
		//Inicializando com -1 para indicar neutralidade.
		idPrato_Diminuindo = -1;

		//Definindo a texutra dos objetos.
		var sprite: SpriteRenderer;
		sprite = this.GetComponent(SpriteRenderer);
		sprite.sprite = textura;
	
	}

	
	public function OnMouseUp (){
	
		drag = false;
		
		if(valida && !estavaDentro){
			//Verifica qual o prato esta sendo acrescentado.
			if(idPrato == 0){ 
				/*Verifica se ja alcançou o valor pedido, caso nao volta ao canto.
				*
				* Obs. Esse -1 no "if" abaixo e devido, pois ao adicionar uma fruta o valor corrente ira para 0 e nao 1,
				* isso porem nao influencia o codigo e pode ser melhorada com um if o valor corrente == 0 entao adicione +2.
				*
				*/
				if(comunicadorQuantoE.primeiroValor_corrente <= comunicadorQuantoE.primeiro_valor -1){
					comunicadorQuantoE.primeiroValor_corrente++;
					estavaDentro = true;	
					posicionou.Play();
					Debug.Log("Corre Prato 1: " + comunicadorQuantoE.primeiroValor_corrente + "- " + comunicadorQuantoE.primeiro_valor);
					
				}else{
					comunicadorQuantoE.AddErro();
					Debug.Log("ERRO");
					valida = false;
					errou.Play();
				}

			}else if(idPrato == 1){
				if(comunicadorQuantoE.segundoValor_corrente <= comunicadorQuantoE.segundo_valor -1){
					comunicadorQuantoE.segundoValor_corrente++;
					estavaDentro = true;
					posicionou.Play();
					Debug.Log("Corre Prato 2: " + comunicadorQuantoE.segundoValor_corrente + "- " + comunicadorQuantoE.segundo_valor);	
					
				}else{
					comunicadorQuantoE.AddErro();
					Debug.Log("ERRO");
					valida = false;
					errou.Play();
				}
			}
			
		}else if(estavaDentro && !valida){
			if(idPrato_Diminuindo == 0){
				comunicadorQuantoE.primeiroValor_corrente--;
				Debug.Log("Corre Prato 1: " + comunicadorQuantoE.primeiroValor_corrente + "- " + comunicadorQuantoE.primeiro_valor);
				//errou.Play();
			}else if(idPrato_Diminuindo == 1){
				comunicadorQuantoE.segundoValor_corrente--;
				Debug.Log("Corre Prato 2: " + comunicadorQuantoE.segundoValor_corrente + "- " + comunicadorQuantoE.segundo_valor);
				//errou.Play();
			}
			estavaDentro = false;	
			
		}else{
			comunicadorQuantoE.AddDragDrop();
			errou.Play();
		}
		
		idPrato_Diminuindo = -1; // Flag de escape.
		
		comunicadorQuantoE.coletorGame.VerificaMaiorDelay();
	}
	
	function OnTriggerEnter2D(colisor: Collider2D) {
		//Retornando sem colidir com os pratos.
		if(drag == false){
			valida = false;
		//ignorar colisao entre frutas.	
		}else if(colisor.tag == "Fruta"){
			Debug.Log("Identificar colisao!");
		/*
		* ATENÇAO! O "ELSE IF" abaixo pode ser de dificil interpretaçao, porem sua funcao e validar as frutas assim que entrarem no colider dos pratos
		* e nao deixar que uma fruta se desloque para outro prato e fique "quicando", bagunçando assim o valor corrente dos pratos.
		*/	
			
		}else if(colisor.gameObject.tag == "PrimeiroPrato" && idPrato_Diminuindo != 1){
			valida = true;
			idPrato = 0;
		}else if(colisor.gameObject.tag == "SegundoPrato" && idPrato_Diminuindo != 0){
			valida = true;
			idPrato = 1;
		}
	
	}
	
	function OnTriggerExit2D(colisor : Collider2D){
		
		valida = false;
		
		if(colisor.gameObject.tag == "PrimeiroPrato"){
			idPrato_Diminuindo = 0;
		}else if(colisor.gameObject.tag == "SegundoPrato"){
			idPrato_Diminuindo = 1;
		}
	}
}