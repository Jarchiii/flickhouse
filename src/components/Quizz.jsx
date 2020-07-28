import React, { Component } from 'react'


export class Quizz extends Component {
state = {
    actor : null,
    randomMovieWithThisActor : null

}



//To do 
GetRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// GET A RANDOM ACTOR AND A RANDOM MOVIE with him

getRandomActor(){
    let randomPage = this.GetRandomNumber(1,10)
    let randomNumberOne = this.GetRandomNumber(1,20)
    fetch(`https://api.themoviedb.org/3/person/popular?api_key=f612a1c1b8e8916b830d3e17ec902406&language=en-US&page=${randomPage}`)
    .then(apiRes => {
        return apiRes.json()
    })
    .then(data => { 

    //NEED TO CHECK IF ACTOR 

      this.setState({actor : data.results[randomNumberOne].id})
        this.getMovie(data.results[randomNumberOne].id)
    })


 
}

// GET A MOVIE WITH THIS ACTOR
getMovie(actorId){
   
   fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=f612a1c1b8e8916b830d3e17ec902406&language=en-US`)
   .then(apiRes => {
       return apiRes.json()
   })
   .then(data => {
       let randomNumberTwo =this.GetRandomNumber(1,data.cast.length-1)
       console.log("random", randomNumberTwo)


       console.log("là",data.cast[randomNumberTwo])
       this.setState({randomMovieWithThisActor : data.cast[randomNumberTwo].id})

   })
}

//GET SIMILAR MOVIE

// ASK QUESTION IF THE ACTOR IS IN THE SIMILAR MOVIE

//CHECK ANSWER


componentDidMount(){
    this.getRandomActor()
    
   }

    render() {
        return (
            <div>
                <h1>Quizz</h1>
                
            </div>
        )
    }
}

export default Quizz
