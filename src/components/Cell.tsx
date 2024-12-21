import type { Cell as CellType } from '../utils/gameLogic';

interface CellProps {
  cell: CellType;
  onClick: () => void;
}

export function Cell({ cell, onClick }: CellProps) {
  return (
    <button
      className={`w-12 h-12 border border-gray-800 flex items-center justify-center text-lg font-bold
        ${cell.value ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
      onClick={onClick}
    >
      {cell.value || ''}
    </button>
  );
}