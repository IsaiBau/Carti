import React, { useState, useEffect } from "react";
import MenuLateral from "../../components/MenuLateral";
import IconMenu from "../../assets/menu-icon.svg";
import IconUni from "../../assets/combi-icon.svg";
import IconChof from "../../assets/user-icon.svg";
import IconCerrarSes from "../../assets/logout-icon.svg";
import Card from "../../components/Card";
import IconInput from "../../components/Input";
import InputSelect from "../../components/InputSelect";
import NavBarPanel from "../../components/NavBarPanel";
import { FaRegAddressCard } from "react-icons/fa6";

// Items del menu y sus rutas
const menuItems = [
  { icono: IconMenu, texto: "Panel", ruta: "/panel-de-control" },
  { icono: IconUni, texto: "Unidades", ruta: "/unidades" },
  { icono: IconChof, texto: "Choferes", ruta: "/choferes" },
];

// Cerrar sesion item
const cerrarSesion = {
  icono: IconCerrarSes,
  texto: "Cerrar sesión",
  ruta: "/logout",
};

interface Chofer {
  id: number;
  uuid: string;
  nombre: string;
  apellido_pat: string;
  apellido_mat: string;
}

interface UnidadFormData {
  placa: string;
  numero: string;
  id_personas: string;
}

interface Unidad {
  id: number;
  placa: string;
  numero: string;
  choferes: string;
}

const Unidades = () => {
  const [formData, setFormData] = useState<UnidadFormData>({
    placa: "",
    numero: "",
    id_personas: "",
  });

  const [choferes, setChoferes] = useState<Chofer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loadingUnidades, setLoadingUnidades] = useState<boolean>(true);
  const [unidades, setUnidades] = useState<Unidad[]>([]);

  // Función handleDelete actualizada
  // const handleDelete = async (id: string) => {
  //   console.log('[1] Inicio de handleDelete. ID recibido:', id);
    
  //   if (!window.confirm('¿Estás seguro de eliminar esta unidad?')) {
  //     console.log('[2] Usuario canceló la eliminación');
  //     return;
  //   }
  
  //   try {
  //     console.log('[3] Previamente a setLoadingUnidades(true)');
  //     setLoadingUnidades(true);
  //     console.log('[4] Loading establecido a true. ID a eliminar:', id);
  
  //     console.log('[5] Realizando fetch DELETE a:', `http://localhost:5000/unidades/${id}`);
  //     const response = await fetch(`http://localhost:5000/unidades/${id}`, {
  //       method: 'DELETE',
  //       credentials: 'include'
  //     });
  
  //     console.log('[6] Respuesta recibida. Status:', response.status);
  //     console.log('[7] Respuesta headers:', [...response.headers.entries()]);
      
  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => ({}));
  //       console.error('[8] Error en la respuesta:', {
  //         status: response.status,
  //         statusText: response.statusText,
  //         errorData
  //       });
  //       throw new Error(errorData.message || "Error al eliminar la unidad");
  //     }
  
  //     console.log('[9] Eliminación exitosa. Actualizando estado...');
  //     setUnidades(prev => {
  //       const nuevasUnidades = prev.filter(unidad => unidad.id !== id);
  //       console.log('[10] Nuevo estado de unidades:', nuevasUnidades);
  //       return nuevasUnidades;
  //     });
      
  //   } catch (err) {
  //     console.error('[11] Error capturado en catch:', {
  //       error: err,
  //       message: err.message,
  //       stack: err.stack
  //     });
  //     setError(`Error al eliminar: ${err.message}`);
  //   } finally {
  //     console.log('[12] En bloque finally. Estableciendo loading a false');
  //     setLoadingUnidades(false);
  //   }
  // };
  // Componente para mostrar errores
  const renderError = () => (
      error && (
          <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-md flex items-center">
              <span>{error}</span>
              <button 
                  onClick={() => setError(null)}
                  className="ml-2 text-lg font-bold"
              >
                  &times;
              </button>
          </div>
      )
  );

  useEffect(() => {
    const fetchUnidades = async () => {
      try {
        const response = await fetch("http://localhost:5000/unidades");
        if (!response.ok) throw new Error("Error al cargar unidades");
        const data = await response.json();

        // Ajustamos el formato de los datos recibidos
        const unidadesFormateadas = data.map((unidad: any) => ({
          id: unidad.id,
          placa: unidad.placa,
          numero: unidad.numero,
          choferes: unidad.choferes
      }));

        setUnidades(unidadesFormateadas);
      } catch (err) {
        setError("Error al cargar unidades");
        console.error(err);
      } finally {
        setLoadingUnidades(false);
      }
    };
    fetchUnidades();
  }, []);

  // Obtener lista de choferes (personas con id_tipo_persona = 2)
  useEffect(() => {
    const fetchChoferes = async () => {
      try {
        const response = await fetch("http://localhost:5000/tipo/choferes");

        if (!response.ok) {
          throw new Error(`Error HTTP! estado: ${response.status}`);
        }

        const data = await response.json();
        setChoferes(data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener choferes:", err);
        setError(
          "No se pudieron cargar los choferes. Verifica la conexión al servidor."
        );
        setLoading(false);
      }
    };

    fetchChoferes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:5000/crearUnidad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placa: formData.placa,
          numero: formData.numero,
          id_personas: Number(formData.id_personas),
        }),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al registrar unidad");
      }

      setSuccess(true);
      setFormData({ placa: "", numero: "", id_personas: "" });

      // Actualizar la lista de unidades
      const unidadesResponse = await fetch("http://localhost:5000/unidades");
      const unidadesData = await unidadesResponse.json();
      setUnidades(unidadesData);
    } catch (err) {
      // setError(err.message);
      console.error("Error al registrar unidad:", err);
    }
  };

  return (
    <div className="h-screen grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_1fr_1fr] gap-4 bg-[#ECECEC]">
            {renderError()}
      <div className="row-span-3">
        <MenuLateral items={menuItems} cerrarSesion={cerrarSesion} />
      </div>
      <div className="col-span-2 col-start-2 row-start-1">
        <NavBarPanel
          section="Unidades"
          name="Jose Salvador Sarao"
          email="josuesal@gmail.com"
        ></NavBarPanel>
      </div>
      <div className="col-span-2 col-start-2 row-start-2">
        <Card title="Añadir una nueva unidad" subtitle="">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-2 bg-red-100 text-red-700 rounded">{error}</div>
            )}
            {success && (
              <div className="p-2 bg-green-100 text-green-700 rounded">
                Unidad registrada exitosamente!
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <IconInput
                name="placa"
                placeholder="Placa de la unidad"
                icon={FaRegAddressCard}
                value={formData.placa}
                onChange={(e) =>
                  setFormData({ ...formData, placa: e.target.value })
                }
              />
              <InputSelect
                name="id_personas"
                value={formData.id_personas}
                onChange={(e) =>
                  setFormData({ ...formData, id_personas: e.target.value })
                }
              >
                <option value="">Seleccionar Chofer</option>
                {loading ? (
                  <option>Cargando choferes...</option>
                ) : (
                  choferes.map((chofer) => (
                    <option key={chofer.uuid} value={chofer.id}>
                      {chofer.nombre} {chofer.apellido_pat}{" "}
                      {chofer.apellido_mat}
                    </option>
                  ))
                )}
              </InputSelect>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <IconInput
                name="numero"
                placeholder="Número de unidad"
                icon={FaRegAddressCard}
                value={formData.numero}
                onChange={(e) =>
                  setFormData({ ...formData, numero: e.target.value })
                }
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </Card>
      </div>
      <div className="col-span-2 col-start-4"></div>
      <div className="col-span-2 row-span-3 col-start-2 row-start-3">
        <Card title="Lista de unidades" subtitle="">
        <table className="table w-full border-collapse">
  <thead>
    <tr className="bg-gray-200 text-left">
      <th className="p-3 w-1/12"># COMBI</th>
      <th className="p-3 w-2/12">PLACA</th>
      <th className="p-3 w-3/12">CHOFERES</th>
      {/* <th className="p-3 w-2/12 text-center">ACCIÓN</th> */}
    </tr>
  </thead>
  <tbody>
    {loadingUnidades ? (
      <tr>
        <td colSpan={4} className="p-4 text-center">
          Cargando unidades...
        </td>
      </tr>
    ) : unidades.length === 0 ? (
      <tr>
        <td colSpan={4} className="p-4 text-center">
          No hay unidades registradas
        </td>
      </tr>
    ) : (
      unidades.map((unidad) => (
        <tr key={unidad.id} className="border-b hover:bg-gray-50"> 
          <td className="p-3"># {unidad.numero}</td>
          <td className="p-3">{unidad.placa}</td>
          <td className="p-3">{unidad.choferes}</td> 
          {/* <td className="p-3 flex justify-center gap-2"> */}
            {/* <button
              onClick={() => handleDelete(unidad.id)}
              disabled={loadingUnidades}
              className={`px-3 py-1 rounded-md text-white ${
                loadingUnidades ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {loadingUnidades ? 'Eliminando...' : 'Eliminar'}
            </button> */}
            {/* <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition duration-200">Editar</button> */}
            {/* <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200">Detalles</button> */}
          {/* </td> */}
        </tr>
      ))
    )}
  </tbody>
</table>
        </Card>
      </div>
    </div>
  );
};

export default Unidades;
