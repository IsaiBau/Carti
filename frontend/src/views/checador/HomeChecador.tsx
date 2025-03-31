import React from 'react'
import Logo from '../../assets/logo.png'
import Persona from '../../assets/person-1.png'

const HomeChecador = () => {
  return (
<div className='h-[100vh] bg-[#ECECEC]'>
        <nav className='flex justify-between p-10 items-center'>
            <ul className='flex items-center space-x-10 text-[#2787E0] poppins-semibold text-xl'>
                <li><img src={Logo} alt="logo" className='h-15'/></li>
                <li>Inicio</li>
            </ul>
            <ul className='flex items-center space-x-1.5'>
                <img src={Persona} alt="" />
                <div>
                    <p className='poppins-semibold'>Pepe Aguilar</p>
                    <p>pepeaguilar@gmail.com</p>
                </div>
            </ul>
        </nav>
        <div className='w-full relative'>
    <div className='bg p-10 m-10 rounded-4xl flex w-auto relative'>
        <div className='space-y-3.5 flex flex-col'>
            <p className='poppins-regular text-white text-5xl'>Unidad por llegar:</p>
            <div className='flex text-white poppins-bold text-3xl'>
                <p className='poppins-bold text-9xl'>TSA239| </p>
                <div className='flex flex-col justify-center space-y-3 ml-3 mr-10 text-2xl'>                 
                    <p>Tiempo</p>
                    <p>Combi previa</p>
                    <p>Combi posterior</p>
                </div> 
                <div className='flex flex-col justify-center space-y-3 ml-10 poppins-regular text-2xl'>                 
                    <p>09:13 minutos</p>
                    <p>05:12 minutos</p>
                    <p>06:32 minutos</p>
                </div> 
            </div>
        </div>
        <div className=''>
            <button className='bg-white poppins-bold text-[#2787E0] p-3 rounded-xl absolute bottom-10 right-10'>
                Confirmar llegada
            </button>
        </div>
    </div>
</div>

        <div>
            <div>
                
            </div>
        </div>
    </div>
  )
}

export default HomeChecador