import { Request, Response } from 'express';
import { createUser, loginUser } from '../../services/auth.services';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const success = await createUser(username, password, email);
  if (success) {
    res.status(201).json({ message: 'User created successfully' });
  } else {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const loginUserHandler = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: 'Missing username or password' });
    return;
  }

  const token = await loginUser(username, password);
  if (token) {
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
