import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface Edificio {
  id: number;
  nombre: string;
  direccion: string;
  codigoPostal: string;
  ciudad: string;
  provincia: string;
}

interface Instalacion {
  id: number;
  nombre: string;
  tipoInstalacion: string;
  edificioId: string;
  cliente: string;
}

interface Dispositivo {
  id: number;
  nombre: string;
  descripcion: string;
  codigoQR: string;
  instalacionId: string;
}

type Entity = Edificio | Instalacion | Dispositivo;

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (id: number, data: Entity) => void;
  entity: Entity | null;
  entityType: 'Edificio' | 'Instalacion' | 'Dispositivo';
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onEdit, entity, entityType }) => {
  const initialFormState = {
    Edificio: { id: 0, nombre: '', direccion: '', codigoPostal: '', ciudad: '', provincia: '' },
    Instalacion: { id: 0, nombre: '', tipoInstalacion: '', edificioId: '', cliente: '' },
    Dispositivo: { id: 0, nombre: '', descripcion: '', codigoQR: '', instalacionId: '' },
  };

  const [formState, setFormState] = useState<Entity>(initialFormState[entityType]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (entity) {
      setFormState(entity);
    }
  }, [entity, isOpen]);

  useEffect(() => {
    validateForm();
  }, [formState]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (entity) {
      onEdit(entity.id, formState);
    }
    onClose();
  };

  const validateForm = () => {
    switch (entityType) {
      case 'Edificio':
        const edificio = formState as Edificio;
        setIsFormValid(
          edificio.nombre.trim() !== '' &&
          edificio.direccion.trim() !== '' &&
          edificio.codigoPostal.trim() !== '' &&
          edificio.ciudad.trim() !== '' &&
          edificio.provincia.trim() !== ''
        );
        break;
      case 'Instalacion':
        const instalacion = formState as Instalacion;
        setIsFormValid(
          instalacion.nombre.trim() !== '' &&
          instalacion.tipoInstalacion.trim() !== '' &&
          instalacion.edificioId.toString().trim() !== '' &&
          instalacion.cliente.trim() !== ''
        );
        break;
      case 'Dispositivo':
        const dispositivo = formState as Dispositivo;
        setIsFormValid(
          dispositivo.nombre.trim() !== '' &&
          dispositivo.descripcion.trim() !== '' &&
          dispositivo.codigoQR.trim() !== '' &&
          dispositivo.instalacionId.toString().trim() !== ''
        );
        break;
      default:
        setIsFormValid(false);
        break;
    }
  };

  const renderFields = () => {
    switch (entityType) {
      case 'Edificio':
        return (
          <>
            <label className="mb-1 font-montserrat text-white">ID</label>
            <input
              type="text"
              name="id"
              value={(formState as Edificio).id.toString()}
              disabled
              className="mb-4 p-2 border rounded text-white font-montserrat"
            />
            <label className="mb-1 font-montserrat text-white">Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={(formState as Edificio).nombre}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat text-white">Dirección</label>
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={(formState as Edificio).direccion}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat text-white">Código Postal</label>
            <input
              type="text"
              name="codigoPostal"
              placeholder="Código Postal"
              value={(formState as Edificio).codigoPostal}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat text-white">Ciudad</label>
            <input
              type="text"
              name="ciudad"
              placeholder="Ciudad"
              value={(formState as Edificio).ciudad}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat text-white">Provincia</label>
            <input
              type="text"
              name="provincia"
              placeholder="Provincia"
              value={(formState as Edificio).provincia}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
          </>
        );
      case 'Instalacion':
        return (
          <>
            <label className="mb-1 font-montserrat text-white">Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={(formState as Instalacion).nombre}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat text-white">Tipo Instalación</label>
            <input
              type="text"
              name="tipoInstalacion"
              placeholder="Tipo Instalación"
              value={(formState as Instalacion).tipoInstalacion}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat text-white">ID Edificio</label>
            <input
              type="text"
              name="edificioId"
              value={(formState as Instalacion).edificioId.toString()}
              disabled
              className="mb-4 p-2 border rounded text-gray-500 font-montserrat"
            />
            <label className="mb-1 font-montserrat text-white">Cliente</label>
            <input
              type="text"
              name="cliente"
              placeholder="Cliente"
              value={(formState as Instalacion).cliente}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
          </>
        );
      case 'Dispositivo':
        return (
          <>
            <label className="mb-1 font-montserrat text-white">Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={(formState as Dispositivo).nombre}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat text-white">Descripción</label>
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={(formState as Dispositivo).descripcion}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat text-white">Código QR</label>
            <input
              type="text"
              name="codigoQR"
              placeholder="Código QR"
              value={(formState as Dispositivo).codigoQR}
              onChange={handleChange}
              className="mb-4 p-2 border rounded text-black font-montserrat"
            />
            <label className="mb-1 font-montserrat text-white">ID Instalación</label>
            <input
              type="text"
              name="instalacionId"
              value={(formState as Dispositivo).instalacionId.toString()}
              disabled
              className="mb-4 p-2 border rounded text-gray-500 font-montserrat"
            />
          </>
        );
      default:
        return null;
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
      <div className="bg-contenedor p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-5 mt-5 text-white">Editar {entityType}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {renderFields()}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Cancelar
            </button>
            <button
              type={'submit'}
              disabled={!isFormValid}
              onClick={handleSubmit}
              className={`px-4 py-2 rounded ${isFormValid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-notallowed'}`}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditModal;
