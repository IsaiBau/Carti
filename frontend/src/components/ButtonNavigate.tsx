import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonNavigateProps {
  children: ReactNode;
  className?: string;
  to: string;
}

const ButtonNavigate: React.FC<ButtonNavigateProps> = ({ children, className = '', to }) => {
  return (
    <Link 
      to={to}
      className={`w-35 hidden rounded-md px-3 py-2.5 text-sm poppins-semibold cursor-pointer text-[#3290e7] transition sm:block input-transition ${className}`}
    >
      {children}
    </Link>
  );
};

export default ButtonNavigate;