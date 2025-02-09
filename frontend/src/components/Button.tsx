import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button className="button-principal inline-flex justify-center rounded-lg border border-transparent shadow-sm px-5 py-3 font-medium text-sm text-center text-white sm:text-base items-center me-2">
      {props.children}
    </button>
  );
};

export default Button;