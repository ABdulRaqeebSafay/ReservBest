import React, { createContext, useContext, useState } from 'react';
import { UserProvider as UserProvider1 } from './context'; 
import { UserProvider as UserProvider2 } from './userContext'; 
const CombinedContext = createContext();

export function CombinedProvider({ children }) {
  const [combinedData, setCombinedData] = useState(null);

  return (
    <UserProvider1>
      <UserProvider2>
        <CombinedContext.Provider value={{ combinedData, setCombinedData }}>
          {children}
        </CombinedContext.Provider>
      </UserProvider2>
    </UserProvider1>
  );
}

export function useCombinedContext() {
  return useContext(CombinedContext);
}
