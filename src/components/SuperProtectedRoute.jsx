import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const SuperProtectedRoute = ({ element, isAdmin }) => {
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const payload = useSelector((bigState) => bigState.authSlice.payload);
  if (isLoggedIn) {
    if (isAdmin && payload && payload.isAdmin) {
      return element;
    }
  }
  toast.error("invalid permissions");
  return <Navigate to={ROUTES.LOGIN} />;
};
export default SuperProtectedRoute;
