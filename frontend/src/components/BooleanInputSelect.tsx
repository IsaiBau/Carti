import React from 'react';

interface BooleanSelectOption {
  value: boolean;
  label: string;
}

interface BooleanInputSelectProps {
  options: BooleanSelectOption[];
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  id?: string;
}

const BooleanInputSelect: React.FC<BooleanInputSelectProps> = ({ options, value, onChange, name='', id='' }) => {
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

export default BooleanInputSelect;