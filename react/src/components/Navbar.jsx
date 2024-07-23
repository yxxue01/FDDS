import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';


export default function Navbar() {

    const { token, user } = useStateContext()

    useEffect(() => {
        window.addEventListener('scroll', scrollFunction);
        return () => {
            window.removeEventListener('scroll', scrollFunction);
        }
    }
        , [])

    const scrollFunction = () => {
        if (window.scrollY >= 60) {
            document.querySelector('nav').classList.add('shadow-lg');
        }
        else {
            document.querySelector('nav').classList.remove('shadow-lg');
        }
    }


    return (
        <nav className="py-3 px-28 bg-white md:flex md:items-center md:justify-between h-[80px] fixed top-0 right-0 left-0 duration-50 z-10">
            <span className="text-3xl font-bold text-blue-500">
                FDDS
            </span>
            <ul className="md:flex md:items-center">
                <li className="mx-4 list-none ">
                    <Link
                        to="/"
                        className=" hover:text-cyan-500  hover:scale-105 transition duration-200 no-underline text-black"
                    >
                        Home
                    </Link>
                </li>
                {user &&
                    <li className="mx-4 list-none ">
                        <Link
                            to={`/researcher/${user.roles[0].name === 'Super_Admin' ? 'manageuser' : 'mydataset'}`}
                            className=" hover:text-cyan-500  hover:scale-105 transition duration-200 no-underline text-black"
                        >
                            Dashboard
                        </Link>
                    </li>
                }

                <li className="mx-4 list-none">
                    <Link
                        to="/discovery"
                        className=" hover:text-cyan-500  no-underline text-black hover:scale-105 transition duration-200"
                    >
                        Discovery
                    </Link>
                </li>
            </ul>
            {!user ?
                <div>
                    <Link
                        to="/register"
                        className="cursor-pointer outline-none px-3 py-2 mx-1 rounded-md border-blue-400 border bg-white text-blue-500"
                    >
                        Register
                    </Link>
                    <Link
                        to="/login"
                        className="cursor-pointer outline-none px-3 py-2 mx-1 rounded-md border-blue-400 border bg-blue-500 text-white"
                    >
                        Login
                    </Link>
                </div>
                :
                <div className='flex items-cente font-bold'>
                    Welcome,&nbsp;<span className='font-roboto-bold-italic text-blue-400'>{user.email}</span>
                </div>
        
        }

        </nav>
    );
}
