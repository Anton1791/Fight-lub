import {globalStor} from './globalStor.js';
import {createElement} from './utils.js';
import {generateLogs} from './genLogs.js'

const {$formFight, $arenas} = globalStor;

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

function showResult(player1, player2) {
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

export {showResult};