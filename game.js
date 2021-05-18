import {getRandom, createElement} from './utils.js';
import {generateLogs} from './genLogs.js';
import {globalStor} from './globalStor.js';
import {player1, player2} from './player.js'

const {$formFight, HIT, ATTACK, $arenas} = globalStor;

function checkPowerAttack(attack, def, value){
  if (attack === def){
      return 0;
  } else {
      return value;
  };
};
  
function enemyAttack() {
  const hit = ATTACK[getRandom(ATTACK.length) - 1];
  const defence =ATTACK[getRandom(ATTACK.length) - 1];
  return {
    value:getRandom(HIT[hit]),
    hit, 
    defence,
  };
};

function playerAttack(){
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

function createReloadButton (){
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $restartButton = createElement('button', 'button');

  $restartButton.innerText = 'Restart';
  $restartButton.addEventListener('click', function(){
  window.location.reload();
  });

  $reloadWrap.appendChild($restartButton);
  return $reloadWrap;
};

function showResult() {
  if (player1.hp === 0 || player2.hp === 0){
    $arenas.appendChild(createReloadButton());
    $formFight.disabled = true;
  };

  if (player1.hp === 0 && player1.hp < player2.hp){
    $arenas.appendChild(showResultText(player2.name));
    generateLogs('end', player2, player1);
  } else if ( player2.hp < player1.hp && player2.hp === 0){
    $arenas.appendChild(showResultText(player1.name));
    generateLogs('end', player1, player2 );
  } else if (player1.hp === 0 && player1.hp === player2.hp){
    $arenas.appendChild(showResultText());
    generateLogs('draw');
  };
};

function showResultText(name){
  const $showTitle = createElement('div', 'showTitle');
  if (name){
    $showTitle.innerText = name + ' Wins';
  } else {
    $showTitle.innerText = 'Draw';
  };
  return $showTitle;
};

function createPlayer({player, name, hp, img}){
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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

class Game{
  constructor(){
  }

  startGame = () => {
    class Player{
      constructor(props){
          this.player = props.player;
          this.name = props.name;
          this.hp = props.hp;
          this.img = props.img;
      }
     
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

    generateLogs('start', player1, player2);

    $formFight.addEventListener('submit', function(event){
    event.preventDefault();
    const {hit, defence, value} = playerAttack();
    const {hit: hitEnemy, defence: defEnemy, value: valEnemy} = enemyAttack();
  
    player1.changeHP(checkPowerAttack(hit, defEnemy, value));
    player2.changeHP(checkPowerAttack(hitEnemy, defence, valEnemy));
    player1.renderHP();
    player2.renderHP();
  
    if (hit !== defEnemy){
      generateLogs('hit', player2, player1, value);
    } else {
      generateLogs('defence', player2, player1, 0);
    };
  
    if (hitEnemy !== defence) {
      generateLogs('hit', player1, player2, valEnemy);
    } else {
      generateLogs('defence', player1, player2, 0);
    };
    showResult();
    });
  };
};

export const game = new Game();
