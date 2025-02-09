import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import InputSelect from "../components/BooleanInputSelect";
import Input from "../components/Input";
import ButtonDelete from "../components/ButtonDelete";
import { FaRegAddressCard } from 'react-icons/fa6';

const Personas: React.FC = () => {
  const [msg, setMsg] = useState("");
  const [tipoPersonasSelect, setTipoPersonas] = useState<any[]>([]);
  const [editar, setEditar] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [activo, setActivo] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState("");

  const booleanOptions = [
    { value: true, label: "Activo" },
    { value: false, label: "Inactivo" }
  ];

  useEffect(() => {
    getTipoPersonas();
  }, []);

  const getTipoPersonas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tipo-personas");
      setTipoPersonas(response.data);
    } catch (error: any) {
      setMsg(error.response.data.msg);
    }
  };

  const addTipoPersonas = () => {
    if (nombre.length < 3) {
      setErrorMsg("El nombre del tipo de persona debe tener al menos 3 caracteres.");
      return;
    }
    axios
      .post("http://localhost:5000/tipo-personas", { nombre, descripcion, activo })
      .then(() => {
        getTipoPersonas();
        cancelar();
      })
      .catch((error) => {
        setMsg(error.response.data.msg);
      });
  };

  const cancelar = () => {
    setNombre("");
    setDescripcion("");
    setActivo(true);
    setUuid(null);
    setEditar(false);
  };

  const deleteTipoPersona = async (toggleModal: () => void, row: { uuid: string;}) => {
    try {
      await axios.delete(`http://localhost:5000/tipo-personas/${row.uuid}`);
      getTipoPersonas();
      toggleModal(); 
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.msg) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("Error al eliminar el tipo de persona.");
      }
    }
  };  

  const getTipoPersonaEdit = (row: any) => {
    setEditar(true);
    setUuid(row.uuid);
    setNombre(row.nombre);
    setDescripcion(row.descripcion);
    setActivo(row.activo);
  };

  const updateTipoPersona = async () => {
    if (!uuid) return;
    try {
      await axios.patch(`http://localhost:5000/tipo-personas/${uuid}`, { nombre, descripcion, activo });
      getTipoPersonas();
      cancelar();
    } catch (error: any) {
      setMsg(error.response.data.msg);
    }
  };

  const handleChange  = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "nombre":
        setNombre(value);
        break;
      case "descripcion":
        setDescripcion(value);
        break;
      case "activo":
        setActivo(value === 'true');
        break;
      default:
        break;
    }

    let errorMessage = "";

    switch (name) {
      case "nombre":
        if (value.length < 3) {
          errorMessage = "El nombre debe tener al menos 3 caracteres.";
        }
        break;
      case "descripcion":
        if (value.length < 3) {
          errorMessage = "La descripción debe tener al menos 3 caracteres.";
        }
        break;
      default:
        break;
    }

    setErrorMsg(errorMessage);
  };

  const alertDelete = (row: { nombre: string }) => (
    <div className="text-center">
      <p className="text-gray-900 text-lg">
        ¿Está seguro de eliminar: <strong>{row.nombre}</strong>?
      </p>
    </div>
  );

  const footerButtonsDelete = (toggleModal: () => void, row: { uuid: string }) => (
    <>
      <button
        type="button"
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={toggleModal}
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2"
        onClick={() => deleteTipoPersona(toggleModal, row)}
      >
        Eliminar
      </button>
    </>
  );
  
  return (
    <div className="m-20">
      <h1>Todas las Tipos de Personas</h1>
      <form>
        <div>
          <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">
            Nombre del tipo de persona
          </label>
          <Input 
            placeholder='Nombre del tipo de persona' 
            icon={FaRegAddressCard}
            value={nombre}
            onChange={handleChange}
            id={"nombre"}
            name={"nombre"}
          />
        </div>
        <div>
          <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900">
            Descripción
          </label>
          <Input 
            placeholder='Descripción del tipo de persona' 
            icon={FaRegAddressCard}
            value={descripcion}
            onChange={handleChange}
            id={"descripcion"}
            name={"descripcion"}
          />
        </div>
        <div>
          <label htmlFor="activo" className="block mb-2 text-sm font-medium text-gray-900">
            Activo
          </label>
          <InputSelect 
            options={booleanOptions}
            value={activo}
            onChange={handleChange}
            name="activo"
            id="activo"
          />
        </div>
        {errorMsg && (
          <p className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {errorMsg}
          </p>
        )}
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
            onClick={addTipoPersonas}
          >
            Agregar
          </button>
          {editar && (
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2"
              onClick={updateTipoPersona}
            >
              Editar
            </button>
          )}
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={cancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipoPersonasSelect.map((row) => (
            <tr key={row.uuid}>
              <td>{row.nombre}</td>
              <td>{row.descripcion}</td>
              <td>{row.activo ? "Activo" : "Inactivo"}</td>
              <td>
                <button onClick={() => getTipoPersonaEdit(row)}>Editar</button>
                <ButtonDelete
                  title="Confirmar eliminación"
                  footerButtons={(toggleModal) => footerButtonsDelete(toggleModal, row)}
                >
                  {alertDelete(row)}
                </ButtonDelete>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Personas;