import React from "react";

function Home({ loadQuizz }) {
  function beginQuizz() {
    loadQuizz();
  }

  return (
    <div className="home">
      <h1>FlickHouse</h1>
      <div className="rules">
        <p>Welcome to the Flickhouse quizz ! </p>
        <p>You'll be asked a series of "Yes or No" questions.</p>
        <p>Answer as many as you can in the allowed time ! Good luck !</p>
      </div>
      <button className="startBtn" onClick={beginQuizz}>
        START
      </button>
    </div>
  );
}

export default Home;
