import React, { createContext, useState } from 'react';

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [registeredUser, setregisteredUser] = useState(null);

  function handleRegister(userData) {
    setregisteredUser(userData);
    localStorage.setItem("registeredUser", JSON.stringify(userData));
  }

  return (
    <UserContext.Provider value={{ registeredUser, handleRegister }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };