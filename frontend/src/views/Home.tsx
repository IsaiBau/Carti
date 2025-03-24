import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice"; // Asegúrate de importar getMe
import { RootState, AppDispatch } from "../app/store"; // Importa RootState y AppDispatch

const Home = () => {
  const dispatch: AppDispatch = useDispatch(); // Tipa dispatch con AppDispatch
  const navigate = useNavigate();
  const { isError, user } = useSelector((state: RootState) => state.auth); // Tipa el estado con RootState
  const [errorMsg, setErrorMsg] = useState<string>(""); // Tipa el estado como string

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    // Si el usuario no está logueado, lo manda a la página de login
    if (isError) {
      navigate("/login");
    }
    // Si el usuario está logueado y NO es conductor, no lo deja entrar a esta página
    if (user && user.rol !== "conductor") {
      navigate("/login");
    }
  }, [isError, user, navigate]);

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