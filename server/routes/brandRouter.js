import { Router } from 'express';
import * as brandController from '../controllers/BrandController.js';
import { checkRoleMiddleware } from '../middleware/checkRoleMiddleware.js';
const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), brandController.create);
router.get('/', brandController.getAll);

export default router;
