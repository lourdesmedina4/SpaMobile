import { useForm } from "react-hook-form";
import { FormInput } from "../UtilitiesGenericas/FormInput";
import axios from "../api/axios";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const {register, handleSubmit, setError, watch, reset, formState:{errors, isSubmitting}} = useForm();
    const passwordValue = watch("passwordRegisterC");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const transformedData = Object.keys(data).reduce((acc, key) => {
            const originalKey = key.replace("RegisterC", "");
            acc[originalKey] = data[key];
            return acc;
        }, {});

        const { confirmPassword, ...formData } = transformedData;

        try {
            const response = await axios.post("/api/auth/registerCliente", formData);
            if (response.status === 200) {
                toast.success('Se creó su cuenta correctamente, inicie sesión');
                redireccionarLogin();
            }
        } catch (error) {
            if (!error?.response) {
                setError("root", {
                    message: "Error al intentar conectarse con el servidor",
                });
            } else if (error.response?.status === 400) {
                const errorMessage = error.response.data || "Error en el registro";
                setError("root", {
                    message: errorMessage,
                });
            } else {
                setError("root", {
                    message: "Error inesperado durante el registro",
                });
            }
        }
    };

    const redireccionarLogin = () => {
        reset();
        navigate('/');
    }

    return (
        <main className="w-full h-screen bg-[#344C3D] flex flex-col justify-center items-center p-8 relative overflow-auto">
            <section className="w-full max-w-md">
                <h1 className="text-4xl text-white font-bold text-center mb-6">Registrarse</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormInput 
                        textLabel="Usuario" 
                        name="usernameRegisterC" 
                        register={register} 
                        type="text"
                        options={{
                            required: "Nombre de usuario es necesario",
                        }} 
                    />
                    {errors.usernameRegisterC && <div className="text-red-500 m-0">{errors.usernameRegisterC.message}</div>}

                    <FormInput 
                        textLabel="Email" 
                        name="emailRegisterC" 
                        register={register} 
                        type="email"
                        options={{
                            required: "Email es necesario",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Email inválido"
                            }
                        }} 
                    />
                    {errors.emailRegisterC && <div className="text-red-500 m-0">{errors.emailRegisterC.message}</div>}

                    <FormInput 
                        textLabel="Nombre" 
                        name="nombreRegisterC" 
                        register={register} 
                        type="text"
                        options={{
                            required: "Su nombre es necesario",
                        }} 
                    />
                    {errors.nombreRegisterC && <div className="text-red-500 m-0">{errors.nombreRegisterC.message}</div>}

                    <FormInput 
                        textLabel="Apellido" 
                        name="apellidoRegisterC" 
                        register={register} 
                        type="text"
                        options={{
                            required: "Apellido es necesario",
                        }} 
                    />
                    {errors.apellidoRegisterC && <div className="text-red-500 m-0">{errors.apellidoRegisterC.message}</div>}

                    <FormInput 
                        textLabel="Teléfono" 
                        name="telefonoRegisterC" 
                        register={register} 
                        type="text"
                        options={{
                            required: "Teléfono es necesario",
                        }}
                    />
                    {errors.telefonoRegisterC && <div className="text-red-500 m-0">{errors.telefonoRegisterC.message}</div>}

                    <FormInput 
                        textLabel="DNI" 
                        name="dniRegisterC" 
                        register={register} 
                        type="text"
                        options={{
                            required: "DNI es necesario",
                        }} 
                    />
                    {errors.dniRegisterC && <div className="text-red-500 m-0">{errors.dniRegisterC.message}</div>}

                    <FormInput 
                        textLabel="Dirección" 
                        name="domicilioRegisterC" 
                        register={register} 
                        type="text"
                        options={{
                            required: "Su dirección es necesaria",
                        }} 
                    />
                    {errors.domicilioRegisterC && <div className="text-red-500 m-0">{errors.domicilioRegisterC.message}</div>}

                    <FormInput 
                        type="password" 
                        textLabel="Contraseña" 
                        name="passwordRegisterC" 
                        register={register}
                        options={{
                            required: "Contraseña es necesaria",
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[\w\W]{8,16}$/,
                                message: "Debe tener entre 8 y 16 caracteres.\nAl menos una letra y un número"
                            }
                        }} 
                    />
                    {errors.passwordRegisterC && <div className="text-red-500 whitespace-pre">{errors.passwordRegisterC.message}</div>}
                    
                    <FormInput 
                        type="password" 
                        textLabel="Confirmar contraseña" 
                        name="confirmPasswordRegisterC" 
                        register={register}
                        options={{
                            required: "Confirma tu contraseña",
                            validate: value =>
                            value === passwordValue || "Las contraseñas no coinciden"
                        }} 
                    />
                    {errors.confirmPasswordRegisterC && <div className="text-red-500 m-0">{errors.confirmPasswordRegisterC.message}</div>}

                    {errors.root && <div className="text-red-500 whitespace-pre mt-3">{errors.root.message}</div>}

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-slate-900 hover:text-white hover:bg-slate-900 py-2 transition-colors duration-300"
                    >
                        {isSubmitting ? "Guardando..." : "Confirmar"}
                    </button>

                    <div>
                        <span className="text-white m-4">
                            ¿Ya tienes una cuenta?{" "}
                            <p
                                className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-4 py-2 transition-colors cursor-pointer"
                                onClick={redireccionarLogin}
                            >
                                Inicia sesión
                            </p>
                        </span>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Register;