import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavPanel from '../../components/NavPanel';
import MainH1 from '../../components/MainH1';
import MainH2 from '../../components/MainH2';
import CreateModal from '../../components/CreateModal';
import DeleteModal from '../../components/DeleteModal';
import EditModal from '../../components/EditModal';

interface Edificio {
  id: number;
  nombre: string;
  direccion: string;
}

interface Instalacion {
  id: number;
  nombre: string;
  tipoInstalacion: string;
}

const DetalleEdificio = () => {
  const router = useRouter();
  const { id } = router.query;
  const [edificio, setEdificio] = useState<Edificio | null>(null);
  const [instalaciones, setInstalaciones] = useState<Instalacion[]>([]);
  const [loadingInstalaciones, setLoadingInstalaciones] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentInstalacion, setCurrentInstalacion] = useState<Instalacion | null>(null);

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

  const handleCrearInstalaciones = () => {
    setIsCreateModalOpen(true);
  };

  const handleDeleteClick = (instalacion: Instalacion) => {
    setCurrentInstalacion(instalacion);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentInstalacion) {
      fetch(`http://localhost:2024/api/instalaciones/${currentInstalacion.id}`, { method: 'DELETE' })
        .then(() => {
          setInstalaciones(instalaciones.filter(i => i.id !== currentInstalacion.id));
          setIsDeleteModalOpen(false);
          setCurrentInstalacion(null);
        })
        .catch(error => console.error('Error al eliminar la instalación:', error));
    }
  };

  const handleEditClick = (instalacion: Instalacion) => {
    setCurrentInstalacion(instalacion);
    setIsEditModalOpen(true);
  };

  const handleEdit = (id: number, data: Instalacion) => {
    fetch(`http://localhost:2024/api/instalaciones/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(updatedInstalacion => {
        setInstalaciones(
          instalaciones.map(i =>
            i.id === updatedInstalacion.id ? updatedInstalacion : i
          )
        );
        setIsEditModalOpen(false);
        setCurrentInstalacion(null);
      })
      .catch(error => console.error('Error al editar la instalación:', error));
  };

  if (!edificio) {
    return <p>Cargando...</p>;
  }

  const nombreCapitalizado = edificio.nombre.charAt(0).toUpperCase() + edificio.nombre.slice(1);

  return (
    <main className='flex'>
      <NavPanel />
      <section className='pl-14 mt-8 font-montserrat'>
        <MainH1 title={nombreCapitalizado} />
        <address className='mt-2 pl-1 text-white'>{edificio.direccion}</address>
        <div className='mt-7'>
          <button
            className="bg-boton p-2 text-white font-montserrat text-center rounded-lg"
            onClick={handleCrearInstalaciones}
          >
            Crear Instalaciones
          </button>
        </div>
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
                  <li key={instalacion.id} className='bg-contenedor shadow-md radius-contenedor p-5 mb-6 mt-4 h-auto w-[700px]'>
                    <div className='font-montserrat'>
                      <p className='font-semibold text-xl text-white'>{instalacion.nombre}</p>
                      <p className='bg-white text-black text-center rounded-lg w-[100px] mt-1'>{instalacion.tipoInstalacion}</p>
                    </div>
                    <div className='mt-7'>
                      <Link href={`/detalle-instalaciones/${instalacion.id}`} passHref>
                        <button className='bg-black text-white p-1 rounded-lg mr-2'>Ver más</button>
                      </Link>
                      <button onClick={() => handleEditClick(instalacion)} className='bg-blue-500 text-white p-1 rounded-lg mr-2'>Editar</button>
                      <button onClick={() => handleDeleteClick(instalacion)} className='bg-red-500 text-white p-1 rounded-lg mr-2'>Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      </section>
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={(instalacion) => {
          fetch('http://localhost:2024/api/instalaciones', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(instalacion),
          })
            .then(response => response.json())
            .then(data => {
              setInstalaciones([...instalaciones, data]);
              setIsCreateModalOpen(false);
            })
            .catch(error => console.error('Error al crear la instalación:', error));
        }}
        entityType="Instalacion"
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={currentInstalacion ? currentInstalacion.nombre : ''}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleEdit}
        entity={currentInstalacion}
        entityType="Instalacion"
      />
    </main>
  );
};

export default DetalleEdificio;