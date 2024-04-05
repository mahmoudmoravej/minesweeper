import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export function Confetti({ actionResult }) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(actionResult === "won");
  }, [actionResult]);

  return <>{showConfetti && <ReactConfetti />}</>;
}
