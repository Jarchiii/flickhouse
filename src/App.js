import React, { Component } from "react";
import Home from "./components/Home";
import Quizz from "./components/Quizz";

export default class App extends Component {
  state = {
    componentToLoaded: Home,
  };

  loadQuizz = () => {
    this.setState({ componentToLoaded: Quizz });
  };

  render() {
    return (
      <div className="App">
        {this.state.componentToLoaded !== 0 && (
          <this.state.componentToLoaded loadQuizz={this.loadQuizz} />
        )}
      </div>
    );
  }
}
