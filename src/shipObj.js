class Ship {
  constructor(length) {
    this.length = length;
    this.alive = true;
    this.life = this.length;
  }

  // takes one life away when called. If life falls to 0 it sets the alive parameter to 0;
  hit() {
    if (!this.alive) return; // if already dead no point in doing math
    this.life -= 1;
    if (this.life <= 0) { this.alive = false; }
  }

  // if ship is sunk this returns true
  // returns the ship status
  isSunk() {
    if (!this.alive) { return true; } // is it's sunk no need to go through loops
    return false;
  }
}

export default Ship;
