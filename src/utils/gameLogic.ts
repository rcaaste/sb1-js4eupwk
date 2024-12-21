// Game logic utilities
export type Cell = {
  value: number | null;
  row: number;
  col: number;
};

export type Grid = Cell[][];

export function createEmptyGrid(): Grid {
  return Array(10).fill(null).map((_, row) =>
    Array(10).fill(null).map((_, col) => ({
      value: null,
      row,
      col,
    }))
  );
}

export function isValidMove(grid: Grid, row: number, col: number, currentNumber: number, lastMove: Cell | null): boolean {
  // First move is always valid
  if (!lastMove && currentNumber === 1) return true;
  
  // Invalid if no last move or cell is already filled
  if (!lastMove || grid[row][col].value !== null) return false;

  const rowDiff = Math.abs(row - lastMove.row);
  const colDiff = Math.abs(col - lastMove.col);

  // Diagonal move: exactly 2 cells in both directions
  const isDiagonalMove = rowDiff === 2 && colDiff === 2;
  
  // Straight move: exactly 3 cells in one direction, 0 in the other
  const isStraightMove = (rowDiff === 3 && colDiff === 0) || (rowDiff === 0 && colDiff === 3);

  return isDiagonalMove || isStraightMove;
}

export function hasAvailableMoves(grid: Grid, currentNumber: number, lastMove: Cell | null): boolean {
  if (!lastMove && currentNumber === 1) return true;
  if (!lastMove) return false;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (isValidMove(grid, row, col, currentNumber, lastMove)) {
        return true;
      }
    }
  }
  return false;
}