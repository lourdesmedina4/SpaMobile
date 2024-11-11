import './App.css';
import React, { useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import Header2 from './Components/Header2';
import PagCuenta from './Pages/PagCuenta';
import PagServicios from './Pages/PagServicios';
import PagContacto from './Pages/PagContacto';
import PagTurnos from './Pages/PagTurnos';
import PagRegistro from './Pages/PagRegistro';
import PagLogin from './Pages/PagLogin';


function App2() {
  const [menuOpen, setMenuOpen] = useState(false);// Acceder al contexto
  const {hayUsuario, esCliente} = useAuth();
  const [estaLogin, setEstaLogin] = useState(true);

  return (
    <>
    
      {esCliente() ? (
        <>
          <div className='mb-20'>
            <Header2 menuOpen={menuOpen} setMenuOpen={setMenuOpen}  />
          </div>
          {/* ovarlay para oscurecer cuando el sidebar esta abierto */}
          {menuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMenuOpen(false)} // Cerrar el sidebar al hacer clic en el overlay
            ></div>
          )}
        </>
        ): <> </>
      }

    
      <Routes>
        <Route path="/" element={<PagLogin/>} /> 
        <Route path='/registro' element={<PagRegistro/>} />
        <Route path="/misturnos" element={<PagTurnos />} /> 
        <Route path="/sacarturno" element={<PagServicios />} />
        <Route path="/contacto" element={<PagContacto />} />
        <Route path='/micuenta' element={<PagCuenta />} />
      </Routes>

    <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{}}
        containerClassName=""
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

    </>
  );
}

export default App2;
