import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../Rowpost/Rowpost.css";
import MovieContext from "../../context/MovieContext";

function RowPost() {
  const { movieList } = useContext(MovieContext);
  return (
    <div className="row">
      <h2
        style={{
          color: "white",
          fontFamily: "initial",
          paddingTop: "10px",
          paddingLeft: "10px",
        }}
      >
        Netflix originals
      </h2>
      <div className="posters">
        {movieList.map((movie) => (
          <Link to="/moviedetails" state={{ movie }}>
            <img
              className="poster"
              alt="rowpost"
              src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RowPost;
