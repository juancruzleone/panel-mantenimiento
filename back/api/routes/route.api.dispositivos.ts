import { Router } from 'express';
import * as controllers from '../controllers/controller.api.dispositivos';

const router = Router();

// Ruta para obtener dispositivos por ID de instalación
router.get('/instalaciones/:id/dispositivos', controllers.getDispositivosByInstalacionId);

// Otras rutas de dispositivos...
router.get('/dispositivos', controllers.getAllDispositivos);
router.get('/dispositivos/:id', controllers.getDispositivoById);
router.post('/dispositivos', controllers.createDispositivo);
router.put('/dispositivos/:id', controllers.updateDispositivo);
router.delete('/dispositivos/:id', controllers.deleteDispositivo);

export default router;