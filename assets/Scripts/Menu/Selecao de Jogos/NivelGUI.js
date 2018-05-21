#pragma strict

public var labelSkin: GUISkin;

public var estrelas: GUISkin[];

public static final var SELECIONADO = 0;
public static final var NORMAL = 1;
public static final var BLOQUEADO = 2;

public var botaoNivel1: GUISkin;
public var botaoNivel2: GUISkin;
public var botaoNivel3: GUISkin;

public var nivel: Nivel;

private var botoes = new boolean[4];
private var nivelMaximo : int;

function Start () {
	nivel = FindObjectOfType(typeof(Nivel)) as Nivel;
	nivel.nivel = 0;
	
	for (var i = 0; i < 4; i ++) {
		botoes[i] = false;
	}
}

function Update () {

}

function Exibir(nivelJogo : int) {
	nivelMaximo = nivelJogo;
	GUI.skin = labelSkin;
	GUI.Label (Rect (345, 390, 250, 50), "Nível:");
	
	GUI.skin = estrelas[NORMAL];
	
	var largura = 520;
	for (var i = 4; i > 0; i--) {
		MarcarNivel(i);
		botoes[i-1] = GUI.Button (Rect (largura,435,55,53), "");
		
		if (botoes[i-1] && !(i > nivelMaximo)) {
			if (nivel.nivel != i) {
				nivel.nivel = i;
			}
		}
		
		largura -= 60;
	}
}

function MarcarNivel(nivelEntrada : int) {
	if (nivelEntrada > nivelMaximo) {
		GUI.skin = estrelas[BLOQUEADO];
	} else if (nivel.nivel >= nivelEntrada) {
		GUI.skin = estrelas[NORMAL];
	} else {
		GUI.skin = estrelas[SELECIONADO];
	}
}