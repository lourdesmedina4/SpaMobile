import SpaFinal from "../assets/SpaFinal.png";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useLogin } from '../context/LoginContext';
import { useAuth } from '../context/AuthContext';

const Logo = () => (
   <div className="flex items-center">

<img src={SpaFinal} className="h-8 w-auto sm:h-10" alt="Logo Sentirse Bien" />
    <span className="ml-3 text-2xl font-bold text-gray-900">Sentirse Bien</span>

   </div>
   
);

const NavigationElement = ({ text, path }) => (
  <Link
    to={path}
    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
  >
    {text}
  </Link>
);

const Header2 = ({ menuOpen, setMenuOpen }) => {
  const location = useLocation();
  const { esCliente, esProfesional, esAdmin, hayUsuario, logout, admin_profesional, admin_secretaria } = useAuth();
  const { handleRegisterClick, handleLoginClick, handleRegisterProfesionalClick } = useLogin();

  //para cuando no hay usuario logueado o es cliente
  const itemsCorporativo = [
    { text: "Inicio", path: "/" },
    { text: "Servicios", path: "/servicios" },
    { text: "Contacto", path: "/contacto" },
    esCliente() && { text: "Mi cuenta", path: "/MisTurnos" }
  ].filter(Boolean);

  //para los usuarios que no son clientes
  const itemsAdministrativos = [
    {text: "Clientes registrados", path: "/administracion/clientes" },
    admin_profesional() && { text: "Turnos de clientes por profesional", path: "/administracion/clientes-por-profesional" },
    admin_profesional() && { text: "Turnos creados", path: "/administracion/turnos-creados" },
    esAdmin() && { text: "Agregar turnos", path: "/administracion/agregar-turnos" },
    admin_secretaria() && { text: "Pagos realizados", path: "/administracion/pagos" },
    admin_secretaria() && { text: "Informe de Ingresos", path: "/administracion/ingresos" },
    esAdmin() && { text: "Informe de servicios realizados por profesional", path: "/administracion/servicios-por-profesional" },
    esAdmin() && { text: "Solicitudes de empleo", path: "/administracion/solicitudes-de-empleo" },
    admin_profesional()&& { text: "Consultas", path: "/administracion/consultas" },
  ].filter(Boolean);

  const menuItems = (!hayUsuario() || esCliente()) ? itemsCorporativo : itemsAdministrativos;

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 mb-1 flex items-center justify-between py-4">
        {/* Botón y logo a la izquierda */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-700 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
          <Logo />
        </div>

        {/* Botones de usuario a la derecha */}
        <div className="flex items-center space-x-4">
          {hayUsuario() ? (
            <>
              <button
                onClick={logout}
                className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-4 py-2 transition-colors"
              >
                Cerrar Sesión
              </button>
              {esAdmin() && (
                <button
                  onClick={handleRegisterProfesionalClick}
                  className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-4 py-2 transition-colors"
                >
                  Registrar Empleado
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleLoginClick}
                className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-4 py-2 transition-colors"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={handleRegisterClick}
                className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-4 py-2 transition-colors"
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-[4rem] left-0 w-64 bg-white shadow-lg transition-all duration-300 ease-in-out h-[calc(100vh-4rem)] ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col space-y-2 p-4">
          {menuItems.map(item => (
            <Link
              key={item.text}
              to={item.path}
              className={`text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-bold ${
                location.pathname === item.path ? 'bg-gray-100 text-pink-500' : ''
              }`}
            >
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header2;
