import React, { useDebugValue, useEffect, useState, useContext } from 'react';
import '../index.css';
import { Button } from '../components/Button';
import { Outlet } from 'react-router-dom';
{/*import FooterTitleSection from '../ui/FooterTitleSection';*/}
{/*import { UserContext } from '../../contexts/UserContext';}*/}

const Layout: React.FC = () => {
  const [userRole, setUserRole] = useState<string>('');
  {/*const { user, logout } = useContext(UserContext);*/}

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, []);

  const linksPorRole: { [key: string]: { name: string; link: string }[] } = {
    'Conductor': [{ name: "Inicio", link: "/" }],
    'Pasajero': [{ name: "Inicio", link: "/" }],
    '': [{ name: "Inicio", link: "/" }],
  };

  const Links = linksPorRole[userRole] || [];
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <div className='w-full top-0 left-0 bg-white'>
        <div className='md:flex items-center justify-between py-2 md:mx-24 sm:mx-24'>
          <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
            <span className='text-3xl text-indigo-600 w-24'></span>
          </div>
          <div onClick={() => setOpen(!open)} className='z-[4] text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
            {/*<ion-icon name={open ? 'close' : 'menu'}></ion-icon>*/}
          </div>
          <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[2] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-out ${open ? 'top-20' : 'top-[-490px]'}`}>
            {Links.map((link) => (
              <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7 hover:animate-pulse'>
                <a href={link.link} className='text-base text-gray-800 hover-text duration-100 montserrat-medium'>{link.name}</a>
              </li>
            ))}
            <div className={`${open ? 'ml-8' : 'ml-8'}`}>
              <Button>Cerrar Sesion</Button>
            </div>
          </ul>
        </div>
      </div>
      <div>{<Outlet />}</div>
      <footer>
        <div className="mx-auto w-full px-24 lg:py-8 bg-white border">
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            <div className="">
              {/*<FooterTitleSection ItemName={"Servicios"} />
              <ul className="list-none text-[#bbb] font-medium">
                <Item url={"http://localhost:3000/"} itemName={"Item"} />
                <Item url={"http://localhost:3000/"} itemName={"Item"} />
                <Item url={"http://localhost:3000/"} itemName={"Item"} />
                <Item url={"http://localhost:3000/"} itemName={"Item"} />
              </ul>*/}
            </div>
            <div className="">
              {/*<FooterTitleSection ItemName={"Visitanos"} />*/}
              <script type="text/javascript" src="http://www.flickr.com/badge_code_v2.gne?count=8&amp;display=random&amp;size=s&amp;layout=x&amp;source=user&amp;user=34178660@N03"></script>
              <p className='text-black me-8'> Item </p>
              <div className="clear"></div>
            </div>
            <div className="">
              <h5 className="mb-2.5 font-semibold text-black uppercase">Siguenos en nuestras <br /> redes sociales</h5>
              <ul className='sm:mx-auto sm:flex sm:items-center md:justify-between flex md:justify-center'>
                {/*<ItemIcon iconClass={"bxl-facebook-circle"} url={"https://www.facebook.com"} />
                <ItemIcon iconClass={"bxl-twitter"} url={"https://www.facebook.com"} />
                <ItemIcon iconClass={"bxl-linkedin"} url={"https://www.facebook.com"} />
                <ItemIcon iconClass={"bxl-pinterest"} url={"https://www.facebook.com"} />
                <ItemIcon iconClass={"bxl-google"} url="https://www.facebook.com" />*/}
              </ul>
            </div>
          </div>
        </div>
        <hr className="bg-[#A02042] border-[#A02042] h-2 sm:mx-auto" />
        <div className="bg-[#0d2924] flex sm:items-center md:h-20">
          <span className="text-sm text-black stext-center dark:text-[#BC955C] px-20 py-2">&copy; Derechos reservados</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
