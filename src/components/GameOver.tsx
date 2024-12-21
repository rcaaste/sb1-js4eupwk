interface GameOverProps {
  score: number;
  onReset: () => void;
}

export function GameOver({ score, onReset }: GameOverProps) {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-4">HAI PERSO!</h2>
        <p className="text-xl mb-4">Punteggio finale: {score}</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={onReset}
        >
          Gioca ancora
        </button>
      </div>
    </div>
  );
}