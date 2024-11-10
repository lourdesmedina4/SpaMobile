import React, { useState } from 'react';
import SpaNumbers from '../../Components/ui/NumberComponent';
import CrearTurno from '../../Turnos/componentes/CrearTurno';
import { useAuth } from "../../context/AuthContext";
import useAxios from '../../api/useAxios';
import toast from 'react-hot-toast';


const SolicitarTurno =()=>{

    const [showTurno, setShowTurno] = useState(false);
    const [idUsuario, setIdUsuario] = useState();
    const { hayUsuario, esCliente } = useAuth();
    const axios = useAxios();

    const obtenerIdUsuario = async()=>{
        try{
            const response = await axios.get("/api/auth/userLogueado");
            if (response.status === 200 && response.data) {
                
                const id = response.data.data.idUsuario;
                console.log(id);
                setIdUsuario(id);
            }
        }catch(error){
        
    }
    }

  const handleTurnoClick = () => {
    if (hayUsuario() && esCliente()) {
      obtenerIdUsuario();
      setShowTurno(true);
  } else if (hayUsuario()) {
      setShowTurno(false);
      alert('Debe ingresar como cliente para solicitar un turno.');
  } else {
      toast.error('Debe estar registrado para solicitar un turno.');
      setShowTurno(false);
  }
  }

  return (
  <div className="w-full">
    <section className="py-16 bg-gray-50 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Grid Left */}
              <div className="flex flex-col justify-center relative">
                <h2 className="text-6xl md:text-8xl font-semibold mb-6 md:mb-8 text-left text-gray-900 leading-tight tracking-tight">
                  Visítanos.
                </h2>
                <p className="mb-4 md:mb-6 text-xl md:text-2xl leading-relaxed text-gray-700 max-w-3xl">
                  Experimente la sensación de bienestar por sí mismo.
                </p>
                <p className="mb-8 md:mb-10 text-base md:text-lg leading-relaxed text-gray-600 max-w-2xl">
                  Reserve su día de spa hoy y embárquese en un viaje de relajación y rejuvenecimiento.
                </p>
                {/* Central Button Container */}
                <div className="absolute inset-x-0 bottom-0 flex justify-center">
                
                </div>
              </div>

              {/* Grid Right */}
               <div className="flex items-start justify-center">

               {/*  <SpaNumbers /> */}
               <button
                    size="lg"
                    onClick={handleTurnoClick}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:-translate-y-1"
                  >
                    Pedir un Turno
                  </button>
              </div> 
            </div>
          </div>
          {hayUsuario() && esCliente() && showTurno && <CrearTurno />}
        </section>
  </div>)


}

export default SolicitarTurno