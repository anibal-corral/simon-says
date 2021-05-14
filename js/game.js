const blue = document.getElementById('blue')
const purple = document.getElementById('purple')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const startBtn = document.getElementById('startBtn')
const LAST_LEVEL =2;

class Game {
  constructor() {
    this.initialize = this.initialize.bind(this);
    this.initialize();
    this.setSecuence();
    this.nextLevel();
  }

  initialize() {
    this.chooseColor = this.chooseColor.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.toggleStartBtn();
    this.level=1;
    this.colors ={
      blue,purple,orange,green
    }
  }
  toggleStartBtn(){
    if(startBtn.classList.contains('hide')){
      startBtn.classList.remove('hide');
    }else{
      startBtn.classList.add('hide');
    }
  }
  setSecuence(){
    //Creating random secuence.
    this.secuence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random()*4));

  }
  nextLevel(){
    //This line is for validating if user use the right secuence
    this.sublevel=0;
    this.lightSecuence();
    this.addEventsClick();
  }
  numberToColor(number){
    switch(number){
      case 0:
      return 'blue';
      case 1:
      return 'purple';
      case 2:
      return 'orange';
      case 3:
      return 'green';

    }
  }
  colorToNumber(color){
    switch(color){
      case 'blue':
      return 0;
      case 'purple':
      return 1;
      case 'orange':
      return 2;
      case 'green':
      return 3;

    }
  }
  lightSecuence(){
    for (let i=0; i<this.level; i++){
      let color = this.numberToColor(this.secuence[i]);
      setTimeout(()=>  this.lightColor(color), 1000*i);
    }
  }
  lightColor(color){
    this.colors[color].classList.add('light');
    setTimeout(()=>this.colorOff(color), 350);
  }
  colorOff(color){
    this.colors[color].classList.remove('light');
  }
  addEventsClick(){
    this.colors.blue.addEventListener('click', this.chooseColor);
    this.colors.green.addEventListener('click', this.chooseColor);
    this.colors.purple.addEventListener('click', this.chooseColor);
    this.colors.orange.addEventListener('click', this.chooseColor);
  }
  chooseColor(ev){
    //Getting color value from color dataset of the object
    const colorName = ev.target.dataset.color;
    const colorNumber = this.colorToNumber(colorName);
    this.lightColor(colorName);
    if(colorNumber === this.secuence[this.sublevel]){//If user choose the right color so add sublevel
      this.sublevel++;
      if(this.sublevel === this.level){//Go to next level
        this.level++;
        this.removeEventsClick()
        if(this.level === (LAST_LEVEL+1)){
          this.youWin();
        }else{
          setTimeout(this.nextLevel,2000);
        }
      }
    }else {
      this.youLose();
    }
  }

  youWin(){
    swal('Game', 'Congratulations, you won the game!', 'success').then(this.initialize);
  }
  youLose(){
    swal('Game', 'Sorry but You looooose!', 'error').then(()=> {
      this.removeEventsClick();
      this.initialize();
    })
  }
  removeEventsClick(){
    this.colors.blue.removeEventListener('click', this.chooseColor);
    this.colors.green.removeEventListener('click', this.chooseColor);
    this.colors.purple.removeEventListener('click', this.chooseColor);
    this.colors.orange.removeEventListener('click', this.chooseColor);
  }
}

function startGame() {
  window.game = new Game()
}
