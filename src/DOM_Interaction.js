// find block id # given x and y and grid
function findBlockId(gridSize, x, y) {
  const yWithOffset = gridSize - y;
  const blockNum = (((yWithOffset) * gridSize) - 1) - (gridSize - (x + 1));
  return blockNum;
}
// finds xy coordinates given a block number and grid size
// coordinate system is y up and x right.
// need to subtract y from gridSize to convert
//  measurement to y up instead of y down.
// blocks start from 0 at top left.
function xyCoordinateIdentifier(gridSize, gridBlockNum) {
  const y = Math.floor(gridBlockNum / gridSize);
  const x = gridBlockNum - (gridSize * y);
  return [x, gridSize - y - 1];
}
// takes in a grid size and creates a grid in the body element
// if 10 there will be 10 columns, not indexed from 0.
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
    gridElement.setAttribute('data-grid_element_num', `${i}`);
    gridElement.innerHTML = `${i}`;
    grid.appendChild(gridElement);
  }
  // !TO BE CONTINUED
  const gridElementArray = document.querySelectorAll('.gridElement');
  gridElementArray.forEach((gridBlock) => {
    gridBlock.addEventListener('click', (e) => {
      e.target.style.backgroundColor = 'red';
      console.log(e.target.getAttribute('data-grid_element_num'));
      console.log(xyCoordinateIdentifier(gridSize, e.target.getAttribute('data-grid_element_num')));
    });
  });
}

module.exports = {
  xyCoordinateIdentifier, createGrid, findBlockId,
};
