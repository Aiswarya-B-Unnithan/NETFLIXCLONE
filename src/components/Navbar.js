import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieContext from "../context/MovieContext";
import netflix from "../images/netflixlogo.png";
import { Button } from "@mui/material";
import { auth } from "../firebase/setup";
import { getAuth, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../context/userContext/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Trailer from "./Trailer";
import { UserAuthContext } from "../context/AuthContext/UserAuthContext";
export default function Navbar() {
  const { movieList } = useContext(MovieContext);
  const [randomMovie, setRandomMovie] = useState(null);
  const { email } = useContext(UserContext);
  let user = {};
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    user = JSON.parse(storedUser);
  } else {
    console.log("No user data in local storage.");
  }

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      localStorage.removeItem("user");
      console.log("User logged out successfully.");
      toast.success("Logged Out Successfully", {
        theme: "dark",
      });
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    if (movieList.length > 0) {
      const randomIndex = Math.floor(Math.random() * movieList.length);
      setRandomMovie(movieList[randomIndex]);
    }
  }, [movieList]);

  const signinClick = () => {
    navigate("/signin");
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original/${randomMovie?.poster_path})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // Ensure the image covers the entire div
        height: "500px",
        width: "100%",
      }}
    >
      <ToastContainer autoClose={2000} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <img
          style={{ width: "70px", height: "50px" }}
          src={netflix}
          alt="banner"
        />
        <div>
          {user.email ? (
            <Button
              onClick={logOut}
              color="error"
              variant="contained"
              style={{ marginLeft: "10px" }}
            >
              LogOut
            </Button>
          ) : (
            <Button onClick={signinClick} color="error" variant="contained">
              SignIn
            </Button>
          )}
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        <h1
          style={{ color: "#F1F1F1", fontSize: "60px", fontFamily: "initial" }}
        >
          {randomMovie?.original_title}
        </h1>
        <h4
          style={{
            color: "#F1F1F1",

            lineHeight: "1.0",
            overflow: "hidden",
            paddingTop: "1rem",
          }}
        >
          {randomMovie?.overview}
        </h4>
        <Button
          variant="contained"
          sx={{ color: "black", backgroundColor: "black", fontWeight: "bold" }}
        >
          <Trailer movieId={randomMovie?.id} />
        </Button>
      </div>
    </div>
  );
}
