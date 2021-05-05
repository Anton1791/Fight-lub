import {getRandom, time} from './utils.js';
import {logs} from './logs.js';
import {globalStor} from './globalStor.js';

const {$chat} = globalStor;

function generateLogs(type, playerKick = {}, playerDefence = {}, powerAttak) {
  let text;
  let createChatLine;
  let {name: namePlayer1 } = playerKick;
  let {name: namePlayer2, hp: hpPlayer2} = playerDefence;

  switch (type) {
    case 'start':
      text = logs[type]
      .replace('[time]', time())
      .replace('[player1]', namePlayer1)
      .replace('[player2]', namePlayer2);
      createChatLine = `<p>${text}</p>`;
      break;
    case 'hit':
    case 'defence':
      text = logs[type][getRandom(logs[type].length -1)]
      .replace('[playerKick]', namePlayer1 )
      .replace('[playerDefence]', namePlayer2);
      createChatLine = `<p>${time()} - ${text} -${powerAttak} [${hpPlayer2}/100] </p>`;
      break;
    case 'draw':
      text =logs[type];
      createChatLine = `<p>${text}</p>`;
      break;
    case 'end':
      text =logs[type][getRandom(logs[type].length -1)]
      .replace('[playerWins]', namePlayer1)
      .replace('[playerLose]', namePlayer2);
      createChatLine = `<p>${time()} - ${text}</p>`;
      break;
    default:
      break;
  };
  $chat.insertAdjacentHTML('afterbegin', createChatLine);
};
  
export {generateLogs};