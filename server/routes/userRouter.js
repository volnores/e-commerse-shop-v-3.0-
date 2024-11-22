import { Router } from 'express';
import * as userController from '../controllers/UserController.js';
import { registerValidation } from '../validation/userValidation.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = new Router();

router.post('/registration', registerValidation, userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.checkAuth);

export default router;
