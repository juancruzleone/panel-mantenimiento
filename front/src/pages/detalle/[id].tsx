import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavPanel from '../../components/NavPanel';
import MainH1 from '../../components/MainH1';
import MainH2 from '../../components/MainH2';

interface Edificio {
  id: number;
  nombre: string;
  direccion: string;
}

interface Instalacion {
  id: number;
  nombre: string;
}

const DetalleEdificio = () => {
  const router = useRouter();
  const { id } = router.query;
  const [edificio, setEdificio] = useState<Edificio | null>(null);
  const [instalaciones, setInstalaciones] = useState<Instalacion[]>([]);
  const [loadingInstalaciones, setLoadingInstalaciones] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:2024/api/edificios/${id}`)
        .then(response => response.json())
        .then(data => {
          setEdificio(data);
        })
        .catch(error => console.error('Error al obtener detalles del edificio:', error));

      // Obtener instalaciones asociadas al edificio
      fetch(`http://localhost:2024/api/edificios/${id}/instalaciones`)
        .then(response => response.json())
        .then(data => {
          setInstalaciones(data);
          setLoadingInstalaciones(false);
        })
        .catch(error => {
          console.error('Error al obtener instalaciones:', error);
          setLoadingInstalaciones(false);
        });
    }
  }, [id]);

  if (!edificio) {
    return <p>Cargando...</p>;
  }

  const nombreCapitalizado = edificio.nombre.charAt(0).toUpperCase() + edificio.nombre.slice(1);

  return (
    <main className='flex'>
      <NavPanel />
      <section className='pl-10 font-montserrat'>
        <MainH1 title={nombreCapitalizado} />
        <address className='mt-2 pl-1'>{edificio.direccion}</address> 
        <div>
            <MainH2 title="Instalaciones" />
            {loadingInstalaciones ? (
              <p className='font-montserra text-red-500 mt-2'>Cargando instalaciones...</p>
            ) : (
              instalaciones.length === 0 ? (
                <p className='font-montserra text-red-500 mt-2'>No hay instalaciones asociadas a este edificio.</p>
              ) : (
                <ul>
                  {instalaciones.map(instalacion => (
                    <li key={instalacion.id}>{instalacion.nombre}</li>
                  ))}
                </ul>
              )
            )}
        </div>
      </section>
    </main>
  );
};

export default DetalleEdificio;
