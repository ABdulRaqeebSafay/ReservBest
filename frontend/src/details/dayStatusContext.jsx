
import  { createContext, useContext, useState } from 'react';

const DayStatusContext = createContext();

export function UserProvider({ children }) {
  const [dayStatus, setDayStatus] = useState(null);

  return (
    <DayStatusContext.Provider value={{ dayStatus, setDayStatus }}>
      {children}
    </DayStatusContext.Provider>
  );
}

export function useDayStatus() {
  return useContext(DayStatusContext);
}
