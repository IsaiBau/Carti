import React from 'react'
import Logo from '../assets/logo.svg'
import Button from '../components/Button'

const NavBar = () => {
  return (
    <header className='w-auto'>
        <div className="flex max-w-screen-full items-center gap-8">
            <a className="block text-teal-600" href="/">
                <span className="sr-only">Home</span>
                <img src={Logo} alt="LogoCarti"/>
            </a>
            <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block h-full">
                <ul className="flex items-center gap-6 text-sm">
                    <li>
                        <a className="text-white poppins-regular transition poppins-regular/75" href="#"> </a>
                    </li>
                </ul>
            </nav>
            <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                    <form action="/login">
                        <Button
                            className='border border-white text-white'
                        >
                            Login
                        </Button>
                    </form>
                    <form action="/login">
                        <Button
                            className='bg-white'
                        >
                            Registrarse
                        </Button>
                    </form>
                </div>
                <button
                className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                >
                <span className="sr-only">Toggle menu</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                </button>
            </div>
            </div>
        </div>
    </header>
  )
}

export default NavBar