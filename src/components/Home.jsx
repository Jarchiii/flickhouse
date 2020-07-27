import React, {Component} from 'react'

export default class Home extends Component {

beginQuizz = () => {
    this.props.action()
}


    render(){

    return (
        <div>
            <h1>FlickHouse</h1>
            <p>Welcome to the Flickhouse quizz ! You'll be asked a series of "Yes or No" questions. Answer as many as you can in the allowed time ! Good luck !</p>
            <button onClick={this.beginQuizz} >START</button>
        </div>
    )
}
}

