const $arenas = document.querySelector('.root .arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');
let $playerWinner;

const player1 = {
  player: 1,
  name: 'KITANA',
  hp: '100',
  img: './image/kitana.gif',
  weapon: ['knife', 'sword', 'ax'],
  attack() {},
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: 'SCORPION',
  hp: '100',
  img: './image/scorpion.gif',
  weapon: ['knife', 'sword', 'ax'],
  attack() {},
  changeHP,
  elHP,
  renderHP,
};

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

function startGame() {
  generateLogs('start');
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

const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
      'Результат удара [playerWins]: [playerLose] - труп',
      '[playerLose] погиб от удара бойца [playerWins]',
      'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
      '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
      '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
      '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
      '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
      '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
      '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
      '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
      '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
      '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
      '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
      '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
      '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
      '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
      '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
      '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
      '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
      '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
      '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
      '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
      '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
      '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
      '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
      '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
      '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
  ],
  draw: 'Ничья - это тоже победа!'
};

function time(){
  const time = new Date();
  const minutes = time.getMinutes();
  return `${time.getHours()}:${minutes > 9 ? minutes : '0' + minutes}`;
};

function generateLogs(type, playerKick, playerDefence, powerAttak) {
  let text;
  let createChatLine;

  switch (type) {
    case 'start':
      text = logs[type]
      .replace('[time]', time())
      .replace('[player1]', 'KITANA')
      .replace('[player2]', 'SCORPION');
      createChatLine = `<p>${text}</p>`;
      break;
    case 'hit':
    case 'defence':
      text = logs[type][getRandom(logs[type].length -1)]
      .replace('[playerKick]', playerKick.name )
      .replace('[playerDefence]', playerDefence.name);
      createChatLine = `<p>${time()} - ${text} -${powerAttak} [${playerDefence.hp}/100] </p>`;
      break;
    case 'draw':
      text =logs[type];
      createChatLine = `<p>${text}</p>`;
      break;
    case 'end':
      text =logs[type][getRandom(logs[type].length -1)]
      .replace('[playerWins]', playerKick.name)
      .replace('[playerLose]', playerDefence.name);
      createChatLine = `<p>${time()} - ${text}</p>`;
      break;
    default:
      break;
  };
  $chat.insertAdjacentHTML('afterbegin', createChatLine);
};

startGame();



