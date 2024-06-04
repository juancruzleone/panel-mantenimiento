import Link from 'next/link'


const NavPanel = () => {
    return(
        <>
        <nav className='bg-orange-600 w-[200px]  min-h-screen'>
            <ul className='p-2 rounded-lg'>
                <li>
                    <Link href="/" className='font-montserrat text-xl text-center text-black'>Edificios</Link>
                </li>
                <li>
                    <Link href="/" className='font-montserrat text-xl text-center text-black'>Clientes</Link>
                </li>
                <li>
                    <Link href="/" className='font-montserrat text-xl text-center text-black'>Tareas</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default NavPanel