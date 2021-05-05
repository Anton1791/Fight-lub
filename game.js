import {getRandom, createElement} from './utils.js';
import {generateLogs} from './genLogs.js';
import {player1, player2} from './player.js';
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
  


export {playerAttack, enemyAttack, checkPowerAttack, showResult};