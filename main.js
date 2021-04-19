const $arenas = document.querySelector('.root .arenas');
const $randomButton = document.querySelector('.button');


const player1 = {
    player: 1,
    name: 'kitana',
    hp: '100',
    img: './image/kitana.gif',
    weapon: ['knife', 'sword', 'ax'],
    attack() {
       console.log(kitana.name, + ' Fight');
    },
  }
const player2 = {
    player: 2,
    name: 'scorpion',
    hp: '100',
    img: './image/scorpion.gif',
    weapon: ['knife', 'sword', 'ax'],
    attack() {
       console.log(scorpion.name, + ' Fight');
    },
  }

function createElement(tag, className){
    const $tag = document.createElement(tag);
    if (className ){
      $tag.classList.add(className);
    } 
    return $tag;
}


function createPlayer( character) {
    const $player = createElement('div', 'player' + character.player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    // $player.classList = player;
    // $life.classList = 'life';
    // $name.classList = 'name';
    // $character.classList = 'character';
    // $progressbar.classList = 'progressbar';

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
}

function changeHp(player){
  const $playerWinner = document.querySelector( '.player' + player.player + ' .life');
  player.hp -= getRandom(20);

  if (player.hp <= 0){
    player.hp = 0;
    $playerWinner.style.width = player.hp + '%';
    $randomButton.disabled = true;
    winner(player.hp);
  } else {
    $playerWinner.style.width = player.hp + '%';
  }
};

function winner(params) {
  if  (params == player1.hp) {
    $arenas.appendChild(playerWinner(player2.name));
  } else { 
    $arenas.appendChild(playerWinner(player1.name));
} if (player1 == player2){
  return ('draw')
}
};

function playerWinner(name) {
    const $playerWinner = createElement('div', 'playerWinner');
    $playerWinner.innerText = name + ' Winner';
    return $playerWinner;
}

$randomButton.addEventListener('click', function(){
  console.log('.player1', player1);
  console.log('.player2', player2);
  changeHp(player1)
  changeHp(player2)
});
