import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const useAxios = () => {
  const { token, logout , rol, refreshToken} = useAuth();

  const axiosInstance = axios.create({
    /*     baseURL: 'http://localhost:8080',  */
    baseURL: 'https://agile-flexibility-production.up.railway.app',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor de peticiones para añadir el token a todas las solicitudes
  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        console.log('Token de autenticación del interceptor:', token); 
        console.log('Rol de autenticación del interceptor:', rol); 


        config.headers.Authorization = `Bearer ${token}`;
      }else {
        console.log('Token no encontrado. No se puede realizar la solicitud.');
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor de respuestas para manejar errores como el token expirado
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Si obtenemos un error 401, intentamos renovar el token
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshToken(); // Renueva el token
          axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`; // Actualiza el header global
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`; // Actualiza el header de la solicitud original
          return axiosInstance(originalRequest); // Reintenta la solicitud con el nuevo token
        } catch (refreshError) {
          console.error('Error al renovar el token:', refreshError);
          logout(); // Cierra sesión si la renovación falla
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;