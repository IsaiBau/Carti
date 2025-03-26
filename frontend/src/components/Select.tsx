import React from 'react';

interface SelectOption {
  value: any;
  label: string;
}

interface SelectProps {
  label?: string;
  name: string;
  value: any;
  options: SelectOption[];
  onChange: (value: any) => void;
  className?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({ 
  label, 
  name, 
  value, 
  options, 
  onChange, 
  className = '', 
  required = false 
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;