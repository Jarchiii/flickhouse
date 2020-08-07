import React, { useContext, useEffect } from "react";
import highScoreContext from "../context/highScore.js";

function HighScore({ score }) {
  const { highScore, setHighScore } = useContext(highScoreContext);

  useEffect(() => {
    let newHighScore = [...highScore];
    if (score > 0) {
      let newScore = score;
      newHighScore.push(newScore);
      newHighScore.sort(function (a, b) {
        return b - a;
      });
      setHighScore(newHighScore);
    }
    return () => {};
  }, []);

  return (
    <div className="highScore">
      <h5>High Scores : </h5>
      {highScore.map((score, index) => {
        return (
          <div>
            ({index + 1}) : {score} pts
          </div>
        );
      })}
    </div>
  );
}

export default HighScore;
