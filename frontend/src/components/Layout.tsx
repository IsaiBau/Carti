import NavBar from '../components/NavBar';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
    return (
        <div className='bg-linear-to-b from-[#3290e7] from-10% to-[#144789] px-16 py-8 h-screen'>
            <NavBar/>
            <div>
                <main className='h-[90vh]'>{props.children}</main>
            </div>
        </div>
    )
}

export default Layout