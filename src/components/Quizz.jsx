import React, { Component, useContext } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";

import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import HighScore from "./HighScore.jsx";
require("dotenv").config();
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
    score: 0,
    gameOver: false,
  };
  restartQuizz = () => {
    this.setState({ gameOver: false, score: 0 });
  };

  //To do
  GetRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // GET A RANDOM ACTOR AND A RANDOM MOVIE with him

  getRandomActor() {
    let randomPage = this.GetRandomNumber(1, 10);

    fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${randomPage}`
    )
      .then((apiRes) => {
        console.log(process.env);
        console.log("ici", apiRes);
        return apiRes.json();
      })
      .then((data) => {
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
      `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then((apiRes) => {
        return apiRes.json();
      })
      .then((data) => {
        let randomNumberTwo = this.GetRandomNumber(0, data.cast.length - 1);
        if (data.cast.length > 0) {
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
        } else {
          this.displayMovie();
        }
      });
  }

  //GET SIMILAR MOVIE
  getSimilarMovie(movieId) {
    if (movieId == null) {
      return null;
    } else {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
        .then((apiRes) => {
          return apiRes.json();
        })
        .then((data) => {
          if (data.results.length > 0) {
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
          } else {
            this.displayMovie();
          }
        });
    }
  }

  getRandomMovie() {
    let randomPage = this.GetRandomNumber(1, 10);

    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${randomPage}`
    )
      .then((apiRes) => {
        return apiRes.json();
      })
      .then((data) => {
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
    if (
      this.state.similarMovie == null &&
      this.state.randomMovieWithThisActorId == null
    ) {
      this.setState({ movieDisplayId: this.state.randomMovieId });
      this.setState({ movieDisplayTitle: this.state.randomMovieTitle });
      this.setState({ movieDisplayPhoto: this.state.randomMoviePhoto });
    }
    if (this.state.randomMovieWithThisActorId == null) {
      this.setState({ movieDisplayId: this.state.randomMovieId });
      this.setState({ movieDisplayTitle: this.state.randomMovieTitle });
      this.setState({ movieDisplayPhoto: this.state.randomMoviePhoto });
    }
    if (this.state.randomMovieWithThisActorPhoto == null) {
      this.setState({ movieDisplayId: this.state.randomMovieId });
      this.setState({ movieDisplayTitle: this.state.randomMovieTitle });
      this.setState({ movieDisplayPhoto: this.state.randomMoviePhoto });
    }
    if (Math.random() > 0.3) {
      this.setState({ movieDisplayId: this.state.randomMovieWithThisActorId });
      this.setState({
        movieDisplayTitle: this.state.randomMovieWithThisActorTitle,
      });
      this.setState({
        movieDisplayPhoto: this.state.randomMovieWithThisActorPhoto,
      });
    } else {
      this.setState({ movieDisplayId: this.state.similarMovieId });
      this.setState({
        movieDisplayTitle: this.state.similarMovieTitle,
      });
      this.setState({
        movieDisplayPhoto: this.state.similarMoviePhoto,
      });
    }
  }

  //CHECK ANSWER
  checkAnswer(answer) {
    fetch(
      `https://api.themoviedb.org/3/person/${this.state.actorId}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
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
        if (movies.indexOf(this.state.movieDisplayId) >= 0) {
          goodAnswer = true;
        }
        if (goodAnswer == answer) {
          let newScore = this.state.score + 1;
          this.setState({ score: newScore });
        }
        this.getRandomActor();
        this.getRandomMovie();
      });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ gameOver: true });
    }, 60000);

    this.getRandomActor();
    this.getRandomMovie();
  }

  render() {
    let gameOver = this.state.gameOver;
    return (
      <div className="quizzContainer">
        {gameOver != true && (
          <div className="quizz">
            <h1>Quizz</h1>
            <h4> Score : {this.state.score}</h4>

            <div className="wrapContainer">
              <div className="actorContainer">
                {this.state.actorPhoto !== null && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${this.state.actorPhoto}`}
                  ></img>
                )}
                {this.state.actorPhoto == null && (
                  <img src="./interogation.jpg"></img>
                )}
              </div>
              <div className="movieContainer">
                {this.state.movieDisplayPhoto !== null && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${this.state.movieDisplayPhoto}`}
                  ></img>
                )}
                {this.state.movieDisplayPhoto == null && (
                  <img src="./interogation.jpg"></img>
                )}
              </div>
            </div>
            <div className="question">
              <h3>
                Did {this.state.actorName} star in{" "}
                {this.state.movieDisplayTitle} ?
              </h3>
              <div className="answer">
                <button
                  className="startBtn"
                  onClick={() => this.checkAnswer(false)}
                >
                  NO
                </button>
                <button
                  className="startBtn"
                  onClick={() => this.checkAnswer(true)}
                >
                  YES
                </button>
              </div>
            </div>
          </div>
        )}
        {gameOver == true && (
          <div className="gameOver">
            <div className="gameOverText">
              <h1>Game Over !</h1>
              <h3>score : {this.state.score}</h3>
              <div className="shareBtns">
                <EmailShareButton>
                  <EmailIcon />
                </EmailShareButton>
                <FacebookShareButton url="https://www.npmjs.com/package/react-share">
                  <FacebookIcon />
                </FacebookShareButton>
                <TwitterShareButton>
                  <TwitterIcon />
                </TwitterShareButton>
              </div>
              <HighScore score={this.state.score} />
            </div>

            <button className="startBtn" onClick={this.restartQuizz}>
              NEW GAME
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Quizz;
