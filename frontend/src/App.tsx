import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import Login from './components/Login';
import Vista from "./views/vista";
import TipoPersonas from './views/TipoPersonas';

function App() {

  return (
    <>
    <BrowserRouter>        
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/vista' element={<Vista/>}/>
          <Route path='/tipo-personas' element={<TipoPersonas/>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
