import {Navigate, Outlet} from "react-router-dom"

import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
    const { token } = useAuth();

    // Check if the user is authenticated
    if (!token) {

      // If not authenticated, redirect to the login page
      return <Navigate to="/login" />;
    }
  
    // If authenticated, render the child route
    return <Outlet />;
}

export default PrivateRoute