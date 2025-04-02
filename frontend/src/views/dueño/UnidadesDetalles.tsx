import React from "react";
import MenuLateral from "../../components/MenuLateral";
import IconMenu from "../../assets/menu-icon.svg";
import IconUni from "../../assets/combi-icon.svg";
import IconChof from "../../assets/user-icon.svg";
import IconCerrarSes from "../../assets/logout-icon.svg";
import Card from "../../components/Card";
import NavBarPanel from "../../components/NavBarPanel";

// Items del menu y sus rutass
const menuItems = [
  { icono: IconMenu, texto: "Panel", ruta: "/panel-de-control" },
  { icono: IconUni, texto: "Unidades", ruta: "/unidades" },
  { icono: IconChof, texto: "Choferes", ruta: "/choferes" },
];

//Cerrar sesion item
const cerrarSesion = {
  icono: IconCerrarSes,
  texto: "Cerrar sesión",
  ruta: "/logout",
};

const unidades_detalles = () => {
  return (
    <div className="h-screen grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_1fr_1fr] gap-4 bg-[#ECECEC]">
      <div className="row-span-3">
        <MenuLateral items={menuItems} cerrarSesion={cerrarSesion} />
      </div>
      <div className="col-span-2 col-start-2 row-start-1">
        <NavBarPanel
          section="Unidades > Detalles"
          name="Jose Salvador Sarao"
          email="josuesal@gmail.com"
        ></NavBarPanel>
      </div>
      <div className="col-span-2 col-start-2 row-start-2">
        <Card title="Combi {aqui el numero de la combi}" subtitle="">
          <div>
            <h2>Detalles</h2>
            {/* <p>Chofer 1: {aqui el nombre del chofer}</p>
            <p>Matrícula: {aqui la matricula}</p> */}
          </div>
        </Card>
      </div>
      <div className="col-span-2 col-start-4 row-start-2"></div>
    </div>
  );
};

export default unidades_detalles;
