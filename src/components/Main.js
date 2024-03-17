import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import Movie from "./Movie";
import RowPost from "./Rowpost/RowPost";
import { UserAuthContext } from "../context/AuthContext/UserAuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Main() {
  
  return (
    <div>
      <Navbar />
      <RowPost />
      <Movie />
    </div>
  );
}

export default Main;
