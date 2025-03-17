import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

const Dashboard : React.FC = () => {
  const [msg, setMsg] = useState("");
  const [tipoPersonasSelect, setTipoPersonas] = useState<any[]>([]);
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [activo, setActivo] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");

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
    setActivo("");
    setId(null);
    setEditar(false);
  };

  const deleteTipoPersona = async (uuid: string) => {
    try {
      await axios.delete(`http://localhost:5000/tipo-personas/${uuid}`);
      getTipoPersonas();
      cancelar();
    } catch (error: any) {
      setMsg(error.response.data.msg);
    }
  };

  const getTipoPersonaEdit = (row: any) => {
    setEditar(true);
    setId(row.uuid);
    setNombre(row.nombre);
    setDescripcion(row.descripcion);
    setActivo(row.activo);
  };

  const updateTipoPersona = async () => {
    if (!id) return;
    try {
      await axios.patch(`http://localhost:5000/tipo-personas/${id}`, { nombre, descripcion, activo });
      getTipoPersonas();
      cancelar();
    } catch (error: any) {
      setMsg(error.response.data.msg);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNombre(value);

    // Validación dinámica mientras se escribe
    if (value.length >= 3) {
      setErrorMsg("");
    } else {
      setErrorMsg("El nombre del tipo de persona debe tener al menos 3 caracteres.");
    }
  };

  const modalContent = (
    <form>
      <div>
        <label
          htmlFor="nombre"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Nombre del tipo de persona
        </label>
        <input
          value={nombre}
          onChange={handleChange}
          type="text"
          name="nombre"
          id="nombre"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="Nombre del tipo de persona"
          required
        />
      </div>
      {errorMsg && (
        <p
          className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          {errorMsg}
        </p>
      )}
    </form>
  );

  const alertDelete = (row: any) => (
    <form>
      <div className="">
        <div className="col-span-1 sm:col-span-1 mb-4">
          <i className="bx bxs-error bx-flashing text-red-800 bx-lg flex justify-center text-center"></i>
          <label
            htmlFor="tipo_persona"
            className="mt-2 text-sm font-medium text-gray-900 flex justify-center text-center"
          >
            ¿Está seguro de eliminar:
            <strong className="pl-2"> {row.nombre}</strong>?
          </label>
        </div>
      </div>
    </form>
  );

  const footerButtons = () => (
    <>
      <button
        type="button"
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={cancelar}
      >
        Cancelar
      </button>
      <button
        type="button"
        className="button-actions text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
        onClick={addTipoPersonas}
      >
        Agregar
      </button>
    </>
  );

  const footerButtonsUpdate = () => (
    <>
      <button
        type="button"
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={cancelar}
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2"
        onClick={updateTipoPersona}
      >
        Editar
      </button>
    </>
  );

  const footerButtonsDelete = (row: any) => (
    <>
      <button
        type="button"
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={cancelar}
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2"
        onClick={() => deleteTipoPersona(row.uuid)}
      >
        Eliminar
      </button>
    </>
  );

  return (
    <div>
      <h1>Todas las Tipos de Personas</h1>
      <button onClick={addTipoPersonas}>Agregar tipo de persona</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipoPersonasSelect.map((row) => (
            <tr key={row.uuid}>
              <td>{row.nombre}</td>
              <td>
                {footerButtonsUpdate()}
                {footerButtonsDelete(row)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;