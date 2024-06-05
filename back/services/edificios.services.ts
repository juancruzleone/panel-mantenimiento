import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllEdificios = async () => {
  try {
    const edificios = await prisma.edificio.findMany();
    return edificios;
  } catch (error: any) {
    throw new Error('Error al obtener los edificios: ' + error.message);
  }
};

const getEdificioById = async (id: number) => {
  try {
    const edificio = await prisma.edificio.findUnique({
      where: {
        id,
      },
    });
    if (!edificio) {
      throw new Error('Edificio no encontrado');
    }
    return edificio;
  } catch (error: any) {
    throw new Error('Error al obtener el edificio: ' + error.message);
  }
};

const createEdificio = async (nombre: string, direccion: string, codigoPostal: string, ciudad: string, provincia: string) => {
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
    return newEdificio;
  } catch (error: any) {
    throw new Error('Error al crear el edificio: ' + error.message);
  }
};

const updateEdificio = async (id: number, nombre: string, direccion: string, codigoPostal: string, ciudad: string, provincia: string) => {
  try {
    const updatedEdificio = await prisma.edificio.update({
      where: {
        id,
      },
      data: {
        nombre,
        direccion,
        codigoPostal,
        ciudad,
        provincia,
      },
    });
    return updatedEdificio;
  } catch (error: any) {
    throw new Error('Error al actualizar el edificio: ' + error.message);
  }
};

const deleteEdificio = async (id: number) => {
  try {
    await prisma.edificio.delete({
      where: {
        id,
      },
    });
  } catch (error: any) {
    throw new Error('Error al eliminar el edificio: ' + error.message);
  }
};


export {
  getAllEdificios,
  getEdificioById,
  createEdificio,
  updateEdificio,
  deleteEdificio
}