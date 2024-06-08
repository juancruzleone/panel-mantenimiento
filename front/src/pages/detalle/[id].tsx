import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavPanel from '../../components/NavPanel';
import MainH1 from '../../components/MainH1';

interface Edificio {
  id: number;
  nombre: string;
  direccion: string;
}

const DetalleEdificio = () => {
  const router = useRouter();
  const { id } = router.query;
  const [edificio, setEdificio] = useState<Edificio | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:2024/api/edificios/${id}`)
        .then(response => response.json())
        .then(data => {
          setEdificio(data);
        })
        .catch(error => console.error('Error al obtener detalles del edificio:', error));
    }
  }, [id]);

  if (!edificio) {
    return <p>Cargando...</p>;
  }

  // Capitalizamos la primera letra del nombre del edificio
  const nombreCapitalizado = edificio.nombre.charAt(0).toUpperCase() + edificio.nombre.slice(1);

  return (
    <main className='flex'>
      <NavPanel />
      <div className='pl-10'>
        <MainH1 title={nombreCapitalizado} />
        <p>Dirección: {edificio.direccion}</p>
      </div>  
    </main>
  );
};

export default DetalleEdificio;
