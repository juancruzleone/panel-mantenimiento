// pages/login.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Importamos los íconos de ojo y ojo cerrado
import MainH1 from '../components/MainH1'; // Importamos el componente MainH1

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña
    const router = useRouter();

    const handleLogin = async () => {
        setIsAnimating(true);
        try {
            const response = await fetch('http://localhost:2024/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                router.push('/');
            } else {
                const error = await response.json();
                setError(error.error); // Ajusta el manejo de error según la estructura de respuesta del backend
            }
        } catch (err) {
            setError('Error al iniciar sesión. Inténtalo de nuevo más tarde.');
        } finally {
            setIsAnimating(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <section className='relative flex h-screen'>
                <div className={`relative z-10 flex flex-col justify-center items-center w-[600px] bg-login radius-login ${isAnimating ? 'animate-login' : ''}`}>
                    <MainH1 title='Inicia sesión' className='titulo-login mb-12'/> {/* Utilizamos el componente MainH1 */}
                    <div className="flex flex-col w-[350px] h-auto">
                        <label htmlFor="username" className="text-xl text-white font-montserrat">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full rounded-lg p-2 mt-2 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder='Ingresa el usuario'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="password" className="text-xl mt-4 text-white font-montserrat">Contraseña</label>
                        <div className="relative mt-2">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="w-full rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
                                placeholder='Ingresa la contraseña'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        {error && <div className="text-red-500 mt-2">{error}</div>}
                        <button
                            type='submit'
                            className='text-white text-center bg-[#105B52] rounded-lg mt-5 p-2 w-full'
                            onClick={handleLogin}
                        >
                            Ingresar
                        </button>
                    </div>
                </div>
                <div className="absolute inset-0 z-0 w-full h-full">
                    <img
                        src='/edificio.jpg'
                        alt='edificio'
                        className="object-cover w-full h-full"
                    />
                </div>
            </section>
        </>
    );
}

export default Login;
