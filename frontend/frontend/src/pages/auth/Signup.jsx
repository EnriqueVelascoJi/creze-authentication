import { useState, useEffect } from "react";

//Router
import { useNavigate } from "react-router-dom";

//React components
import MFA from "../../components/MFA";

//Other libraries
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

//ENV
const URL = "http://localhost:8000" + "/api/signup/";

const SignUp = () => {

  //Local state
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [requireMFA, setRequireMFA] = useState(false)
  const [qr, setQR] = useState('')

  //Local variables
  let navigate = useNavigate();

  
  //Handles
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, lastName, email, password, confirmPassword } = user;
    
    if (password !== confirmPassword) toast.error("¡Las contraseñas no coinciden!");
    if (password.length < 8) toast.error("¡La conttraseña es muy corta!")
    else{
      const formData = {
        email,
        username: name + lastName,
        password,
        password2: confirmPassword
      };
      try {
        const res = await axios.post(URL, formData);
        const data = res.data;
        if (res.status === 201) {
          toast.success("¡Usuario registrado correctamente!");
          setQR(data.qr_code)
          setRequireMFA(true)
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
        throw error
      }
    }
  };

  

  return (
    
    <>
    {/* Alert message */}
    <ToastContainer />

    {
      requireMFA ? (
        <>
            {/* SignUp Form */}
            <MFA 
              qr={qr}
            /> 

        </>
          
    ) : (
        <>
          {/* MFA Components */}
          <div className="w-full h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto my-5 lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                  Crear una cuenta
                </h1>
                <form
                  className="space-y-4 md:space-y-"
                  action="POST"
                  onSubmit={handleSignUp}
                >
                  <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <div className="mb-2 block">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium required"
                        >
                          Nombre
                        </label>
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nombre"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                        required
                        onChange={handleChange}
      
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <label
                          htmlFor="lastName"
                          className="text-sm font-medium required"
                        >
                          Apellido
                        </label>
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Apellido"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
      
                  <div>
                    <div className="mb-2 block">
                      <label htmlFor="email" className="text-sm font-medium required">
                        Email
                      </label>
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-purple-500 dark:focus:border-purple-500"
                      placeholder="Tu email"
                      required
                      onChange={handleChange}
      
                    />
                  </div>
      
                  <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <div className="mb-2 block">
                        <label
                          htmlFor="password"
                          className="text-sm font-medium required"
                        >
                          Contraseña
                        </label>
                      </div>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Contraseña"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-purple-500 dark:focus:border-purple-500"
                        required
                        onChange={handleChange}
      
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium required"
                        >
                          Confirmar contraseña
                        </label>
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirmar contraseña"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5  dark:placeholder-gray-400 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
      
                  <button
                    type="submit"
                    class="w-full focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
                  >
                    Crear cuenta
                  </button>
                  <p className="text-center text-sm text-gray-500">
                    ¿Ya tienes una cuenta?{" "}
                    <a
                      href="login"
                      className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
                    >
                      Inicia sesión
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </>
      )
    }    
    </>
  );
};

export default SignUp;