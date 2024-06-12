// components/DeleteModal.tsx
import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-contenedor p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4 font-montserrat text-white">Eliminar {itemName}</h2>
        <p className="mb-6 font-montserrat text-white">¿Estás seguro de que quieres eliminar <span className='font-bold text-xl'>{itemName}?</span></p>
        <div className="flex">
          <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={onClose}>Cancelar</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
