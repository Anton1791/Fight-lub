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
       console.log(this.name, + ' Fight');
    },
    changeHP,
    elHP,
    renderHP,
  };

const player2 = {
    player: 2,
    name: 'scorpion',
    hp: '100',
    img: './image/scorpion.gif',
    weapon: ['knife', 'sword', 'ax'],
    attack() {
       console.log(this.name, + ' Fight');
    },
    changeHP,
    elHP,
    renderHP,
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

function showResultText(name){
  const $showTitle = createElement('div', 'showTitle');
  if (name){
    $showTitle.innerText = name + ' Wins';
  } else {
    $showTitle.innerText = 'Draw';
  };
  return $showTitle;
};

$randomButton.addEventListener('click', function(){
  player1.changeHP(getRandom(20));
  player2.changeHP(getRandom(20));
  player1.renderHP();
  player2.renderHP();
  if (player1.hp === 0 || player2.hp === 0){
    $arenas.appendChild(createReloadButton());
    $randomButton.disabled = true;
  };
  if (player1.hp === 0 && player1.hp < player2.hp){
    $arenas.appendChild(showResultText(player2.name))
  } else if ( player2.hp < player1.hp && player2.hp === 0){
    $arenas.appendChild(showResultText(player1.name))
  } else if (player1.hp === 0 && player1.hp === player2.hp){
    $arenas.appendChild(showResultText())
  };
});

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
