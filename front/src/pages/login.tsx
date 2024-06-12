import MainH1 from '../components/MainH1'

const Login = () => {
    return(
        <>
        <MainH1 title='Inicia sesión'/>
        <div>
            <form action="" className='flex flex-col bg-contenedor w-[600px] h-[300px] rounded-lg'>
                <label htmlFor="" className='text-xl'>Usuario</label>
                <input type="text" className='w-[350px] rounded-lg p-2'/>
                <label htmlFor="" className='text-xl mt-5'>Contraseña</label>
                <input type="text" className='w-[350px] rounded-lg p-2'/>
            </form>
        </div>
        </>
    )
}

export default Login