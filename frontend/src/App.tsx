
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import Login from './components/Login';
import Vista from "./views/vista";
import TipoPersonas from './views/TipoPersonas';
import PanelControl from './views/dueño/PanelControl';
import EditarPersona from "./views/EditarPersona.js";
import CrearPersona from "./components/Register.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "./app/store";
import { getMe } from "./features/authSlice.js";
import Choferes from "./views/dueño/Chofer.js";
import HomeChofer from "./views/chofer/HomeChofer.js";
import { LeaMap } from "./components/Map.js";
import HomeChecador from "./views/checador/HomeChecador.js";
import AsignarChofer from "./views/dueño/AsignarChofer.js";

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
        <Route path="/asignar-chofer" element={<AsignarChofer/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/vista' element={<Vista/>}/>
        <Route path='/registrar' element={<CrearPersona/>}/>
        <Route path='/tipo-personas' element={<TipoPersonas/>}/>
        <Route path='/editar_persona' element={<EditarPersona/>}/>
        <Route path='/panel-control' element={<PanelControl/>}/>
        <Route path='/choferes' element={<Choferes/>}/>
        <Route path='/home-chofer' element={<HomeChofer/>}/>
        <Route path='/home-checador' element={<HomeChecador/>}/>
        <Route path='/mapa' element={<LeaMap/>}/>
      </Routes>
    </>
  )
}

export default App;
