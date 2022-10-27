/* eslint-disable max-len */
import Ship from './src/shipObj';
import Gameboard from './src/gameboardObj';
import Player from './src/playerObj';
import domInteractions from './src/DOM_Interaction';

test('testing constructor function of class ship', () => {
  const realShip = new Ship(5);
  expect(realShip.length).toBe(5);
});

test('testing isSunk function. Expecting a false (not sunk)', () => {
  const realShip = new Ship(5);
  expect(realShip.isSunk()).toBe(false);// ship is not sunk
});

test('testing hit function. Expecting the ship to be sunk after 5 hits', () => {
  const realShip = new Ship(5);
  realShip.hit();
  realShip.hit();
  realShip.hit();
  realShip.hit();
  realShip.hit();

  expect(realShip.isSunk()).toBe(true);
});

test('testing hit function. Expecting the ship to not be sunk after 5 hits', () => {
  const realShip = new Ship(5);
  realShip.hit();
  realShip.hit();

  expect(realShip.isSunk()).toBe(false);
});

test('testing Gameboard Class Ship Placement with 0 degree orientation', () => {
  const gameboard1 = new Gameboard();
  const realShip = gameboard1.placeShips(6, 8, 0, 3);
  expect(gameboard1.hitPlaces).toStrictEqual([[realShip, 6, 8], [realShip, 7, 8], [realShip, 8, 8]]);
});

test('testing Gameboard Class Ship Placement with 90 degree orientation', () => {
  const gameboard1 = new Gameboard();
  const realShip = gameboard1.placeShips(1, 1, 90, 5);
  expect(gameboard1.hitPlaces).toStrictEqual([[realShip, 1, 1], [realShip, 1, 2], [realShip, 1, 3], [realShip, 1, 4], [realShip, 1, 5]]);
});

test('testing Gameboard Class Ship Placement with 180 degree orientation', () => {
  const gameboard1 = new Gameboard();
  const realShip = gameboard1.placeShips(8, 8, 180, 8);
  expect(gameboard1.hitPlaces).toStrictEqual([[realShip, 8, 8], [realShip, 7, 8], [realShip, 6, 8], [realShip, 5, 8], [realShip, 4, 8], [realShip, 3, 8], [realShip, 2, 8], [realShip, 1, 8]]);
});

test('testing Gameboard Class Ship Placement with 270 degree orientation', () => {
  const gameboard1 = new Gameboard();
  const realShip = gameboard1.placeShips(8, 8, 270, 5);
  expect(gameboard1.hitPlaces).toStrictEqual([[realShip, 8, 8], [realShip, 8, 7], [realShip, 8, 6], [realShip, 8, 5], [realShip, 8, 4]]);
});

test('calculating coordinates that are a nogo. 1 block ship. Where the ship is locates and its 1 block surrounding area are a no go. Testing a 1 block ship', () =>{
  const gameboard1 = new Gameboard();
  gameboard1.placeShips(8, 8, 270, 1);
  expect(gameboard1.globalNoGoCoordinates).toStrictEqual([
    [7, 7],
    [8, 7],
    [9, 7],
    [7, 8],
    [8, 8],
    [9, 8],
    [7, 9],
    [8, 9],
    [9, 9],
  ]);
});

test('calculating coordinates that are a nogo. 2 ship block. Where the ship is locates and its 1 block surrounding area are a no go. Testing a 1 block ship', () =>{
  const gameboard1 = new Gameboard();
  gameboard1.placeShips(8, 8, 90, 2);
  expect(gameboard1.globalNoGoCoordinates).toStrictEqual([
    [7, 7],
    [8, 7],
    [9, 7],
    [7, 8],
    [8, 8],
    [9, 8],
    [7, 9],
    [8, 9],
    [9, 9],
    [7, 10],
    [8, 10],
    [9, 10],
  ]);
});

test('remove duplicates', () => {
  expect(Gameboard.removeDuplicatesCoordinates([[1, 1], [2, 1], [1, 1]])).toStrictEqual([[1, 1], [2, 1]]);
});
// expectictig 'Error! Position not allowed' if not possible.
// if ship position is allowed then a 1 is return
test('check if ship position is allowed', () => {
  const gameboard1 = new Gameboard();
  gameboard1.placeShips(8, 8, 90, 2);
  expect(gameboard1.placeShips(8, 8, 90, 1)).toMatch(/Error! Position not allowed/);
});

test('check is ship is within grid', () => {
  const gameboard1 = new Gameboard();
  expect(gameboard1.placeShips(33, 33, 90, 2)).toMatch(/Error! Position not in grid/);
});

// test receiveAttack function
// expecting received value to be object.
test('check if ship got hit', () => {
  const gameboard1 = new Gameboard();
  gameboard1.placeShips(8, 8, 90, 2);
  expect(gameboard1.receiveAttack(8, 8)).toBeInstanceOf(Object);
});

// test recevieAttack function with missed shot
// expecting function to return false and missed shot array to be updated with the coordinates
test('nothing has been hit', () => {
  const gameboard1 = new Gameboard();
  gameboard1.placeShips(8, 8, 90, 2);
  expect(gameboard1.receiveAttack(3, 8)).toBe(false);
  expect(gameboard1.receiveAttack(4, 8)).toBe(false);
  expect(gameboard1.missedShots).toStrictEqual([[3, 8], [4, 8]]);
});

// test recevieAttack function sunk ship
// expecting function to return false and missed shot array to be updated with the coordinates
test('testing if ship sunk', () => {
  const gameboard1 = new Gameboard();
  gameboard1.placeShips(8, 8, 90, 2);
  expect(gameboard1.receiveAttack(3, 8)).toBe(false);
  expect(gameboard1.receiveAttack(4, 8)).toBe(false);
  expect(gameboard1.missedShots).toStrictEqual([[3, 8], [4, 8]]);
});

// report if all ships have been sunk
// expecting true as ships should be sunk
test('all ship are dead', () => {
  const gameboard1 = new Gameboard();
  gameboard1.placeShips(8, 8, 90, 2);
  gameboard1.receiveAttack(8, 8);
  gameboard1.receiveAttack(8, 9);
  expect(gameboard1.gameOver()).toBe(true); // all ship are dead
});

// report if all ships have been sunk
// expecting false as ships should not be sunk
test('all ship are not dead', () => {
  const gameboard1 = new Gameboard();
  gameboard1.placeShips(8, 8, 90, 2);
  gameboard1.receiveAttack(8, 8);
  gameboard1.receiveAttack(8, 7);
  expect(gameboard1.gameOver()).toBe(false); // all ship are not dead
});

// checking isAttackLegal function which verifies is coordinates are valid
// checking if attack is within grid, expecting a true
test('attack in grid', () => {
  const gameboard1 = new Gameboard();
  expect(gameboard1.isAttackLegal(3, 3)).toBe(true);
});

// checking isAttackLegal function which verifies is coordinates are valid
// illegal attack in same spot
test('double attack in same coordinates', () => {
  const gameboard1 = new Gameboard();
  gameboard1.receiveAttack(3, 3);
  expect(gameboard1.isAttackLegal(3, 3)).not.toBe(true);
});

// testing receiveAttack() with attack legality check
// expecting NOT_IN_GRID error
test('shot is not in grid', () => {
  const gameboard1 = new Gameboard();
  expect(gameboard1.receiveAttack(20, 20)).toMatch(/NOT_IN_GRID/);
});

// testing receiveAttack() with attack legality check
// expecting COORDINATE_USED_PREVIOUSLY
test('shot is not in grid', () => {
  const gameboard1 = new Gameboard();
  gameboard1.receiveAttack(8, 8);
  expect(gameboard1.receiveAttack(8, 8)).toMatch(/COORDINATE_USED_PREVIOUSLY/);
});

// testing player computerPlay function
// expecting legal moves
test('shot is not in grid', () => {
  const gameboard1 = new Gameboard();
  let pcCoordinates = Player.computerPlay(gameboard1);
  expect(pcCoordinates[0]).toBeGreaterThanOrEqual(0);
  expect(pcCoordinates[1]).toBeGreaterThanOrEqual(0);
  expect(pcCoordinates[0]).toBeLessThanOrEqual(gameboard1.gridSize);
  expect(pcCoordinates[1]).toBeLessThanOrEqual(gameboard1.gridSize);

  pcCoordinates = Player.computerPlay(gameboard1);
  expect(pcCoordinates[0]).toBeGreaterThanOrEqual(0);
  expect(pcCoordinates[1]).toBeGreaterThanOrEqual(0);
  expect(pcCoordinates[0]).toBeLessThanOrEqual(gameboard1.gridSize);
  expect(pcCoordinates[1]).toBeLessThanOrEqual(gameboard1.gridSize);
});

// testing xy coordinate finder function
// expecting xy coordinates when given a block id #
test('find xy coordinates', () => {
  expect(domInteractions.xyCoordinateIdentifier(5, 20)).toStrictEqual([0, 0]);
  expect(domInteractions.xyCoordinateIdentifier(5, 5)).toStrictEqual([0, 3]);
  expect(domInteractions.xyCoordinateIdentifier(5, 0)).toStrictEqual([0, 4]);
  expect(domInteractions.xyCoordinateIdentifier(5, 24)).toStrictEqual([4, 0]);
});

// testing block id # finder function
// expecting a block id# when coordinates are passed
test("find block#", () => {
  expect(domInteractions.findBlockId(6, 2, 0)).toBe(32);
  expect(domInteractions.findBlockId(6, 2, 2)).toBe(20);
  expect(domInteractions.findBlockId(6, 4, 5)).toBe(4);
  expect(domInteractions.findBlockId(10, 9, 9)).toBe(9);
  expect(domInteractions.findBlockId(10, 4, 8)).toBe(14);
});
