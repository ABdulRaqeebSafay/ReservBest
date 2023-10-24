

import { createContext, useContext, useState } from 'react';

const GuestAmountContext = createContext();

export function UserProvider({ children }) {
  const [guestAmount, setGuestAmount] = useState();

  return (
    <GuestAmountContext.Provider value={{ guestAmount, setGuestAmount
     }}>
      {children}
    </GuestAmountContext.Provider>
  );
}

export function useGuestNumber() {
  return useContext(GuestAmountContext);
}
