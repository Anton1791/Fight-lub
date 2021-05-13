
export default class Player{
    constructor(props){
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
    };
   
    changeHP = (randomNumber) => {
        this.hp -= randomNumber;
        if (this.hp <= 0){
          this.hp = 0;
        };
      };

    elHP = () => {
        return document.querySelector('.player' + this.player + ' .life');
    };
    
    renderHP = () => {
    this.elHP().style.width = this.hp + '%';
    };
  };
