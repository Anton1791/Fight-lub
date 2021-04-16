
const kitana = {
    name: 'kitana',
    hp: '',
    img: './image/kitana.gif',
    weapon: ['knife', 'sword', 'ax'],
    player: 'player1',
    attack() {
        console.log(kitana.name, + ' Fight');
    },
}
const scorpion = {
    name: 'scorpion',
    hp: '',
    img: './image/scorpion.gif',
    weapon: ['knife', 'sword', 'ax'],
    player: 'player2',
    attack() {
        console.log(scorpion.name, + ' Fight');
    },
}
function createPlayer(play, nick) {
    const $arenas = document.querySelector('.arenas');
    const $players = document.createElement('div');
    const $progressbar = document.createElement('div');
    const $character = document.createElement('div');
    const $life = document.createElement('div');
    const $name = document.createElement('div');
    const $image = document.createElement('img');

    $players.className = play;
    $progressbar.className = 'progressbar';
    $character.className = 'character';
    $life.className = 'life';
    $name.className = 'name';
    $image.className = 'image';
    $image.src = './image/' + nick + '.gif';
    $name.innerText = nick;
    $life.setAttribute('style', 'width: 100%');

    $players.appendChild($progressbar);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $players.appendChild($character);
    $character.appendChild($image);
    $arenas.appendChild($players);

}
createPlayer(kitana.player, kitana.name);
createPlayer(scorpion.player, scorpion.name);
