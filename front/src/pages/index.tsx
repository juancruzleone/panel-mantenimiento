import { useState, useEffect } from 'react';
import NavPanel from '../components/NavPanel';
import MainH1 from '../components/MainH1';
import Link from 'next/link';

interface Edificio {
  id: number;
  nombre: string;
  direccion: string;
  codigoPostal: string;
  ciudad: string;
  provincia: string;
}

const Index = () => {
  const [edificios, setEdificios] = useState<Edificio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:2024/api/edificios')
      .then(response => response.json())
      .then(data => {
        setEdificios(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los edificios:', error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredEdificios = edificios.filter(edificio =>
    edificio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <main className='flex'>
        <NavPanel />
        <div className='flex-grow p-6'>
          <MainH1 title="Edificios" />
          <div className='mt-7'>
            <Link href="/" className="bg-boton p-2 text-white font-montserrat text-center rounded-lg">Crear</Link>
          </div>
          <div className='mt-10'>
            <input 
              type="text" 
              className='p-3.5 rounded-full text-black font-montserrat w-[100%]' 
              placeholder='Busca por titulo' 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {loading ? (
            <p className='mt-10'>Cargando...</p>
          ) : (
            <div className='mt-20'>
              {filteredEdificios.map(edificio => (
                <div key={edificio.id} className='bg-contenedor shadow-md radius-contenedor p-6 mb-6'>
                  <h2 className='text-xl font-bold mb-2'>
                    {edificio.nombre.charAt(0).toLocaleUpperCase() + edificio.nombre.slice(1)}
                  </h2>
                  <div className='font-montserrat mt-7'>
                    <button className='bg-black text-white p-1 rounded-lg mr-2'>Ver más</button>
                    <button className='bg-blue-500 text-white p-1 rounded-lg mr-2'>Editar</button>
                    <button className='bg-red-500 text-white p-1 rounded-lg mr-2'>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Index;
