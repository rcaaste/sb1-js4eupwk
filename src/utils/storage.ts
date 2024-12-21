const BEST_SCORE_KEY = 'numberPlacementBestScore';

export function getBestScore(): number {
  const stored = localStorage.getItem(BEST_SCORE_KEY);
  return stored ? parseInt(stored, 10) : 0;
}

export function updateBestScore(score: number): boolean {
  const currentBest = getBestScore();
  if (score > currentBest) {
    localStorage.setItem(BEST_SCORE_KEY, score.toString());
    return true;
  }
  return false;
}