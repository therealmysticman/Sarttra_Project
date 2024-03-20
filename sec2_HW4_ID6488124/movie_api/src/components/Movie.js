import React, { useState, useEffect } from "react";
import "../App.css";
import { FaTimes } from 'react-icons/fa';

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [activeMovieId, setActiveMovieId] = useState(null);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=4a3b711b`)
      .then((response) => response.json())
      .then((data) => {
        setDetails({
          actors: data.Actors,
          genre: data.Genre,
          score: data.imdbRating,
          plot: data.Plot
        });
      })
      .catch((error) => console.log(error));
  }, [movie.imdbID]);

//use to toggle to show detail of that movie
  const toggleDetails = () => {
    if (activeMovieId === movie.imdbID) {
      setShowDetails(!showDetails);
    } else {
      setShowDetails(true);
      setActiveMovieId(movie.imdbID);
    }
  };
  
  //return movie list in box form
  return (
    <div className="movie" style={{ position: "relative" }}>
      <div className="moviebox"> 
        <div onClick={toggleDetails}>
          <img
            width="220"
            height="300"
            style={{ borderRadius: "50px 50px 0px 0px" }}
            alt={`The movie titled: ${movie.Title}`}
            src={poster}
          />
          <h3>{movie.Title}</h3>
        </div>
      </div>
      {showDetails && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 50,
            width: 320,
            backgroundColor: "#f8f8f8",
            padding: "10px",
            borderRadius: "5px",
            color: "#ff00a4",
            zIndex: 1,
          }}
        >
          <button
            className="close"
            onClick={() => setShowDetails(false)}
          >
            <FaTimes />
          </button>
          <img
            width="220"
            height="300"
            alt={`The movie titled: ${movie.Title}`}
            src={poster}
          />
          <h2>{movie.Title}</h2>
          <p>Type: {movie.Type}</p>
          <p>Imdb Score: {details.score}</p>
          <p>Released: {movie.Year}</p>
          <p>Genre : {details.genre}</p>
          <p>Actors: {details.actors}</p>
          <p>Story: {details.plot} </p>
        </div>
      )}
    </div>
  );
};

export default Movie;
