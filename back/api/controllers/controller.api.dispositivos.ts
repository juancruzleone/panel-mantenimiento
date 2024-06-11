import { Request, Response } from 'express';
import * as dispositivosService from '../../services/dispositivos.services';

const getAllDispositivos = async (req: Request, res: Response) => {
  try {
    const dispositivos = await dispositivosService.getAllDispositivos();
    res.json(dispositivos);
  } catch (error) {
    console.error('Error al obtener los dispositivos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const getDispositivoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const dispositivo = await dispositivosService.getDispositivoById(parseInt(id));
    if (!dispositivo) {
      return res.status(404).json({ message: 'Dispositivo no encontrado' });
    }
    res.json(dispositivo);
  } catch (error) {
    console.error('Error al obtener el dispositivo por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const createDispositivo = async (req: Request, res: Response) => {
  const { nombre, descripcion, codigoQR, instalacionId } = req.body;
  try {
    const newDispositivo = await dispositivosService.createDispositivo(
      nombre,
      descripcion,
      codigoQR,
      parseInt(instalacionId)
    );
    res.status(201).json(newDispositivo);
  } catch (error) {
    console.error('Error al crear el dispositivo:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const updateDispositivo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion, codigoQR, instalacionId } = req.body;
  try {
    const updatedDispositivo = await dispositivosService.updateDispositivo(
      parseInt(id),
      nombre,
      descripcion,
      codigoQR,
      parseInt(instalacionId)
    );
    res.json(updatedDispositivo);
  } catch (error) {
    console.error('Error al actualizar el dispositivo:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const deleteDispositivo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await dispositivosService.deleteDispositivo(parseInt(id));
    res.json({ message: 'Dispositivo eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el dispositivo:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const getDispositivosByInstalacionId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const dispositivos = await dispositivosService.getDispositivosByInstalacionId(parseInt(id));
    res.json(dispositivos);
  } catch (error) {
    console.error('Error al obtener dispositivos por ID de instalación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export {
  getAllDispositivos,
  getDispositivoById,
  createDispositivo,
  updateDispositivo,
  deleteDispositivo,
  getDispositivosByInstalacionId,
};