
import  { createContext, useContext, useState } from 'react';

const HotelLocationContext = createContext();

export function UserProvider({ children }) {
  const [hotelLocation, setHotelLocation] = useState(null);

  return (
    <HotelLocationContext.Provider value={{ hotelLocation, setHotelLocation }}>
      {children}
    </HotelLocationContext.Provider>
  );
}

export function useHotelLocation() {
  return useContext(HotelLocationContext);
}
