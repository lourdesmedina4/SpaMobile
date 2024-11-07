import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Body from './Components/Body';
import PagInicio from './Pages/PagInicio';
import PagServicios from './Pages/PagServicios';
import PagContacto
 from './Pages/PagContacto';
import { Toaster } from 'react-hot-toast';
import Login from './Components/Login';
import Register from './Components/Register';
import RegisterProfecional from './Components/RegisterProfecional';
import Header2 from './Components/Header2';
import { useLogin } from './context/LoginContext'; // Importar el contexto
import { useAuth } from './context/AuthContext';
import PagTurnos from './Pages/PagTurnos';



function App2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoginModalOpen, isRegisterModalOpen, isRegisterProfesionalOpen, handleModalClose } = useLogin(); // Acceder al contexto
  const {esPorfesional} = useAuth();

  return (
    <>
    <div className='mb-20'>
      <Header2 menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
      
      
      <div className={`transition-all duration-300 ease-in-out ${menuOpen ? 'ml-64' : 'ml-0'}`}>
        <Routes>
          <Route path="/" element={<PagInicio />} /> 
          <Route path="/servicios" element={<PagServicios/>} />
          <Route path="/contacto" element={<PagContacto/>} />
          <Route path='/MisTurnos' element={<PagTurnos/>}/>

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
