
import { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export function UserProvider({ children }) {
  const [selectedMenu, setSelectedMenu] = useState();

  return (
    <MenuContext.Provider value={{ selectedMenu, setSelectedMenu
     }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useSelectedMenu() {
  return useContext(MenuContext);
}
