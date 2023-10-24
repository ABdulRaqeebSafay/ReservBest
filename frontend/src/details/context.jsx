// UserContext.js
import { createContext, useContext, useState } from 'react';

const Context = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Context.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </Context.Provider>
  );
};

export const useLogged = () => {
  return useContext(Context);
};

