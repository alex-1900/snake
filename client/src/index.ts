import '../style.scss';
import container from "./dependents";
import ActionInterface from "./Interfaces/ActionInterface";
import SubjectInterface from './Interfaces/SubjectInterface';
import Snake from './Observers/Snake';
import Control from './Components/Contro';
import PublicMap from './Observers/PublicMap';
import Food from './Observers/Food';

const elementRocker = document.getElementById('rocker');
const elementSpeedUp = document.getElementById('speed-up');
const elementStartGame = document.getElementById('start-game');
const elementWelcome = document.getElementById('welcome');

const elementGameOverCfm = document.getElementById('game-over-confirm');
const elementGameOver = document.getElementById('game-over');

const action = container.get<ActionInterface>('action');
const subject = container.get<SubjectInterface>('subject');

elementStartGame.onclick = function() {
  elementWelcome.style.display = 'none';

  const food = new Food();
  subject.register(food);

  const publicMap = new PublicMap(food);
  subject.register(publicMap);

  const snake = new Snake(food, publicMap);
  subject.register(snake);

  const controller = new Control(elementRocker, elementSpeedUp, snake);

  action.onStop(function() {
    controller.terminate();  // 结束控制器的 Worker
    elementGameOver.style.display = 'block';
  });

  action.start();
};

elementGameOverCfm.onclick = function() {
  elementGameOver.style.display = 'none';
  elementWelcome.style.display = 'block';
};

elementStartGame.style.display = 'block';
