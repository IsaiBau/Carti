import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: string;
}

const Button: React.FC<ButtonProps> = ({children, className = '',}) => {
  return (
      <button className={`w-35 hidden rounded-md px-3 py-2.5 text-sm poppins-semibold cursor-pointer text-[#3290e7] transition sm:block input-transition ${className}`}>
        {children}
      </button>
  );
};

export default Button;