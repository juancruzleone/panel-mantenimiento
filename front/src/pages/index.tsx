import React, { useState, useEffect } from 'react';
import NavPanel from '../components/NavPanel';
import MainH1 from '../components/MainH1';
import Link from 'next/link';
import DeleteModal from '../components/DeleteModal';
import CreateModal from '../components/CreateModal';
import EditModal from '../components/EditModal';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEdificio, setCurrentEdificio] = useState<Edificio | null>(null);

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

  const handleDeleteClick = (edificio: Edificio) => {
    setCurrentEdificio(edificio);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentEdificio) {
      fetch(`http://localhost:2024/api/edificios/${currentEdificio.id}`, { method: 'DELETE' })
        .then(() => {
          setEdificios(edificios.filter(e => e.id !== currentEdificio.id));
          setIsDeleteModalOpen(false);
          setCurrentEdificio(null);
        })
        .catch(error => console.error('Error al eliminar el edificio:', error));
    }
  };

  const handleCreate = (newEdificio: Omit<Edificio, 'id'>) => {
    fetch('http://localhost:2024/api/edificios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEdificio),
    })
      .then(response => response.json())
      .then(data => {
        setEdificios([...edificios, data]);
        setIsCreateModalOpen(false);
      })
      .catch(error => console.error('Error al crear el edificio:', error));
  };

  const handleEditClick = (edificio: Edificio) => {
    setCurrentEdificio(edificio);
    setIsEditModalOpen(true);
  };

  const handleEdit = (id: number, data: Edificio) => {
    fetch(`http://localhost:2024/api/edificios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(updatedEdificio => {
        setEdificios(
          edificios.map(edificio =>
            edificio.id === updatedEdificio.id ? updatedEdificio : edificio
          )
        );
        setIsEditModalOpen(false);
        setCurrentEdificio(null);
      })
      .catch(error => console.error('Error al editar el edificio:', error));
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
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-boton p-2 text-white font-montserrat text-center rounded-lg"
            >
              Crear Edificio
            </button>
          </div>
          <div className='mt-10'>
            <input 
              type="text" 
              className='p-3.5 rounded-full text-black font-montserrat w-[100%]' 
              placeholder='Busca por título' 
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
                    <Link href={`/detalle/${edificio.id}`} passHref>
                      <button className='bg-black text-white p-1 rounded-lg mr-2'>Ver más</button>
                    </Link>
                    <button 
                      className='bg-blue-500 text-white p-1 rounded-lg mr-2'
                      onClick={() => handleEditClick(edificio)}
                    >
                      Editar
                    </button>
                    <button 
                      className='bg-red-500 text-white p-1 rounded-lg mr-2'
                      onClick={() => handleDeleteClick(edificio)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={currentEdificio ? currentEdificio.nombre : ''}
      />
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
        entityType="Edificio"
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleEdit}
        entity={currentEdificio}
        entityType="Edificio"
      />
    </>
  );
};

export default Index;
