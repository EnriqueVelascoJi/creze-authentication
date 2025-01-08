import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";


//Create an authentication context
const AuthContext = createContext();

//Create the Auth Provider component
const AuthProvider = ({ children }) => {

  // Athentication token
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Function to set the authentication token
  const _setToken = (newToken) => {
    setToken(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      _setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;