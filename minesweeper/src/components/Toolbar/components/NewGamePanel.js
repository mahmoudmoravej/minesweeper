import { useState } from "react";

export function NewGamePanel({ startNewGame }) {
  const [playerName, setPlayerName] = useState(
    localStorage.getItem("playerName")
  );

  const [level, setLevel] = useState("medium");

  const onSubmit = () => {
    startNewGame(playerName, level);
    localStorage.setItem("playerName", playerName);
  };

  const levelChanged = (e) => {
    setLevel(e.target.value);
  };

  return (
    <div className="newGame">
      <div>
        <label>Player Name</label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyDown={(e) => {}}
        ></input>
      </div>
      <div>
        <label>Level</label>
        <select onChange={levelChanged} defaultValue="easy">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button onClick={onSubmit}>Start New Game!</button>
    </div>
  );
}
