import React from 'react';
import ArrowUp from '../assets/arrowUp.svg'
import ArrowDown from '../assets/arrowDown.svg'

type CardListProps = {
    today: string;
    day: string;
    numAndNameUni: string;
    revenue: string;
    expenses: string;
    placa: string;
};

const Card: React.FC<CardListProps> = ({ today, day, numAndNameUni, revenue, expenses, placa}) => {
  return (
    <div className='flex my-4 items-center justify-between'>
        <div className='flex items-center'>
            <div className='flex flex-col items-center p-3 bg-green-light poppins-medium'>
                <p>{today}</p>
                <p className='text-5xl'>{day}</p>
            </div>
            <div className='poppins-medium flex flex-col px-2'>
                    <span className='text-2xl'>Placa: <span className='text-xl'>{placa}</span></span>
                    <p className='text-5xl'>{numAndNameUni}</p>
            </div>
        </div>
        <div className='flex flex-col'>
            <div className='flex'>
                <img src={ArrowUp} alt="arrow" />
                <span className='poppins-medium text-2xl text-[#059009] px-2'>${revenue}</span>
            </div>
            <div className='flex'>
                 <img src={ArrowDown} alt="arrow" />
                <span className='poppins-medium text-2xl text-[#F94E4E] px-2'>${expenses}</span>
            </div>
        </div>
    </div>
  );
};

export default Card;