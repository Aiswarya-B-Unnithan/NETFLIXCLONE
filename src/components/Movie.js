import React, { useEffect, useState, useContext } from "react";

import { Box, Card, CardContent, CardMedia, Grid } from "@mui/material";
import MovieContext from "../context/MovieContext";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { database } from "../firebase/setup";

function Movie() {
  const { movieList } = useContext(MovieContext);

  const addMovie = async (movie) => {
   
    const movieRef = doc(database, "movies", `${movie.id}`);
    try {
      await setDoc(movieRef, { movieName: movie.original_title });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundColor: "#303030" }}>
      <Grid
        container
        spacing={2}
        style={{
          paddingTop: "20px",
          paddingRight: "20px",
          paddingLeft: "20px",
        }}
      >
        {movieList.map((movie) => {
          {
            addMovie(movie);
          }
          return (
            <Grid item xs={3}>
              <Box>
                <Link to="/moviedetails" state={{ movie }}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    ></CardMedia>
                  </Card>
                </Link>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Movie;
