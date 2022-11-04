import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from "react";
import API from "../utils/api";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const UserContextProvider = (props) => {
  const initUser = () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
    if (Object.keys(user).length) {
      API.setToken(user.token ?? "");
    }
    return user;
  };

  const mountedRef = useRef(true);
  const [user, setUser] = useState(initUser());

  const saveUser = useCallback(
    (user) => {
      if (!mountedRef.current) return null;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      API.setToken(user && user.token ? user.token : "");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
