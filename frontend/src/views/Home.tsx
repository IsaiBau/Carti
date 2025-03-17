import React from 'react'
import Layout from '../components/Layout'
import Nodos from '../assets/nodos.svg'


const Home = () => {
  return (
    <Layout>
      <div className='flex flex-row w-full h-full'>
        <div className='flex flex-col justify-center'>
          <div className='poppins-bold text-8xl text-white my-4 space-y-6'>
            <p>El futuro del transporte</p>
            <p>público está aquí.</p>
          </div>
          <div className='text-2xl poppins-regular my-4 text-white'>
            <p>Optimiza tu ruta, gestiona tus pasajeros y lleva el control total</p>
            <p>de tu viaje en tiempo real.</p>
          </div>
          <div className='absolute right-0 bottom-0'>
            <img src={Nodos} alt="" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home