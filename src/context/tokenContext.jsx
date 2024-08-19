import { createContext, useState } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [tokenUser, setTokenUser] = useState("");

  const setTokenFunc = (token) => {
    setTokenUser(token);
  };

  return (
    <TokenContext.Provider value={{ tokenUser, setTokenFunc }}>
      {children}
    </TokenContext.Provider>
  );
};
