import React, { useContext, useEffect } from "react";
import Movie from "./components/Movie";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "../src/components/MovieDetails";
import MovieContext from "./context/MovieContext";
import Main from "./components/Main";
import Signin from "./components/Signin";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserAuthContext } from "./context/AuthContext/UserAuthContext";

function App() {
  const { setMovieList } = useContext(MovieContext);
 
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
       localStorage.setItem("user", JSON.stringify(user));
      } else {
        console.log("No user");
      }
    });
  }, []);
  const getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=0cc84d2f457a4059a7d2e10e817c804f"
    )
      .then((res) => res.json())
      .then((json) => {
        setMovieList(json.results);
      });
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        <Route path="/moviedetails" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
