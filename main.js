
const player1 = {
    name: 'kitana',
    hp: '50',
    img: './image/kitana.gif',
    weapon: ['knife', 'sword', 'ax'],
    attack() {
       console.log(kitana.name, + ' Fight');
    },
  }
const player2 = {
    name: 'scorpion',
    hp: '80',
    img: './image/scorpion.gif',
    weapon: ['knife', 'sword', 'ax'],
    attack() {
       console.log(scorpion.name, + ' Fight');
    },
  }
function createPlayer(player, character) {
    const $root = document.querySelector('.root .arenas');
    const $player = document.createElement('div');
    $player.classList = player;
    
    const $progressbar = document.createElement('div');
    $progressbar.classList = 'progressbar';
  
    const $life = document.createElement('div');
    $life.classList = 'life';
    $life.style.width = character.hp + '%';
    $progressbar.appendChild($life);
  
    const $name = document.createElement('div');
    $name.classList = 'name';
    $name.innerText = character.name;
    $progressbar.appendChild($name);
  
    const $character = document.createElement('div');
    $character.classList = 'character';
  
    const $img = document.createElement('img');
    $img.src = character.img;
    $character.appendChild($img);
  
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $root.appendChild($player);
  };
  
  createPlayer('player1', player1);
  createPlayer('player2', player2);
