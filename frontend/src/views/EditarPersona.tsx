import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import IconInput from '../components/Input';
import InputSelect from '../components/InputSelect';
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaLock, FaRegIdBadge } from "react-icons/fa6";
import { PiGenderFemaleBold } from "react-icons/pi";
import { FaRegAddressCard } from 'react-icons/fa6';

interface FormData {
  uuid: string;
  nombre: string;
  apellido_pat: string;
  apellido_mat: string;
  fecha_nac: string;
  curp: string;
  rfc: string;
  sexo: boolean;
  id_tipo_persona: number | null; // Asegúrate de que pueda ser null
  password: string;
  activo: boolean;
}

interface Persona {
  uuid: string;
  nombre: string;
  apellido_pat: string;
  apellido_mat: string;
  fecha_nac: string;
  curp: string;
  rfc: string;
  sexo: boolean;
  id_tipo_persona: number;
  password: string;
  activo: boolean;
}

interface TipoPersona {
  id_tipo_persona: number;
  uuid: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

const EditarPersona: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [formData, setFormData] = useState<FormData>({
    uuid: '',
    nombre: '',
    apellido_pat: '',
    apellido_mat: '',
    fecha_nac: '',
    curp: '',
    rfc: '',
    sexo: false,
    id_tipo_persona: null, // Valor inicial null
    password: '',
    activo: false,
  });
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [personas, setPersonas] = useState<Persona[]>([]);
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

  // Cargar lista de personas
  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await axios.get<Persona[]>('http://localhost:5000/personas');
        setPersonas(response.data);
      } catch (error) {
        console.error('Error al cargar las personas:', error);
        setErrorMsg('Error al cargar las personas.');
      }
    };

    fetchPersonas();
  }, []);

  // Cargar datos de la persona específica al inicio
  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const response = await axios.get<Persona>(`http://localhost:5000/personas/${uuid}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error al cargar la persona:', error);
        setErrorMsg('Error al cargar la persona.');
      }
    };

    if (uuid) {
      fetchPersona();
    }
  }, [uuid]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const noCaracteresEspeciales = /^[A-Z0-9]+$/;
    if (name === 'password_comparar') {
      setPasswordConfirm(value); // Actualizar la confirmación de la contraseña
    }
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
    if (name === 'curp') {
      if (value.length !== 18) {
          setErrorMsg('La CURP debe tener exactamente 18 caracteres.');
      } else if (value !== value.toUpperCase()) {
          setErrorMsg('La CURP debe estar en mayúsculas.');
      } else if (!noCaracteresEspeciales.test(value)) {
          setErrorMsg('La CURP solo debe contener letras mayúsculas y números, sin caracteres especiales.');
      }else {
          setErrorMsg('');
      }
  } else if (name === 'rfc') {
      if (value.length < 12 || value.length > 13) {
          setErrorMsg('El RFC debe tener entre 12 y 13 caracteres.');
      } else if (value !== value.toUpperCase()) {
          setErrorMsg('El RFC debe estar en mayúsculas.');
      }else if (!noCaracteresEspeciales.test(value)) {
          setErrorMsg('El RFC solo debe contener letras mayúsculas y números, sin caracteres especiales.');
      } else {
          setErrorMsg('');
      }
  }    
  };
  const validateForm = () => {
    if (formData.password !== passwordConfirm) {
      setErrorMsg('Las contraseñas no coinciden.');
      return false;
    }
     // Validación de campos obligatorios
     if (!formData.nombre || formData.sexo === undefined || !formData.fecha_nac || !formData.curp || !formData.rfc || !formData.id_tipo_persona) {
      setErrorMsg('Por favor, llena todos los campos obligatorios.');
      setLoading(false);
      return;
    }
    
    const noCaracteresEspeciales = /^[A-Z0-9]+$/;
    // Validar que CURP no contenga caracteres no permitidos y esté en mayúsculas
    if (!noCaracteresEspeciales.test(formData.curp)) {
        setErrorMsg('La CURP solo debe contener letras mayúsculas y números, sin caracteres especiales.');
        setLoading(false);
        return false;
    }

    // Validar que RFC no contenga caracteres no permitidos y esté en mayúsculas
    if (!noCaracteresEspeciales.test(formData.rfc)) {
        setErrorMsg('El RFC solo debe contener letras mayúsculas y números, sin caracteres especiales.');
        setLoading(false);
        return false;
    }
    return true;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await axios.patch(`http://localhost:5000/personas/${formData.uuid}`, formData);
      setSuccessMsg('Persona actualizada exitosamente.');

      // Actualizar la lista de personas después de guardar
      const response = await axios.get<Persona[]>('http://localhost:5000/personas');
      setPersonas(response.data);
    } catch (error: any) {
      setErrorMsg(error.response?.data?.msg || 'Error al actualizar persona.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Manejar eliminación de persona
  const handleDelete = async (uuid: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta persona?')) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:5000/personas/${uuid}`);
        setSuccessMsg('Persona eliminada exitosamente.');
        setPersonas(personas.filter(persona => persona.uuid !== uuid));
      } catch (error: any) {
        setErrorMsg(error.response?.data?.msg || 'Error al eliminar persona.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Manejar edición de persona
  const handleEdit = (persona: Persona) => {
    setFormData(persona);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Editar Persona</h1>
      {loading && <p>Cargando...</p>}
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <IconInput
          name="nombre"
          placeholder="Nombre"
          icon={FaRegAddressCard}
          value={formData.nombre}
          onChange={handleChange}
        />
        <div className="grid grid-cols-2 gap-4">
          <IconInput
            name="apellido_pat"
            placeholder="Apellido paterno"
            icon={FaRegAddressCard}
            value={formData.apellido_pat}
            onChange={handleChange}
          />
          <IconInput
            name="apellido_mat"
            placeholder="Apellido materno"
            icon={FaRegAddressCard}
            value={formData.apellido_mat}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center space-x-2">
          <LiaBirthdayCakeSolid className="text-[#8B8B8B] text-xl" />
          <p className="text-[#8B8B8B]">Fecha de nacimiento</p>
        </div>
        <IconInput
          name="fecha_nac"
          type="date"
          value={formData.fecha_nac}
          onChange={handleChange}
        />
        <div className="grid grid-cols-2 gap-4">
          <IconInput
            name="curp"
            placeholder="CURP"
            icon={FaRegIdBadge}
            value={formData.curp}
            onChange={handleChange}
          />
          <IconInput
            name="rfc"
            placeholder="RFC"
            icon={FaRegIdBadge}
            value={formData.rfc}
            onChange={handleChange}
          />
        </div>
        {/* Input contraseña */}
        <div className='my-2 grid gap-4 grid-cols-2 mt-5'>
          <div className='col-span-2 sm:col-span-1'>
            <IconInput 
              name='password'
              placeholder='Contraseña' 
              iconClassName='group-hover:-translate-x-[20px]'
              icon={FaLock}
              value={formData.password}
              onChange={handleChange}
              type="password"
            />
            </div>
            <div className='col-span-2 sm:col-span-1'>
              <IconInput 
                name='password_comparar'
                placeholder='Confirmar contraseña' 
                iconClassName='group-hover:-translate-x-[20px]'
                icon={FaLock}
                value={passwordConfirm}
                onChange={handleChange}
                type="password"
            />
            </div>
        </div>

        <div className="flex items-center space-x-2">
          <PiGenderFemaleBold className="text-[#8B8B8B] text-lg" />
          <p className="text-[#8B8B8B]">Sexo</p>
        </div>
        <InputSelect
          name="sexo"
          value={formData.sexo ? "1" : "0"}
          onChange={handleChange}
        >
          <option value="">Seleccionar</option>
          <option value="1">Masculino</option>
          <option value="0">Femenino</option>
        </InputSelect>

        {/* Campo para id_tipo_persona */}
        <div className="flex items-center space-x-2">
          <label>Tipo de persona:</label>
          <InputSelect
            name="id_tipo_persona"
            value={formData.id_tipo_persona || ""}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const selectedId = parseInt(e.target.value, 10);
              setFormData({
                ...formData,
                id_tipo_persona: isNaN(selectedId) ? null : selectedId,
              });
            }}
          >
            <option value="">Seleccionar tipo de persona</option>
            {tiposPersona.map((tipo) => (
              <option key={tipo.id_tipo_persona} value={tipo.id_tipo_persona}>
                {tipo.nombre}
              </option>
            ))}
          </InputSelect>
        </div>

        {/* Campo para activo */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="activo"
            checked={formData.activo}
            onChange={handleChange}
          />
          <label>Activo</label>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
          <button
            type="button"
            onClick={() => handleDelete(formData.uuid)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            disabled={loading}
          >
            Eliminar
          </button>
        </div>
      </form>

      {/* Tabla de personas */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-5">Lista de Personas</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Nombre</th>
              <th className="py-2">Apellido Paterno</th>
              <th className="py-2">Apellido Materno</th>
              <th className="py-2">Fecha de Nacimiento</th>
              <th className="py-2">CURP</th>
              <th className="py-2">RFC</th>
              <th className="py-2">Sexo</th>
              <th className="py-2">Tipo de Persona</th>
              <th className="py-2">Activo</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personas.map((persona) => (
              <tr key={persona.uuid}>
                <td className="border px-4 py-2">{persona.nombre}</td>
                <td className="border px-4 py-2">{persona.apellido_pat}</td>
                <td className="border px-4 py-2">{persona.apellido_mat}</td>
                <td className="border px-4 py-2">{persona.fecha_nac}</td>
                <td className="border px-4 py-2">{persona.curp}</td>
                <td className="border px-4 py-2">{persona.rfc}</td>
                <td className="border px-4 py-2">{persona.sexo ? 'Masculino' : 'Femenino'}</td>
                <td className="border px-4 py-2">
                  {tiposPersona.find((tipo) => tipo.id_tipo_persona === persona.id_tipo_persona)?.nombre || 'Desconocido'}
                </td>
                <td className="border px-4 py-2">{persona.activo ? 'Sí' : 'No'}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(persona)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(persona.uuid)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditarPersona;