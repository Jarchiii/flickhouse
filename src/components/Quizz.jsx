import React, { Component } from "react";

export class Quizz extends Component {
  state = {
    actorId: null,
    actorName: null,
    actorPhoto: null,
    randomMovieWithThisActorId: null,
    randomMovieWithThisActorTitle: null,
    randomMovieWithThisActorPhoto: null,
    similarMovieId: null,
    similarMovieTitle: null,
    similarMoviePhoto: null,
    randomMovieId: null,
    randomMovieTitle: null,
    randomMoviePhoto: null,
    movieDisplayId: null,
    movieDisplayTitle: null,
    movieDisplayPhoto: null,
  };

  //To do
  GetRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // GET A RANDOM ACTOR AND A RANDOM MOVIE with him

  getRandomActor() {
    let randomPage = this.GetRandomNumber(1, 10);

    fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=f612a1c1b8e8916b830d3e17ec902406&language=en-US&page=${randomPage}`
    )
      .then((apiRes) => {
        return apiRes.json();
      })
      .then((data) => {
        console.log("actor", data.results);
        //Keep only the actors
        var actorsOnly = data.results.filter(
          (element) => element.known_for_department == "Acting"
        );
        let randomNumberOne = this.GetRandomNumber(1, actorsOnly.length - 1);
        this.setState({ actorId: actorsOnly[randomNumberOne].id });
        this.setState({ actorName: actorsOnly[randomNumberOne].name });
        this.setState({ actorPhoto: actorsOnly[randomNumberOne].profile_path });
        this.getMovie(actorsOnly[randomNumberOne].id);
      });
  }

  // GET A random MOVIE WITH THIS ACTOR
  getMovie(actorId) {
    fetch(
      `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=f612a1c1b8e8916b830d3e17ec902406&language=en-US`
    )
      .then((apiRes) => {
        return apiRes.json();
      })
      .then((data) => {
        let randomNumberTwo = this.GetRandomNumber(1, data.cast.length - 1);
        console.log("random", randomNumberTwo);
        if (data.cast.length > 0) {
          console.log("là", data.cast[randomNumberTwo]);
          this.setState(
            {
              randomMovieWithThisActorId: data.cast[randomNumberTwo].id,
              randomMovieWithThisActorTitle: data.cast[randomNumberTwo].title,
              randomMovieWithThisActorPhoto:
                data.cast[randomNumberTwo].poster_path,
            },
            () => {
              this.getSimilarMovie(data.cast[randomNumberTwo].id);
            }
          );
        }
      });
  }

  //GET SIMILAR MOVIE
  getSimilarMovie(movieId) {
    if (movieId == null) {
      return null;
    } else {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=f612a1c1b8e8916b830d3e17ec902406&language=en-US&page=1`
      )
        .then((apiRes) => {
          return apiRes.json();
        })
        .then((data) => {
          if (data.results.length > 0) {
            console.log("lalalalal", data);
            let randomNumberThree = this.GetRandomNumber(
              1,
              data.results.length - 1
            );
            this.setState(
              {
                similarMovieId: data.results[randomNumberThree].id,
                similarMovieTitle: data.results[randomNumberThree].title,
                similarMoviePhoto: data.results[randomNumberThree].poster_path,
              },
              () => {
                this.displayMovie();
              }
            );

            console.log("similarmovie", data);
          } else {
            this.displayMovie();
          }
        });
    }
  }

  getRandomMovie() {
    let randomPage = this.GetRandomNumber(1, 10);

    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=f612a1c1b8e8916b830d3e17ec902406&language=en-US&page=${randomPage}`
    )
      .then((apiRes) => {
        return apiRes.json();
      })
      .then((data) => {
        console.log("random moovie", data);
        let randomNumberOne = this.GetRandomNumber(0, data.results.length - 1);
        this.setState(
          {
            randomMovieId: data.results[randomNumberOne].id,
            randomMovieTitle: data.results[randomNumberOne].title,
            randomMoviePhoto: data.results[randomNumberOne].poster_path,
          },
          () => {
            this.displayMovie();
          }
        );
      });
  }

  displayMovie() {
    console.log("display");
    if (
      this.state.similarMovie == null &&
      this.state.randomMovieWithThisActorId == null
    ) {
      console.log("displaya");

      this.setState({ movieDisplayId: this.state.randomMovieId });
      this.setState({ movieDisplayTitle: this.state.randomMovieTitle });
      this.setState({ movieDisplayPhoto: this.state.randomMoviePhoto });
    }
    if (this.state.randomMovieWithThisActorId == null) {
      console.log("displayb");

      this.setState({ movieDisplayId: this.state.randomMovieId });
      this.setState({ movieDisplayTitle: this.state.randomMovieTitle });
      this.setState({ movieDisplayPhoto: this.state.randomMoviePhoto });
    }
    if (Math.random() > 0.5) {
      console.log("displayc");

      this.setState({ movieDisplayId: this.state.randomMovieWithThisActorId });
      this.setState({
        movieDisplayTitle: this.state.randomMovieWithThisActorTitle,
      });
      this.setState({
        movieDisplayPhoto: this.state.randomMovieWithThisActorPhoto,
      });
    } else {
      console.log("displayd");

      this.setState({ movieDisplayId: this.state.similarMovieId });
      this.setState({
        movieDisplayTitle: this.state.similarMovieTitle,
      });
      this.setState({
        movieDisplayPhoto: this.state.randomMovieWithThisActorPhoto,
      });
    }
  }

  //CHECK ANSWER
  checkAnswer(answer) {
    fetch(
      `https://api.themoviedb.org/3/person/${this.state.actorId}/movie_credits?api_key=f612a1c1b8e8916b830d3e17ec902406&language=en-US`
    )
      .then((apiRes) => {
        return apiRes.json();
      })
      .then((data) => {
        console.log(data);
        let movies = [];
        data.cast.map((movie) => {
          movies.push(movie.id);
        });
        let goodAnswer = false;
        console.log("movies", movies);
        console.log("displayMovieid", this.state.movieDisplayId);
        if (movies.indexOf(this.state.movieDisplayId) >= 0) {
          goodAnswer = true;
          console.log("la bonne réponse est", goodAnswer);
        }
        if (goodAnswer == answer) {
          console.log("bonne réponse");
        } else {
          console.log("mauvaise réponse");
        }
        this.getRandomActor();
        this.getRandomMovie();
      });
  }

  componentDidMount() {
    this.getRandomActor();
    this.getRandomMovie();
  }

  render() {
    return (
      <div className="quizzContainer">
        <h1>Quizz</h1>
        <div className="wrapContainer">
          <div className="actorContainer">
            <img
              src={`https://image.tmdb.org/t/p/w500/${this.state.actorPhoto}`}
            ></img>
          </div>
          <div className="movieContainer">
            <img
              src={`https://image.tmdb.org/t/p/w500/${this.state.movieDisplayPhoto}`}
            ></img>
          </div>
        </div>
        <div className="question">
          <h3>
            Did {this.state.actorName} star in {this.state.movieDisplayTitle} ?
          </h3>
          <div className="answer">
            <button
              className="startBtn"
              onClick={() => this.checkAnswer(false)}
            >
              NO
            </button>
            <button className="startBtn" onClick={() => this.checkAnswer(true)}>
              YES
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Quizz;
