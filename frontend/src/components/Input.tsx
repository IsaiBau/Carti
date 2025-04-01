import React from 'react';
import { IconType } from 'react-icons';

interface IconInputProps {
    label?: string;
    placeholder: string;
    type?: string;
    icon?: IconType;
    iconClassName?: string;
    className?: string;
    inputClassName?: string;
    labelClassName?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    error?: string;
}

const IconInput: React.FC<IconInputProps> = ({
    label,
    placeholder, 
    type = 'text', 
    icon: Icon, 
    iconClassName = '', 
    className = '',
    inputClassName = '',
    labelClassName = '',
    name, 
    value, 
    onChange,
    required = false,
    error
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={name}
          className={`block poppins-regular text-sm mb-1 ${
            error ? 'text-red-600' : 'text-[#8B8B8B]'
          } ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative group">
        <input
          id={name}
          className={`w-full h-[50px] border p-3 ${
            Icon ? 'pl-10' : 'pl-3'
          } rounded-[7px] poppins-regular border-[#B8B8B8] focus:border-blue-400 focus:ring focus:ring-blue-300 focus:placeholder-blue-500 focus:outline-none input-transition hover:text-[#2787E0] hover:border-blue-500 hover:placeholder-blue-500 ${
            error ? 'border-red-500' : ''
          } ${inputClassName}`}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
        
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center pointer-events-none">
            <Icon
              className={`text-gray-400 group-hover:text-blue-500 transition-transform duration-200 group-hover:scale-110 ${
                error ? 'text-red-500' : ''
              } ${iconClassName}`}
            />
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default IconInput;