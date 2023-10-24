import React, { createContext, useContext, useState } from 'react';
import { UserProvider as UserProvider1 } from './context'; 
import { UserProvider as UserProvider2 } from './userContext'; 
import { UserProvider as UserProvider3 } from './calendarContext'; 
import { UserProvider as UserProvider4 } from './menuContext'; 
import {UserProvider as UserProvider5} from '../Routes/guestAmountContext'
import {UserProvider as UserProvider6} from './hotelContext'
import { UserProvider as UserProvider7 } from './dayStatusContext';

const CombinedContext = createContext();

export function CombinedProvider({ children }) {
  const [combinedData, setCombinedData] = useState(null);

  return (
    <UserProvider1>
      <UserProvider2>
        <UserProvider3>
          <UserProvider4>
            <UserProvider5>
              <UserProvider6>
                <UserProvider7>
            <CombinedContext.Provider value={{ combinedData, setCombinedData }}>
              {children}
            </CombinedContext.Provider>
                </UserProvider7>
              </UserProvider6>
            </UserProvider5>
          </UserProvider4>
        </UserProvider3>
      </UserProvider2>
    </UserProvider1>
  );
}

export function useCombinedContext() {
  return useContext(CombinedContext);
}
