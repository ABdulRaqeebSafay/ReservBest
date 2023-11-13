import  { createContext, useContext, useState } from 'react';
import { UserProvider as UserProvider1 } from './context'; 
import { UserProvider as UserProvider2 } from './userContext'
import { UserProvider as UserProvider3 } from './calendarContext'; 
import { UserProvider as UserProvider4 } from './menuContext'; 
import {UserProvider as UserProvider5} from './totalPriceContext'
import {UserProvider as UserProvider6} from './hotelContext'
import { UserProvider as UserProvider7 } from './dayStatusContext';
import { UserProvider as UserProvider8 } from './guestAmountContext';
import { UserProvider as UserProvider9 } from './hotelImageContext';
import { UserProvider as UserProvider10 } from './hotelLocation';
import { UserProvider as UserProvider11 } from './userRoleContext';


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
                  <UserProvider8>
                   <UserProvider9>
                   <UserProvider10>
                    <UserProvider11>
                      <CombinedContext.Provider value={{ combinedData, setCombinedData }}>
                        {children}
                      </CombinedContext.Provider>
                      </UserProvider11>
                      </UserProvider10>
                    </UserProvider9>
                  </UserProvider8>
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
