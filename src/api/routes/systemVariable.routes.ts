import * as Express from 'express';
import { container as dependencyContainer } from 'tsyringe';
import { SystemVariableController } from '@/api/controllers';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Express.Router();

const systemVariableController = dependencyContainer.resolve(SystemVariableController);

const authMiddleware = dependencyContainer.resolve(AuthMiddleware);

router.get(
  '/',
  authMiddleware.handleUserRoles.bind(authMiddleware),
  systemVariableController.get.bind(systemVariableController),
);
router.post(
  '/',
  authMiddleware.handleUserRoles.bind(authMiddleware),
  systemVariableController.create.bind(systemVariableController),
);
router.delete(
  '/:id',
  authMiddleware.handleUserRoles.bind(authMiddleware),
  systemVariableController.delete.bind(systemVariableController),
);

export default router;
