import React from 'react'
import Logo from '../assets/logo.svg'
import Img from '../assets/img.png'
import Nodo1 from '../assets/nodo1.png'
import Nodo2 from '../assets/nodo2.png'
import Input from '../components/Input'
import InputSelect from '../components/InputSelect'
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaRegIdBadge } from "react-icons/fa6";
import { PiGenderFemaleBold  } from "react-icons/pi";
import { FaRegAddressCard } from 'react-icons/fa6';

const Login = () => {
  return (
    <div>
        <div className='flex flex-row w-full h-screen'>
            <div className='flex flex-col justify-center items-center text-center w-[50%] p-20'>
                <img className='' src={Logo} alt="LOGO"/>
                <div className='flex flex-col w-md'>
                    <p className='poppins-bold text-[34px]'>Crear una nueva cuenta<b className='poppins-semibold text-6xl text-[#2787E0]'>.</b></p>
                    <p className='poppins-regular text-[#8B8B8B] flex justify-start'>¡Bienvenido! Ingresa los datos que se te piden:</p>
                    <div className='pt-10 w-full'>
                        
                        {/* Input Nombre */}

                        <Input 
                            placeholder='Nombre' 
                            icon={FaRegAddressCard}
                            >
                            </Input>

                        {/* Input Apellidos */}

                        <div className='my-2 grid gap-4 grid-cols-2 mt-5'>
                            <div className='col-span-2 sm:col-span-1'>
                                <Input 
                                    placeholder='Apellido paterno' 
                                    iconClassName='group-hover:-translate-x-[5px]'
                                    icon={FaRegAddressCard}
                                    >
                                </Input>
                            </div>

                            <div className='col-span-2 sm:col-span-1'>
                                <Input 
                                    placeholder='Apellido materno' 
                                    iconClassName='group-hover:-translate-x-[5px]'
                                    icon={FaRegAddressCard}
                                    >
                                </Input>
                            </div>
                        </div>
                        
                        {/* Input Fecha de nacimiento */}

                        <div className='flex flex-row items-center mt-5 mb-2'>   
                            <LiaBirthdayCakeSolid className='text-[#8B8B8B] text-xl'/>
                            <p className='poppins-regular text-[#8B8B8B] flex pt-1 pl-1'>Fecha de nacimiento</p>
                        </div>
                        <div className='w-full mb-5'>
                            <div className=''>
                                <Input 
                                    placeholder='' 
                                    iconClassName='group-hover:-translate-x-[5px]'
                                    type='date'
                                    className='pl-[15px]'
                                    >
                                </Input>
                            </div>
                        </div>

                        {/* Input CURP y RFC */}

                        <div className='my-2 grid gap-4 grid-cols-2'>
                            <div className='col-span-2 sm:col-span-1'>
                                <Input 
                                    placeholder='CURP' 
                                    iconClassName='group-hover:-translate-x-[5px]'
                                    icon={FaRegIdBadge}
                                    >
                                </Input>
                            </div>

                            <div className='col-span-2 sm:col-span-1'>
                                <Input 
                                    placeholder='RFC' 
                                    iconClassName='group-hover:-translate-x-[5px]'
                                    icon={FaRegIdBadge}
                                    >
                                </Input>
                            </div>
                        </div>

                        {/* Input Sexo */}

                        <div className='flex flex-row items-center mt-5 mb-2'>   
                            <PiGenderFemaleBold className='text-[#8B8B8B] text-lg'/>
                            <p className='poppins-regular text-[#8B8B8B] flex pl-1'>Sexo</p>
                        </div>

                        <InputSelect></InputSelect>

                        {/* Boton */}

                        <button className='poppins-semibold text-white bg-[#2787E0] w-full h-[50px] rounded-[7px] my-3 cursor-pointer input-transition hover:bg-[#276ee0]'>Crear cuenta</button>

                        <p className='poppins-regular text-[#8B8B8B] text-sm'>¿Ya tienes una cuenta? <b className='poppins-regular text-[#2787E0] text-sm cursor-pointer'>Ingresa ahora</b></p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center text-center w-[50%] h-screen bg-radial from-[#3290e7] from-30% to-[#1855a4]'>
                    <img className='absolute top-0 left-[50%]' src={Nodo1} alt="LOGO"/>
                    <img className='h-[50%]' src={Img} alt="LOGO"/>
                    <p className='poppins-semibold text-white text-3xl mt-10 mb-2'>Texto generico que llame la atención.</p>
                    <p className='poppins-regular text-white text-lg '>Otro texto generico que esta conectado al primero.</p>
                    <img className='absolute bottom-0 right-0' src={Nodo2} alt="LOGO"/>
            </div>
        </div>
    </div>
  )
}

export default Login