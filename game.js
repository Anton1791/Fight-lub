import {getRandom, createElement} from './utils.js';
import {generateLogs} from './genLogs.js';
import {player1, player2} from './players.js';
import {globalStor} from './globalStor.js';

const {$formFight, HIT, ATTACK, $arenas} = globalStor;

function checkPowerAttack(attack, def){
  if (attack.hit === def.defence){
      return 0;
  } else {
      return attack.value;
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
  
function createPlayer( character) {
  const $player = createElement('div', 'player' + character.player);
  const $progressbar = createElement('div', 'progressbar');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $character = createElement('div', 'character');
  const $img = createElement('img');

  $life.style.width = character.hp + '%';
  $name.innerText = character.name;
  $img.src = character.img;

  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $character.appendChild($img);

  $player.appendChild($progressbar);
  $player.appendChild($character);
  return $player;
};
  
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

export default class Game{
  constructor(){
  }
  
  start = () => {generateLogs('start', player1, player2)};
  startGame = () => {
    $formFight.addEventListener('submit', function(event){
    event.preventDefault();
    const player = playerAttack();
    const enemy = enemyAttack();
  
    player1.changeHP(checkPowerAttack(player, enemy));
    player2.changeHP(checkPowerAttack(enemy, player));
    player1.renderHP();
    player2.renderHP();
  
    if (player.hit !== enemy.defence){
      generateLogs('hit', player2, player1, player.value);
    } else {
      generateLogs('defence', player2, player1, 0);
    };
  
    if (enemy.hit !== player.defence) {
      generateLogs('hit', player1, player2, enemy.value);
    } else {
      generateLogs('defence', player1, player2, 0);
    };
    showResult();
    });
  };
};

