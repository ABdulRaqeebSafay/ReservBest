
import  { createContext, useContext, useState } from 'react';

const CalendarContext = createContext();

export function UserProvider({ children }) {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <CalendarContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useSelectedDate() {
  return useContext(CalendarContext);
}
