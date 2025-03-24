import React, { ReactNode } from 'react';

interface InputSelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
}

const InputSelect: React.FC<InputSelectProps> = ({ name, value, onChange, children }) => {
  return (
    <div className="relative group">
      <select
        className='w-full h-[50px] border p-3 rounded-[7px] hover:text-[#2787E0] poppins-regular border-[#B8B8B8] focus:border-blue-400 focus:ring focus:ring-blue-300 focus:placeholder-blue-500 focus:outline-none input-transition hover:border-blue-500 hover:placeholder-blue-500'
        name={name}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
};

export default InputSelect;
