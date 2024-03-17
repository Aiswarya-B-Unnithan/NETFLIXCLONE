import react, { useState, useContext, useRef, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext/UserContext";
import { UserAuthContext } from "../../context/AuthContext/UserAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Login() {
  const { email, setEmail, password, setPassword } = useContext(UserContext);
  const navigate = useNavigate();
const emailRef = useRef(null);

useEffect(() => {
  emailRef.current.focus();
}, []);
  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("successfull login", user);

        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="login">
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
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email"
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
          <button className="loginButton" onClick={handleLogin}>
            Sign In
          </button>

          <span>
            New to Netflix?
            <Link to="/signup">
              <b>Sign up now.</b>
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
