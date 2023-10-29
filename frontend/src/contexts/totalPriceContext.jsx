

import { createContext, useContext, useState } from 'react';

const TotalPriceContext = createContext();

export function UserProvider({ children }) {
  const [totalPrice,setTotalPrice] = useState(0);

  return (
    <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice
     }}>
      {children}
    </TotalPriceContext.Provider>
  );
}

export function useTotalPrice() {
  return useContext(TotalPriceContext);
}
