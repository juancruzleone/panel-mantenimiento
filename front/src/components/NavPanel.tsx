import Link from 'next/link'


const NavPanel = () => {
    return(
        <>
        <nav className='bg-orange-600 w-[200px]  min-h-screen'>
            <ul className='p-2 rounded-lg mt-[120px]'>
                <li className='bg-contenedor rounded-lg p-1'>
                    <Link href="/" className='font-montserrat text-xl text-center text-black ml-6 text-white'>Edificios</Link>
                </li>
                <li className='bg-contenedor rounded-lg mt-3 p-1'>
                    <Link href="/" className='font-montserrat text-xl text-center text-black ml-6 text-white'>Clientes</Link>
                </li>
                <li className='bg-contenedor rounded-lg mt-3 p-1'>
                    <Link href="/" className='font-montserrat text-xl text-center text-black ml-6 text-white'>Tareas</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default NavPanel