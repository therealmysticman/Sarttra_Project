import React, { useReducer, useEffect } from "react";
import "../App.css";
import Header from "./header";
import Movie from "./Movie";
import Search from "./Search";

//Import API to App.js
const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";


const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

//reducer use to make download state and redirect user to their search result
const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};


//use to fetch API
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
    
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
        
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
        	});
      	});
  	}, []);

//Search criteria
    const search = (searchValue, yearValue, genreValue) => {
      dispatch({
          type: "SEARCH_MOVIES_REQUEST"
      });
    
      let url = `https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`;
    
      if (yearValue) {
          url += `&y=${yearValue}`;
      }
    
      if (genreValue) {
          url += `&genre=${genreValue}`;
      }
    
      fetch(url)
      .then(response => response.json())
      .then(jsonResponse => {
          if (jsonResponse.Response === "True") {
              dispatch({
                  type: "SEARCH_MOVIES_SUCCESS",
                  payload: jsonResponse.Search
              });
          } else {
              dispatch({
                  type: "SEARCH_MOVIES_FAILURE",
                  error: jsonResponse.Error
              });
          }
      });
  };
  
//Code for display
    const { movies, errorMessage, loading } = state;

    return (
    <div className="App">
      <Header text="MYSTIC MAN MOVIE SEARCH" />
      <Search search={search} />
      <p className="App-intro">Welcome to, Movie Site!!</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;