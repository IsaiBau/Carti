import React from 'react';

interface StringNumberSelectOption {
  value: string | number;
  label: string;
}

interface StringNumberInputSelectProps {
  options: StringNumberSelectOption[];
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  id?: string;
}

const InputSelectDynamic: React.FC<StringNumberInputSelectProps> = ({
  options,
  value,
  onChange,
  name = '',
  id = ''
}) => {
  return (
    <div className="relative group">
      <select 
        className="w-full h-[50px] border p-3 rounded-[7px] hover:text-[#2787E0] poppins-regular border-[#B8B8B8] focus:border-blue-400 focus:ring focus:ring-blue-300 focus:placeholder-blue-500 focus:outline-none input-transition hover:border-blue-500 hover:placeholder-blue-500" 
        value={String(value)} // Convertir el value a string
        onChange={onChange}
        name={name}
        id={id}
      >
        {options.map(option => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelectDynamic;

/*
Para usarlo deben declararse los options:
const Options = [
  { value: 'option1', label: "Opción 1" },
  { value: 'option2', label: "Opción 2" },
  { value: 3, label: "Opción 3" }
];
y se mandaria a llamar asi
<InputSelectDynamic 
  options={stringNumberOptions}
  value={descripcion} // Aquí puedes usar cualquier estado que necesites
  onChange={handleChange} //Aqui debes usar una funcion declarada como en TipoPersonas
  name={"opciones"}
  id={"opciones"}
/>
*/