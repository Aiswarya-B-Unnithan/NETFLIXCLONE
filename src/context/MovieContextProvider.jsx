import React, { useState } from "react";
import MovieContext from "./MovieContext";

const MovieProvider = ({ children }) => {
  const [movieList, setMovieList] = useState([]);

  return (
    <MovieContext.Provider value={{ movieList, setMovieList }}>
      {children}
    </MovieContext.Provider>
  );
};
export default MovieProvider;
