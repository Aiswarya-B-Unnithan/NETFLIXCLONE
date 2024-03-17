import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../../firebase/setup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (result) => {
          const user = result.user;
          // console.log("FireBaseData", user);

          //Adding user details into firestore db
          addDoc(collection(database, "users"), {
            id: user.uid,
            userEmail: email,
          });
        })
        .then(() => {
          navigate("/signin");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      console.log("Error during registration:", error.message);
    }
  };

  return (
    <div className="register">
      <ToastContainer autoClose={2000} />

      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <h1 style={{ marginTop: "110px" }}>
          Unlimited movies, TV shows, and more.
        </h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="login">
          <div className="container">
            <form>
              <input
                type="email"
                placeholder="Email or phone number"
                value={email}
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="loginButton" onClick={handleSignup}>
                Sign Up
              </button>
              <span>
                Already have account in Netflix?
                <Link to="/signin">
                  <b>Sign in now.</b>
                </Link>
              </span>
              <small>
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot. <b>Learn more</b>.
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
