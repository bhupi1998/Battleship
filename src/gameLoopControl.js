import Ship from './shipObj';
import Gameboard from './gameboardObj';
import PlayerObj from './playerObj';
import domHandler from './DOM_Interaction';

class battlefieldGameControl {
  constructor() {
    this.gameOver = 0; // 0 game can carry on, 1 game ended.
  }

  setGameOver(gameStatus) {
    this.gameOver = gameStatus; // 1 means game is over
  }

  // Create grid
  static initiateGrids(player1, player2, player1Gameboard, player2Gameboard, GRID_SIZE) {
    domHandler.createGrid(GRID_SIZE, player1);
    domHandler.createGrid(GRID_SIZE, player2);

    // temporariyly manually placing all ships
    // player1Gameboard.placeShips(8, 8, 90, 2);
    // domHandler.placeShipOngrid(player1Gameboard, player1, GRID_SIZE);

    // player1Gameboard.placeShips(5, 6, 90, 2);
    // player1Gameboard.placeShips(3, 3, 90, 2);
    // player1Gameboard.placeShips(1, 8, 90, 2);
    // player1Gameboard.placeShips(8, 0, 90, 7);
    // player1Gameboard.placeShips(0, 0, 0, 6);
    player1Gameboard.autoPlaceShips();
    domHandler.placeShipOngrid(player1Gameboard, player1, GRID_SIZE, 1);

    player2Gameboard.autoPlaceShips();
    domHandler.placeShipOngrid(player2Gameboard, player2, GRID_SIZE, 0);
  }

  game(GRID_SIZE) {
    // creating grid
    // creating all player and gameboard objects
    // would like to let user select

    const player1 = new PlayerObj('player1');
    const player2 = new PlayerObj('player2');
    const player1Gameboard = new Gameboard();
    const player2Gameboard = new Gameboard();

    // eslint-disable-next-line max-len
    battlefieldGameControl.initiateGrids(player1, player2, player1Gameboard, player2Gameboard, GRID_SIZE);
    // let user place their own ships
    // automatically generate ships locations for pc
    // add event listener once all ships are ready to go.
    // eslint-disable-next-line max-len
    this.playerEventListenerSetup(player1Gameboard, player2Gameboard, player1, player2, GRID_SIZE);
    //    in event listener: figure out what and where the player attacked and figure out what to do
    //                       Trigger pc attack as well
    //                       Check for Game Over
  }

  // passing the gameboard obj of the opponent
  // player1 =  user; player2 = pc
  // eslint-disable-next-line max-len
  playerEventListenerSetup(player1BoardObj, player2BoardObj, player1Obj, player2Obj, gridSize) {
    // figure out where the user wants to attack the pc's gameboard
    const gridP2 = document.getElementById(player2Obj.name);
    const gridP2ElementArray = gridP2.querySelectorAll('.gridElement');
    gridP2ElementArray.forEach((gridBlock) => {
      gridBlock.addEventListener('click', (e) => {
        if (this.gameOver === 1) {
          console.log('game is over, go away');
          return 0;
        } // game Ended, go away
        // eslint-disable-next-line max-len
        if (player1BoardObj.gameOver()) {
          this.setGameOver(1);
          console.log('Game Over');
        } else {
          const userAction = battlefieldGameControl.userTurn(player2Obj, player2BoardObj, e, gridSize);
          // if user action is legal then allow pc to move on. Otherwise wait until a valid input
          if ((typeof userAction === 'object') || (userAction === false)) {
            // Pc turn now if it's not gameover
            if (!player2BoardObj.gameOver()) {
              battlefieldGameControl.pcTurn(player1Obj, player1BoardObj, gridSize);
            } else {
              console.log('Game Over');
              this.setGameOver(1);
            }
          }
          return 0;
        }
      });
    });
    return 0;
  }

  static pcTurn(player1Obj, player1BoardObj, gridSize) {
    const gridP1 = document.getElementById(player1Obj.name);
    const PCAtkCoord = PlayerObj.computerPlay(player1BoardObj);
    const shotOutcomePC = player1BoardObj.receiveAttack(...PCAtkCoord);
    const PCBlockId = domHandler.findBlockId(gridSize, ...PCAtkCoord);
    const gridP1Block = gridP1.querySelector(`[data-grid_element_num = "${PCBlockId}"]`);
    // shot result can either be an object(hit), false(no hit) or string(error has occured)
    domHandler.shotGridColor(gridP1Block, shotOutcomePC);
    return shotOutcomePC;
  }

  static userTurn(player2Obj, player2BoardObj, e, gridSize) {
    const blockNum = e.target.getAttribute('data-grid_element_num');
    // user attacked
    const blockCoordinate = domHandler.xyCoordinateIdentifier(gridSize, blockNum);
    const shotResult = player2BoardObj.receiveAttack(...blockCoordinate);
    // shot result can either be an object(hit), false(no hit) or string(error has occured)
    // if there has been an error, return the error.
    if ((typeof shotResult === 'object') || (shotResult === false)) {
      domHandler.shotGridColor(e.target, shotResult);
    }
    return shotResult;
  }
}

export default battlefieldGameControl;
