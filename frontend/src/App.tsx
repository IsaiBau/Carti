import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import Login from './components/Login';
import Vista from "./views/vista";
import TipoPersonas from './views/TipoPersonas';
import PanelControl from './views/dueño/PanelControl';

function App() {

  return (
    <>
    <BrowserRouter>        
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/vista' element={<Vista/>}/>
          <Route path='/tipo-personas' element={<TipoPersonas/>}/>
          <Route path='/panel-de-control' element={<PanelControl/>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
