import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES";

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);

  if (isLoggedIn) {
    return element;
  } else {
    toast.error("Must be a registered user to perform this action");
    return <Navigate to={ROUTES.LOGIN} />;
  }
};

export default ProtectedRoute;
