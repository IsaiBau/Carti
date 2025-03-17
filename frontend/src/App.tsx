import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import Login from './components/Login';
import Vista from "./views/vista";
import Layout from './views/layout';
import TipoPersonas from './views/TipoPersonas';
import CrearPersona from './components/Login'; 
import EditarPersona from './views/EditarPersona';

function App() {
  return (
    <>
      <BrowserRouter>        
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/vista' element={<Vista/>}/>
          <Route path='/tipo-personas' element={<TipoPersonas/>}/>
          <Route path='/crear-persona' element={<CrearPersona/>}/>
          <Route path='/editar_persona' element={<EditarPersona/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
