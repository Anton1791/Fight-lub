const $arenas = document.querySelector('.root .arenas');
const $randomButton = document.querySelector('.button');
let $playerWinner;

const player1 = {
    player: 1,
    name: 'kitana',
    hp: '100',
    img: './image/kitana.gif',
    weapon: ['knife', 'sword', 'ax'],
    attack() {
       console.log(kitana.name, + ' Fight');
    },
  };

const player2 = {
    player: 2,
    name: 'scorpion',
    hp: '100',
    img: './image/scorpion.gif',
    weapon: ['knife', 'sword', 'ax'],
    attack() {
       console.log(scorpion.name, + ' Fight');
    },
  };

function createElement(tag, className){
    const $tag = document.createElement(tag);
    if (className ){
      $tag.classList.add(className);
    };
    return $tag;
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

function getRandom(max) {
    return Math.ceil(Math.random() * max);
};

function changeHp(player, numRandom){
  const $damagePlayers = document.querySelector( '.player' + player.player + ' .life');

  if (player.hp <= 0){
    player.hp = 0;
    $damagePlayers.style.width = player.hp + '%';
    if (player1.hp === 0 && player2.hp === 0){
      $arenas.appendChild(bothLost());
      return;
    };
     if ( player.hp == player1.hp){
      $arenas.appendChild(playerWinner(player2.name));
    } else {
      $arenas.appendChild(playerWinner(player1.name));
    }; 
  } else {
      player.hp -= numRandom;
      $damagePlayers.style.width = player.hp + '%';
  };
};

function bothLost() {
    const $bothLost = createElement('div', 'bothLost');
    if ($playerWinner){
      $arenas.removeChild($playerWinner);
    };
    $bothLost.innerText = 'Draw';
    $randomButton.disabled = true;
    return $bothLost;
};

function playerWinner(name) {
    $playerWinner = createElement('div', 'playerWinner');
    $playerWinner.innerText = name + ' Winner';
    $randomButton.disabled = true;
    return $playerWinner;
};

$randomButton.addEventListener('click', function(){
  changeHp(player1, getRandom(20));
  changeHp(player2, getRandom(20));
});
