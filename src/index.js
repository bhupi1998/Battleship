const DEG_TO_RAD_CONST = Math.PI / 180;

export class Ship {
  constructor(length) {
    this.length = length;
    this.alive = true;
    this.hitLocation = [];
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

export class Gameboard {
  constructor() {
    this.hitPlaces = []; // this array contains all the spots where ships are located
  }

  // places ship on board by filling up hitPlaces array
  placeShips(xInitial, yInitial, orientation, shipObject) {
    // using cos and sin to determine how each of the x and y should be incremented
    const xOrientationConst = Math.round(Math.cos(orientation * DEG_TO_RAD_CONST));
    const yOrientationConst = Math.round(Math.sin(orientation * DEG_TO_RAD_CONST));
    // Building hit place array.
    const tempArray = [];
    for (let i = shipObject.length; i > 0; i -= 1) {
      const xNext = xInitial + (shipObject.length - i) * xOrientationConst;
      const yNext = yInitial + (shipObject.length - i) * yOrientationConst;
      tempArray.push([shipObject, `${xNext},${yNext}`]);
    }
    this.hitPlaces.push(...tempArray);
  }
}
