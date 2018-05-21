#pragma strict

public var texturas : Texture2D[];
private var textura = 1;

public var estrela: Texture2D;

public static final var larguraTela = Screen.width;
public static final var alturaTela = Screen.height;

private var janela : Rect;
public var habilitar = false;

public var imagemFundo : SpriteRenderer;

private var largura = 900;
private var altura = 720;

//nome do jogo, nivel, dados
public var skins: GUISkin[];

public var scrollPosition : Vector2 = Vector2.zero;

public var gatilho: boolean = true;

//Script em C# responsavel por ler o arquivo csv e colocar os dados dentro da janela.
private var csScript : CsColetor;
public var linhas: String[];

public var icones : Texture2D[];

private var logo;

function Start () {
	csScript = this.GetComponent("CsColetor");
	
	var dados = csScript.ReadFromFile();
	
	linhas = dados.Split("!"[0]);

	janela = Rect(180, 15, largura, altura);
}

function OnGUI () {

	GUI.depth = 1;
	
	if(habilitar){
		GUI.skin = skins[3]; //Limpar fica muito grande
		
		imagemFundo.sortingLayerName = "GUI";
		imagemFundo.sortingOrder = 1;
		
		janela = GUI.Window(0,janela,WindowFunction, "");
		GUI.depth = 0;

		var alturaLinha = 0;
		var larguraB = 76;
	 	var alturaB = 105;
	 	
	 	var alturaE = -49 + alturaB;
		var posicaoXE = 212;
	 			
		GUILayout.BeginArea(new Rect(255, 90, largura + 690, altura + 3000));
		for (var i : int = 0; i < linhas.Length - 1; i++) {
			var colunas = linhas[i].Split(","[0]);
			GUI.DrawTexture (Rect (43, alturaLinha - 35, 694, 160), texturas[textura++ % 2]);
			
			var nivel = parseInt(colunas[1]);
			
			for (var u : int = 0; u < nivel; u++) {
				//Debug.Log("Foi!");
				GUI.DrawTexture (Rect (posicaoXE, alturaE, 27, 27), estrela);
				posicaoXE -= 18;
			}
			alturaE += 109;
			posicaoXE = 212;
			//pular linha
			if (i == 0) {
				GUILayout.Label("", GUILayout.Width(larguraB + 20), GUILayout.Height(18));
			}

 			GUILayout.BeginHorizontal();
 			
 			if (colunas[0] == "A. Cores") {
 				logo = icones[0];
 			} else if (colunas[0] == "Quanto É?" || colunas[0] == "S.Número") {
 				logo = icones[1];
 			} else if (colunas[0] == "AVD") {
 				logo = icones[4];
 			} else if (colunas[0] == "Memória") {
 				logo = icones[5];
 			} else if (colunas[0] == "Onde Está?") {
 				logo = icones[3];
 			}else if (colunas[0] == "Quebra-C.") {
 				logo = icones[2];
 			}
 			
 			GUI.DrawTexture (Rect (0, alturaLinha, 110, 100), logo);
 		
 			//espaço horizontal
 			GUILayout.Label("", GUILayout.Width(95), GUILayout.Height(10));
 			
			for (var o : int = 0; o < colunas.Length - 1; o++) {
	 			
	 			if (o == 1) {
	 				GUI.skin = skins[1];
	 				continue;
	 			}
	 			
	 			if (o == 0) {
	 				GUI.skin = skins[0];
	 				colunas[0] = colunas[0] + "\nnível";
	 			} else if (o > 1) {
	 				GUI.skin = skins[2];
	 			}
	 			
	 			if (o == 0) {
	 				larguraB = 135;
	 			} else if (o == 3) {
	 				larguraB = 95;
	 			} else if (o >= 4 && o <= 6) {
	 			 	larguraB = 81;
	 			} else {
	 				larguraB = 55;
	 			}
	 			
	 			GUILayout.Label(colunas[o], GUILayout.Width(larguraB), GUILayout.Height(alturaB));
	 		}
			GUILayout.EndHorizontal();
			//GUILayout.Label("nível", GUILayout.Width(200), GUILayout.Height(100));

			if (i > 3) {
				break;	
			}
			alturaLinha += 110;
		}
		GUILayout.EndArea();
	}
}

function WindowFunction (windowID : int) {
	
	var fechar = GUI.Button (Rect (720,570,150,135), "");

	if(fechar){
		habilitar = false;
		
		imagemFundo.sortingLayerName = "Default";
		imagemFundo.sortingOrder = -1;
		
		print("Saiu!");
	}
	
	//GUI.skin = skins[0];
}