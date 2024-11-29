import React, { createContext, useState, useContext } from 'react';

// Create Context
const AuthContext = createContext();

// AuthProvider component to wrap around your app and provide context
export const AuthProvider = ({ children }) => {
  // Initialize user state as an object with default values for clarity
  const [user, setUser] = useState({
    id: null,
    username: '',
    email: '',
    password: '',
    joinDate: ''
  });

  // Function to set the user data after a successful login
  const login = (userData) => {
    // Assuming userData is an array or object with values [id, username, email, password, joinDate]
    setUser({
      id: userData[0][0],          // user ID
      username: userData[0][1],    // username
      email: userData[0][2],       // email
      password: userData[0][3],    // password
      joinDate: userData[0][4],    // join date
    });
  };

  // Function to log out the user
  const logout = () => {
    setUser({
      id: null,
      username: '',
      email: '',
      password: '',
      joinDate: ''
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Named export for useAuth
export const useAuth = () => {
  return useContext(AuthContext);
};
