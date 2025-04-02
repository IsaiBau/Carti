import React from 'react'
import MenuLateral from '../../components/MenuLateral'
import IconMenu from '../../assets/menu-icon.svg';
import IconUni from '../../assets/combi-icon.svg';
import IconChof from '../../assets/user-icon.svg';
import IconCerrarSes from '../../assets/logout-icon.svg';
import Card from '../../components/Card'
import Button from '../../components/Button';
import CardUnidadGanancia from '../../components/CardUniGcias'
import CardUltTrabajadores from '../../components/CardUltTrabajadores'
import NavBarPanel from '../../components/NavBarPanel';


// Items del menu y sus rutass
const menuItems = [
  { icono: IconMenu, texto: 'Panel', ruta: '/panel-de-control' },
  { icono: IconUni, texto: 'Unidades', ruta: '/unidades' },
  { icono: IconChof, texto: 'Choferes', ruta: '/choferes' },
];

//Cerrar sesion item
const cerrarSesion = { icono: IconCerrarSes, texto: 'Cerrar sesión', ruta: '/logout' };

const PanelControl = () => {
  return (

<div className="h-screen grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_1fr_1fr] gap-4 bg-[#ECECEC]">
    <div className="row-span-3">
      <MenuLateral items={menuItems} cerrarSesion={cerrarSesion} />
    </div>
    <div className="col-span-2 col-start-2 row-start-1">
      <NavBarPanel section='Panel de control' name='Jose Salvador Sarao' email='josuesal@gmail.com'></NavBarPanel>
    </div>
    <div className="col-span-2 col-start-2 row-start-2">
      <Card title="Trabajadores" subtitle="Últimos trabajadores registrados">
        <div>
          <div>
            <CardUltTrabajadores name='Irving Garcia Marquez' registerTime='Registrado hace 2 horas'></CardUltTrabajadores>
            <CardUltTrabajadores name='Juan ALberto Lainez' registerTime='Registrado hace 15 horas'></CardUltTrabajadores>
          </div>
          <div className='flex flex-col items-end mt-5'>
            <Button className='text-white bg-[#3290e7]'>Añadir</Button>
          </div>
        </div>
      </Card>
    </div>
    <div className="col-span-2 col-start-4 row-start-2">
    </div>
    <div className="col-span-2 row-span-3 col-start-2 row-start-3">
      <Card title='Unidades' subtitle='Unidades con más ganancias'>
        <CardUnidadGanancia today='HOY' day='09' numAndNameUni='T212 - Irving Garcia' revenue='12, 1212' expenses='500'></CardUnidadGanancia>
        <CardUnidadGanancia today='HOY' day='09' numAndNameUni='T212 - Irving Garcia' revenue='13, 1123' expenses='400'></CardUnidadGanancia>
      </Card>
    </div>
</div>
    
  )
}

export default PanelControl