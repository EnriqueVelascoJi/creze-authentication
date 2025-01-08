import { useState, useEffect } from "react";

//Router
import { useNavigate } from "react-router-dom";

//Other libraries
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

//ENV
const URL = "http://localhost:8000" + "/api/signup/";

const MFA = ({qr}) => {

  //Local state
  const [code, setCode] = useState('')
 
  
  //Handles
  const handleChange = (e) => {
    setCode(e.target.value)
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
          <li>Registra el código de 6 dígitos
          <input
              id="password"
              type="text"
              name="code"
              placeholder="MFA code"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              required
              onChange={handleChange}
            />
          </li>
        </ol>
        </div>
      </div>
    </div>
    </>
  );
};

export default MFA;