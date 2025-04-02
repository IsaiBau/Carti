import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Nodos from "../assets/nodos.svg"
const Home = () => {
  const buttons = (
    <>
      <Link to="/login">
        <Button className="border border-white text-white">Login</Button>
      </Link>
      <Link to="/register">
        <Button className="bg-white">Registrarse</Button>
      </Link>
    </>
  );

  return (
    <Layout buttons={buttons}>
      <div className='flex flex-row w-full h-full'>
        <div className='flex flex-col justify-center'>
          <div className='poppins-bold text-8xl text-white my-4 space-y-6'>
            <p>El futuro del transporte</p>
            <p>público está aquí.</p>
          </div>
          <div className='text-2xl poppins-regular my-4 text-white'>
            <p>Optimiza tu ruta, gestiona tus pasajeros y lleva el control total</p>
            <p>de tu viaje.</p>
          </div>
          <div className='absolute right-0 bottom-0 z-10 w-[40%] max-w-[600px]'>
          <img src={Nodos} alt="Patrón decorativo" className="w-full h-auto" />
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
