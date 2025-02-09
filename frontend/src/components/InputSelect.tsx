import React from 'react'

const InputSelect = () => {
  return (
    <div className="relative group">

        <select className='w-full h-[50px] border p-3 rounded-[7px]  hover:text-[#2787E0] poppins-regular border-[#B8B8B8] focus:border-blue-400 focus:ring focus:ring-blue-300 focus:placeholder-blue-500 focus:outline-none input-transition hover:border-blue-500 hover:placeholder-blue-500'  name="" id="">
            <option 
                value={1}>
                    Masculino
            </option>
            <option 
                value={0}>
                    Femenino
            </option>
        </select>
    </div>
  );
};

export default InputSelect;