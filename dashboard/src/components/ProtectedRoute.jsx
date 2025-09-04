import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../main";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
