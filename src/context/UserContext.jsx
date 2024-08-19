import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    token
      ? localStorage.setItem("token", token)
      : localStorage.removeItem("token");
  }, [token]);
  return (
    <>
      <UserContext.Provider value={{ token, setToken }}>
        {children}
      </UserContext.Provider>
    </>
  );
}
