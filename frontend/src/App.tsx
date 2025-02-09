import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import Login from './components/Login';

function App() {

  return (
    <>
    <BrowserRouter>        
      <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
