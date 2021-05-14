const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL =2;

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    this.siguienteNivel();
  }

  inicializar() {

    this.elegirColor = this.elegirColor.bind(this);//Esto es para que quede atada al this del juego .
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.toggleBtnEmpezar();
    // btnEmpezar.classList.add('hide')
    this.nivel=1;
    this.colores ={
      celeste,violeta,naranja,verde
    }
  }
  toggleBtnEmpezar(){
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide');
    }else{
      btnEmpezar.classList.add('hide');
    }
  }
  generarSecuencia(){
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4));//generando una secuencia aleatoria de 10 numeros

  }
  siguienteNivel(){
    this.subnivel=0;//esto es para ir validando si el usuario utiliza la secuencia correcta.
    this.iluminarSecuencia();
    //Agrega los eventos de click a los botones para luego poder recibir el input del usuario
    this.agregarEventosClick();
  }
  transfomarNumeroAColor(numero){
    switch(numero){
      case 0:
      return 'celeste';
      case 1:
      return 'violeta';
      case 2:
      return 'naranja';
      case 3:
      return 'verde';

    }
  }
  transfomarColorANumero(color){
    switch(color){
      case 'celeste':
      return 0;
      case 'violeta':
      return 1;
      case 'naranja':
      return 2;
      case 'verde':
      return 3;

    }
  }
  iluminarSecuencia(){
    for (let i=0; i<this.nivel; i++){
      let color = this.transfomarNumeroAColor(this.secuencia[i]);
      // console.log(color);
      setTimeout(()=>  this.iluminarColor(color), 1000*i);
    }
  }
  iluminarColor(color){
    this.colores[color].classList.add('light');
    setTimeout(()=>this.apagarColor(color), 350);
  }
  apagarColor(color){
    this.colores[color].classList.remove('light');
  }
  agregarEventosClick(){
    this.colores.celeste.addEventListener('click', this.elegirColor);
    this.colores.verde.addEventListener('click', this.elegirColor);
    this.colores.violeta.addEventListener('click', this.elegirColor);
    this.colores.naranja.addEventListener('click', this.elegirColor);
  }
  elegirColor(ev){
    const nombreColor = ev.target.dataset.color; //Tomo el valor de la variable color del dataset del objeto que emite el eventos
    const numeroColor = this.transfomarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if(numeroColor === this.secuencia[this.subnivel]){//si el usuario escoge bien el color entonces se aumenta el subnivel
      this.subnivel++;
      if(this.subnivel === this.nivel){//Si el usuario le da a todos correctamente entonces esto avanza al siguiente nivel
        this.nivel++;
        //Ahora el usuario no deberia poder seguir haciendo clicks
        this.eliminarEventosClick()
        if(this.nivel === (ULTIMO_NIVEL+1)){
          //GANO
          this.youWin();
        }else{
          //hay que avanzar de nivel
          //Agrego el setTimeOut para que se espere un poco al pasar al siguiente nivel
          setTimeout(this.siguienteNivel,3000);
        }
      }
    }else {
      this.youLose();
    }
  }

  youWin(){
    swal('Game', 'Congratulations, you won the game!', 'success').then(this.inicializar);
  }
  youLose(){
    swal('Game', 'Sorry but You looooose!', 'error').then(()=> {
       this.eliminarEventosClick();
      this.inicializar();
    })
  }
  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor);
    this.colores.verde.removeEventListener('click', this.elegirColor);
    this.colores.violeta.removeEventListener('click', this.elegirColor);
    this.colores.naranja.removeEventListener('click', this.elegirColor);
  }
}

function empezarJuego() {
  window.juego = new Juego()
}
