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

interface Unidad {
    id_unidades: number;
    uuid: string;
    numero: string;
    placa: string;
}

interface Parada {
    id_paradas: number;
    uuid: string;
    nombre: string;
}

interface Viaje {
    id_viajes: number;
    id_chofer_unidad: number;
    fecha_inicio: string;
    fecha_fin: string | null;
    chofer_unidad?: {
        id_unidades: number;
    };
}

const HomeChecador = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state: RootState) => state.auth);
    
    // Estados para unidades
    const [unidades, setUnidades] = useState<Unidad[]>([]);
    const [unidadSeleccionada, setUnidadSeleccionada] = useState<Unidad | null>(null);
    
    // Estados para paradas
    const [paradas, setParadas] = useState<Parada[]>([]);
    const [paradaSeleccionada, setParadaSeleccionada] = useState<Parada | null>(null);
    
    // Estado para viaje activo
    const [viajeActivo, setViajeActivo] = useState<Viaje | null>(null);
    
    // Estado para pasajeros
    const [pasajeros, setPasajeros] = useState<number>(0);
    
    // Estado para fecha actual
    const [fechaActual, setFechaActual] = useState<string>('');

    // Estado para mensajes
    const [mensaje, setMensaje] = useState<{texto: string, tipo: 'exito' | 'error'} | null>(null);
    const [paradasRegistradas, setParadasRegistradas] = useState<number[]>([]);
    useEffect(() => {
        dispatch(getMe());
        getUnidades();
        getParadas();
        setFechaActual(new Date().toISOString().split('T')[0]);
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
    }, [isError, user, navigate]);

    // Cuando se selecciona una unidad, buscar su viaje activo
    useEffect(() => {
        if (unidadSeleccionada) {
            getViajeActivo(unidadSeleccionada.id_unidades);
        } else {
            setViajeActivo(null);
        }
    }, [unidadSeleccionada]);

    const getUnidades = async () => {
        try {
            const response = await axios.get('http://localhost:5000/unidades');
            // Eliminar duplicados por número de unidad
            const unidadesUnicas = response.data.reduce((acc: Unidad[], current: Unidad) => {
                const x = acc.find(item => item.numero === current.numero);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);
            setUnidades(unidadesUnicas);
        } catch (error) {
            console.error('Error al obtener unidades:', error);
            mostrarMensaje('Error al obtener unidades', 'error');
        }
    };

    const getParadas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/paradas');
            setParadas(response.data);
        } catch (error) {
            console.error('Error al obtener paradas:', error);
            mostrarMensaje('Error al obtener paradas', 'error');
        }
    };

    const getViajeActivo = async (idUnidad: number) => {
        try {
            console.log(`Buscando viaje activo para unidad ${idUnidad}`);
            const response = await axios.get(`http://localhost:5000/viaje-activo/${idUnidad}`);
            console.log('Respuesta de viaje activo:', response.data);
            
            if (response.data) {
                setViajeActivo(response.data);
                
                // Obtener paradas ya registradas para este viaje
                const resParadas = await axios.get(`http://localhost:5000/paradas-registradas/${response.data.id_viajes}`);
                setParadasRegistradas(resParadas.data.map((p: any) => p.id_paradas));
                
                mostrarMensaje('Viaje activo encontrado', 'exito');
            } else {
                setViajeActivo(null);
                setParadasRegistradas([]);
                mostrarMensaje('No hay viaje activo para esta unidad', 'error');
            }
        } catch (error) {
            console.error('Error al obtener viaje activo:', error);
            setViajeActivo(null);
            setParadasRegistradas([]);
            mostrarMensaje('Error al buscar viaje activo', 'error');
        }
    };

    const handleUnidadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(e.target.value);
        const unidad = unidades.find(u => u.id_unidades === id);
        setUnidadSeleccionada(unidad || null);
    };

    const handleParadaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(e.target.value);
        const parada = paradas.find(p => p.id_paradas === id);
        setParadaSeleccionada(parada || null);
    };

    const handlePasajerosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasajeros(parseInt(e.target.value) || 0);
    };

    const mostrarMensaje = (texto: string, tipo: 'exito' | 'error') => {
        setMensaje({texto, tipo});
        setTimeout(() => setMensaje(null), 5000);
    };

    const handleSubmit = async () => {
        if (!unidadSeleccionada || !paradaSeleccionada) {
            mostrarMensaje('Por favor selecciona una unidad y una parada', 'error');
            return;
        }
    
        if (!viajeActivo) {
            mostrarMensaje('No hay un viaje activo para esta unidad', 'error');
            return;
        }
    
        if (paradasRegistradas.includes(paradaSeleccionada.id_paradas)) {
            mostrarMensaje('Esta parada ya fue registrada para este viaje', 'error');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/crear-registro', {
                id_paradas: paradaSeleccionada.id_paradas,
                id_personas: user?.id,
                id_viajes: viajeActivo.id_viajes, // Asegúrate de usar id_viajes
                pasajeros: pasajeros
            });
    
            // Actualizar lista de paradas registradas
            setParadasRegistradas([...paradasRegistradas, paradaSeleccionada.id_paradas]);
            
            mostrarMensaje('Registro de llegada creado exitosamente!', 'exito');
            setPasajeros(0);
        } catch (error: any) {
            console.error('Error al crear registro:', error);
            const mensajeError = error.response?.data?.msg || error.message || 'Error al crear registro';
            mostrarMensaje(mensajeError, 'error');
        }
    };

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
                        <p className='poppins-semibold'>{user?.nombre || "Checador"} </p>
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
            
            <div className='w-full relative'>
                <div className='bg p-10 m-10 rounded-4xl flex w-auto relative'>
                    <div className='space-y-3.5 flex flex-col'>
                        <p className='poppins-regular text-white text-5xl'>Unidad:</p>
                        
                        <div className='flex text-white poppins-bold text-1xl'>
                            <select 
                                onChange={handleUnidadChange}
                                className='p-2 rounded text-black'
                                value={unidadSeleccionada?.id_unidades || ''}
                            >
                                <option value="">Selecciona una unidad</option>
                                {unidades.map((unidad) => (
                                    <option key={unidad.id_unidades} value={unidad.id_unidades}>
                                        {unidad.numero} - {unidad.placa}
                                    </option>
                                ))}
                            </select>
                            
                            <div className='flex flex-col justify-center space-y-3 ml-3 mr-10 text-2xl'>                 
                                <p>Parada</p>
                                <p>Fecha</p>
                                <p>Pasajeros</p>
                                {viajeActivo && <p>Viaje Activo</p>}
                            </div> 
                            
                            <div className='flex flex-col justify-center space-y-3 ml-10 poppins-regular text-2xl'>                 
                                <p>
                                <select 
                                    onChange={handleParadaChange}
                                    className='p-2 rounded text-black'
                                    value={paradaSeleccionada?.id_paradas || ''}
                                >
                                    <option value="">Selecciona una parada</option>
                                    {paradas.map((parada) => (
                                        <option 
                                            key={parada.id_paradas} 
                                            value={parada.id_paradas}
                                            disabled={paradasRegistradas.includes(parada.id_paradas)}
                                            style={{
                                                color: paradasRegistradas.includes(parada.id_paradas) ? '#ccc' : 'inherit'
                                            }}
                                        >
                                            {parada.nombre}
                                            {paradasRegistradas.includes(parada.id_paradas) && ' (ya registrada)'}
                                        </option>
                                    ))}
                                </select>
                                </p>
                                <p>
                                    <input 
                                        type="date" 
                                        value={fechaActual}
                                        readOnly
                                        className='p-2 rounded text-black'
                                    />
                                </p>
                                <p>
                                    <input 
                                        type="number"
                                        min="0"
                                        value={pasajeros}
                                        onChange={handlePasajerosChange}
                                        className='p-2 rounded text-black'
                                        placeholder="Número de pasajeros"
                                    />
                                </p>
                                {viajeActivo && (
                                    <p className='text-white'>
                                        Viaje #{viajeActivo.id_viajes} - Iniciado: {new Date(viajeActivo.fecha_inicio).toLocaleString()}
                                    </p>
                                )}
                                   {!viajeActivo && unidadSeleccionada && (
                                        <p className='text-red-200 '>
                                            No hay viaje activo para esta unidad
                                        </p>
                                    )}
                            </div> 
                        </div>
                    </div>
                    
                    <div className=''>
                        <button 
                            className='bg-white poppins-bold text-[#2787E0] p-3 rounded-xl absolute bottom-10 right-10'
                            onClick={handleSubmit}
                            disabled={!viajeActivo || !paradaSeleccionada}
                        >
                            Confirmar llegada
                        </button>
                     
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <Card title='' subtitle=''><LeaMap></LeaMap></Card>
                </div>
            </div>
        </div>
    );
};

export default HomeChecador;