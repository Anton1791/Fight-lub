const player1 = {
    player: 1,
    name: 'KITANA',
    hp: '100',
    img: './image/kitana.gif',
    weapon: ['knife', 'sword', 'ax'],
    attack() {},
    changeHP,
    elHP,
    renderHP,
  };
    
  const player2 = {
    player: 2,
    name: 'SCORPION',
    hp: '100',
    img: './image/scorpion.gif',
    weapon: ['knife', 'sword', 'ax'],
    attack() {},
    changeHP,
    elHP,
    renderHP,
  };
  
  function changeHP(randomNumber){
    this.hp -= randomNumber;
    if (this.hp <= 0){
      this.hp = 0;
    };
  };
    
  function elHP(){
    const $playrLife = document.querySelector( '.player' + this.player + ' .life');
    return $playrLife;
  };
  
  function renderHP(){
    this.elHP().style.width = this.hp + '%';
  };
  
  
  export {player1, player2}