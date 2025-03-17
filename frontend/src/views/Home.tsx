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
    <div>Home</div>
  )
}

export default Home