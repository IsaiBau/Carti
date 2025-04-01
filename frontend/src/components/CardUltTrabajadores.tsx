import React, { ReactNode } from 'react';
import Persona from '../assets/person-1.png'

type CardListProps = {
    name: string;
    registerTime: ReactNode;
};

const Card: React.FC<CardListProps> = ({ name, registerTime}) => {
  return (
    <div className='bg-amber-100 rounded-l-full rounded-r-xl my-4 flex'>
        <img className='p-2' src={Persona} alt="" />
        <div>
            <p className='text-[#B27A15] poppins-bold pt-2 pl-2 text-2xl'>{name}</p>
            <p className='text-[#B27A15] poppins-regular pb-2 pl-2'>{registerTime}</p>
        </div>
    </div>
  );
};

export default Card;