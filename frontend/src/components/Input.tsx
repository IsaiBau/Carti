import React from 'react';
import { IconType } from 'react-icons';

interface IconInputProps {
    placeholder: string;
    type?: string;
    icon?: IconType;
    iconClassName?: string;
    className?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const IconInput: React.FC<IconInputProps> = ({
    placeholder, 
    type = 'text', 
    icon: Icon = 'none', 
    iconClassName = '', 
    className = '', 
    name, 
    value, 
    onChange 
}) => {
  return (
    <div className="relative group">
        <input 
        className={`w-full h-[50px] border p-3 pl-8 rounded-[7px] poppins-regular border-[#B8B8B8] focus:border-blue-400 focus:ring focus:ring-blue-300 focus:placeholder-blue-500 focus:outline-none input-transition  hover:text-[#2787E0] hover:border-blue-500 hover:placeholder-blue-500 ${className}`} 
        placeholder={placeholder} 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        />
      <div 
      className="absolute inset-y-0 left-0 p-3 flex items-center justify-center pointer-events-none">
        <Icon
        className={`text-gray-400 group-hover:text-blue-500 transition-transform duration-200 group-hover:scale-130 group-hover:-translate-x-2.5 ${iconClassName}`}
        />
      </div>
    </div>
  );
};

export default IconInput;
