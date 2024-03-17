import { createContext, useState } from "react";

export const UserAuthContext = createContext(null);

export default function UserContext({ children }) {
  const [user, setUser] = useState({});
  console.log("useraftercontext", user);
  return (
    <UserAuthContext.Provider value={{ user, setUser }}>
      {children}
    </UserAuthContext.Provider>
  );
}
