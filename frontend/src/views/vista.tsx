import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.png';
import Persona from '../assets/person-1.png';
import { LeaMap } from '../components/Map';
import Card from '../components/Card';

const Vista = () => {
   return (
      <div className='h-[100vh] bg-[#ECECEC]'>
          <nav className='flex justify-between p-10 items-center'>
              <ul className='flex items-center space-x-10 text-[#2787E0] poppins-semibold text-xl'>
                  <li><img src={Logo} alt="logo" className='h-15'/></li>
                  <li>Inicio</li>
              </ul>
            
          </nav>
        
          <div>
              <div>
              <Card title='' subtitle=''><LeaMap></LeaMap></Card>
              </div>
          </div>
      </div>
    );
};

export default Vista;