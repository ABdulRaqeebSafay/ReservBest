
import React, { createContext, useContext, useState } from 'react';

const HotelImageContext = createContext();

export function UserProvider({ children }) {
  const [hotelImage, setHotelImage] = useState();

  return (
    <HotelImageContext.Provider value={{ hotelImage, setHotelImage }}>
      {children}
    </HotelImageContext.Provider>
  );
}

export function useHotelImage() {
  return useContext(HotelImageContext);
}
