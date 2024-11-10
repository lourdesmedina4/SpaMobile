import React, { useState, useEffect } from 'react';
import useAxios from '../api/useAxios';
import toast from 'react-hot-toast';

const Perfil = () => {
    const [cliente, setCliente] = useState({
        idCliente: '',
        telefono: '',
        domicilio: '',
        nombreUsuario: '',
        nombre: '',
        apellido: '',
        dni: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const axiosInstance = useAxios();

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const response = await axiosInstance.get('/api/cliente/clienteLogueado');
                setCliente(response.data.data);
                setLoading(false); // Desactivamos el indicador de carga
            } catch (error) {
                console.error("Error al cargar los datos del cliente", error);
                setLoading(false);
            }
        };
        if (loading) {
            fetchCliente();
        }
    }, [loading]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("Datos enviados:", cliente);

        try {
            await axiosInstance.put('/api/cliente/modificar', cliente);
            toast.success('Datos actualizados con éxito');
        } catch (error) {
            console.error('Error al actualizar datos del cliente', error);
            toast.error('Hubo un error al actualizar tus datos');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Mi Perfil</h2>
            {loading ? (
                <p className="text-center text-gray-500">Cargando datos...</p>
            ) : (

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Nombre de Usuario: (No se puede cambiar)</label>
                        <input
                            type="text"
                            name="username"
                            value={cliente.nombreUsuario || ''}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Teléfono:</label>
                        <input
                            type="text"
                            name="telefono"
                            value={cliente.telefono || ''}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Domicilio:</label>
                        <input
                            type="text"
                            name="domicilio"
                            value={cliente.domicilio || ''}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 font-medium">Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={cliente.nombre || ''}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Apellido:</label>
                        <input
                            type="text"
                            name="apellido"
                            value={cliente.apellido || ''}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">DNI:</label>
                        <input
                            type="text"
                            name="dni"
                            value={cliente.dni || ''}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={cliente.email || ''}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Guardar cambios
                    </button>
                </form>
            )}
        </div>
    );
};

export default Perfil;
