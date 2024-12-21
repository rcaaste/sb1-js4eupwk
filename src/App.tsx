import { useState, useEffect } from 'react';
import { Grid } from './components/Grid';
import { ScoreDisplay } from './components/ScoreDisplay';
import { GameOver } from './components/GameOver';
import { createEmptyGrid, isValidMove, hasAvailableMoves, type Cell, type Grid as GridType } from './utils/gameLogic';
import { getBestScore, updateBestScore } from './utils/storage';

export function App() {
  const [grid, setGrid] = useState<GridType>(createEmptyGrid());
  const [currentNumber, setCurrentNumber] = useState(1);
  const [lastMove, setLastMove] = useState<Cell | null>(null);
  const [bestScore, setBestScore] = useState(getBestScore());
  const [isNewBestScore, setIsNewBestScore] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (lastMove && !hasAvailableMoves(grid, currentNumber, lastMove)) {
      setIsGameOver(true);
      const isNew = updateBestScore(currentNumber - 1);
      if (isNew) {
        setBestScore(currentNumber - 1);
        setIsNewBestScore(true);
      }
    }
  }, [grid, currentNumber, lastMove]);

  const handleCellClick = (row: number, col: number) => {
    if (!isValidMove(grid, row, col, currentNumber, lastMove)) {
      return;
    }

    const newGrid = grid.map(r => r.map(cell => ({ ...cell })));
    newGrid[row][col].value = currentNumber;
    
    setGrid(newGrid);
    setLastMove(newGrid[row][col]);
    setCurrentNumber(prev => prev + 1);
  };

  const handleReset = () => {
    setGrid(createEmptyGrid());
    setCurrentNumber(1);
    setLastMove(null);
    setIsGameOver(false);
    setIsNewBestScore(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        <h1 className="text-2xl font-bold mb-4 text-center">Gioco dei Numeri</h1>
        <ScoreDisplay
          currentScore={currentNumber - 1}
          bestScore={bestScore}
          isNewBestScore={isNewBestScore}
        />
        <div className="mb-4 text-center">
          <p className="text-lg">Prossimo numero: {currentNumber}</p>
        </div>
        <Grid grid={grid} lastMove={lastMove} onCellClick={handleCellClick} />
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleReset}
        >
          Ricomincia
        </button>
        {isGameOver && (
          <GameOver score={currentNumber - 1} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}