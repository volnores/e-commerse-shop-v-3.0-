import { Router } from 'express';
import * as deviceController from '../controllers/DeviceController.js';
import { checkRoleMiddleware } from '../middleware/checkRoleMiddleware.js';
const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

export default router;
