import React, { useState, useEffect, ReactNode } from 'react';

interface ButtonDeleteProps {
    children: ReactNode;
    title: string;
    footerButtons: (toggleModal: () => void) => ReactNode;
    onOpen?: () => void;
    className?: string;
}   

export const ButtonDelete: React.FC<ButtonDeleteProps> = ({ children, title, footerButtons, onOpen, className }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen && onOpen) {
        onOpen();  // Llama a la función onOpen al abrir el modal
    }};

    useEffect(() => {
        const handleLinkClick = (event: Event) => {
            event.preventDefault();
        };

        const anchorTags = document.querySelectorAll('.modal a');
        
        anchorTags.forEach((a) => {
            a.addEventListener('click', handleLinkClick);
        });
        
        return () => {
        anchorTags.forEach((a) => {
            a.removeEventListener('click', handleLinkClick);
        });};
    }, []);

  return (
    <>
      <button onClick={toggleModal} className={`button-actions py-2 text-white bg-[#DD5853] hover:bg-red-600 font-medium rounded-lg text-sm px-2 text-center inline-flex items-center me-2 ${className}`} type="button">
        Eliminar
      </button>
      {isModalOpen && (
        <div id="crud-modal" tabIndex={1} aria-hidden="true" className="fixed overflow-y-auto top-0 right-0 left-0 z-50 flex justify-center items-center max-w-full h-full bg-gray-800 bg-opacity-95">
          <div className="relative p-4 w-[80%] max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              {/* Encabezado modal */}
              <div className="flex items-center justify-between text-center p-4 md:p-5 border-b rounded-t">
                <div className="text-lg font-semibold text-gray-900 uppercase">{title}</div>
                <button type="button" className="text-red-800 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-red-200 hover:text-gray-900" onClick={toggleModal}>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Cerrar ventana</span>
                </button>
              </div>
              {/* Cuerpo modal */}
              <div className="p-4 md:p-5">
                {children}
              </div>
              {/* Pie de página modal */}
              <div className="p-4 md:p-5 border-t flex justify-center">
                {footerButtons(toggleModal)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonDelete;