import React from "react";
import { Navigate } from "react-router-dom";
import { accoutService } from "../Pages/Authentication/login/accoutService";

export default function Auth({ children }) {
  if (!accoutService.isLogged()) {

    return <Navigate to="/auth/login"/>
  }

  return children;
}
