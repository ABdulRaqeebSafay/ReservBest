import  { createContext, useContext, useState } from 'react';

const UserRoleContext = createContext();

export function UserProvider({ children }) {
  const [userRole, setUserRole] = useState(null);

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  return useContext(UserRoleContext);
}
