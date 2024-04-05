import { FinishedGameCellValue } from "./CellValue/FinishedGameCellValue";
import { PlayingGameCellValue } from "./CellValue/PlayingGameCellValue";

export function Cell({ cell, isFinished, onClick, onContextMenu }) {
  const subCssClassName = getCellCssClass(cell, isFinished);

  return (
    <div
      className={"cell " + subCssClassName}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {isFinished ? (
        <FinishedGameCellValue cell={cell} />
      ) : (
        <PlayingGameCellValue cell={cell} />
      )}
    </div>
  );
}

export function getCellCssClass(cell, isFinished) {
  return isFinished ? "finished" : isPlayed(cell) ? "played" : "notPlayed";
}

function isPlayed(cell) {
  return cell.action !== "notPlayed";
}
