import React from 'react';

interface ScoreDisplayProps {
  currentScore: number;
  bestScore: number;
  isNewBestScore: boolean;
}

export function ScoreDisplay({ currentScore, bestScore, isNewBestScore }: ScoreDisplayProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-lg">
        Punteggio: <span className="font-bold">{currentScore}</span>
      </div>
      <div className="text-lg">
        Record: <span className="font-bold">{bestScore}</span>
        {isNewBestScore && (
          <span className="ml-2 text-green-600 font-bold animate-pulse">
            NUOVO RECORD!
          </span>
        )}
      </div>
    </div>
  );
}