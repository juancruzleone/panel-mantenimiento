import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
  entityType: 'Edificio' | 'Instalacion' | 'Dispositivo';
}

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
      if (entityType === 'Edificio' && ['nombre', 'direccion', 'codigoPostal', 'ciudad', 'provincia'].includes(key)) {
        return value !== '';
      }
      if (entityType === 'Instalacion' && ['nombre', 'tipoInstalacion', 'edificioId', 'cliente'].includes(key)) {
        return value !== '';
      }
      if (entityType === 'Dispositivo' && ['nombre', 'descripcion', 'codigoQR', 'instalacionId'].includes(key)) {
        return value !== '';
      }
      return true;
    });
    setIsFormValid(isValid);
  }, [formState, entityType]);

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
          <div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-montserrat text-white">Nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formState.nombre}
                onChange={handleChange}
                className="p-2 border rounded text-black font-montserrat"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-montserrat text-white">Dirección</label>
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={formState.direccion}
                onChange={handleChange}
                className="p-2 border rounded text-black font-montserrat"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-montserrat text-white">Código Postal</label>
              <input
                type="text"
                name="codigoPostal"
                placeholder="Código Postal"
                value={formState.codigoPostal}
                onChange={handleChange}
                className="p-2 border rounded text-black font-montserrat"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-montserrat text-white">Ciudad</label>
              <input
                type="text"
                name="ciudad"
                placeholder="Ciudad"
                value={formState.ciudad}
                onChange={handleChange}
                className="p-2 border rounded text-black font-montserrat"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-montserrat text-white">Provincia</label>
              <input
                type="text"
                name="provincia"
                placeholder="Provincia"
                value={formState.provincia}
                onChange={handleChange}
                className="p-2 border rounded text-black font-montserrat"
              />
            </div>
          </div>
        );
      case 'Instalacion':
        return (
          <div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-montserrat text-white">Nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formState.nombre}
                onChange={handleChange}
                className="p-2 border rounded text-black font-montserrat"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-montserrat text-white">Tipo Instalación</label>
              <input
                type="text"
                name="tipoInstalacion"
                placeholder="Tipo Instalación"
                value={formState.tipoInstalacion}
                onChange={handleChange}
                className="p-2 border rounded text-black font-montserrat"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-montserrat text-white">ID Edificio</label>
              <input
                type={"text"}
                name={"edificioId"}
                disabled
                value={formState.edificioId}
                onChange={handleChange}
                className={"p-2 border rounded text-white font-montserrat"}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-bold text-white">Nombre del cliente</label>
              <input
                type={"text"}
                name={"cliente"}
                placeholder={"Escribe nombre del cliente"}
                value={formState.cliente}
                onChange={handleChange}
                className={"p-2 border rounded text-black font-montserrat"}
              />
            </div>
          </div>
        );
      case 'Dispositivo':
        return (
          <div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-montserrat text-white">Nombre</label>
              <input
                  type={"text"}
                  name={"nombre"}
                  placeholder={"Nombre"}
                  value={formState.nombre}
                  onChange={handleChange}
                  className={"p-2 border rounded text-black font-montserrat"}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-montserrat text-white">Descripción</label>
              <input
                  type={"text"}
                  name={"descripcion"}
                  placeholder={"Descripción"}
                  value={formState.descripcion}
                  onChange={handleChange}
                  className={"p-2 border rounded text-black font-montserrat"}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-montserrat text-white">Código QR</label>
              <input
                  type={"text"}
                  name={"codigoQR"}
                  placeholder={"Código QR"}
                  value={formState.codigoQR}
                  onChange={handleChange}
                  className={"p-2 border rounded text-black font-montserrat"}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-montserrat text-white">ID Instalación</label>
              <input
                  type={"text"}
                  name={"instalacionId"}
                  disabled
                  value={formState.instalacionId}
                  onChange={handleChange}
                  className={"p-2 border rounded text-white font-montserrat"}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50 ${isOpen ? '' : 'hidden'}`}
    >
      <div
        className={`bg-contenedor p-6 rounded shadow-md w-full max-w-md`}
      >
        <h2
          className={`text-xl font-bold mb-5 mt-5 text-white`}
        >
          Crear {entityType}
        </h2>
        {renderFields()}
        <div
          className={`flex justify-end mt-4`}
        >
          <button
          type={'button'}
          className={'bg-red-500 text-white px-4 py-2 rounded mr-2'}
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          type={'submit'}
          disabled={!isFormValid}
          onClick={handleSubmit}
          className={`px-4 py-2 rounded ${isFormValid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-notallowed'}`}
        >
          Crear
        </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;