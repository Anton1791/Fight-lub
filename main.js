import {generateLogs} from './genLogs.js';
import {playerAttack, enemyAttack, checkPowerAttack, showResult} from './game.js';
import {player1, player2} from './player.js';
import {createElement} from './utils.js';
import {globalStor} from './globalStor.js';

const {$arenas, $formFight} = globalStor;

function startGame() {
  generateLogs('start', player1, player2);
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


startGame();

