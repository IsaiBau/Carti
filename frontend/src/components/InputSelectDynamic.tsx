import React from 'react';

interface Option {
  value: string; // Valor de la opción (debe ser un string)
  label: string; // Texto que se muestra en la opción
}

interface InputSelectDynamicProps {
  options: Option[]; // Lista de opciones
  value: string; // Valor seleccionado
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Manejador de cambios
  name: string; // Nombre del campo
  id: string; // ID del campo
  className?: string; // Clases CSS opcionales
}

const InputSelectDynamic: React.FC<InputSelectDynamicProps> = ({
  options,
  value,
  onChange,
  name,
  id,
  className = '',
}) => {
  return (
    <select
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default InputSelectDynamic;