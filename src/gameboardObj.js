/* eslint-disable max-len */
import Ship from './shipObj';

const DEG_TO_RAD_CONST = Math.PI / 180;
const GRID_SIZE = 10;

class Gameboard {
  constructor() {
    this.hitPlaces = []; // this array contains all the spots where ships are located
    this.globalNoGoCoordinates = []; // contains all coordinates where another ship cannot be placed
    this.missedShots = [];
    this.allReceivedShots = [];
    this.gridSize = GRID_SIZE;
    this.shipLengths = [5, 4, 3, 3, 2];
    // Ships need to be withing grid, 1 block away from other ships and cannot overlap other ships
  }

  // receives coordinates the ship wants to occupy in an array. Format is [shipObject,x,y]
  // returns array of coordinates that are no go. Meaning no other object can be placed upon there
  // eslint-disable-next-line class-methods-use-this
  static noGoCoordinatesCalculator(newCoordinates) {
    const noGoCoordinates = [];
    let tempArray;
    for (let i = 0; i < newCoordinates.length; i += 1) {
      tempArray = [
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
      noGoCoordinates.push(...tempArray);
    }
    return noGoCoordinates;
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
  // 3 different comparison paths it can take to accomodate different array storage styles.
  // !should stick to one to avoid this mess in the future.
  static findCoordinateConflict(shipCoordinates, noGoCoordinates) {
    let result;
    if (shipCoordinates.length < 1 || noGoCoordinates.length < 1) { return undefined; }
    if (shipCoordinates[0].length === 3 && noGoCoordinates[0].length === 2) {
      // !it doesn't stooop, just overwrites it the next loop.........
      for (let i = 0; i < shipCoordinates.length; i += 1) {
        result = noGoCoordinates.find((element) => JSON.stringify(element) === JSON.stringify([shipCoordinates[i][1], shipCoordinates[i][2]]));
        if (result !== undefined) {
          break;
        }
      }
    // these are only used when looking for one coordinate in an array, NOT multiple
    } else if (shipCoordinates.length === 2 && noGoCoordinates[0].length === 3) {
      result = noGoCoordinates.find((element) => JSON.stringify([element[1], element[2]]) === JSON.stringify([shipCoordinates[0], shipCoordinates[1]]));
    } else if (shipCoordinates.length === 2 && noGoCoordinates[0].length === 2) {
      result = noGoCoordinates.find((element) => JSON.stringify([element[0], element[1]]) === JSON.stringify([shipCoordinates[0], shipCoordinates[1]]));
    }
    return result;
  }

  // checks if ship placement is withing grid area
  // return true if all coordinates is withing grid
  // takes in grid size as a single integer and ship coordinates as [[object, x, y]]
  static coordinateInGridCheck(gridSize, shipCoordinates) {
    return shipCoordinates.every((element) => element[1] < gridSize && element[1] >= 0 && element[2] < gridSize && element[2] >= 0);
  }

  // takes in x y coordinate of attack
  // verify that attack is within coordinates
  // verify that attack location has not been attacked before
  isAttackLegal(X, Y) {
    if (!Gameboard.coordinateInGridCheck(GRID_SIZE, [[Object, X, Y]])) { return 'NOT_IN_GRID'; }
    if (Gameboard.findCoordinateConflict([X, Y], this.allReceivedShots) !== undefined) { // not undefined result means a match has been found and the coordinates have already been attacked
      return 'COORDINATE_USED_PREVIOUSLY';
    }
    return true;
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

  // generates an angle between 0 and 270 at 90 degree increments
  static randomAngle() {
    let toReturn = 0;
    const angle = Math.floor(Math.random() * 4);
    switch (angle) {
      case 0: toReturn = 0;
        break;
      case 1: toReturn = 90;
        break;
      case 2: toReturn = 180;
        break;
      case 3: toReturn = 270;
        break;
      default: toReturn = 0;
    }
    return toReturn;
  }

  // places ships automatically in a random order
  autoPlaceShips() {
    this.shipLengths.map((shipLength) => {
      let shipPlaceStatus = 0;
      let x = 0;
      let y = 0;
      let theta = 0;
      do {
        x = Math.floor(Math.random() * this.gridSize);
        y = Math.floor(Math.random() * this.gridSize);
        theta = Gameboard.randomAngle();
        shipPlaceStatus = this.placeShips(x, y, theta, shipLength); // returns an object if ship can be placed
      } while (typeof shipPlaceStatus !== 'object');
    });
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
    const coordinateConflictCheck = Gameboard.findCoordinateConflict(shipSpotCoordinates, this.globalNoGoCoordinates);
    if (coordinateConflictCheck !== undefined) { return 'Error! Position not allowed'; }
    if (!Gameboard.coordinateInGridCheck(GRID_SIZE, shipSpotCoordinates)) { return 'Error! Position not in grid'; }
    this.hitPlaces = this.hitPlaces.concat(shipSpotCoordinates); // adding ship coordinates to hit array
    this.globalNoGoCoordinates = this.globalNoGoCoordinates.concat(Gameboard.removeDuplicatesCoordinates(shipNoGoCoordinates)); // adding all nogo/ship boundary coordinates to nogoCoordinates array
    return shipObject; // success. Ship has been placed
  }

  // TODO: make receive attack function
  // takes in a pair of coordinates. See if any thing was hit. If it was it causes the ship to take damage.
  // if nothing is hit it's recorded as a missed shot and false is returned
  // if hit return true
  // if error has occured it returns the error such as "COORDINATE_USED_PREVIOUSLY"
  receiveAttack(shotX, shotY) {
    // verify attack legality
    const attackLegality = this.isAttackLegal(shotX, shotY);
    if (attackLegality !== true) { // if attack is not legal return the error.
      return attackLegality;
    }
    // adding coordinate to array that keeps track of all received shots
    this.allReceivedShots.push([shotX, shotY]);
    // reusing findCoordinateConflict to check if shot hit something
    const shotResult = Gameboard.findCoordinateConflict([shotX, shotY], this.hitPlaces);
    // ship hit, take life away from ship
    if (shotResult !== undefined) {
      shotResult[0].hit();
      return shotResult[0];
    } // ship was hit :(
    // if not hit, add to missed shots array and return false
    this.missedShots.push([shotX, shotY]);
    return false;
  }

  // check for gameover
  // takes in a shipArray, passing the global hit place array in this case.
  // ship array format is [[shipObj,x,y],[shipOb, x2, y2]]
  gameOver() {
    return this.hitPlaces.every((element) => element[0].isSunk() === true);
  }
}

export default Gameboard;
