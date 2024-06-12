import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavPanel from '../../components/NavPanel';
import MainH1 from '../../components/MainH1';
import MainH2 from '../../components/MainH2';
import CreateModal from '../../components/CreateModal';
import EditModal from '../../components/EditModal';
import DeleteModal from '../../components/DeleteModal';

const DetalleInstalacion = () => {
  const router = useRouter();
  const { id } = router.query;
  const [instalacion, setInstalacion] = useState(null);
  const [dispositivos, setDispositivos] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dispositivo, setDispositivo] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:2024/api/instalaciones/${id}`)
        .then(response => response.json())
        .then(data => setInstalacion(data))
        .catch(error => console.error('Error al obtener detalles de la instalación:', error));

      fetch(`http://localhost:2024/api/instalaciones/${id}/dispositivos`)
        .then(response => response.json())
        .then(data => setDispositivos(data))
        .catch(error => console.error('Error al obtener dispositivos:', error));
    }
  }, [id]);

  const handleCrearDispositivos = () => {
    setIsCreateModalOpen(true);
  };

  const handleDeleteClick = (dispositivo: any) => {
    if (!dispositivo.id) {
      console.error('Error al eliminar dispositivo: ID no válido');
      return;
    }
    fetch(`http://localhost:2024/api/dispositivos/${dispositivo.id}`, { method: 'DELETE' })
      .then(() => {
        setDispositivos(dispositivos.filter(i => i.id !== dispositivo.id));
      })
      .catch(error => console.error('Error al eliminar dispositivo:', error));
  };

  const handleEditClick = (dispositivo: any) => {
    setIsEditModalOpen(true);
    setDispositivo(dispositivo);
  };

  const handleEdit = (dispositivo: any) => {
    fetch(`http://localhost:2024/api/dispositivos/${dispositivo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dispositivo),
    })
      .then(response => response.json())
      .then(updatedDispositivo => {
        setDispositivos(dispositivos.map(i => i.id === updatedDispositivo.id ? updatedDispositivo : i));
        setIsEditModalOpen(false);
      })
      .catch(error => console.error('Error al editar dispositivo:', error));
  };

  const handleCreate = (dispositivo) => {
    if (!dispositivo.codigoQR || !dispositivo.instalacionId) {
      console.error('Error al crear dispositivo: campos obligatorios no llenados');
      return;
    }
    fetch('http://localhost:2024/api/dispositivos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dispositivo),
    })
      .then(response => response.json())
      .then(data => {
        setDispositivos([...dispositivos, data]);
        setIsCreateModalOpen(false);
      })
      .catch(error => console.error('Error al crear dispositivo:', error));
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
            onClick={handleCrearDispositivos}
            className="bg-boton p-2 text-white font-montserrat text-center rounded-lg"
          >
            Crear dispositivo
          </button>
        </div>
        <div className="mt-7">
          <MainH2 title="Dispositivos" />
          {dispositivos.length === 0 ? (
            <p className="font-montserrat text-red-500">No hay dispositivos asociados a esta instalación.</p>
          ) : (
            <ul>
              {dispositivos.map((dispositivo, index) => (
                <li key={dispositivo.id} className="bg-contenedor shadow-md radius-contenedor p-5 mb-6 mt-4 h-auto">
                  <div className="font-montserrat">
                    <p className="font-semibold text-xl">{dispositivo.nombre}</p>
                    <p className="bg-white text-black text-center rounded-lg w-[100px] mt-1">{dispositivo.descripcion}</p>
                  </div>
                  <div className="mt-7">
                    <button
                      onClick={() => handleEditClick(dispositivo)}
                      className="bg-blue-500 text-white p-1 rounded-lg mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(dispositivo)}
                      className="bg-red-500 text-white p-1 rounded-lg"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
        entityType="Dispositivo"
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleEdit}
        entity={dispositivo}
        entityType="Dispositivo"
      />
      <DeleteModal
        isOpen={false}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {}}
        itemName=""
      />
    </main>
  );
};

export default DetalleInstalacion;