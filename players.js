import Player from './classPlayer.js';

const player1 = new Player({
  player: 1,
  name: 'KITANA',
  hp: '100',
  img: './image/kitana.gif',
});

const player2 = new Player({
  player: 2,
  name: 'SCORPION',
  hp: '100',
  img: './image/scorpion.gif',
});


export {player1, player2};

