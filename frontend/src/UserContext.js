import React, { useContext, useState, useEffect } from "react";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate() {
  return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {

  const [user, setUser] = useState(null);

  function updateUser(newUser) {
    setUser(newUser);
  }

  async function fetchUser() {
    const storedUser = localStorage.getItem("user");
    return await storedUser.json();
  }

  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    console.log("storedUser in context", storedUser);
    if (storedUser) {
      console.log("Dentro del if");
      const {user} = JSON.parse(storedUser);
      console.log("Parseo JSON", user);
      setUser(user);
    }
    console.log("user metido", user);
  }, []);


  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={updateUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
