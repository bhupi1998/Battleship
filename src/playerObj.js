import Gameboard from './gameboardObj';

class Player {
  constructor(playerName) {
    this.name = playerName;
    this.score = 0;
    this.Gameboard = new Gameboard();
  }

  static computerPlay(opponentGameboard) {
    // defining all variables
    let shotOutcome;
    let randomX;
    let randomY;
    // until a valid shot is made keep trying random coordinates
    do {
      randomX = Math.floor((Math.random()) * (opponentGameboard.gridSize + 1));
      randomY = Math.floor((Math.random()) * (opponentGameboard.gridSize + 1));
      shotOutcome = opponentGameboard.receiveAttack(randomX, randomY);
    } while (shotOutcome === 'COORDINATE_USED_PREVIOUSLY' || shotOutcome === 'NOT_IN_GRID');
    return [randomX, randomY];
  }
}

export default Player;
