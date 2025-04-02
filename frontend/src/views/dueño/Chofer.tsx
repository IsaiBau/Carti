import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuLateral from '../../components/MenuLateral';
import IconMenu from '../../assets/menu-icon.svg';
import IconUni from '../../assets/combi-icon.svg';
import IconChof from '../../assets/user-icon.svg';
import IconCerrarSes from '../../assets/logout-icon.svg';
import Card from '../../components/Card';
import Button from '../../components/Button';
import NavBarPanel from '../../components/NavBarPanel';
import Input from '../../components/Input';
import Select from '../../components/Select';
import DatePicker from '../../components/DatePicker';
import Checkbox from '../../components/Checkbox';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../app/store";
import { getMe } from "../../features/authSlice";

interface Chofer {
  id: number;
  uuid: string;
  nombre: string;
  apellido_pat: string;
  apellido_mat: string;
  sexo: boolean;
  fecha_nac: string;
  curp: string;
  rfc: string;
  activo: boolean;
  unidades?: {
    id_unidades: number;
    turno: string;
    numero: string;
    placa: string;
  }[];
}

const Choferes = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state: RootState) => state.auth);

  // Estados
  const [choferes, setChoferes] = useState<Chofer[]>([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_pat: '',
    apellido_mat: '',
    fecha_nac: '',
    curp: '',
    rfc: '',
    sexo: true,
    password: '',
    activo: true,
    id_tipo_persona: 2 // Tipo persona 2 = Chofer
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // Efectos
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (user && !["conductor", "dueño", "checador", "admin"].includes(user.rol)) {
      navigate("/login");
    }
    if (user?.id) {
      fetchChoferes();
    }
  }, [isError, user, navigate]);

  // Obtener choferes
  const fetchChoferes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/choferes/${user?.id}`);
      setChoferes(response.data.trabajadores || []);
    } catch (error) {
      console.error('Error al cargar choferes:', error);
      alert('Error al cargar la lista de choferes');
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'password_comparar') {
      setPasswordConfirm(value);
      return;
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  // Validar formulario
  const validateForm = () => {
    const { nombre, apellido_pat, fecha_nac, curp, rfc, password } = formData;

    if (!nombre || !apellido_pat || !fecha_nac || !curp || !rfc) {
      alert('Todos los campos obligatorios deben ser llenados');
      return false;
    }

    if (!editMode && !password) {
      alert('La contraseña es requerida');
      return false;
    }

    if (password && password !== passwordConfirm) {
      alert('Las contraseñas no coinciden');
      return false;
    }

    if (curp.length !== 18) {
      alert('La CURP debe tener exactamente 18 caracteres');
      return false;
    }

    if (rfc.length < 12 || rfc.length > 13) {
      alert('El RFC debe tener entre 12 y 13 caracteres');
      return false;
    }

    return true;
  };

  // Enviar formulario (crear/editar)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (editMode && currentId) {
        // Editar chofer existente
        await axios.patch(`http://localhost:5000/personas/${currentId}`, formData);
        alert('Chofer actualizado exitosamente');
      } else {
        // Crear nuevo chofer
        await axios.post('http://localhost:5000/personas', formData);
        alert('Chofer creado exitosamente');
      }

      resetForm();
      fetchChoferes();
    } catch (error) {
      console.error('Error al guardar chofer:', error);
      alert('Error al guardar el chofer. Verifique la consola para más detalles.');
    } finally {
      setLoading(false);
    }
  };

  // Editar chofer
  const handleEdit = (chofer: Chofer) => {
    setFormData({
      nombre: chofer.nombre,
      apellido_pat: chofer.apellido_pat,
      apellido_mat: chofer.apellido_mat,
      fecha_nac: chofer.fecha_nac,
      curp: chofer.curp,
      rfc: chofer.rfc,
      sexo: chofer.sexo,
      password: '',
      activo: chofer.activo,
      id_tipo_persona: 2
    });
    setCurrentId(chofer.uuid);
    setEditMode(true);
    setPasswordConfirm('');
  };

  // Eliminar chofer
  const handleDelete = async (uuid: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este chofer?')) return;

    try {
      const response = await axios.delete(`http://localhost:5000/personas/${uuid}`);
      
      if (response.status === 200) {
        alert('Chofer eliminado exitosamente');
        fetchChoferes();
      } else {
        alert('Error al eliminar el chofer');
      }
    } catch (error) {
      console.error('Error al eliminar chofer:', error);
      alert('Error al eliminar el chofer. Verifique la consola para más detalles.');
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      nombre: '',
      apellido_pat: '',
      apellido_mat: '',
      fecha_nac: '',
      curp: '',
      rfc: '',
      sexo: true,
      password: '',
      activo: true,
      id_tipo_persona: 2
    });
    setPasswordConfirm('');
    setEditMode(false);
    setCurrentId(null);
  };

  // Opciones para el select de sexo
  const sexoOptions = [
    { value: 'true', label: 'Hombre' },
    { value: 'false', label: 'Mujer' }
  ];

  // Items del menu
  const menuItems = [
    { icono: IconMenu, texto: 'Panel', ruta: '/panel-control' },
    { icono: IconUni, texto: 'Unidades', ruta: '/unidades' },
    { icono: IconChof, texto: 'Choferes', ruta: '/choferes' },
  ];

  const cerrarSesion = { icono: IconCerrarSes, texto: 'Cerrar sesión', ruta: '/logout' };

  return (
    <div className="h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-4 bg-[#ECECEC]">
      {/* Menú lateral */}
      <div className="row-span-2">
        <MenuLateral items={menuItems} cerrarSesion={cerrarSesion} />
      </div>

      {/* Contenido principal */}
      <div className="col-start-2 row-start-1">
        <NavBarPanel section='Choferes' name={user?.nombre || "Dueño"} email={user?.rfc || "0000000000"} />
      </div>

      <div className="col-start-2 row-start-2 p-4 overflow-y-auto">
        {/* Formulario de chofer */}
        <Card title={editMode ? "Editar chofer" : "Añadir un nuevo chofer"} className="mb-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Nombre" 
                name="nombre"
                placeholder="Ingrese el nombre" 
                value={formData.nombre}
                onChange={handleChange}
                required 
              />
              
              <Input 
                label="Apellido Paterno" 
                name="apellido_pat"
                placeholder="Ingrese el apellido paterno" 
                value={formData.apellido_pat}
                onChange={handleChange}
                required 
              />
              
              <Input 
                label="Apellido Materno" 
                name="apellido_mat"
                placeholder="Ingrese el apellido materno" 
                value={formData.apellido_mat}
                onChange={handleChange}
              />
              
              <Select 
                label="Sexo" 
                name="sexo"
                options={sexoOptions} 
                value={String(formData.sexo)}
                onChange={(value) => setFormData({...formData, sexo: value === 'true'})}
                required 
              />
              
              <DatePicker 
                label="Fecha de Nacimiento" 
                value={formData.fecha_nac}
                onChange={(date) => setFormData({...formData, fecha_nac: date})}
                required 
              />
              
              <Input 
                label="CURP" 
                name="curp"
                placeholder="Ingrese el CURP" 
                value={formData.curp}
                onChange={handleChange}
                required 
              />
              
              <Input 
                label="RFC" 
                name="rfc"
                placeholder="Ingrese el RFC" 
                value={formData.rfc}
                onChange={handleChange}
                required 
              />
              
              <Input 
                label="Contraseña" 
                name="password"
                type="password" 
                placeholder={editMode ? "Dejar en blanco para no cambiar" : "Ingrese la contraseña"} 
                value={formData.password}
                onChange={handleChange}
                required={!editMode}
              />
              
              <Input 
                label="Confirmar Contraseña" 
                name="password_comparar"
                type="password" 
                placeholder="Confirme la contraseña" 
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required={!editMode}
              />
              
              <Checkbox 
                label="Activo" 
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
              />
              
              <div className="flex items-end gap-2 col-span-2">
                <Button 
                  type="submit" 
                  className="bg-[#3290e7] text-white"
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : editMode ? 'Actualizar Chofer' : 'Guardar Chofer'}
                </Button>
                
                {editMode && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={resetForm}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Card>

        {/* Lista de choferes */}
        <Card title="Lista de choferes">
          {loading ? (
            <p>Cargando choferes...</p>
          ) : choferes.length === 0 ? (
            <p>No hay choferes registrados</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NOMBRE</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">APELLIDO PATERNO</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">APELLIDO MATERNO</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SEXO</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FECHA NAC.</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UNIDAD</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ESTADO</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACCIÓN</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {choferes.map((chofer) => (
                    <tr key={chofer.uuid}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chofer.nombre}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chofer.apellido_pat}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chofer.apellido_mat}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chofer.sexo ? 'Hombre' : 'Mujer'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chofer.fecha_nac}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {chofer.unidades?.reduce((acc, unidad) => 
                          acc ? `${acc}, ${unidad.numero}` : unidad.numero, '') || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          chofer.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {chofer.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(chofer)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          disabled={loading}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(chofer.uuid)}
                          className="text-red-600 hover:text-red-900"
                          disabled={loading}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Choferes;