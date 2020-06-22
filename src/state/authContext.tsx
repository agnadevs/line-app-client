import React, { createContext, useState } from "react";

type ContextProps = {
  isLoggedIn: boolean;
  isUserLoggedIn: (bool: boolean) => void;
};

const AuthContext = createContext({} as ContextProps);

const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isUserLoggedIn = (bool: boolean) => {
    setIsLoggedIn(bool);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
