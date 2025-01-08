import { useState, useEffect } from "react";

//Router
import { useNavigate } from "react-router-dom";

//Other libraries
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const URL = "http://localhost:8000" + "/api/verify-otp/";


const MFA = ({qr, userId}) => {

  //Local state
  const [code, setCode] = useState('')

  //Local Variables
  const navigate = useNavigate()
 
  
  //Handles
  const handleChange = (e) => {
    setCode(e.target.value)
  }
  const handleVerifyMFA = async(e) => {
    navigate('/login')
  }
  

  return (
    
    <>
    {/* Alert message */}
    <ToastContainer />

    {/* MFA form*/}
    <div className="w-full h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto my-5 lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
            Configura MFA con tu dispositivo móvil
          </h1>
          <ol class="list-decimal">
          <li>Instala en tu dispositivo móvil una aplicación de autenciación como Google Authenticator</li>
          <li>Usa tu dispositivo para escanear el código QR

          <figure class="max-w-lg">
            <img class="h-auto max-w-full rounded-lg" src={qr} alt="qr code" />
          </figure>

          </li>
          

        </ol>
        <button
        onClick={handleVerifyMFA}
                type="submit"
                class="focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
              >
                Listo
              </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default MFA;