import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.png';
import Persona from '../../assets/person-1.png';
import { LeaMap } from '../../components/Map';
import Card from '../../components/Card';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import axios from 'axios';
import { ParadasList } from '../../components/ParadasList';

interface Rutas {
  id_rutas: number;
  uuid: string;
  nombre: string;
  origen: string;
  destino: string;
}

interface Unidad {
  id_unidades: number;
  uuid: string;
  numero: string;
  placa: string;
  turno?: string;
}

interface Viaje {
  id_viajes: number;
  id_rutas: number;
  id_chofer_unidad: number;
  fecha_inicio: string;
  fecha_fin: string | null;
}

interface Parada {
  id_paradas: number;
  uuid: string;
  nombre: string;
}
const HomeChofer = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state: RootState) => state.auth);
    const [fechaActual, setFechaActual] = useState<string>('');
    const [horaActual, setHoraActual] = useState<string>('');
    const [rutas, setRutas] = useState<Rutas[]>([]);
    const [unidades, setUnidades] = useState<Unidad[]>([]);
    const [rutaSeleccionada, setRutaSeleccionada] = useState<Rutas | null>(null);
    const [unidadSeleccionada, setUnidadSeleccionada] = useState<Unidad | null>(null);
    const [viajeActivo, setViajeActivo] = useState<Viaje | null>(null);
    const [mensaje, setMensaje] = useState<{texto: string, tipo: 'exito' | 'error'} | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);
    const [paradas, setParadas] = useState<Parada[]>([]);
    const [paradasCompletadas, setParadasCompletadas] = useState<number[]>([]);
    const [paradaActual, setParadaActual] = useState<number | null>(null);
    
    useEffect(() => {
      dispatch(getMe());
      const interval = setInterval(() => {
        const now = new Date();
        setFechaActual(now.toLocaleDateString());
        setHoraActual(now.toLocaleTimeString());
      }, 1000);
      
      return () => clearInterval(interval);
    }, [dispatch]);

    useEffect(() => {
      if (isError || (user && user.rol !== "conductor")) {
        navigate("/login");
      }
    }, [isError, user, navigate]);

    useEffect(() => {
      if (user?.id) {
        cargarDatosIniciales();
      }
    }, [user]);
  
// Modificar el useEffect que maneja viajeActivo
useEffect(() => {
  if (viajeActivo && rutaSeleccionada) {
    getParadasRuta(viajeActivo.id_rutas);
  } else {
    setParadas([]);
    setParadasCompletadas([]);
  }
}, [viajeActivo, rutaSeleccionada]);

// Función para obtener última parada
const getUltimaParada = async (id_viaje: number) => {
  try {
    const response = await axios.get(`http://localhost:5000/ultima-parada/${id_viaje}`);
    setParadaActual(response.data);
  } catch (error) {
    console.error('Error al obtener última parada:', error);
  }
};
    const cargarDatosIniciales = async () => {
      try {
        setCargando(true);
        await Promise.all([
          getRutas(),
          getUnidadesDisponibles(),
          getViajeActivo()
        ]);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setCargando(false);
      }
    };

    const mostrarMensaje = (texto: string, tipo: 'exito' | 'error') => {
      setMensaje({texto, tipo});
      setTimeout(() => setMensaje(null), 5000);
    };

    const getRutas = async () => {
      try {
          const response = await axios.get('http://localhost:5000/rutas');
          setRutas(response.data);
      } catch (error) {
          console.error('Error al obtener rutas:', error);
          mostrarMensaje('Error al obtener rutas', 'error');
      }
    };

    const getUnidadesDisponibles = async () => {
      try {
          if (!user?.id) return;
          
          const response = await axios.get(`http://localhost:5000/unidades-chofer/${user.id}`);
          if (response.data && response.data.length > 0) {
            setUnidades(response.data);
          } else {
            mostrarMensaje('No tienes unidades asignadas', 'error');
          }
      } catch (error) {
          console.error('Error al obtener unidades:', error);
          mostrarMensaje('Error al obtener unidades asignadas', 'error');
      }
    };

    const getViajeActivo = async () => {
      try {
          if (!user?.id) return;
          
          const response = await axios.get(`http://localhost:5000/viaje-activo-chofer/${user.id}`);
          if (response.data) {
              setViajeActivo(response.data);
              setRutaSeleccionada(rutas.find(r => r.id_rutas === response.data.id_rutas) || null);
              setUnidadSeleccionada(unidades.find(u => u.id_unidades === response.data.chofer_unidad.id_unidades) || null);
          }
      } catch (error) {
          console.error('Error al obtener viaje activo:', error);
      }
    };
    
    // Agregar esta función para cargar paradas completadas
    const getParadasCompletadas = async (id_viaje: number) => {
      try {
        const response = await axios.get(`http://localhost:5000/paradas-registradas/${id_viaje}`);
        setParadasCompletadas(response.data.map((p: any) => p.id_paradas));
      } catch (error) {
        console.error('Error al obtener paradas completadas:', error);
      }
    };
    const getParadasRuta = async (id_ruta: number) => {
      try {
        const response = await axios.get(`http://localhost:5000/paradas-ruta/${id_ruta}`);
        
        // Ordenar según si es vuelta o no
        const esVuelta = rutaSeleccionada?.nombre.toLowerCase().includes('vuelta') || 
                        rutaSeleccionada?.nombre.toLowerCase().includes('regreso');
        
        const paradasOrdenadas = esVuelta ? [...response.data].reverse() : response.data;
        
        setParadas(paradasOrdenadas);
        
        // Si hay viaje activo, actualizar las completadas
        if (viajeActivo) {
          await getParadasCompletadas(viajeActivo.id_viajes);
        }
      } catch (error) {
        console.error('Error al obtener paradas:', error);
      }
    };
    
    // Modificar handleRutaChange
    const handleRutaChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const id = parseInt(e.target.value);
      const ruta = rutas.find(r => r.id_rutas === id);
      setRutaSeleccionada(ruta || null);
      
      if (ruta) {
        await getParadasRuta(ruta.id_rutas);
      }
    };
    
    const handleUnidadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const id = parseInt(e.target.value);
      const unidad = unidades.find(u => u.id_unidades === id);
      setUnidadSeleccionada(unidad || null);
    };

    const iniciarViaje = async () => {
      if (!rutaSeleccionada || !unidadSeleccionada || !user?.id) {
          mostrarMensaje('Por favor selecciona una ruta y una unidad', 'error');
          return;
      }

      try {
          // Obtener el id_chofer_unidad
          const response = await axios.get(
              `http://localhost:5000/chofer-unidad/${user.id}/${unidadSeleccionada.id_unidades}`
          );

          if (!response.data) {
              mostrarMensaje('No estás asignado a esta unidad', 'error');
              return;
          }

          // Crear el nuevo viaje
          const viajeResponse = await axios.post('http://localhost:5000/iniciar-viaje', {
              id_rutas: rutaSeleccionada.id_rutas,
              id_chofer_unidad: response.data.id_chofer_unidad
          });

          setViajeActivo(viajeResponse.data);
          mostrarMensaje('Viaje iniciado correctamente', 'exito');
      } catch (error: any) {
          console.error('Error al iniciar viaje:', error);
          const mensajeError = error.response?.data?.msg || error.message || 'Error al iniciar viaje';
          mostrarMensaje(mensajeError, 'error');
      }
    };

    const finalizarViaje = async () => {
      if (!viajeActivo) return;

      try {
          await axios.put(`http://localhost:5000/finalizar-viaje/${viajeActivo.id_viajes}`);
          setViajeActivo(null);
          setUnidadSeleccionada(null);
          mostrarMensaje('Viaje finalizado correctamente', 'exito');
      } catch (error: any) {
          console.error('Error al finalizar viaje:', error);
          const mensajeError = error.response?.data?.msg || error.message || 'Error al finalizar viaje';
          mostrarMensaje(mensajeError, 'error');
      }
    };

    if (cargando) {
      return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }

    return (
      <div className='h-[100vh] bg-[#ECECEC]'>
          <nav className='flex justify-between p-10 items-center'>
              <ul className='flex items-center space-x-10 text-[#2787E0] poppins-semibold text-xl'>
                  <li><img src={Logo} alt="logo" className='h-15'/></li>
                  <li>Inicio</li>
              </ul>
              <ul className='flex items-center space-x-1.5'>
                  <img src={Persona} alt="" />
                  <div>
                  <p className='poppins-semibold'>{user?.nombre || "Chofer"} </p>
                  <p>{user?.rfc || "0000000000"}</p>
                  </div>
              </ul>
          </nav>
          
          {/* Mensajes flotantes */}
          {mensaje && (
              <div className={`fixed top-5 right-5 p-4 rounded-lg z-50 ${
                  mensaje.tipo === 'exito' ? 'bg-green-500' : 'bg-red-500'
              } text-white poppins-semibold`}>
                  {mensaje.texto}
              </div>
          )}
          
          <div>
              <div className='bg p-20 m-10 rounded-4xl'>
                  <div className='space-y-4'>
                      <p className='poppins-regular text-white text-5xl'>Fecha: {fechaActual} - Hora: {horaActual}</p>
                      {viajeActivo && (
                          <p className='poppins-regular text-white text-3xl'>
                              Viaje activo: {rutaSeleccionada?.nombre} - Iniciado: {new Date(viajeActivo.fecha_inicio).toLocaleString()}
                          </p>
                      )}
                      <div className='flex text-white poppins-bold text-3lg'>
                          <div className='flex flex-col justify-center space-y-3 ml-3 mr-10 text-2xl'>                 
                              <p>Ruta</p>
                              <p>Unidad asignada</p>
                              <p>Estado</p>
                          </div> 
                          <div className='flex flex-col justify-center space-y-3 ml-10 poppins-regular text-2lg'>                 
                              <p>
                                  <select 
                                      onChange={handleRutaChange}
                                      className='p-2 rounded text-black'
                                      value={rutaSeleccionada?.id_rutas || ''}
                                      disabled={!!viajeActivo}
                                  >
                                      <option value="">Selecciona una ruta</option>
                                      {rutas.map((ruta) => (
                                          <option key={ruta.id_rutas} value={ruta.id_rutas}>
                                              {ruta.nombre} ({ruta.origen} - {ruta.destino})
                                          </option>
                                      ))}
                                  </select>
                              </p>
                              <p>
                                  <select 
                                    onChange={handleUnidadChange}
                                    className='w-full p-2 rounded text-black'
                                    value={unidadSeleccionada?.id_unidades || ''}
                                    disabled={!!viajeActivo}
                                >
                                    <option value="">Selecciona una unidad</option>
                                    {unidades.map((unidad) => (
                                        <option key={unidad.id_unidades} value={unidad.id_unidades}>
                                            {unidad.numero} - {unidad.placa} {unidad.turno ? `(${unidad.turno})` : ''}
                                        </option>
                                    ))}
                                </select>
                              </p>
                              <p>
                                  {viajeActivo ? 'Viaje en curso' : 'Sin viaje activo'}
                              </p>
                          </div> 
                      </div>
                  </div>
                 
                  <div className='space-x-4 ml-auto pt-5'> {/* Cambiado este contenedor */}
                    {!viajeActivo ? (
                      <button 
                        className='bg-white poppins-bold text-[#2787E0] p-3 rounded-xl hover:bg-blue-100 transition-colors'
                        onClick={iniciarViaje}
                        disabled={!rutaSeleccionada || !unidadSeleccionada}
                      >
                        Iniciar viaje
                      </button>
                    ) : (
                      <button 
                        className='bg-white poppins-bold text-[#2787E0] p-3 rounded-xl hover:bg-blue-100 transition-colors'
                        onClick={finalizarViaje}
                      >
                        Finalizar viaje
                      </button>
                    )}
                  </div>
                  
              </div> 
              
          </div>
          {rutaSeleccionada && (
    <ParadasList 
      paradas={paradas}
      paradasCompletadas={paradasCompletadas}
   
      esVuelta={rutaSeleccionada.nombre.toLowerCase().includes('vuelta')}
    />
  )}
          <div>
              <div>
              <Card title='' subtitle=''><LeaMap></LeaMap></Card>
              </div>
          </div>
      </div>
    );
};

export default HomeChofer;