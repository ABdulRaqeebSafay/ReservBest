
import React, { createContext, useContext, useState } from 'react';

const HotelContext = createContext();

export function UserProvider({ children }) {
  const [hotelDetail, setHotelDetail] = useState([]);

  return (
    <HotelContext.Provider value={{ hotelDetail, setHotelDetail }}>
      {children}
    </HotelContext.Provider>
  );
}

export function useHotelDetail() {
  return useContext(HotelContext);
}
