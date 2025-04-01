import React, { useEffect, useState } from 'react'
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
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import axios from 'axios';

// Definición de tipos
interface Chofer {
  id: number;
  nombre: string;
  apellido_pat: string;
  apellido_mat: string;
  unidades?: Unidad[];
}
interface Unidad {
  numero: string;
}
interface UnidadConChofer {
  id: number;
  numero: number;
  placa: string;
  choferes: {
    nombre: string;
    turno: string;
  }[];
}
// Items del menu y sus rutas
const menuItems = [
  { icono: IconMenu, texto: 'Panel', ruta: '/panel-control' },
  { icono: IconUni, texto: 'Unidades', ruta: '/unidades' },
  { icono: IconChof, texto: 'Choferes', ruta: '/choferes' },
];

// Cerrar sesion item
const cerrarSesion = { icono: IconCerrarSes, texto: 'Cerrar sesión', ruta: '/logout' };

const PanelControl = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state: RootState) => state.auth);
  const [ultimosChoferes, setUltimosChoferes] = useState<Chofer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingUnidades, setLoadingUnidades] = useState<boolean>(false);
  const [errorUnidades, setErrorUnidades] = useState<string | null>(null);
  const [unidades, setUnidades] = useState<UnidadConChofer[]>([]);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (
      user &&
      user.rol !== "conductor" &&
      user.rol !== "dueño" &&
      user.rol !== "checador" &&
      user.rol !== "admin" 
    ) {
      navigate("/login");
    }
    if (user && user.rol === "dueño") {
      fetchUltimosChoferes();
    }
  }, [isError, user, navigate]);

  const fetchUltimosChoferes = async () => {
    try {
      setLoading(true);
      const response = await axios.get<{ trabajadores: Chofer[] }>(
        `http://localhost:5000/choferes/${user?.id}`
      );
  
      // Tomar los últimos 3 elementos del array (sin ordenar)
      const ultimos = response.data.trabajadores.slice(-3); 
  
      // Invertir el orden para que el más reciente esté primero
      setUltimosChoferes(ultimos.reverse());
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cargar choferes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUltimosChoferes();
    }
  }, [user?.id]);

  const formatCombis = (unidades?: Unidad[]): string => {
    if (!unidades || unidades.length === 0) return 'Combis: N/A';
    
    const numerosCombis = unidades
      .map(unidad => unidad.numero)
      .join(', ');
    
    return `Combis: ${numerosCombis}`;
  };
  // Obtener unidades con choferes
  const fetchUnidadesConChoferes = async () => {
    try {
      setLoadingUnidades(true);
      setErrorUnidades(null);
      
      const response = await axios.get<{ unidades: UnidadConChofer[] }>(
        `http://localhost:5000/unidades-choferes/${user?.id}`
      );
      
      setUnidades(response.data.unidades || []);
    } catch (error) {
      console.error('Error al cargar unidades:', error);
      setErrorUnidades('Error al cargar las unidades con choferes');
    } finally {
      setLoadingUnidades(false);
    }
  };

  console.log(unidades)
useEffect(() => {
  if (user?.id) {
    fetchUnidadesConChoferes();
  }
}, [user?.id]);
  return (
    <div className="h-screen grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_1fr_1fr] gap-4 bg-[#ECECEC]">
      <div className="row-span-3">
        <MenuLateral items={menuItems} cerrarSesion={cerrarSesion} />
      </div>
      <div className="col-span-2 col-start-2 row-start-1">
        <NavBarPanel section='Panel de control' name={user?.nombre || "Dueño"} email={user?.rfc || "0000000000"} />
      </div>
      <div className="col-span-2 col-start-2 row-start-2">
        <Card title="Trabajadores" subtitle="Últimos trabajadores registrados">
          <div>
            {loading ? (
              <p>Cargando choferes...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <div>
                {ultimosChoferes.length > 0 ? (
                  ultimosChoferes.map((chofer) => (
                    <CardUltTrabajadores
                      key={chofer.id}
                      name={`${chofer.nombre} ${chofer.apellido_pat} ${chofer.apellido_mat}`}
                      registerTime={formatCombis(chofer.unidades)}
                    />
                  ))
                ) : (
                  <p>No hay choferes registrados</p>
                )}
              </div>
            )}
            <div className='flex flex-col items-end mt-5'>
              <Button className='text-white bg-[#3290e7]'>Añadir</Button>
            </div>
          </div>
        </Card>
      </div>
      <div className="col-span-2 col-start-4 row-start-2">
      </div>
      <div className="col-span-2 row-span-3 col-start-2 row-start-3">
      <Card title='Unidades' subtitle='Unidades con sus choferes'>
          {loadingUnidades ? (
            <p>Cargando unidades...</p>
          ) : errorUnidades ? (
            <p className="text-red-500">{errorUnidades}</p>
          ) : unidades.length > 0 ? (
            unidades.map(unidad => (
              <CardUnidadGanancia 
                key={`${unidad.numero}-${unidad.placa}`}
                today='HOY' 
                day='09' 
                numAndNameUni={`${unidad.numero} - ${unidad.choferes[0]?.nombre || 'Sin chofer'}`} 
                revenue='12, 1212' 
                expenses='500' 
                placa={unidad?.placa}
              />
            ))
          ) : (
            <p>No hay unidades registradas</p>
          )}
        </Card>
      </div>
    </div>
  )
}

export default PanelControl