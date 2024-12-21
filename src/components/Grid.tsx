import { Cell } from './Cell';
import type { Grid as GridType, Cell as CellType } from '../utils/gameLogic';

interface GridProps {
  grid: GridType;
  lastMove: CellType | null;
  onCellClick: (row: number, col: number) => void;
}

export function Grid({ grid, lastMove, onCellClick }: GridProps) {
  return (
    <div className="border-2 border-gray-800">
      <div className="grid grid-cols-10">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
}