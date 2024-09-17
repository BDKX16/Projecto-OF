import React from "react";
import { useContext } from "react";
import AuthContext from "../redux/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
