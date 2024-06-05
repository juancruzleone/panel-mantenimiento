import { Router } from 'express';
import * as controllers from '../controllers/controller.api.edificios'

const router = Router();

router.get('/edificios', controllers.getAllEdificios);
router.get('/edificios/:id', controllers.getEdificioById);
router.post('/edificios', controllers.createEdificio);
router.put('/edificios/:id', controllers.updateEdificio);
router.delete('/edificios/:id', controllers.deleteEdificio);

export default router;