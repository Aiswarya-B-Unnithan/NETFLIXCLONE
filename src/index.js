import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import MovieProvider from "./context/MovieContextProvider";
import UserProvider from "./context/userContext/UserContextProvider";
import UserContext from "./context/AuthContext/UserAuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    
    <UserContext>
      <MovieProvider>
        <UserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
      </MovieProvider>
    </UserContext>
  </React.StrictMode>
);
