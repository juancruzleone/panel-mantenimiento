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

  return (
    <>
      <main className='flex'>
        <NavPanel />
        <div className='flex-grow p-6'>
          <MainH1 title="Edificios"/>
          <div className='mt-7'>
            <Link href="/" className="bg-boton p-2 text-white font-montserrat text-center rounded-lg">Crear</Link>
          </div>
          <div className='mt-10'>
            <input type="text" className='p-3.5 rounded-full text-black font-montserrat w-[100%]' placeholder='Búsca por titulo'/>
          </div>
          {loading ? (
            <p className='mt-10'>Cargando...</p>
          ) : (
            <div className='mt-10'>
              {edificios.map(edificio => (
                <div key={edificio.id} className='bg-contenedor shadow-md rounded-lg p-6 mb-6'>
                  <h2 className='text-xl font-bold mb-2'>{edificio.nombre}</h2>
                  <p className='text-black'><strong>Dirección:</strong> {edificio.direccion}</p>
                  <p className='text-black'><strong>Código Postal:</strong> {edificio.codigoPostal}</p>
                  <p className='text-black'><strong>Ciudad:</strong> {edificio.ciudad}</p>
                  <p className='text-black'><strong>Provincia:</strong> {edificio.provincia}</p>
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
