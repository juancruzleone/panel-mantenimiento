import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllEdificios = async (req: Request, res: Response) => {
  try {
    const edificios = await prisma.edificio.findMany();
    res.json(edificios);
  } catch (error) {
    console.error('Error al obtener los edificios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getEdificioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const edificio = await prisma.edificio.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!edificio) {
      return res.status(404).json({ message: 'Edificio no encontrado' });
    }
    res.json(edificio);
  } catch (error) {
    console.error('Error al obtener el edificio por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createEdificio = async (req: Request, res: Response) => {
  const { nombre, direccion, codigoPostal, ciudad, provincia } = req.body;
  try {
    const newEdificio = await prisma.edificio.create({
      data: {
        nombre,
        direccion,
        codigoPostal,
        ciudad,
        provincia,
      },
    });
    res.status(201).json(newEdificio);
  } catch (error) {
    console.error('Error al crear el edificio:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateEdificio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, direccion, codigoPostal, ciudad, provincia } = req.body;
  try {
    const updatedEdificio = await prisma.edificio.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nombre,
        direccion,
        codigoPostal,
        ciudad,
        provincia,
      },
    });
    res.json(updatedEdificio);
  } catch (error) {
    console.error('Error al actualizar el edificio:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteEdificio = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.edificio.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: 'Edificio eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el edificio:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
