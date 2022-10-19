import Ship from './shipObj';
import Gameboard from './gameboardObj';
import playerObj from './playerObj';
import domHandler from './DOM_Interaction';
import css from './style.css';
const GRID_SIZE = 10;

domHandler.createGrid(GRID_SIZE);
domHandler.findBlockId(GRID_SIZE, 0, 14);
