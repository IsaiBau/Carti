import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react';
import Vista from "./views/vista";
import Layout from './views/layout';
import TipoPersonas from './views/TipoPersonas';
const App: React.FC = () => {
  return (
    <div className='flex flex-col bg-zinc-100'>
      {/*<UserInfo>*/}
        <Router>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route path='/vista' element={<Vista/>}/>
              <Route path='/tipo-personas' element={<TipoPersonas/>}/>
            </Route>
          </Routes>
        </Router>
        {/*</UserInfo>*/}
    </div>
  );
};
export default App
