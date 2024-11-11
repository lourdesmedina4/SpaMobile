import { useForm } from "react-hook-form";
import { FormInput } from "../UtilitiesGenericas/FormInput";
import toast from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';
import React, { useEffect} from 'react';


const Login = ()=>{


  const {register, handleSubmit, setError, reset, 
  formState:{errors , isSubmitting}} = useForm();

  const { login, esCliente} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(esCliente())
      navigate('/misturnos');
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      
      // Chequear si la estructura de la respuesta es la esperada
      if (response.status === 200 && response.data) {
        const { accessToken, usuarioLogueado } = response.data;
        const idRole = usuarioLogueado.roles[0].idRole;
        const idUsuario = usuarioLogueado.idUsuario;
        const nombreUsuario = usuarioLogueado.username;

        if (idRole === 1) { 
          // Guarda el token y el rol en el contexto usando el hook useAuth
          login(accessToken, idRole, idUsuario, nombreUsuario);
          toast.success('Se inició sesión correctamente');
          navigate('/misturnos');
        }else{
          toast.error('La app esta disponible para clientes solamente');
          reset();
        }
      }
  
    } catch (error) {
      // Verifica si el error es de red o falta de respuesta
      if (!error?.response) {
        setError("root", {
          //message: "Error al intentar conectarse con el servidor",
          message: error.message,
        });
      } else if (error.response?.status === 401) {
        // Maneja el error de credenciales incorrectas
        setError("root", {
          message: "Usuario o contraseña incorrectos",
        });
      } else {
        // Muestra el error inesperado durante la autenticación
        setError("root", {
          message: "Error inesperado durante el inicio de sesión",
        });
      }
    }
  };
      

  const redireccionarRegister=()=>{
      reset();
      navigate('/registro');
  }
    

  return(
    <main className="w-full h-screen bg-[#344C3D] flex flex-col justify-center items-center p-8 relative overflow-auto">
    
    <section className="w-full max-w-md">

      <h1 className="text-4xl text-white font-bold text-center mb-6">Iniciar Sesión</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/*INPUT NOMBRE DE USUARIO*/}
        <FormInput
          textLabel="Usuario"
          name="username"
          register={register}
          type="text"
          options={{
            required: "Nombre de usuario es necesario",
          }}
        />
        {errors.username && (
            <div className="text-red-500 m-0">{errors.username.message}</div>
        )}

        <FormInput
          type="password"
          textLabel="Contraseña"
          name="password"
          register={register}
          options={{
              required: "Contraseña es necesaria",
          }}
        />
        {errors.root && (
            <div className="text-red-500 whitespace-pre mt-3">{errors.root.message}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-slate-900 hover:text-white hover:bg-slate-900 py-2 transition-colors duration-300"
      >
          {isSubmitting ? "Cargando..." : "Confirmar"}
        </button>

        <div>
          <span className="text-white m-4">
            ¿No tienes una cuenta?{" "}
            <p
              className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-4 py-2 transition-colors cursor-pointer"
              onClick={redireccionarRegister}>
              Registrate
            </p>
          </span>
        </div>
      </form>
    </section>
  </main>
  );
}

export default Login;
