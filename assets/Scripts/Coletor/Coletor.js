#pragma strict

import Coletor;

/*	Script intermediario entre o script do jogo e a base de dados.
*	A receber: Acertos, Erros, Tentativas, DragDrop, Tempo Total, Delay, Step.
*	Vide Dados no excel para maior informacoes sobre os dados coletados.
*
*
*/

//public class Coletor extends MonoBehaviour{
public class Coletor{
		private var acertos: int;
		private var erros: int;
		private var tentativas: int;
		
		private var dragDrop: int;
		
		private var tempoTotal: int;
		private var tempoAnterior : int; //Sera usado apenas para medir o maior delay.
		private var delay: int;
		
		private var step: int; //Em alguns jogos nao sera usada.
		
		private var nomeJogo: String;
		private var nivelJogo: int;
		
		public function Coletor(){
			acertos = 0;
			erros = 0;
			tentativas = 0;
			dragDrop = 0;
			tempoTotal = 0;
			tempoAnterior = 0;
			delay = 0;
			step = 0;
		}	
		
		public function ConfereDados(){
			Debug.Log("Acertos: " + acertos + " - Erros: " + erros + " - Tentativas Totais: " + GetTentativasTotais() +
				" - Drag and Drop: " + dragDrop + " - Tempo Total: " + tempoTotal + " - Delay: " + delay + " - Passo: " + step);
		}
		
		public function SetAcerto () {
			this.acertos++;
			
		}
		
		public function SetErro () {
			this.erros++;
		}
		
		public function SetAcerto (qnt : int) { //Usado nos games como Quebra-Cabeca, Associaca e Quanto E.
			if(qnt != 0){
				this.acertos = qnt;
			}
		}
		
		public function SetErro (qnt : int) { //Usado nos games como Quebra-Cabeca, Associaca e Quanto E.
			if(qnt != 0){
				this.erros = qnt;
			}
		}
		
		public function GetTentativasTotais () {
			this.tentativas = acertos + erros;
			return tentativas;
		}
		
		public function SetDragDrop () {
			this.dragDrop++;
		}
		
		public function SetTempoTotal (tempo : int) {
			this.tempoTotal = tempo;
		}
		
		public function SetDelay (tempo: int) {
			this.delay = tempo;
		}
		
		public function SetStep () {
			this.step++;
		}
		
		public function RetornaDados () {
			var array = new Array(acertos,dragDrop,erros,dragDrop,tempoTotal,delay,step);
			return array;
		}
		
		//Tempo.
		public function RetornaString () {
			return (this.nomeJogo + "," + this.nivelJogo + "," + this.acertos + "," + this.erros+","+ GetTentativasTotais()+","+this.dragDrop+","+this.tempoTotal+","+this.delay+","+this.step);
		}
		
		public function VerificaMaiorDelay () {
			var temp = tempoTotal - tempoAnterior;
			if(temp > delay){
				this.delay = temp;
			}
			tempoAnterior = tempoTotal;
		}
		
		public function GetNomeJogo () {return this.nomeJogo;}
		
		public function SetNomeJogo (nome: String) {this.nomeJogo = nome;}
		
		public function GetNivelJogo () {return this.nivelJogo; }
		
		public function SetNivelJogo (nivel: int) { this.nivelJogo = nivel; }
}