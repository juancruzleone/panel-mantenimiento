import link from 'next/link'
import Image from 'next/image'
import MainH1 from '../components/MainH1'

const Login = () => {
    return (
        <>
        <section>
            <div>
                <MainH1 title='Inicia sesión'/>
                <div className="flex flex-col bg-contenedor w-[350px] h-64 radius-contenedor shadow-md mx-auto p-4">
                    <label htmlFor="" className="text-xl text-white font-montserrat">Usuario</label>
                    <input type="text" className="w-full rounded-lg p-2" placeholder='Ingresa el usuario'/>
                    <label htmlFor="" className="text-xl mt-4 text-white font-montserrat">Contraseña</label>
                    <input type="text" className="w-full rounded-lg p-2" placeholder='Ingresa la contraseña'/>
                    <button type='submit' className='text-white text-center bg-blue-500 radius-lg mt-5 p-2 rounded-lg'>Ingresar</button>
                </div>
            </div>
            <Image
                  src='edificio.jpg'
                  alt='edificio'
                  width={120}
                  height={120}
                />
        </section>
  
        </>
    )
}

export default Login