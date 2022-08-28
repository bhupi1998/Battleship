class Ship {
  constructor(length) {
    this.length = length;
    this.alive = true;
    this.hitLocation = []; // this might not be needed anymore
    // a simple counter should do it since all coordinates are saved
    // in gameboard hit places. when location is hit simply
    // subtract a life
    for (let i = 0; i < length;) {
      this.hitLocation[i] = 1;
      i += 1;
    }
  }

  set hit(location) {
    this.hitLocation[location] = 0;
  }

  get getHitLocationArray() {
    return this.hitLocation;
  }

  isSunk() {
    if (!this.alive) { return true; } // is it's sunk no need to go through loops
    const shipStatus = this.hitLocation.every((element) => {
      if (element === 0) { return true; }
      return false;
    });
    if (shipStatus) {
      this.alive = false;
      return true;
    } return false; // if true the ship is sunk
  }
}

export default Ship;
