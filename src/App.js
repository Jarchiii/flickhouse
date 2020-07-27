import React, {Component} from 'react';
import Home from './components/Home'
import Quizz from './components/Quizz'


export default class App extends Component {
  state ={
    componentToLoaded : Home,
    }

    action = () => {
      this.setState({componentToLoaded: Quizz})
  }





  render(){
        return (
          <div className="App">
            { (this.state.componentToLoaded !== 0 &&         
                  <this.state.componentToLoaded action={this.action}/>
      )}
          </div>
        );
      }
}
