import React, { createContext, useState, useContext } from 'react';

// Create context
const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState({});

  const login = (sessionData) => {
    setSessionData(sessionData);
  };

  const logout = () => {
    setSessionData({});
  };

  return (
    <AuthContext.Provider value={{ sessionData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
