export function GameInfo({ player, bombsCount, result, score }) {
  const resultText = {
    active: "Game is active 🏃‍♂️‍➡️",
    won: `🎉🎉 You won! 🎉🎉 (score: ${score})`,
    lost: `😢 You lost! (score: ${score})`,
  }[result];

  return (
    <div className="gameInfo">
      <div>
        <label>Player: {player}</label>
      </div>
      <div>
        <label>Bombs: {bombsCount}</label>
      </div>
      <div>
        <label>{resultText}</label>
      </div>
    </div>
  );
}
