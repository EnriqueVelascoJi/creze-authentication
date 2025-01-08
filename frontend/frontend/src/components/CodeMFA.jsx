import { useState, useEffect } from "react";

//Router
import { useNavigate } from "react-router-dom";

//Context
import { useAuth } from "../context/AuthContext";

//Other libraries
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

//ENV
const URL = "http://localhost:8000" + "/api/verify-otp/";

const CodeMFA = ({userId}) => {

  //Local state
  const [code, setCode] = useState('')
 

  //Local variables
    let navigate = useNavigate();
    const { _setToken } = useAuth();
  

  
  //Handles
  const handleChange = (e) => {
    setCode(e.target.value)
  }

  //Functions
  const handleLogin = async (e) => {
    e.preventDefault();

    
    try {
      const formData = {
        id: userId,
        otp: code
      };
      const res = await axios.post(URL, formData);
      const data = res.data;
      if (res.status === 200) {
        toast.success("¡Login exitoso!");
        _setToken(data.access)
        navigate('/')
        

    } else toast.error(data.message);
    } catch (error) {
      toast.error("¡Credenciales inválidas!");
    }
  };

  

  return (
    
    <>
    {/* Alert message */}
    <ToastContainer />

    {/* MFA form*/}
    <div className="w-full h-screen flex justify-center items-center my-4">
          <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shado">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900  text-center">
              Ingresa tu código MFA
            </h5>
            <form
              className="w-full flex max-w-md flex-col gap-4"
              onSubmit={handleLogin}
            >
              <div>
                <div className="mb-2 block">
                  <label htmlFor="codemfa" className="text-sm font-medium required">
                    MFA Código
                  </label>
                </div>
                <input
                  id="codemfa"
                  type="text"
                  name="codemfa"
                  placeholder="MFA Código"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
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
            </form>
          </div>
        </div>
    </>
  );
};

export default CodeMFA;