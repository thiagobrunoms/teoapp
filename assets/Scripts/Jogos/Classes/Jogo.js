#pragma strict

public class Jogo {
	private var nome : String;
	private var descricao : String;
	private var nivel: int;
	private var cena: String;
	
	public function Jogo (nome : String, descricao : String, nivel : int) {
		this.nome = nome;
		this.descricao = descricao;
		this.nivel = nivel;
		this.cena = nome;
	}
	
	public function GetNome() {
		return nome;
	}
	
	public function GetDescricao() {
		return descricao;
	}
	
	public function getNivel() {
		return nivel;
	}
	
	public function getCena() {
		return cena;
	}
	
	public function  setCena(cena : String) {
		this.cena = cena;
	}
}