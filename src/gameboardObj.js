/* eslint-disable max-len */
import Ship from './shipObj';

const DEG_TO_RAD_CONST = Math.PI / 180;
const GRID_SIZE = 10;

class Gameboard {
  constructor() {
    this.hitPlaces = []; // this array contains all the spots where ships are located
    this.globalNoGoCoordinates = []; // contains all coordinates where another ship cannot be placed
    this.missedShots = [];
    // Ships need to be withing grid, 1 block away from other ships and cannot overlap other ships
  }

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

  // takes in 2 arrays. It looks for elements in common. If found it returns the match, else undefined is returned
  // 2 different comparison paths it can take to accomodate different array storage styles.
  static findCoordinateConflict(shipCoordinates, NoGoCoordinates) {
    let result;
    if (shipCoordinates.length < 1 || NoGoCoordinates.length < 1) { return undefined; }
    if (shipCoordinates[0].length === 3 && NoGoCoordinates[0].length === 2) {
      for (let i = 0; i < shipCoordinates.length; i += 1) {
        result = NoGoCoordinates.find((element) => JSON.stringify(element) === JSON.stringify([shipCoordinates[i][1], shipCoordinates[i][2]]));
      }
    } else if (shipCoordinates.length[0] === 2 && NoGoCoordinates[0].length === 3) {
      for (let i = 0; i < shipCoordinates.length; i += 1) {
        result = NoGoCoordinates.find((element) => JSON.stringify([element[0], element[1]]) === JSON.stringify([shipCoordinates[i][0], shipCoordinates[i][1]]));
      }
    }
    return result;
  }

  // checks if ship placement is withing grid area
  static coordinateInGridCheck(gridSize, shipCoordinates) {
    return shipCoordinates.every((element) => element[1] <= gridSize && element[1] >= 0 && element[2] <= gridSize && element[2] >= 0);
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
  // Steps:
  // 1 generate ship coordinates
  // ensure ship is withing area
  // 2 ensure ship can be placed by comparing to existing no go coordinates
  // 3 generate all no go coordinates
  placeShips(xInit, yInit, orientation, shipLength) {
    const shipObject = new Ship(shipLength);
    const shipSpotCoordinates = Gameboard.shipCoordinateGenerator(xInit, yInit, orientation, shipObject); // generate all coordinates the ship will be placed on
    const shipNoGoCoordinates = Gameboard.noGoCoordinatesCalculator(shipSpotCoordinates); // generate all the boundaries around the ship
    // Check if placement is allowed
    if (Gameboard.findCoordinateConflict(shipSpotCoordinates, this.globalNoGoCoordinates) !== undefined) { return 'Error! Position not allowed'; }
    if (!Gameboard.coordinateInGridCheck(GRID_SIZE, shipSpotCoordinates)) { return 'Error! Position not in grid'; }
    this.hitPlaces = this.hitPlaces.concat(shipSpotCoordinates); // adding ship coordinates to hit array
    this.globalNoGoCoordinates = this.globalNoGoCoordinates.concat(Gameboard.removeDuplicatesCoordinates(shipNoGoCoordinates)); // adding all nogo/ship boundary coordinates to nogoCoordinates array
    return shipObject; // success. Ship has been placed
  }

  // TODO: make receive attack function
  // takes in a pair of coordinates. See if any thing was hit. If it was it causes the ship to take damage.
  // if nothing is hit it's recorded as a missed shot.
  receiveAttack(shotX, shotY) {
    // reusing findCoordinateConflict to check if shot hit something
    const shotResult = Gameboard.findCoordinateConflict([shotX, shotY], this.hitPlaces);
    if (shotResult === -1) { return true; }
    return false;
  }
}

const gameboard1 = new Gameboard();
gameboard1.placeShips(8, 8, 90, 2);
expect(gameboard1.placeShips(8, 8, 90, 1)).toMatch(/Error! Position not allowed/);

export default Gameboard;
