import {getRandom, createElement} from './utils.js';
import {generateLogs} from './genLogs.js';
import {globalStor} from './globalStor.js';
import Player from './player.js';
import {showResult} from './show.js';

const {$formFight, HIT, ATTACK, $arenas} = globalStor;

export default class Game{
  constructor(player1, player2){
    this.player1 = player1;
    this.player2 = player2;
  }
  
  startGame = () => {
    this.player1 = new Player({
      player: 1, 
      name: 'KITANA',
      hp: 100 ,
      img: './image/kitana.gif',
    });

    this.player2 = new Player({
      player: 2, 
      name: 'SKORPION',
      hp: 100,
      img: './image/scorpion.gif'
    });

    generateLogs('start', this.player1, this.player2);

    this.showPlayer();

    $formFight.addEventListener('submit', (event)=>{
      event.preventDefault();
      const {hit, defence, value} = this.playerAttack();
      const {hit: hitEnemy, defence: defEnemy, value: valEnemy} = this.enemyAttack();

      this.player1.changeHP(this.checkPowerAttack(hit, defEnemy, value));
      this.player2.changeHP(this.checkPowerAttack(hitEnemy, defence, valEnemy));
      this.player1.renderHP();
      this.player2.renderHP();

      if (hit !== defEnemy){
        generateLogs('hit', this.player2, this.player1, value);
      } else {
        generateLogs('defence', this.player2, this.player1, 0);
      };

      if (hitEnemy !== defence) {
        generateLogs('hit', this.player1, this.player2, valEnemy);
      } else {
        generateLogs('defence', this.player1, this.player2, 0);
      };
      showResult(this.player1, this.player2);
    });
  };

  createPlayer = ({ player, name, hp, img }) =>{
    const $player = createElement('div', 'player' + player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');
    $life.style.width = hp + '%';
    $name.innerText = name;
    $img.src = img;
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
  };
  
  showPlayer = () =>{
    $arenas.appendChild(this.createPlayer(this.player1));
    $arenas.appendChild(this.createPlayer(this.player2));
  };

  enemyAttack(){
    const hit = ATTACK[getRandom(ATTACK.length) - 1];
    const defence = ATTACK[getRandom(ATTACK.length) - 1];
      return {
        value:getRandom(HIT[hit]),
        hit, 
        defence,
      };
  };
  
  playerAttack(){
    const attack = {};
    for (let item of $formFight ){
      if (item.checked && item.name === 'hit'){
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
      };
      if (item.checked && item.name === 'defence'){
      attack.defence = item.value;
      };
      item.checked = false;
    };
    return attack;
  };


  checkPowerAttack = (attack, def, value) => {
    if (attack === def){
      return 0;
    } else {
      return value;
    };
  };
};
