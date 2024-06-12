import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
  entityType: 'Edificio' | 'Instalacion' | 'Dispositivo';
}

const initialFormState = {
  Edificio: { nombre: '', direccion: '', codigoPostal: '', ciudad: '', provincia: '' },
  Instalacion: { nombre: '', tipoInstalacion: '', edificioId: '', cliente: '' },
  Dispositivo: { nombre: '', descripcion: '', codigoQR: '', instalacionId: '' },
};

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onCreate, entityType }) => {
  const router = useRouter();
  const idFromQuery = parseInt(router.query.id as string, 10);

  const [formState, setFormState] = useState({
    nombre: '',
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    provincia: '',
    tipoInstalacion: '',
    cliente: '',
    edificioId: isNaN(idFromQuery) ? '' : idFromQuery,
    instalacionId: isNaN(idFromQuery) ? '' : idFromQuery,
    descripcion: '',
    codigoQR: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setFormState({
      nombre: '',
      direccion: '',
      codigoPostal: '',
      ciudad: '',
      provincia: '',
      tipoInstalacion: '',
      cliente: '',
      edificioId: isNaN(idFromQuery) ? '' : idFromQuery,
      instalacionId: isNaN(idFromQuery) ? '' : idFromQuery,
      descripcion: '',
      codigoQR: '',
    });
  }, [entityType, isOpen, idFromQuery]);

  useEffect(() => {
    const isValid = Object.entries(formState).every(([key, value]) => {
      if (entityType === 'Instalacion' && key === 'edificioId') {
        return true;
      }
      if (entityType === 'Dispositivo' && key === 'instalacionId') {
        return true;
      }
      return value !== '';
    });
    setIsFormValid(isValid);
  }, [formState, entityType]);

  if (!isOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: name === 'edificioId' || name === 'instalacionId' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onCreate(formState);
      onClose();
    }
  };

  const renderFields = () => {
    switch (entityType) {
      case 'Edificio':
        return (
          <>
            <label className="mb-1 font-montserrat">Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formState.nombre}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat">Dirección</label>
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formState.direccion}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat">Código Postal</label>
            <input
              type="text"
              name="codigoPostal"
              placeholder="Código Postal"
              value={formState.codigoPostal}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat">Ciudad</label>
            <input
              type="text"
              name="ciudad"
              placeholder="Ciudad"
              value={formState.ciudad}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat">Provincia</label>
            <input
              type="text"
              name="provincia"
              placeholder="Provincia"
              value={formState.provincia}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
          </>
        );
      case 'Instalacion':
        return (
          <>
            <label className="mb-1 font-montserrat font-bold">Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formState.nombre}
              onChange={handleChange}
              className="mb-2 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat font-bold">Tipo Instalación</label>
            <input
              type="text"
              name="tipoInstalacion"
              placeholder="Tipo Instalación"
              value={formState.tipoInstalacion}
              onChange={handleChange}
              className="mb-2 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat font-bold">ID Edificio</label>
            <input
              type="number"
              name="edificioId"
              placeholder="Escribe el id del edificio"
              value={formState.edificioId}
              onChange={handleChange}
              className="mb-2 p-2 border rounded text-black font-montserrat text-white"
              disabled // Bloquear el campo de ID
            />
            <label className="mb-1 font-bold">Nombre del cliente</label>
            <input
              type="text"
              name="cliente"
              placeholder="Escribe nombre del cliente"
              value={formState.cliente}
              onChange={handleChange}
              className="mb-2 p-2 border rounded text-black font-montserrat"
            />
          </>
        );
      case 'Dispositivo':
        return (
          <>
            <label className="mb-1 font-montserrat">Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formState.nombre}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat">Descripción</label>
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={formState.descripcion}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat">Código QR</label>
            <input
              type="text"
              name="codigoQR"
              placeholder="Código QR"
              value={formState.codigoQR}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat">ID Instalación</label>
            <input
              type="text"
              name="instalacionId"
              placeholder="ID Instalación"
              value={formState.instalacionId}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
              disabled // Bloquear el campo de ID
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-contenedor p-6 rounded shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-5 mt-5">Crear {entityType}</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            {renderFields()}
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded ${isFormValid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!isFormValid}
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
