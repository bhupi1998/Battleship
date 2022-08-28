import Ship from './shipObj';
import Gameboard from './gameboardObj';

const gameboard1 = new Gameboard();
const realShip = new Ship(2);
const shipInWrongSpot = new Ship(1);
gameboard1.placeShips(20, 8, 90, realShip);
gameboard1.placeShips(8, 8, 90, shipInWrongSpot);
