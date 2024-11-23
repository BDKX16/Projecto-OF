import React, { createContext, useState, useEffect } from "react";
import { createUserAdapter } from "../adapters/user";
import { useDispatch } from "react-redux";
import user, { createUser } from "./states/user";
import LoadingSpinner from "../pages/content/components/LoadingSpinner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (!token || !userData) {
      setLoading(false);
      return false;
    }

    dispatch(createUser(JSON.parse(userData)));
    setAuth({ token: token, userData: JSON.parse(userData) });
    setLoading(false);
  };

  const setUserData = (data) => {
    localStorage.setItem("token", JSON.stringify(data.token));

    localStorage.setItem("userData", JSON.stringify(data));

    dispatch(createUser(data));
    setAuth({ token: data.token, userData: data });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        setUserData,
        logout,
      }}
    >
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
