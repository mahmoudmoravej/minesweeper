export function FinishedGameCellValue({ cell }) {
  //  playResult: 'blasted' | 'cleared' | 'rightFlag' | 'wrongFlag' | 'notPlayed'
  switch (cell.playResult) {
    case "blasted":
      return "💥";
    default:
      if (cell.hasBomb) return "💣";
      return cell.value === 0 ? "" : cell.value;
  }
}
