import React, { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <UserContext.Provider value={{ email, setEmail, password, setPassword }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
