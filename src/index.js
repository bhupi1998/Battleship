/* eslint-disable max-len */
const DEG_TO_RAD_CONST = Math.PI / 180;

export class Ship {
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

export class Gameboard {
  constructor() {
    this.hitPlaces = []; // this array contains all the spots where ships are located
    this.globalNoGoCoordinates = []; // contains all coordinates where another ship cannot be placed
    // Ships need to be withing grid, 1 block away from other ships and cannot overlap other ships
  }

  // if the new coordinates are not already present and are 1 block away from already placed ships
  // then the new elements are added, else false is returned.
  // validatePosition(newCoordinates) {

  // }

  // receives coordinates the ship wants to occupy in an array. Format is [shipObject,x,y]
  // returns array of coordinates that are no go. Meaning no other object can be placed upon there
  // eslint-disable-next-line class-methods-use-this
  static noGoCoordinatesCalculator(newCoordinates) {
    const NoGoCoordinates = [];
    for (let i = 0; i < newCoordinates.length; i += 1) {
      const tempArray = [
        [newCoordinates[i][1] - 1, newCoordinates[i][2] - 1],
        [newCoordinates[i][1], newCoordinates[i][2] - 1],
        [newCoordinates[i][1] + 1, newCoordinates[i][2] - 1],
        [newCoordinates[i][1] - 1, newCoordinates[i][2]],
        [newCoordinates[i][1], newCoordinates[i][2]],
        [newCoordinates[i][1] + 1, newCoordinates[i][2]],
        [newCoordinates[i][1] - 1, newCoordinates[i][2] + 1],
        [newCoordinates[i][1], newCoordinates[i][2] + 1],
        [newCoordinates[i][1] + 1, newCoordinates[i][2] + 1],
      ];
      NoGoCoordinates.push(...tempArray);
    }
    return NoGoCoordinates;
  }

  // takes in array. If array has duplicates xy values it removes them
  static removeDuplicatesCoordinates(coordinates) {
    for (let i = 0; i < coordinates.length; i += 1) {
      for (let l = 1 + i; l < coordinates.length; l += 1) {
        if (JSON.stringify(coordinates[i]) === JSON.stringify(coordinates[l])) { // if found a copy, overwrite it
          // eslint-disable-next-line no-param-reassign
          coordinates[l] = null;
        }
      }
    }
    const filteredCoordinates = coordinates.filter((element) => element != null);
    return filteredCoordinates;
  }

  // generates all ship coordinates. Return array with all coordinates
  // covered by the ship
  static shipCoordinateGenerator(xInitial, yInitial, orientation, shipObject) {
    // using cos and sin to determine how each of the x and y should be incremented
    const xOrientationConst = Math.round(Math.cos(orientation * DEG_TO_RAD_CONST));
    const yOrientationConst = Math.round(Math.sin(orientation * DEG_TO_RAD_CONST));
    // Building hit place array.
    const tempArray = []; // contains temporary coordinate and ship data.
    // Once verified it will be pushed to hit places.
    for (let i = shipObject.length; i > 0; i -= 1) {
      const xNext = xInitial + (shipObject.length - i) * xOrientationConst;
      const yNext = yInitial + (shipObject.length - i) * yOrientationConst;
      tempArray.push([shipObject, xNext, yNext]);
    }
    return tempArray;
  }

  // places ship on board. Returns an error if not possible
  placeShips(xInit, yInit, orientation, shipObject) {
    const shipSpotCoordinates = Gameboard.shipCoordinateGenerator(xInit, yInit, orientation, shipObject);
    const shipNoGoCoordinates = Gameboard.noGoCoordinatesCalculator(shipSpotCoordinates);
    this.hitPlaces = this.hitPlaces.concat(shipSpotCoordinates);
    this.globalNoGoCoordinates = this.globalNoGoCoordinates.concat(shipNoGoCoordinates);
  }
}

const gameboard1 = new Gameboard();
const realShip = new Ship(2);
gameboard1.placeShips(8, 8, 90, realShip);
