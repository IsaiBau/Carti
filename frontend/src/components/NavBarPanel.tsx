import React from 'react'
import Persona from '../assets/person-1.png'
type NavBarProps = {
    section: string;
    name: string;
    email: string;
}

const NavBarPanel: React.FC<NavBarProps> = ({section, name, email}) => {
  return (
    <div className='flex py-10 w-full justify-between items-center'>
        <p className='poppins-bold text-5xl'>{section}</p>
        <div className='flex'>
            <img className='px-2' src={Persona} alt="" />
            <div>
                <p className='text-lg poppins-semibold'>{name}</p>
                <p className='poppins-regular text-sm'>{email}</p>
            </div>
            
        </div>

    </div>
  )
}

export default NavBarPanel