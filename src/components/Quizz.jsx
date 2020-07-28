import React, { Component } from 'react'


export class Quizz extends Component {
state = {
    actorId : null,
    actorName : null,
    actorPhoto : null,
    randomMovieWithThisActorId : null,
    randomMovieWithThisActorTitle : null,
    similarMovie : null
    

}



//To do 
GetRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// GET A RANDOM ACTOR AND A RANDOM MOVIE with him

getRandomActor(){
    let status = null
        let randomPage = this.GetRandomNumber(1,10)
     
        fetch(`https://api.themoviedb.org/3/person/popular?api_key=f612a1c1b8e8916b830d3e17ec902406&language=en-US&page=${randomPage}`)
        .then(apiRes => {
            return apiRes.json()
        })
        .then(data => { 
          console.log("actor", data.results)
          //Keep only the actors
          var actorsOnly = data.results.filter(element => element.known_for_department=='Acting')
          let randomNumberOne = this.GetRandomNumber(1,actorsOnly.length-1)
            this.setState({actorId : actorsOnly[randomNumberOne].id})
            this.setState({actorName :actorsOnly[randomNumberOne].name })
            this.setState({actorPhoto :actorsOnly[randomNumberOne].profile_path})
              this.getMovie(actorsOnly[randomNumberOne].id)
          })
         
        }
        
    



 


// GET A random MOVIE WITH THIS ACTOR
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
       this.setState({randomMovieWithThisActorTitle : data.cast[randomNumberTwo].title})
       this.getSimilarMovie(data.cast[randomNumberTwo].id)


   })
}

//GET SIMILAR MOVIE
getSimilarMovie(movieId){
    if (movieId==null){
        return null
    } else {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=f612a1c1b8e8916b830d3e17ec902406&language=en-US&page=1`)
    .then(apiRes => {
        return apiRes.json()
    })
    .then(data =>{
        console.log("similarmovie", data)
    })
    }
}

// ASK QUESTION IF THE ACTOR IS IN THE SIMILAR MOVIE

//CHECK ANSWER


componentDidMount(){
    this.getRandomActor()
    
   }

    render() {
        return (
            <div className="QuizzContainer">
                <h1>Quizz</h1>
                <div className="actorContainer">
                    <h3>{this.state.actorName}</h3>
                    <img src={`https://image.tmdb.org/t/p/w500/${this.state.actorPhoto}`}></img>

                </div>
                
            </div>
        )
    }
}

export default Quizz
