import { Router } from 'express';
import * as brandController from '../controllers/BrandController.js';
const router = new Router();
import { checkRoleMiddleware } from '../middleware/checkRolemiddleware.js';

router.post('/', checkRoleMiddleware('ADMIN'), brandController.create);
router.get('/', brandController.getAll);

export default router;
