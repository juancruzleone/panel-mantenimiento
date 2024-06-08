import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (id: number, data: Edificio) => void;
  entity: Edificio | null;
  entityType: 'Edificio' | 'Instalacion' | 'Dispositivo';
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onEdit, entity, entityType }) => {
  const [formState, setFormState] = useState<Edificio>({
    id: 0,
    nombre: '',
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    provincia: '',
  });

  useEffect(() => {
    if (entity) {
      setFormState(entity);
    }
  }, [entity, isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: name === 'nombre' ? value : prevState.nombre,
      direccion: name === 'direccion' ? value : prevState.direccion,
      codigoPostal: name === 'codigoPostal' ? value : prevState.codigoPostal,
      ciudad: name === 'ciudad' ? value : prevState.ciudad,
      provincia: name === 'provincia' ? value : prevState.provincia,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (entity) {
      onEdit(entity.id, formState);
    }
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-contenedor p-6 rounded shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-5 mt-5">Editar {entityType}</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
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
              className={`px-4 py-2 rounded ${entity ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!entity}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;