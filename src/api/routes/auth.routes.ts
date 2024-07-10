import * as Express from 'express';
import { container as dependencyContainer } from 'tsyringe';
import { AuthController } from '@/api/controllers';

const router = Express.Router();

const authController = dependencyContainer.resolve(AuthController);

router.post('/login', authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));

export default router;
