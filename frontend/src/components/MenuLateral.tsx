import React from 'react';
import Logo from '../assets/logo.svg';

interface MenuItem {
  icono: string;
  texto: string;
  ruta: string;
}

interface MenuLateralProps {
  items: MenuItem[];
  cerrarSesion?: MenuItem;
}

const MenuLateral: React.FC<MenuLateralProps> = ({ items, cerrarSesion }) => {
  return (
    <div className="bg h-screen justify-center text-left py-12 px-12 poppins-semibold text-white text-3xl">
      <div className="">
        <img src={Logo} alt="Logo Carti" className="h-20" />
      </div>

      <div className="flex flex-col mt-10">
        {items.map((item, index) => (
          <div key={index} className="flex space-x-2 py-4">
            <img src={item.icono} alt={`Ícono de ${item.texto}`} />
            <a href={item.ruta}>{item.texto}</a>
          </div>
        ))}
      </div>

      {cerrarSesion && (
        <div className="">
          <div className="flex bottom-10 absolute">
            <img src={cerrarSesion.icono} alt="Ícono de cerrar sesión" />
            <a href={cerrarSesion.ruta}>{cerrarSesion.texto}</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuLateral;
