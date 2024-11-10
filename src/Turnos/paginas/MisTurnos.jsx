import React, { useEffect, useState } from 'react';
import useAxios from '../../api/useAxios';
import TurnoCard from '../utilidades/TurnoCard';
import { useAuth } from '../../context/AuthContext';
import CrearTurno from '../componentes/CrearTurno';
import toast from 'react-hot-toast';

const MisTurnos = () => {
  const axiosInstance = useAxios();  
  const [turnos, setTurnos] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);
  const { nombreUsuario, hayUsuario, esCliente } = useAuth();
  const [showTurno, setShowTurno] = useState(false);

  const fetchTurnos = async () => {
    try {
      const response = await axiosInstance.get('/api/turno/misTurnos'); 
      setTurnos(response.data.data);  
      setLoading(false);  
    } catch (err) {
      setError('Error al cargar los turnos'); 
      setLoading(false);  
    }
  };
  
  useEffect(() => {
    fetchTurnos();
  }, []);  

  const handleTurnoClick = () => {
    if (hayUsuario() && esCliente()) {
      setShowTurno(!showTurno);
    } else if (hayUsuario()) {
      toast.error('Debe ingresar como cliente para solicitar un turno.');
    } 
  };

  const handleTurnoCreado = (nuevoTurno) => {
    setTurnos(prevTurnos => [...prevTurnos, nuevoTurno]);
    setShowTurno(false);
    toast.success('Turno creado exitosamente');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700">Cargando turnos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-semibold text-red-600">Ocurrió un error inesperado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Bienvenido, {nombreUsuario}
          </h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <button
                onClick={handleTurnoClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-6"
              >
                {showTurno ? 'Solicitar un Turno' : 'Solicitar un Turno'}
              </button>

              {hayUsuario() && esCliente() && showTurno && (
                <div className="mb-6">
                  <CrearTurno onTurnoCreado={handleTurnoCreado} />
                </div>
              )}

              <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sus turnos</h2>

                {turnos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {turnos.map((turno) => (
                      <TurnoCard key={turno.idTurno} turno={turno} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                    <p className="font-bold">Información</p>
                    <p>No tienes turnos asignados.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MisTurnos;
