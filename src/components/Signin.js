import React,{useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@mui/material";
import netflix from "../images/netflixlogo.png";
import { auth, googleAuth } from "../firebase/setup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function Signin() {
  const navigate = useNavigate();
const emailRef = useRef(null);

useEffect(() => {
  emailRef.current.focus();
}, []);


  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      setTimeout(() => {
        auth.currentUser?.emailVerified && navigate("/");
      }, 2000);
      toast.success("Successfully signed in with Google!");
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <div
      style={{ backgroundColor: "#181818", height: "100vh", padding: "20px" }}
    >
      <ToastContainer autoClose={2000} />
      <img style={{ height: "50px", width: "90px" }} src={netflix} alt="logo" />
      <div style={{ position: "fixed", left: "45%", top: "35%" }}>
        <Button onClick={googleSignIn} variant="contained" color="error">
          Sign In With Google
        </Button>
        <br></br>
        <div>
          <h2 style={{ color: "white" }}>
            Lets start <br /> to explore movies <br />
            from here
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signin;
