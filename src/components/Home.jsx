import React, { Component } from "react";

export default class Home extends Component {
  beginQuizz = () => {
    this.props.action();
  };

  render() {
    return (
      <div className="home">
        <h1>FlickHouse</h1>
        <div className="rules">
          <p>Welcome to the Flickhouse quizz ! </p>
          <p>You'll be asked a series of "Yes or No" questions.</p>
          <p>Answer as many as you can in the allowed time ! Good luck !</p>
        </div>
        <button className="startBtn" onClick={this.beginQuizz}>
          START
        </button>
      </div>
    );
  }
}
