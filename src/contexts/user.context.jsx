import React, { createContext, useState } from "react";
import API from "../utils/api";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const api = API;
  const initUser = () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
    if (Object.keys(user).length !== 0) {
      api.setToken(user.token);
    }
    return user;
  }
  const [user, setUser] = useState(initUser());
  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    api.setToken(user ? user.token : "No Token");
  };

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
