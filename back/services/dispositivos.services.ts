import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllDispositivos = async () => {
  try {
    const dispositivos = await prisma.dispositivo.findMany();
    return dispositivos;
  } catch (error: any) {
    throw new Error('Error al obtener los dispositivos: ' + error.message);
  }
};

const getDispositivoById = async (id: number) => {
  try {
    const dispositivo = await prisma.dispositivo.findUnique({
      where: {
        id,
      },
    });
    if (!dispositivo) {
      throw new Error('Dispositivo no encontrado');
    }
    return dispositivo;
  } catch (error: any) {
    throw new Error('Error al obtener el dispositivo: ' + error.message);
  }
};

const createDispositivo = async (
  nombre: string,
  descripcion: string,
  codigoQR: string,
  instalacionId: number
) => {
  try {
    const newDispositivo = await prisma.dispositivo.create({
      data: {
        nombre,
        descripcion,
        codigoQR,
        instalacion: {
          connect: {
            id: instalacionId,
          },
        },
      },
      include: {
        instalacion: true,
      },
    });
    return newDispositivo;
  } catch (error: any) {
    throw new Error('Error al crear el dispositivo: ' + error.message);
  }
};

const updateDispositivo = async (id: number, nombre: string, descripcion: string, codigoQR: string, instalacionId: number) => {
  try {
    const updatedDispositivo = await prisma.dispositivo.update({
      where: {
        id,
      },
      data: {
        nombre,
        descripcion,
        codigoQR,
        instalacion: {
          connect: {
            id: instalacionId,
          },
        },
      },
    });
    return updatedDispositivo;
  } catch (error: any) {
    throw new Error('Error al actualizar el dispositivo: ' + error.message);
  }
};

const deleteDispositivo = async (id: number) => {
  try {
    await prisma.dispositivo.delete({
      where: {
        id,
      },
    });
  } catch (error: any) {
    throw new Error('Error al eliminar el dispositivo: ' + error.message);
  }
};

const getDispositivosByInstalacionId = async (instalacionId: number) => {
  try {
    const dispositivos = await prisma.dispositivo.findMany({
      where: {
        instalacionId,
      },
    });
    return dispositivos;
  } catch (error: any) {
    throw new Error('Error al obtener dispositivos por ID de instalación: ' + error.message);
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