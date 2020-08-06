import React, { useContext, useEffect } from "react";
import highScoreContext from "../context/highScore.js";

function HighScore({ score }) {
  const { highScore, setHighScore } = useContext(highScoreContext);

  useEffect(() => {
    let newHighScore = [...highScore];
    let newScore = score;
    newHighScore.push(newScore);
    newHighScore.sort(function (a, b) {
      return b - a;
    });
    setHighScore(newHighScore);
    return () => {};
  }, []);

  return (
    <div>
      <h5>High Scores : </h5>
      {highScore.map((score, index) => {
        return (
          <div>
            {index + 1} : {score}
          </div>
        );
      })}
    </div>
  );
}

export default HighScore;
