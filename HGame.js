class Cell {
    constructor(row, col) {
      this.row = row;
      this.col = col;
    }
  }
  
  function isCorrect(row, col, numRows, numCols, closeGrid) {
    return (
      row >= 0 &&
      row < numRows &&
      col >= 0 &&
      col < numCols &&
      !closeGrid[row][col]
    );
  }
  
  function findAllMeetingPoints(bishoPos, horsePos, closeGrid) {
    const numRows = closeGrid.length;
    const numCols = closeGrid[0].length;
  
    const directions = [
      [-1, -1], [-1, 1], [1, -1], [1, 1], // Diagonal moves for the Bishop
      [-2, -2], [-2, 2], [2, -2], [2, 2], // 2.5 steps moves for the Horse
    ];
  
    const meetingPoints = [];
    const queue = [];
    const visited = new Set();
  
    queue.push(bishoPos);
    visited.add(`${bishoPos.row},${bishoPos.col}`);
  
    while (queue.length > 0) {
      const currentCell = queue.shift();
  
      for (const [dr, dc] of directions) {
        const newRow = currentCell.row + dr;
        const newCol = currentCell.col + dc;
  
        if (
          isCorrect(newRow, newCol, numRows, numCols, closeGrid) &&
          !visited.has(`${newRow},${newCol}`)
        ) {
          const newCell = new Cell(newRow, newCol);
  
          if (
            Math.abs(newCell.row - horsePos.row) +
              Math.abs(newCell.col - horsePos.col) <=
            2.5
          ) {
            // Found a meeting point
            meetingPoints.push(newCell);
          }
  
          queue.push(newCell);
          visited.add(`${newRow},${newCol}`);
        }
      }
    }
  
    return meetingPoints;
  }
  
  // Example usage
  const bishoPos = new Cell(3, 2);
  const horsePos = new Cell(6, 6);
  const closeGrid = [
    [false, false, false, true, false, false, false, true],
    [false, false, false, false, false, false, false, false],
    [true, false, false, false, false, false, false, true],
    [false, false, false, true, false, false, false, false],
    [false, false, false, true, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, true],
    [false, true, false, false, false, false, false, false],
  ];
  
  const allMeetingPoints = findAllMeetingPoints(bishoPos, horsePos, closeGrid);
  
  console.log("All Possible meeting point  - " )
  
  console.log(allMeetingPoints);
  