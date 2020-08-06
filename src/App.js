import React, { useContext, useState } from "react";
import Home from "./components/Home";
import Quizz from "./components/Quizz";
import HighScore from "./context/highScore";

function App() {
  const [ComponentToLoaded, setcomponentToLoaded] = useState({
    componentToLoaded: Home,
  });
  const [highScore, setHighScore] = useState([]);
  const UserContextValue = { highScore, setHighScore };

  function loadQuizz() {
    return setcomponentToLoaded({ componentToLoaded: Quizz });
  }

  return (
    <HighScore.Provider value={UserContextValue}>
      <div className="App">
        {ComponentToLoaded.componentToLoaded !== 0 && (
          <ComponentToLoaded.componentToLoaded loadQuizz={loadQuizz} />
        )}
      </div>
    </HighScore.Provider>
  );
}
export default App;
