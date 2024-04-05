import { NewGamePanel } from "./components/NewGamePanel";
import { LeaderboardPanel } from "./components/LeaderboardPanel";

export function Toolbar({ api, leaders }) {
  return (
    <div className="toolbar">
      <NewGamePanel startNewGame={api.startNewGame} />
      <hr />
      <LeaderboardPanel leaders={leaders} />
    </div>
  );
}
