import React, { Component } from "react";

export class GameOver extends Component {
  render() {
    return (
      <div>
        <div className="home">
          <h1>Game Over</h1>
          <div className="rules">
            <p>Welcome to the Flickhouse quizz ! </p>
            <p>You'll be asked a series of "Yes or No" questions.</p>
            <p>Answer as many as you can in the allowed time ! Good luck !</p>
          </div>
          <button className="startBtn" onClick={this.beginQuizz}>
            START
          </button>
        </div>
      </div>
    );
  }
}

export default GameOver;
