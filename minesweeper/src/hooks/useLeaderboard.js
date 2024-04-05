import { useCallback, useEffect, useState } from "react";

export function useLeaderboard() {
  const [leaders, setLeaders] = useState([]);

  const refreshLeaders = useCallback(async () => {
    const result = await (
      await fetch("http://127.0.0.1:8000/api/game/leaderboard")
    ).json();

    setLeaders(result);
  }, []);

  useEffect(() => {
    (async () => {
      await refreshLeaders();
    })();
  }, [refreshLeaders]);

  return {
    leaders,
    refreshLeaders,
  };
}
