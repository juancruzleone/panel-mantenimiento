import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import MainH1 from '../components/MainH1';

const Login = () => {
    const [usuario, setUsuario] = useState('usuario_predefinido');
    const [contrasena, setContrasena] = useState('contraseña_predefinida');
    const [isAnimating, setIsAnimating] = useState(false);
    const router = useRouter();

    const handleLogin = () => {
        // Aquí puedes agregar la lógica de validación de usuario
        setIsAnimating(true);
        setTimeout(() => {
            router.push('/');
        }, 1000); // Espera a que la animación termine antes de redirigir
    };

    return (
        <>
        <section className='relative flex h-screen'>
            <div className={`relative z-10 flex flex-col justify-center items-center w-[600px] bg-login radius-login ${isAnimating ? 'animate-login' : ''}`}>
                <MainH1 title='Inicia sesión' className='titulo-login mb-10'/>
                <div className="flex flex-col w-[350px] h-auto">
                    <label htmlFor="usuario" className="text-xl text-white font-montserrat">Usuario</label>
                    <input 
                        type="text" 
                        id="usuario" 
                        className="w-full rounded-lg p-2" 
                        placeholder='Ingresa el usuario' 
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <label htmlFor="contrasena" className="text-xl mt-4 text-white font-montserrat">Contraseña</label>
                    <input 
                        type="password" 
                        id="contraseña" 
                        className="w-full rounded-lg p-2" 
                        placeholder='Ingresa la contraseña'
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                    <button 
                        type='submit' 
                        className='text-white text-center bg-[#105B52] radius-lg mt-5 p-2 rounded-lg'
                        onClick={handleLogin}
                    >
                        Ingresar
                    </button>
                </div>
            </div>
            <div className="absolute inset-0 z-0 w-full h-full">
                <Image
                  src='/edificio.jpg'
                  alt='edificio'
                  layout='fill'
                  objectFit='cover'
                />
            </div>
        </section>
        </>
    );
}

export default Login;
