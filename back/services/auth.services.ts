// auth.services.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from './token.service';

const prisma = new PrismaClient();

export const createUser = async (username: string, password: string, email: string): Promise<boolean> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });
    return true;
  } catch (error) {
    console.error('Error creating user:', error);
    return false;
  }
};

export const loginUser = async (username: string, password: string): Promise<string | null> => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;

  const token = generateToken(user.id);
  return token;
};

export const findUserById = async (userId: number) => {
  return await prisma.user.findUnique({ where: { id: userId } });
};
