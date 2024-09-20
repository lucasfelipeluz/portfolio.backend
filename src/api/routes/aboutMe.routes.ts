import * as Express from 'express';
import { container as dependencyContainer } from 'tsyringe';
import { AboutMeController } from '@/api/controllers';
import AuthMiddleware from '@/api/middlewares/AuthMiddleware';

const router = Express.Router();

const aboutMeController = dependencyContainer.resolve(AboutMeController);
const authMiddleware = dependencyContainer.resolve(AuthMiddleware);

router.get(
  '/',
  authMiddleware.handleAdminRoles.bind(authMiddleware),
  aboutMeController.get.bind(aboutMeController),
);
router.get(
  '/user',
  authMiddleware.handleUserRoles.bind(authMiddleware),
  aboutMeController.getInfoUser.bind(aboutMeController),
);
router.put(
  '/:idUser',
  authMiddleware.handleAdminRoles.bind(authMiddleware),
  aboutMeController.updateUser.bind(aboutMeController),
);
router.put(
  '/user',
  authMiddleware.handleUserRoles.bind(authMiddleware),
  aboutMeController.updateInfoUser.bind(aboutMeController),
);

export default router;
