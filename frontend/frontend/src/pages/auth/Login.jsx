import { useEffect, useState, useContext } from "react";

//Router
import { useNavigate } from "react-router-dom";

//Rect components
import MFA from "../../components/MFA";
import CodeMFA from "../../components/CodeMFA";

//Context
import { useAuth } from "../../context/AuthContext";

//Other libraries
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const URL = "http://localhost:8000" + "/api/login/";

const Login = () => {


  //State
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [userId, setUserId] = useState(-1)
  const [loginMFA, setLoginMFA] = useState(false)

  //Local variables
  let navigate = useNavigate();


  //Handles
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    
    try {
      const formData = user;
      const res = await axios.post(URL, formData);
      const data = res.data;
      console.log(data)
      if (res.status === 200) {
        setUserId(data.user)
        setLoginMFA(true)

    } else toast.error(data.message);
    } catch (error) {
      toast.error("¡Credenciales inválidas!");
    }
  };



  return (
    <>

    {/* Alert message */}
    <ToastContainer />

    {
      loginMFA ? (
        <>
        {/* Insert the MFA Code */}
          <CodeMFA 
            userId={userId}
          />
        </>
      ) : (
        <>
        {/* Login Form */}
        <div className="w-full h-screen flex justify-center items-center my-4">
          <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shado">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900  text-center">
              Inicia Sesión en Creze
            </h5>
            <form
              className="w-full flex max-w-md flex-col gap-4"
              onSubmit={handleLogin}
            >
              <div>
                <div className="mb-2 block">
                  <label htmlFor="email" className="text-sm font-medium required">
                    Email
                  </label>
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Tu email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium required"
                  >
                    Contraseña
                  </label>
                  <div className="text-sm">
                    <a
                      href="/forgot-password"
                      className="font-semibold text-purple-600 hover:text-purple-500"
                    >
                    ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5  dark:placeholder-gray-400 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  required
                  onChange={handleChange}
                />
              </div>
            
              
              <button
                type="submit"
                class="focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
              >
                Enviar
              </button>

              <p className="text-center text-sm text-gray-500">
                ¿No tienes cuenta aún?{" "}
                <a
                  href="/signup"
                  className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
                >
                  Regístrate aquí
                </a>
              </p>
            </form>
          </div>
        </div>
        </>
      )
    }

    

    </>
  );
};

export default Login;
