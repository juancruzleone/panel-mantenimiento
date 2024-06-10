import { Request, Response } from 'express';
import * as instalacionesService from '../../services/instalaciones.services';

const getAllInstalaciones = async (req: Request, res: Response) => {
  try {
    const instalaciones = await instalacionesService.getAllInstalaciones();
    res.json(instalaciones);
  } catch (error) {
    console.error('Error al obtener las instalaciones:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const getInstalacionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const instalacion = await instalacionesService.getInstalacionById(parseInt(id));
    if (!instalacion) {
      return res.status(404).json({ message: 'Instalación no encontrada' });
    }
    res.json(instalacion);
  } catch (error) {
    console.error('Error al obtener la instalación por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const createInstalacion = async (req: Request, res: Response) => {
  const { nombre, tipoInstalacion, edificioId, cliente } = req.body; // Cambiar propietarioId por cliente
  try {
    const newInstalacion = await instalacionesService.createInstalacion(
      nombre, 
      tipoInstalacion, 
      parseInt(edificioId), // Parse edificioId to an integer
      cliente
    ); 
    res.status(201).json(newInstalacion);
  } catch (error) {
    console.error('Error al crear la instalación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const updateInstalacion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, tipoInstalacion, edificioId, cliente } = req.body; // Cambiar propietarioId por cliente
  try {
    const updatedInstalacion = await instalacionesService.updateInstalacion(
      parseInt(id), 
      nombre, 
      tipoInstalacion, 
      parseInt(edificioId), // Parse edificioId to an integer
      cliente
    );
    res.json(updatedInstalacion);
  } catch (error) {
    console.error('Error al actualizar la instalación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const deleteInstalacion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await instalacionesService.deleteInstalacion(parseInt(id));
    res.json({ message: 'Instalación eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la instalación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const getInstalacionesByEdificioId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const instalaciones = await instalacionesService.getInstalacionesByEdificioId(parseInt(id));
    res.json(instalaciones);
  } catch (error) {
    console.error('Error al obtener instalaciones por ID de edificio:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export {
  getAllInstalaciones,
  getInstalacionById,
  createInstalacion,
  updateInstalacion,
  deleteInstalacion,
  getInstalacionesByEdificioId
};
