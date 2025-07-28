import React, { useState, useEffect } from "react";
import Logo from '../assets/logo.png';
import Img from '../assets/img.png';
import Nodo1 from '../assets/nodo1.png';
import Nodo2 from '../assets/nodo2.png';
import Input from '../components/Input';
import { FaRegIdBadge } from "react-icons/fa6";
import { FaRegAddressCard } from 'react-icons/fa6';
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import { RootState, AppDispatch } from "../app/store";
import { auth, googleProvider, signInWithPopup } from '../firebase';

const Login = () => {
    const [password, setPassword] = useState<string>("");
    const [rfc, setRfc] = useState<string>("");
    const [googleLoading, setGoogleLoading] = useState<boolean>(false);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state: RootState) => state.auth
    );

    // Efecto para redirección normal (con credenciales)
    useEffect(() => {
        if (user || isSuccess) {
            handleRedirection(user?.rol);
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    // Función para manejar todas las redirecciones
    const handleRedirection = (role?: string) => {
        switch(role) {
            case 'conductor':
                navigate("/home-chofer");
                break;
            case 'dueño':
                navigate("/panel-control");
                break;
            case 'checador':
                navigate("/home-checador");
                break;
            case 'admin':
                navigate("/dashboard");
                break;
            default:
                // Redirección ficticia para usuarios de Google
                // Puedes cambiarlo a la ruta que prefieras
                navigate("/panel-control"); 
        }
    };

    const Auth = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(LoginUser({ rfc, password }));
    };

    // Función mejorada para inicio con Google
    const signInWithGoogle = async () => {
        try {
            setGoogleLoading(true);
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            console.log("Usuario de Google:", {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName
            });

            // Opción 1: Redirección directa (ficticia)
            handleRedirection('dueño'); // Forzamos rol de dueño para el ejemplo
            
            // Opción 2: Si necesitas enviar datos al backend primero:
            /*
            const response = await fetch('/api/google-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: await user.getIdToken(),
                    email: user.email,
                    name: user.displayName
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                handleRedirection(data.role);
            } else {
                throw new Error('Error en el servidor');
            }
            */
            
        } catch (error: any) {
            console.error("Error completo:", error);
            alert(`Error al iniciar con Google: ${error.message}`);
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div>
            <div className='flex flex-row w-full h-screen'>
                <div className='flex flex-col justify-center items-center text-center w-[50%] p-20'>
                    <img src={Logo} alt="LOGO" />
                    <div className='flex flex-col w-md'>
                        <p className='poppins-bold text-[34px]'>Iniciar sesión<b className='poppins-semibold text-6xl text-[#2787E0]'>.</b></p>
                        <p className='poppins-regular text-[#8B8B8B] flex justify-start'>{isError && <span>{message}</span>}</p>
                        <div className='pt-10 w-full'>
                            <form onSubmit={Auth}>
                                <Input
                                    name="rfc"
                                    placeholder='RFC'
                                    icon={FaRegAddressCard}
                                    value={rfc}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRfc(e.target.value)}
                                />

                                <div className='my-2 grid gap-4 grid-cols-2'>
                                    <div className='col-span-2 sm:col-span-1'>
                                        <Input
                                            name="password"
                                            placeholder='Contraseña'
                                            iconClassName='group-hover:-translate-x-[5px]'
                                            icon={FaRegIdBadge}
                                            value={password}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button className='poppins-semibold text-white bg-[#2787E0] w-full h-[50px] rounded-[7px] my-3 cursor-pointer input-transition hover:bg-[#276ee0]'>
                                    {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                                </button>
                            </form>
                            
                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">O continúa con</span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={signInWithGoogle}
                                disabled={googleLoading}
                                className="flex items-center justify-center w-full gap-2 poppins-semibold text-gray-700 bg-white border border-gray-300 rounded-[7px] h-[50px] my-3 cursor-pointer hover:bg-gray-50 disabled:opacity-70"
                            >
                                <FcGoogle className="text-xl" />
                                {googleLoading ? 'Procesando...' : 'Iniciar con Google'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center text-center w-[50%] h-screen bg-radial from-[#3290e7] from-30% to-[#1855a4]'>
                    <img className='absolute top-0 left-[50%]' src={Nodo1} alt="LOGO" />
                    <img className='h-[50%]' src={Img} alt="LOGO" />
                    <p className='poppins-semibold text-white text-3xl mt-10 mb-2'>Texto generico que llame la atención.</p>
                    <p className='poppins-regular text-white text-lg '>Otro texto generico que esta conectado al primero.</p>
                    <img className='absolute bottom-0 right-0' src={Nodo2} alt="LOGO" />
                </div>
            </div>
        </div>
    );
};

export default Login;