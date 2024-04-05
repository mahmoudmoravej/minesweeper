import { useCallback, useEffect, useState } from "react";

export function useGameManager(initGameId) {
  const [game, setGame] = useState({
    id: initGameId,
    cells: [],
    result: "active",
    player: "",
    bombsCount: 0,
    actionResult: "",
  });

  const startNewGame = async (playerName, level) => {
    let size = {};
    switch (level) {
      case "medium":
        size = { rows: 16, cols: 16 };
        break;
      case "hard":
        size = { rows: 30, cols: 30 };
        break;
      case "easy":
      default:
        size = { rows: 8, cols: 8 };
        break;
    }

    const newGameId = await (
      await fetch("http://127.0.0.1:8000/api/game/new", {
        method: "POST",
        body: JSON.stringify({ player: playerName, ...size }),
      })
    ).json();

    setGame({ ...game, id: newGameId, actionResult: "" });

    window.history.pushState({}, "Playing Game!", `/game/${newGameId}`);
  };

  const loadGame = useCallback(
    async (id) => {
      const loadedGame = await (
        await fetch(`http://127.0.0.1:8000/api/game/${id}`)
      ).json();

      setGame((g) => ({ ...g, ...loadedGame, actionResult: "" }));
    },
    [setGame]
  );

  const playCell = async (action, i, j) => {
    const result = await (
      await fetch(
        `http://127.0.0.1:8000/api/game/${game.id}/play/${i}/${j}/${action}`,
        {
          method: "POST",
        }
      )
    ).json();

    setGame({
      ...game,
      cells: result.cells,
      result: result.result,
      score: result.score,
      actionResult: result.result === "active" ? "" : result.result,
    });
  };

  useEffect(() => {
    (async () => {
      if (initGameId > 0) {
        await loadGame(initGameId);
      }
    })();
  }, [initGameId, loadGame]);

  return {
    api: {
      startNewGame,
      loadGame,
      playCell,
    },
    game: {
      cells: game.cells,
      result: game.result,
      bombsCount: game.bombsCount,
      player: game.player,
      score: game.score,
      isFinished: game.result !== "active",
      isGameLoaded: game.cells.length > 0,
      actionResult: game.actionResult,
    },
  };
}
