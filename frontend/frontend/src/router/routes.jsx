import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";

import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Home from "../pages/home/Home";

const Routes = () => {


  // Define private routes for authenticated users
  const privateRoutes = [
    {
      path: "/",
      element: <PrivateRoute/>, // Wrap the component in Private Route
      children: [
        {
          path: "/",
          element: <Home />
        },
      ],
    },
  ];

  // Define routes accessible for all users
  const publicRoutes = [
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <SignUp />
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...publicRoutes,
    ...privateRoutes,

  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;