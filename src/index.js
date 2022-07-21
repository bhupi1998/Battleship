class ship {
  constructor(length) {
    this.length = length;
    const alive = true;
    let hitLocation;
    for (let i = 0; i < length; i += 1) {
      hitLocation[i] = 1;
      i -= 1;
    }
  }

  hit(location) {
    this.hitLocation[location] = 0;
  }

  isSunk() {
    const shipStatus = this.hitLocation.every((element) => {
      if (element === 0) { return true; }
    });
    if (shipStatus) { return true; } return false; //if true the ship is sunk
  }
}
