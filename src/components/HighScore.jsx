import React, { useContext, useEffect } from "react";
import highScoreContext from "../context/highScore.js";

function HighScore({ score }) {
  const { highScore, setHighScore } = useContext(highScoreContext);
  console.log("scorea", highScore);

  useEffect(() => {
    let newHighScore = [...highScore];
    let newScore = score;
    newHighScore.push(newScore);
    setHighScore(newHighScore);
    console.log("score ap", highScore);
    return () => {};
  }, []);

  return (
    <div>
      High Scores :
      {highScore.map((score) => {
        return <div>{score} a</div>;
      })}
    </div>
  );
}

export default HighScore;
