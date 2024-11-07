import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import PagServicios from './Pages/PagServicios';
import PagContacto
 from './Pages/PagContacto';
import { Toaster } from 'react-hot-toast';
import Login from './Components/Login';
import Register from './Components/Register';
import RegisterProfecional from './Components/RegisterProfecional';
import Header2 from './Components/Header2';
import { useLogin } from './context/LoginContext'; // Importar el contexto

import PagTurnos from './Pages/PagTurnos';
import HolaMundo from './Pages/PagCuenta';


function App2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoginModalOpen, isRegisterModalOpen, isRegisterProfesionalOpen, handleModalClose } = useLogin(); // Acceder al contexto

  return (
    <>
    <div className='mb-20'>
      <Header2 menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
      
      
      <div className={`transition-all duration-300 ease-in-out ${menuOpen ? 'ml-64' : 'ml-0'}`}>
        <Routes>
          <Route path="/" element={<PagTurnos />} /> 
          <Route path="/sacarturno" element={<PagServicios/>} />
          <Route path="/contacto" element={<PagContacto/>} />
          <Route path='/micuenta' element={<HolaMundo/>}/>

        </Routes>
      </div>
    

    {isLoginModalOpen && <Login onClose={handleModalClose} />}
    {isRegisterModalOpen && <Register onClose={handleModalClose} />}
    {isRegisterProfesionalOpen && <RegisterProfecional onClose={handleModalClose} />}



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
