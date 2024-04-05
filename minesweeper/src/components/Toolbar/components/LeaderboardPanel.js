export function LeaderboardPanel({ leaders }) {
  return (
    <>
      <div className="leaderboard">
        <div>Leaderboard 🏆</div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Player</th>
              <th>Score</th>
              <th>Won</th>
              <th>Lost</th>
              <th>Played</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map(({ name, score, won, lost, played }, i) => (
              <tr key={i}>
                <td>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : ""}</td>
                <td style={{ textAlign: "left" }}> {name}</td>
                <td>{score}</td>
                <td>{won}</td>
                <td>{lost}</td>
                <td>{played}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      <div class="rules">
        Scoring rules:
        <ul>
          <li>If you win: score = correct flags + correct flags * 10🔥 </li>
          <li>If you loose: score= correct flags - wrong flags, or zero!</li>
        </ul>
      </div>
    </>
  );
}
