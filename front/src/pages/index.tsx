import React, { useState, useEffect } from 'react';
import NavPanel from '../components/NavPanel';
import MainH1 from '../components/MainH1';
import Link from 'next/link';
import DeleteModal from '../components/DeleteModal';
import CreateModal from '../components/CreateModal';
import EditModal from '../components/EditModal';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Cambia este valor según tus necesidades

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
    setCurrentPage(1); // Reiniciar a la primera página al cambiar el término de búsqueda
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
    edificio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    edificio.direccion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEdificios = filteredEdificios.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <main className='flex'>
        <NavPanel />
        <div className='flex-grow p-6 mt-[100px]'>
          <MainH1 title="Edificios" />
          <div className='mt-7'>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-boton p-2 text-black font-montserrat text-center rounded-lg"
            >
              Crear edificio
            </button>
          </div>
          <div className='mt-10'>
            <input 
              type="text" 
              className='p-3.5 rounded-full text-black font-montserrat w-[100%]' 
              placeholder='Busca por título o dirección' 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {loading ? (
            <p className='mt-10'>Cargando...</p>
          ) : (
            <div className='mt-20'>
              {currentEdificios.map(edificio => (
                <div key={edificio.id} className='bg-contenedor shadow-md radius-contenedor p-6 mb-6'>
                  <h2 className='text-xl font-bold mb-2 text-white'>
                    {edificio.nombre.charAt(0).toLocaleUpperCase() + edificio.nombre.slice(1)}
                  </h2>
                  <div className='font-montserrat mt-7'>
                    <Link href={`/detalle-edificios/${edificio.id}`} passHref>
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
              <Pagination className="mt-5" aria-label="Paginación">
                <PaginationContent>
                  <PaginationPrevious
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='bg-[#105B52] mr-2'
                  />
                  {Array.from({ length: Math.ceil(filteredEdificios.length / itemsPerPage) }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => paginate(index + 1)}
                        isActive={index + 1 === currentPage}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationNext
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredEdificios.length / itemsPerPage)}
                  />
                </PaginationContent>
              </Pagination>
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
