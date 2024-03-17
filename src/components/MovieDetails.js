import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase/setup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
import Trailer from "./Trailer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function MovieDetails() {
  const location = useLocation();
  const [review, setReview] = useState();
  const [reviewData, setReviewData] = useState([]);


  const movieRef = doc(database, "movies", `${location.state.movie.id}`);
  const reviewRef = collection(movieRef, "reviews");

  const addReview = async () => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      const { email, displayName, photoURL } = userData;

      try {
        await addDoc(reviewRef, {
          movieReview: review,
          email,
        });
        toast.success("Review Added Successfully", {
          theme: "dark",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warning("You must be logged in before writing the review");
    }
  };

  const showReview = async () => {
    try {
      const data = await getDocs(reviewRef);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setReviewData(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showReview();
  }, [reviewData]);

  return (
    <Grid container>
      <ToastContainer autoClose={2000} />
      <Grid item xs={8}>
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${location.state.movie.poster_path})`,
            backgroundSize: "cover",
            height: "100vh",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            style={{
              padding: "200px",
              paddingLeft: "30px",
              paddingRight: "10px",
            }}
          >
            <Grid container>
              <h1
                style={{
                  color: "red",
                  fontSize: "30px",
                  fontFamily: "initial",
                }}
              >
                {location.state.movie.original_title}
              </h1>
            </Grid>
            <div style={{ display: "flex" }}>
              <h4 style={{ color: "white" }}>
                Language:-
                {location.state.movie?.original_language}
              </h4>

              <h4 style={{ color: "white", marginLeft: "5px" }}>
                Released Date:-{location.state.movie?.release_date}
              </h4>
            </div>
            <Grid container>
              <h2 style={{ color: "white", fontWeight: "100" }}>
                {location.state.movie.overview}
              </h2>
              <Trailer location={location} />
              {/* <Button
                variant="contained"
                sx={{ color: "black", bgcolor: "white" }}
              >
                PLAY TRAILOR
              </Button> */}
            </Grid>
          </div>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div
          style={{
            backgroundColor: "black",
            height: "100vh",
            padding: "20px",
          }}
        >
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  color: "red",
                  fontWeight: "90px",
                  marginLeft: "400px",
                }}
              >
                Back
              </Button>
            </Link>
          </div>
          <Grid container>
            <div>
              <h5 style={{ color: "#A4A4A4", fontWeight: "100" }}>
                ADD REVIEW
              </h5>
              <TextField
                label="Review"
                variant="outlined"
                size="small"
                onChange={(e) => setReview(e.target.value)}
                style={{ backgroundColor: "white", borderRadius: "5px" }}
              />
              <Button
                variant="contained"
                sx={{ ml: "10px", bgcolor: "red", color: "white" }}
                onClick={addReview}
              >
                Submit
              </Button>
            </div>
          </Grid>
          <Grid container>
            <div>
              <h5 style={{ color: "#A4A4A4", fontWeight: "100" }}>
                SHOW REVIEW
              </h5>
              {reviewData.map((review) => {
                const emailParts = review.email.split("@");
                const displayName = emailParts[0];
                return (
                  <>
                    <div style={{ display: "flex" }}>
                      <img
                        style={{ width: "20px", borderRadius: "50px" }}
                        src={
                          review.pro_pic ||
                          "https://www.onlinepsychologydegrees.com/wp-content/uploads/2020/04/People-Icon.png"
                        }
                        alt="propic"
                      />
                      <li
                        style={{
                          color: "white",
                          listStyle: "none",
                          marginLeft: "3px",
                        }}
                      >
                        {displayName}
                      </li>
                    </div>

                    <h5 style={{ color: "white",fontWeight:"100" }}>{review.movieReview}</h5>
                  </>
                );
              })}
            </div>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

export default MovieDetails;
