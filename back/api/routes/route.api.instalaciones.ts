import { Router } from 'express';


const router = Router();

router.get('/instalaciones');
router.get('/instalaciones/:id');
router.post('/instalaciones');
router.put('/instalaciones/:id');
router.delete('/instalaciones/:id');

export default router;
