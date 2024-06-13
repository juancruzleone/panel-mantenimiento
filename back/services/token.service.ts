// token.service.ts

import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key'; // Cambia esto por una clave secreta segura

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string): { userId: number } | null => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded as { userId: number };
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};
