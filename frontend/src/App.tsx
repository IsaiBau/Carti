
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import Login from './components/Login';
import Vista from "./views/vista";
import TipoPersonas from './views/TipoPersonas';
import PanelControl from './views/dueño/PanelControl';
import Unidades from './views/dueño/Unidades';
import UnidadesDetalles from './views/dueño/UnidadesDetalles';
import EditarPersona from "./views/EditarPersona.js";
import CrearPersona from "./components/Register.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "./app/store";
import { getMe } from "./features/authSlice.js";

function App() {
  const dispatch: AppDispatch = useDispatch(); // Tipa dispatch con AppDispatch
  const navigate = useNavigate();
  const { isError, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (
      user &&
      user.rol !== "conductor" &&
      user.rol !== "dueño" &&
      user.rol !== "checador" &&
      user.rol !== "admin" 
    ) {
      navigate("/login");
    }
  }, [isError, user, navigate]);
  return (
    <>    
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/vista' element={<Vista/>}/>
        <Route path='/registrar' element={<CrearPersona/>}/>
        <Route path='/tipo-personas' element={<TipoPersonas/>}/>
        <Route path='/editar_persona' element={<EditarPersona/>}/>
        <Route path='/panel-de-control' element={<PanelControl/>}/>
        <Route path='/unidades' element={<Unidades/>}/>
        <Route path='/unidades-detalles' element={<UnidadesDetalles/>}/>
      </Routes>
    </>
  )
}

export default App;
