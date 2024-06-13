// route.api.auth.ts

import express from 'express';
import { registerUser, loginUserHandler } from '../controllers/controller.api.auth';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUserHandler);

export default router;
