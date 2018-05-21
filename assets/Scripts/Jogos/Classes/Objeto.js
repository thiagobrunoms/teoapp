#pragma strict

/**
 * Todos os objetos que possuem a propriedade drag and drop herdam desta classe.
 * Classe tambem implementa metodos de MonoBehaviour (start, update, eventos de
 * mouse e colisao).
 * Objeto possui um ponto de origem e retorna ao mesmo sempre que for associado
 * ao objeto errado.
 *
 * Author: Douglas
 * Date: 21/06/15
**/ 
public class Objeto extends MonoBehaviour {
	//Ponto de origem do cubo
	public var x : float;
	public var y : float;
	//Velocidade do objeto
	public var velocidade: float;
	//Verifica se o objeto esta sendo arrastado
	public var drag: boolean;
	//Verifica se a associaçao e valida
	public var valida : boolean;
	//Objeto que sera "associado"
	public var destino: GameObject;
	//Deslocamento ao clicar no objeto
	protected var offset: Vector2;
	//Se ok for false entao o objeto ainda podera ser deslocado
	protected var ok: boolean;
	public var acertou: AudioSource;
	public var errou: AudioSource;
	public var posicionou: AudioSource;
	
	/*******************************************************************
	 Métodos de Get e Set de atributos acima.
	********************************************************************/
		
	function SetOk (valor: boolean) {
		ok = valor; 
	}
	
	
	
	/*******************************************************************
	 Para os metodos abaixo, basta sobrescreve-los na classe filha.
	********************************************************************/
	
	//Metodo para acrescentar alguma implementacao ao metodo start
	protected function Criar() {}
	//Metodo para acrescentar alguma implementacao ao metodo update
	protected function Atualizar() {}
	

	
	/*******************************************************************
	 Metodos principais da classe MonoBehaviour.
	********************************************************************/
	
	//Chamado ao criar o objeto.
	function Start () {
		this.valida = false;
		this.drag = false;
		this.ok = false;
		
		//Metodo chamado com implementacao vazia.
		Criar();
	}
	
	//Chamado a cada loop.
	function Update () {
		/**
	 	 * Se objeto não foi associado corretamente, ele irá retornar
	     * ao ponto de origem.
		**/
		if (!valida && !drag) {
			Retornar();
		}
	
		//Metodo chamado com implementacao vazia.
		Atualizar();
	}
	
	
	
	/*******************************************************************
	 Metodos da classe Objeto.
	********************************************************************/
	
	function Retornar() {
		var x2 = transform.position.x;
		var y2 = transform.position.y;
		
		//Distancia dos dois pontos
		var distancia = Mathf.Sqrt(Mathf.Pow((x - x2), 2) + Mathf.Pow((y - y2), 2));
		
		var fracao = Time.deltaTime * velocidade/distancia;
		
		//Desloca o objeto de um ponto a outro de acordo com uma fracao
		transform.position = Vector2.Lerp(transform.position, Vector2(x, y), fracao);
	}
	
	
	
	/*******************************************************************
	 Metodos que tratam eventos do mouse
	********************************************************************/
	
	//Trata evento de quando clicar em cima do objeto.
	function OnMouseDown() {
		//Posicão do mouse
		var mouse = Vector2(Input.mousePosition.x, Input.mousePosition.y);
		//Posicao do mouse referente à camera
		var posicaoMouse = Camera.main.ScreenToWorldPoint(mouse);
		//Deslocamento
	    offset = transform.position - posicaoMouse;
	}
	
	//Trata do evento de arrastar o objeto. 
	function OnMouseDrag(){
		if (!ok) {
			drag = true;
			//Posicao do mouse
		    var curScreenSpace = Vector3(Input.mousePosition.x, Input.mousePosition.y, 1);
		    //Atualiza posicao do objeto  
		    transform.position = Camera.main.ScreenToWorldPoint(curScreenSpace) + offset;
		}
	}
}