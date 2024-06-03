import Link from 'next/link'


const NavPanel = () => {
    return(
        <>
        <nav className='bg-orange-600 w-[200px]  min-h-screen'>
            <ul>
                <li>
                    <Link href="/" className='font-montserrat text-xl'>Edificios</Link>
                </li>
                <li>
                    <Link href="/" className='font-montserrat text-xl'></Link>
                </li>
                <li>
                    <Link href="/" className='font-montserrat text-xl'></Link>
                </li>
                <li>
                    <Link href="/" className='font-montserrat text-xl'></Link>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default NavPanel