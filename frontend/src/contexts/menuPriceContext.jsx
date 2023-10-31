

import { createContext, useContext, useState } from 'react';

const MenuPriceContext = createContext();

export function UserProvider({ children }) {
  const [menuPrice,setMenuPrice] = useState(0);

  return (
    <MenuPriceContext.Provider value={{ menuPrice, setMenuPrice
     }}>
      {children}
    </MenuPriceContext.Provider>
  );
}

export function useMenuPrice() {
  return useContext(MenuPriceContext);
}
