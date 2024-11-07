import React, { useEffect } from 'react';
import SpaServices from '../Servicios/Components/SpaServices';
import SolicitarTurno from '../Servicios/Components/SolicitarTurno';
import ComentariosSection from '../Servicios/Components/ComentarioSeccion';

function PagServicios() {
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50 ">
      <main className="w-full flex-1">
        {/* Servicios de Spa */}
      {/*   <section className="w-full bg-white">
          <SpaServices />
        </section>
 */}
        {/* Sección de Solicitar Turno */}
        <section className="w-full bg-gray-100 mt-8">
          <SolicitarTurno />
        </section>
      </main>

      {/* Sección de Comentarios */}
    {/*   <footer className="w-full bg-gray-200 py-8">
        <ComentariosSection />
      </footer> */}
    </div>
  );
}

export default PagServicios;
