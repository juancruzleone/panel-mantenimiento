// routes/api.instalaciones.ts
import { Router } from 'express';
import * as controllers from '../controllers/controller.api.instalaciones';

const router = Router();

// Ruta para obtener instalaciones por ID de edificio
router.get('/edificios/:id/instalaciones', controllers.getInstalacionesByEdificioId);

// Otras rutas de instalaciones...
router.get('/instalaciones', controllers.getAllInstalaciones);
router.get('/instalaciones/:id', controllers.getInstalacionById);
router.post('/instalaciones', controllers.createInstalacion);
router.put('/instalaciones/:id', controllers.updateInstalacion);
router.delete('/instalaciones/:id', controllers.deleteInstalacion);

export default router;
