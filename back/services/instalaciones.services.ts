import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllInstalaciones = async () => {
  try {
    const instalaciones = await prisma.instalacion.findMany();
    return instalaciones;
  } catch (error: any) {
    throw new Error('Error al obtener las instalaciones: ' + error.message);
  }
};

const getInstalacionById = async (id: number) => {
  try {
    const instalacion = await prisma.instalacion.findUnique({
      where: {
        id,
      },
    });
    if (!instalacion) {
      throw new Error('Instalación no encontrada');
    }
    return instalacion;
  } catch (error: any) {
    throw new Error('Error al obtener la instalación: ' + error.message);
  }
};

const createInstalacion = async (nombre: string, tipoInstalacion: string, edificioId: number, cliente: string) => {
  try {
    const newInstalacion = await prisma.instalacion.create({
      data: {
        nombre,
        tipoInstalacion,
        edificioId, // Ensure this is an integer
        cliente,
      },
    });
    return newInstalacion;
  } catch (error: any) {
    throw new Error('Error al crear la instalación: ' + error.message);
  }
};

const updateInstalacion = async (id: number, nombre: string, tipoInstalacion: string, edificioId: number, cliente: string) => {
  try {
    const updatedInstalacion = await prisma.instalacion.update({
      where: {
        id,
      },
      data: {
        nombre,
        tipoInstalacion,
        edificioId, // Ensure this is an integer
        cliente,
      },
    });
    return updatedInstalacion;
  } catch (error: any) {
    throw new Error('Error al actualizar la instalación: ' + error.message);
  }
};

const deleteInstalacion = async (id: number) => {
  try {
    await prisma.instalacion.delete({
      where: {
        id,
      },
    });
  } catch (error: any) {
    throw new Error('Error al eliminar la instalación: ' + error.message);
  }
};

const getInstalacionesByEdificioId = async (edificioId: number) => {
  try {
    const instalaciones = await prisma.instalacion.findMany({
      where: {
        edificioId,
      },
    });
    return instalaciones;
  } catch (error: any) {
    throw new Error('Error al obtener instalaciones por ID de edificio: ' + error.message);
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
