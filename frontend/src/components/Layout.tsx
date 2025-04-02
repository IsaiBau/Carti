import React, { ReactNode } from 'react';
import NavBar from '../components/NavBar';

interface LayoutProps {
  children: ReactNode;
  buttons?: ReactNode; // Pasamos los botones al NavBar
}

const Layout: React.FC<LayoutProps> = ({ children, buttons }) => {
  return (
    <div className='bg-linear-to-b from-[#3290e7] from-10% to-[#144789] px-16 py-8 h-screen'>
      <NavBar buttons={buttons} />
      <main className='h-[90vh]'>{children}</main>
    </div>
  );
};

export default Layout;
