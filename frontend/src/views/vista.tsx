import React, { useState } from 'react';

const Vista: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [data, setData] = useState<string[]>([]);
  const [showData, setShowData] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    if (inputValue) {
      setData([...data, inputValue]);
      setInputValue(''); // Limpiar el input después de guardar
    }
  };

  const handleShowData = () => {
    setShowData(!showData);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ingresa un dato"
        />
        <button onClick={handleSave}>Guardar</button>
        <button onClick={handleShowData}>{showData ? 'Ocultar Datos' : 'Mostrar Datos'}</button>
      </div>
      {showData && (
        <div>
          <h2>Datos Guardados:</h2>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Vista;
