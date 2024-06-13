import Link from 'next/link'


const NavPanel = () => {
    return(
        <>
        <nav className='bg-[#105B52] w-[200px]  min-h-screen'>
            <ul className='p-2 rounded-lg mt-[120px]'>
                <li className='bg-white rounded-lg p-1'>
                    <Link href="/" className='font-montserrat text-xl text-center text-black ml-6'>Edificios</Link>
                </li>
                <li className='bg-white rounded-lg mt-3 p-1'>
                    <Link href="/" className='font-montserrat text-xl text-center text-black ml-6'>Clientes</Link>
                </li>
                <li className='bg-white rounded-lg mt-3 p-1'>
                    <Link href="/" className='font-montserrat text-xl text-center text-black ml-6'>Tareas</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default NavPanel