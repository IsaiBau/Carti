import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.png';
import Img from '../assets/img.png';
import Nodo1 from '../assets/nodo1.png';
import Nodo2 from '../assets/nodo2.png';
import IconInput from '../components/Input';
import InputSelect from '../components/InputSelect';
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaRegIdBadge } from "react-icons/fa6";
import { PiGenderFemaleBold } from "react-icons/pi";
import { FaRegAddressCard } from 'react-icons/fa6';
import axios from 'axios';

interface FormData {
  nombre: string;
  apellido_pat: string;
  apellido_mat: string;
  fecha_nac: string;
  curp: string;
  rfc: string;
  sexo: boolean; 
  id_tipo_persona: number;
  activo: boolean;
}

interface TipoPersona {
  id_tipo_persona: number;
  uuid: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

const CrearPersona: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido_pat: '',
    apellido_mat: '',
    fecha_nac: '',
    curp: '',
    rfc: '',
    sexo: false, 
    id_tipo_persona: 1, 
    activo: true 
  });

  const [tiposPersona, setTiposPersona] = useState<TipoPersona[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Cargar tipos de persona
  useEffect(() => {
    const fetchTiposPersona = async () => {
      try {
        const response = await axios.get<TipoPersona[]>('http://localhost:5000/tipo-personas');
        setTiposPersona(response.data);
        console.log('Tipos de persona cargados:', response.data);
      } catch (error) {
        console.error('Error al cargar los tipos de persona:', error);
        setErrorMsg('Error al cargar los tipos de persona.');
      }
    };

    fetchTiposPersona();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'sexo' ? value === "1" : value 
    });

    // Validación dinámica para el campo "nombre"
    if (name === 'nombre' && value.length < 3) {
      setErrorMsg('El nombre debe tener al menos 3 caracteres.');
    } else {
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const { nombre, sexo, fecha_nac, curp, rfc, id_tipo_persona } = formData;

    // Validación de campos obligatorios
    if (!nombre || sexo === undefined || !fecha_nac || !curp || !rfc || !id_tipo_persona) {
      setErrorMsg('Por favor, llena todos los campos obligatorios.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/personas', formData);
      setSuccessMsg('Persona creada exitosamente.');
      console.log('Persona creada:', response.data);

      // Limpiar el formulario después de crear
      setFormData({
        nombre: '',
        apellido_pat: '',
        apellido_mat: '',
        fecha_nac: '',
        curp: '',
        rfc: '',
        sexo: false, 
        id_tipo_persona: 1, 
        activo: true 
      });
    } catch (error: any) {
      setErrorMsg(error.response?.data?.msg || 'Error al crear persona.');
      console.error('Error al crear persona:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex flex-row w-full h-screen'>
        <div className='flex flex-col justify-center items-center text-center w-[50%] p-20'>
          <img src={Logo} alt="LOGO" />
          <div className='flex flex-col w-md'>
            <p className='poppins-bold text-[34px]'>Crear una nueva cuenta<b className='poppins-semibold text-6xl text-[#2787E0]'>.</b></p>
            <p className='poppins-regular text-[#8B8B8B] flex justify-start'>¡Bienvenido! Ingresa los datos que se te piden:</p>
            <form onSubmit={handleSubmit}>
              <div className='pt-10 w-full'>
                {/* Mensajes de éxito y error */}
                {errorMsg && (
                  <p className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    {errorMsg}
                  </p>
                )}
                {successMsg && (
                  <p className="p-4 my-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                    {successMsg}
                  </p>
                )}

                {/* Input Nombre */}
                <IconInput 
                  name='nombre'
                  placeholder='Nombre' 
                  icon={FaRegAddressCard}
                  value={formData.nombre}
                  onChange={handleChange}
                />

                {/* Input Apellidos */}
                <div className='my-2 grid gap-4 grid-cols-2 mt-5'>
                  <div className='col-span-2 sm:col-span-1'>
                    <IconInput 
                      name='apellido_pat'
                      placeholder='Apellido paterno' 
                      iconClassName='group-hover:-translate-x-[5px]'
                      icon={FaRegAddressCard}
                      value={formData.apellido_pat}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                    <IconInput 
                      name='apellido_mat'
                      placeholder='Apellido materno' 
                      iconClassName='group-hover:-translate-x-[5px]'
                      icon={FaRegAddressCard}
                      value={formData.apellido_mat}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                {/* Input Fecha de nacimiento */}
                <div className='flex flex-row items-center mt-5 mb-2'>   
                  <LiaBirthdayCakeSolid className='text-[#8B8B8B] text-xl'/>
                  <p className='poppins-regular text-[#8B8B8B] flex pt-1 pl-1'>Fecha de nacimiento</p>
                </div>
                <div className='w-full mb-5'>
                  <div>
                    <IconInput 
                      name='fecha_nac'
                      placeholder='' 
                      iconClassName='group-hover:-translate-x-[5px]'
                      type='date'
                      className='pl-[15px]'
                      value={formData.fecha_nac}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Input CURP y RFC */}
                <div className='my-2 grid gap-4 grid-cols-2'>
                  <div className='col-span-2 sm:col-span-1'>
                    <IconInput 
                      name='curp'
                      placeholder='CURP' 
                      iconClassName='group-hover:-translate-x-[5px]'
                      icon={FaRegIdBadge}
                      value={formData.curp}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                    <IconInput 
                      name='rfc'
                      placeholder='RFC' 
                      iconClassName='group-hover:-translate-x-[5px]'
                      icon={FaRegIdBadge}
                      value={formData.rfc}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* Input Sexo */}
                <div className='flex flex-row items-center mt-5 mb-2'>   
                  <PiGenderFemaleBold className='text-[#8B8B8B] text-lg'/>
                  <p className='poppins-regular text-[#8B8B8B] flex pl-1'>Sexo</p>
                </div>
                <InputSelect
                  name='sexo'
                  value={formData.sexo ? "1" : "0"} 
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="1">Hombre</option>
                  <option value="0">Mujer</option>
                </InputSelect>

                {/* Campo para id_tipo_persona */}
                <div className="flex items-center space-x-2">
                  <label>Tipo de persona:</label>
                  <InputSelect
                    name="id_tipo_persona"
                    value={formData.id_tipo_persona}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar tipo de persona</option>
                    {tiposPersona.map((tipo) => (
                      <option key={tipo.id_tipo_persona} value={tipo.id_tipo_persona}>
                        {tipo.nombre}
                      </option>
                    ))}
                  </InputSelect>
                </div>

                {/* Botón */}
                <button 
                  type='submit' 
                  className='poppins-semibold text-white bg-[#2787E0] w-full h-[50px] rounded-[7px] my-3 cursor-pointer input-transition hover:bg-[#276ee0]'
                  disabled={loading}
                >
                  {loading ? 'Creando...' : 'Crear cuenta'}
                </button>
                <p className='poppins-regular text-[#8B8B8B] text-sm'>¿Ya tienes una cuenta? <b className='poppins-regular text-[#2787E0] text-sm cursor-pointer'>Ingresa ahora</b></p>
              </div>
            </form>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center text-center w-[50%] h-screen bg-radial from-[#3290e7] from-30% to-[#1855a4]'>
          <img className='absolute top-0 left-[50%]' src={Nodo1} alt="LOGO"/>
          <img className='h-[50%]' src={Img} alt="LOGO"/>
          <p className='poppins-semibold text-white text-3xl mt-10 mb-2'>Texto genérico que llame la atención.</p>
          <p className='poppins-regular text-white text-lg'>Otro texto genérico que está conectado al primero.</p>
          <img className='absolute bottom-0 right-0' src={Nodo2} alt="LOGO"/>
        </div>
      </div>
    </div>
  );
};

export default CrearPersona;