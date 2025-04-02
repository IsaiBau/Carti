import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
import NavBar from "./components/NavBar.js";
import Dashboard from "./views/administrador/Dashboard.js";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    // Lista de rutas públicas que no requieren autenticación
    const publicPaths = ['/', '/login', '/navbar'];
    const currentPath = window.location.pathname;

    // Si no estamos en una ruta pública y hay error de autenticación, redirigir a login
    if (isError && !publicPaths.includes(currentPath)) {
      navigate("/login");
    }

    // Si el usuario está autenticado pero no tiene un rol válido para rutas no públicas
    if (user && !publicPaths.includes(currentPath)) {
      if (
        user.rol !== "conductor" &&
        user.rol !== "dueño" &&
        user.rol !== "checador" &&
        user.rol !== "admin" 
      ) {
        navigate("/");
      }
    }
  }, [isError, user, navigate]);

  return (
    <>    
      <Routes>
        {/* Rutas públicas */}
        
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/navbar' element={<NavBar/>}/>
        {/* Rutas protegidas */}
        <Route path='/vista' element={<Vista/>}/>
        <Route path='/registrar' element={<CrearPersona/>}/>
        <Route path='/tipo-personas' element={<TipoPersonas/>}/>
        <Route path='/editar_persona' element={<EditarPersona/>}/>
        <Route path='/panel-control' element={<PanelControl/>}/>
        <Route path='/choferes' element={<Choferes/>}/>
        <Route path='/home-chofer' element={<HomeChofer/>}/>
        <Route path='/home-checador' element={<HomeChecador/>}/>
        <Route path='/mapa' element={<LeaMap/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
 
      </Routes>
    </>
  )
}

export default App;