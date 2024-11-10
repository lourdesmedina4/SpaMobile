import SpaFinal from "../assets/SpaFinal.png";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Logo = () => (
   <div className="flex items-center">

<img src={SpaFinal} className="h-8 w-auto sm:h-10" alt="Logo Sentirse Bien" />
    <span className="ml-3 text-2xl font-bold text-gray-900">Sentirse Bien</span>

   </div>
   
);

const Header2 = ({ menuOpen, setMenuOpen }) => {
  const location = useLocation();
  const { esCliente, esProfesional, esAdmin, hayUsuario, logout, admin_profesional, admin_secretaria } = useAuth();

  //para cuando no hay usuario logueado o es cliente
  const itemsCorporativo = [
    { text: "Inicio", path: "/misturnos" },
    { text: "Sacar Turno", path: "/sacarturno" },
    { text: "Contacto", path: "/contacto" },
    esCliente() && { text: "Mi cuenta", path: "/micuenta" }
  ].filter(Boolean);

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
          {hayUsuario() && (
            <button
              onClick={() => {
                logout(); // Pasar handleLogout al logout
              }}
              className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-4 py-2 transition-colors"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-[4rem] left-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out h-[calc(100vh-4rem)] z-50 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col space-y-2 p-4">
          {itemsCorporativo.map(item => (
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
