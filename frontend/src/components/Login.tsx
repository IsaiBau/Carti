Import React, { useState, useEffect } from "react";
import Logo from '../assets/logo.png';
import Img from '../assets/img.png';
import Nodo1 from '../assets/nodo1.png';
import Nodo2 from '../assets/nodo2.png';
import Input from '../components/Input';
import { FaRegIdBadge } from "react-icons/fa6";
import { FaRegAddressCard } from 'react-icons/fa6';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import { RootState, AppDispatch } from "../app/store"; // Importa RootState y AppDispatch

const Login = () => {
    const [nombre, setNombre] = useState<string>("");
    const [rfc, setRfc] = useState<string>("");
    const dispatch: AppDispatch = useDispatch(); // Tipa dispatch con AppDispatch
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state: RootState) => state.auth // Tipa el estado con RootState
    );

    useEffect(() => {
        if (user || isSuccess) {
            navigate("/tipo-personas");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    const Auth = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(LoginUser({ nombre, rfc })); // Asegúrate de pasar un objeto con la estructura correcta
    };

    return (
        <div>
            <div className='flex flex-row w-full h-screen'>
                <div className='flex flex-col justify-center items-center text-center w-[50%] p-20'>
                    <img src={Logo} alt="LOGO" />
                    <div className='flex flex-col w-md'>
                        <p className='poppins-bold text-[34px]'>Iniciar sesión<b className='poppins-semibold text-6xl text-[#2787E0]'>.</b></p>
                        <p className='poppins-regular text-[#8B8B8B] flex justify-start'>{isError && <span>{message}</span>} {/* Usa <span> en lugar de <p> */}</p>
                        <div className='pt-10 w-full'>
                            <form onSubmit={Auth}>
                                {/* Input Nombre */}
                                <Input
                                    placeholder='Nombre'
                                    icon={FaRegAddressCard}
                                    value={nombre}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
                                >
                                </Input>

                                {/* Input CURP y RFC */}
                                <div className='my-2 grid gap-4 grid-cols-2'>
                                    <div className='col-span-2 sm:col-span-1'>
                                        <Input
                                            placeholder='RFC'
                                            iconClassName='group-hover:-translate-x-[5px]'
                                            icon={FaRegIdBadge}
                                            value={rfc}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRfc(e.target.value)}
                                        >
                                        </Input>
                                    </div>
                                </div>

                                {/* Boton */}
                                <button className='poppins-semibold text-white bg-[#2787E0] w-full h-[50px] rounded-[7px] my-3 cursor-pointer input-transition hover:bg-[#276ee0]'>
                                    {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                                </button>
                            </form>
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