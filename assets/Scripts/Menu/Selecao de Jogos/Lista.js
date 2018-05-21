#pragma strict

public var jogo: Jogo;
private var selecaoJogos : SelecaoJogos;

//Constantes
public static final var JOGOS = 13;

public static final var COR = 0;
public static final var QUANTO_E = 1;
public static final var SIMBO_NUMERO = 2;
public static final var CACHORRO = 3;
public static final var MENINA = 4;
public static final var PEIXE = 5;
public static final var TARTARUGA = 6;
public static final var ANIMAIS = 7;
public static final var BRINQUEDOS = 8;
public static final var COZINHA = 9;
public static final var ESCOLA = 10;
public static final var VESTIR = 11;
public static final var ONDE_ESTA_ROSTO = 12;

public var info = "";

private var boolArray = new boolean[JOGOS];
private var jogos = new Jogo[JOGOS];

public var skinLista1: GUISkin;
public var skinLista2: GUISkin;

function Start () {
	
	jogos[COR] = new Jogo("Cores", "Teo gosta de brincar com \nas cores, ajude-o a associá\n-las corretamente!\n\nArraste o círculo destacado \npara sua cor igual.", 2);
	jogos[QUANTO_E] = new Jogo("Quanto é?", "Teo gosta de brincar com \nos números, ajude-o a \nresolver a soma certa!\n\nArraste as frutas para os \npratos para resolver a \nsoma." , 1);
	jogos[SIMBO_NUMERO] = new Jogo("SimboNúmero", "Teo gosta de brincar com \nquantidades, ajude-o a \nencontrar o valor certo!\n\nArraste os materiais para a \nmesa e confirme o valor.", 1);
	jogos[CACHORRO] = new Jogo("Cachorro", "Teo gosta de brincar com \nquebra-cabeças, ajude-o \na completa-lós!\n\nArraste as peças do cachor-\nro para suas posições \ncorretas.", 4);
	jogos[MENINA] = new Jogo("Menina", "Teo gosta de brincar com \nquebra-cabeças, ajude-o \na completa-lós!\n\nArraste as peças da menina \npara suas posições corretas.", 4);
	jogos[PEIXE] = new Jogo("Peixe", "Teo gosta de brincar com \nquebra-cabeças, ajude-o \na completa-lós!\n\nArraste as peças do peixe \npara suas posições corretas.", 4);
	jogos[TARTARUGA] = new Jogo("Tartaruga", "Teo gosta de brincar com \nquebra-cabeças, ajude-o \na completa-lós!\n\nArraste as peças da tartaru\n-ga para suas posições \ncorretas.", 4);
	jogos[ANIMAIS] = new Jogo("Animais", "Teo gosta de brincar com\njogos da memória, ajude\n-o a terminar!\n\nSelecione as cartas para \ncombinar os animais iguais.", 3);
	jogos[BRINQUEDOS] = new Jogo("Brinquedos", "Teo gosta de brincar com\njogos da memória, ajude\n-o a terminar!\n\nSelecione as cartas para \ncombinar os brinquedos \niguais.", 3);
	jogos[COZINHA] = new Jogo("Cozinha", "Teo gosta de brincar com\njogos da memória, ajude\n-o a terminar!\n\nSelecione as cartas para \ncombinar objetos da \ncozinha iguais.", 3);
	jogos[ESCOLA] = new Jogo("Escola", "Teo gosta de brincar com\njogos da memória, ajude\n-o a terminar!\n\nSelecione as cartas para \ncombinar objetos da \nescola iguais.", 3);
	jogos[VESTIR] = new Jogo("Vestir", "Teo gosta de brincar com as \natividades diárias, ajude-o \na se vestir!\n\nArraste as roupas para \najudar o Teo a se vestir.", 1);
	jogos[ONDE_ESTA_ROSTO] = new Jogo("Onde Está?", "Teo gosta de brincar com\nas partes do corpo, ajude-o \na identificar!\n\nLocalize e selecione as \npartes do rosto pedidas." , 1);
	
	jogos[QUANTO_E].setCena("Quanto E");
	jogos[TARTARUGA].setCena("QuebraCabeca");
	jogos[CACHORRO].setCena("QuebraCabeca");
	jogos[MENINA].setCena("QuebraCabeca");
	jogos[PEIXE].setCena("QuebraCabeca");
	jogos[ANIMAIS].setCena("Memoria");
	jogos[BRINQUEDOS].setCena("Memoria");
	jogos[COZINHA].setCena("Memoria");
	jogos[ESCOLA].setCena("Memoria");
	jogos[ONDE_ESTA_ROSTO].setCena("Onde Esta");
	
	for (var i = 0; i < JOGOS; i ++) {
		boolArray[i] = false;
	}
	
	Validar(-1);
}

public function Listar(inicio: int, fim : int) {
	var altura = 0;
	for (var i = inicio; i < fim; i++) {
		Estilo(i);
		var botao = GUI.Button(Rect (10, altura, 250, 60), jogos[i].GetNome());
		
		if (botao) {
			Validar(i);
			jogo = jogos[i];
			info = jogos[i].GetDescricao();
		}
		
		altura += 70;
	}
}

private function Estilo (jogo: int) {
	if (boolArray[jogo]) {
		GUI.skin = skinLista2;
	} else {
		GUI.skin = skinLista1;
	}
}

public function Validar(jogo: int) {
	var valida = false;
	for (var i = 0; i < JOGOS; i ++) {
		if (i == jogo) {
			boolArray[i] = true;
			valida = true;
		} else {
			boolArray[i] = false;
		}
	}
	
	if (!valida) {
		info = "\n\n\nSelecione um jogo e seu\nnível para começar.";
	}
}