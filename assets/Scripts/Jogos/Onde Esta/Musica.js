#pragma strict

private var musica: AudioClip;
private var estado: boolean;

function Start () {
	DontDestroyOnLoad(gameObject);
}

function Update () {

}

private static var instance;
 
function Awake()	{
	estado = true;
    if (instance != null && instance != this)	{
        Destroy(gameObject);
       	return;
	} else {
    	instance = this;
    }
 
       //DontDestroyOnLoad( this.gameObject );
}
 
public function GetInstance() {
	audio.Stop();
	return instance;
}

//Para que outros scripts o chamem e possam pausar ou dar play.
public function PauseOrPlay () {
	if(estado){
		estado = false;
		audio.Pause();
	}else{
		estado = true;
		audio.Play();
	}
}

//Garantir que o skin acompanhe o estado.
public function GetEstado(){
	return estado;
}