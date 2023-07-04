// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const loginContext = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  const logoutContext = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};
