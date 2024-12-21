import type { Cell } from '../utils/gameLogic';

interface MovementLinesProps {
  lastMove: Cell | null;
  cellSize: number;
}

export function MovementLines({ lastMove, cellSize }: MovementLinesProps) {
  if (!lastMove) return null;

  const lines = [];
  const startX = (lastMove.col + 0.5) * cellSize;
  const startY = (lastMove.row + 0.5) * cellSize;

  // Generate straight lines (horizontal and vertical)
  for (let direction of [-3, 3]) {
    // Horizontal lines
    if (lastMove.col + direction >= 0 && lastMove.col + direction < 10) {
      lines.push(
        <line
          key={`h${direction}`}
          x1={startX}
          y1={startY}
          x2={(lastMove.col + direction + 0.5) * cellSize}
          y2={startY}
          className="stroke-blue-300 stroke-2"
        />
      );
    }
    // Vertical lines
    if (lastMove.row + direction >= 0 && lastMove.row + direction < 10) {
      lines.push(
        <line
          key={`v${direction}`}
          x1={startX}
          y1={startY}
          x2={startX}
          y2={(lastMove.row + direction + 0.5) * cellSize}
          className="stroke-blue-300 stroke-2"
        />
      );
    }
  }

  // Generate diagonal lines
  for (let rowDir of [-2, 2]) {
    for (let colDir of [-2, 2]) {
      const newRow = lastMove.row + rowDir;
      const newCol = lastMove.col + colDir;
      if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10) {
        lines.push(
          <line
            key={`d${rowDir}${colDir}`}
            x1={startX}
            y1={startY}
            x2={(newCol + 0.5) * cellSize}
            y2={(newRow + 0.5) * cellSize}
            className="stroke-blue-300 stroke-2"
          />
        );
      }
    }
  }

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {lines}
    </svg>
  );
}