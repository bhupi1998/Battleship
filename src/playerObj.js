import Gameboard from './gameboardObj';

class Player {
  constructor(playerName) {
    this.name = playerName;
    this.score = 0;
    this.Gameboard = new Gameboard();
  }
  computerPlay (opponentGameboard){
    
  }
}

export default Player;
