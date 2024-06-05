import { Router } from 'express';
import * as controllers from '../controllers/controller.api.instalaciones';

const router = Router();

router.get('/instalaciones', controllers.getAllInstalaciones);
router.get('/instalaciones/:id', controllers.getInstalacionById);
router.post('/instalaciones', controllers.createInstalacion);
router.put('/instalaciones/:id', controllers.updateInstalacion);
router.delete('/instalaciones/:id', controllers.deleteInstalacion);

export default router;
