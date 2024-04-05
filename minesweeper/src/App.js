import "./App.css";
import { useEffect } from "react";
import { useGameManager } from "./hooks/useGameManager";
import { useLeaderboard } from "./hooks/useLeaderboard";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { Board } from "./components/Game/Board/Board";
import { GameInfo } from "./components/Game/GameInfo";
import { Confetti } from "./Confetti";

function App() {
  const gameId = window.location.pathname.split("/")[2];

  const { api, game } = useGameManager(gameId);

  const { leaders, refreshLeaders } = useLeaderboard();

  useEffect(() => {
    if (game.actionResult !== "active") refreshLeaders();
  }, [game.actionResult, refreshLeaders]);

  console.log(game.actionResult);

  return (
    <div className="app">
      <Confetti actionResult={game.actionResult} />
      <Toolbar api={api} leaders={leaders} />

      <div className="game">
        {game.isGameLoaded ? (
          <>
            <GameInfo
              player={game.player}
              bombsCount={game.bombsCount}
              result={game.result}
              score={game.score}
            />
            <Board
              cells={game.cells}
              isFinished={game.isFinished}
              playCell={api.playCell}
            />
          </>
        ) : (
          <h1>Welcome to Minesweeper! 💥 </h1>
        )}
      </div>
    </div>
  );
}

export default App;
