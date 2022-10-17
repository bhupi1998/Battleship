// finds xy coordinates given a block number and grid size
function xyCoordinateIdentifier(gridSize, gridBlockNum) {
  let remainder = gridBlockNum;
  let x = 0;
  let y = 0;
  do {
    remainder -= gridSize;
    if (remainder >= 0) { x += 1; }
  } while (remainder >= 0);
  if (remainder < 0) { remainder += gridSize; }
  y = remainder;
  return [gridSize - x - 1, y];
}
// takes in a grid size and creates a grid in the body element
function createGrid(gridSize) {
  // creating grid
  const grid = document.createElement('div');
  // modifying css grid class to accomodate different grid sizes
  document.documentElement.style.setProperty('--gridSize', `${gridSize}`);
  // creating grid container and appending
  grid.classList.add('gridContainer');
  document.body.append(grid);

  // creating all the boxes needed for battleship
  for (let i = 0; i < gridSize * gridSize; i += 1) {
    const gridElement = document.createElement('grid');
    gridElement.classList.add('gridElement');
    gridElement.setAttribute('data-gridElementNum', `${i}`);
    grid.appendChild(gridElement);
  }
  // !TO BE CONTINUED
  const gridElementArray = document.querySelectorAll('.gridElement');
  gridElementArray.forEach((gridBlock) => {
    gridBlock.addEventListener('click', (e) => {
      console.log(e.target.getAttribute('data-gridElementNum'));
      console.log(xyCoordinateIdentifier(gridSize, e.target.getAttribute('data-gridElementNum')));
    });
  });
}

export default createGrid;
