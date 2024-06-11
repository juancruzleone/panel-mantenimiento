import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavPanel from '../../components/NavPanel';
import MainH1 from '../../components/MainH1';
import MainH2 from '../../components/MainH2';
import EditModal from '../../components/EditModal';
import DeleteModal from '../../components/DeleteModal';

const DetalleInstalacion = () => {
  const router = useRouter();
  const { id } = router.query;
  const [instalacion, setInstalacion] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:2024/api/instalaciones/${id}`)
        .then(response => response.json())
        .then(data => setInstalacion(data))
        .catch(error => console.error('Error al obtener detalles de la instalación:', error));
    }
  }, [id]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    fetch(`http://localhost:2024/api/instalaciones/${id}`, { method: 'DELETE' })
      .then(() => {
        setIsDeleteModalOpen(false);
        router.push('/'); // Redirigir a la página principal después de eliminar
      })
      .catch(error => console.error('Error al eliminar la instalación:', error));
  };

  if (!instalacion) {
    return <p>Cargando...</p>;
  }

  return (
    <main className="flex">
      <NavPanel />
      <section className="pl-8 font-montserrat">
        <MainH1 title={instalacion.nombre} />
        <div className='mt-7'>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-boton p-2 text-white font-montserrat text-center rounded-lg"
            >
              Crear dispositivo
            </button>
          </div>
        <div className="mt-7">
          <MainH2 title="Detalles" />
          <p>Tipo de Instalación: {instalacion.tipoInstalacion}</p>
        </div>
        <div className="mt-7">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleEditClick}
          >
            Editar
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDeleteClick}
          >
            Eliminar
          </button>
        </div>
      </section>
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={(data) => {
          fetch(`http://localhost:2024/api/instalaciones/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then(response => response.json())
            .then(updatedInstalacion => {
              setInstalacion(updatedInstalacion);
              setIsEditModalOpen(false);
            })
            .catch(error => console.error('Error al editar la instalación:', error));
        }}
        entity={instalacion}
        entityType="Instalacion"
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={instalacion.nombre}
      />
    </main>
  );
};

export default DetalleInstalacion;
