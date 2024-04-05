export function PlayingGameCellValue({ cell }) {
  // action: 'notPlayed' | 'flagged' | 'sweeped',
  switch (cell.action) {
    case "flagged":
      return "🚩";
    case "sweeped":
      return cell.value === 0 ? "" : cell.value;
    case "notPlayed":
    default:
      return "";
  }
}
