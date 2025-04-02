import React from 'react';

interface CheckboxProps {
  label?: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  label, 
  name, 
  checked, 
  onChange, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      {label && (
        <label htmlFor={name} className="ml-2 block text-sm text-gray-700">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;