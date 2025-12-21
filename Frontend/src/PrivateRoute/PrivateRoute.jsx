import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // or spinner

  return user
    ? children
    : <Navigate to="/login" replace state={{ toast: "Please login to edit post" }} /> ;
};

export default PrivateRoute;
