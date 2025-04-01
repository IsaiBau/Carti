import React, { ReactNode } from 'react';

type CardListProps = {
    title: string;
    subtitle: string;
    children: ReactNode;
};

const Card: React.FC<CardListProps> = ({ title, subtitle, children}) => {
  return (
    <div className="bg-white rounded-xl p-5">
      {/* Título y subtítulo dinámicos */}
      <p className="poppins-semibold text-2xl">{title}</p>
      <b className="poppins-regular text-zinc-400">{subtitle}</b>
      
      <div>
        {children}
      </div>
    </div>
  );
};

export default Card;