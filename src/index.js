import GameLoop from './gameLoopControl';
import css from './style.css';

const GRID_SIZE = 10;

const game = new GameLoop();
game.game(GRID_SIZE);
