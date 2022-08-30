/* eslint-disable max-len */
import Ship from './src/shipObj';
import Gameboard from './src/gameboardObj';

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
  const realShip = new Ship(3);
  gameboard1.placeShips(8, 8, 0, realShip);
  expect(gameboard1.hitPlaces).toStrictEqual([[realShip, 8, 8], [realShip, 9, 8], [realShip, 10, 8]]);
});

test('testing Gameboard Class Ship Placement with 90 degree orientation', () => {
  const gameboard1 = new Gameboard();
  const realShip = new Ship(5);
  gameboard1.placeShips(1, 1, 90, realShip);
  expect(gameboard1.hitPlaces).toStrictEqual([[realShip, 1, 1], [realShip, 1, 2], [realShip, 1, 3], [realShip, 1, 4], [realShip, 1, 5]]);
});

test('testing Gameboard Class Ship Placement with 180 degree orientation', () => {
  const gameboard1 = new Gameboard();
  const realShip = new Ship(8);
  gameboard1.placeShips(8, 8, 180, realShip);
  expect(gameboard1.hitPlaces).toStrictEqual([[realShip, 8, 8], [realShip, 7, 8], [realShip, 6, 8], [realShip, 5, 8], [realShip, 4, 8], [realShip, 3, 8], [realShip, 2, 8], [realShip, 1, 8]]);
});

test('testing Gameboard Class Ship Placement with 270 degree orientation', () => {
  const gameboard1 = new Gameboard();
  const realShip = new Ship(5);
  gameboard1.placeShips(8, 8, 270, realShip);
  expect(gameboard1.hitPlaces).toStrictEqual([[realShip, 8, 8], [realShip, 8, 7], [realShip, 8, 6], [realShip, 8, 5], [realShip, 8, 4]]);
});

test('calculating coordinates that are a nogo. 1 block ship. Where the ship is locates and its 1 block surrounding area are a no go. Testing a 1 block ship', () =>{
  const gameboard1 = new Gameboard();
  const realShip = new Ship(1);
  gameboard1.placeShips(8, 8, 270, realShip);
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
  const realShip = new Ship(2);
  gameboard1.placeShips(8, 8, 90, realShip);
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
test('check if ship position is within grid', () => {
  const gameboard1 = new Gameboard();
  const realShip = new Ship(2);
  const shipInWrongSpot = new Ship(1);
  gameboard1.placeShips(8, 8, 90, realShip);
  expect(gameboard1.placeShips(8, 8, 90, shipInWrongSpot)).toMatch(/Error! Position not allowed/);
});

test('check is ship is within grid', () =>{
  const gameboard1 = new Gameboard();
  const realShip = new Ship(2);
  expect(gameboard1.placeShips(33, 33, 90, realShip)).toMatch(/Error! Position not in grid/);
});
