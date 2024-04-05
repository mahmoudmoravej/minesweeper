import { Cell } from "./Cell";

export function Board({ cells, isFinished, playCell }) {
  const onCellClick = (request, i, j, event) => {
    if (cells[i][j].action === "sweeped") return;

    let action = request;

    if (request === "changeFlag") {
      action = cells[i][j].action === "flagged" ? "unflag" : "flag";
    } else if (request === "sweep") {
      action = "sweep";
    }

    playCell(action, i, j);
    event.preventDefault();
  };

  return (
    <div className="board">
      {cells.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <Cell
              key={j}
              cell={cell}
              isFinished={isFinished}
              onClick={isFinished ? null : (e) => onCellClick("sweep", i, j, e)}
              onContextMenu={
                isFinished ? null : (e) => onCellClick("changeFlag", i, j, e)
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
