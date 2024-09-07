import * as Express from 'express';
import { container as dependencyContainer } from 'tsyringe';
import { SuggestionController } from '@/api/controllers';
import AuthMiddleware from '@/api/middlewares/AuthMiddleware';

const suggestionController = dependencyContainer.resolve(SuggestionController);
const authMiddleware = dependencyContainer.resolve(AuthMiddleware);

const router = Express.Router();

router.get(
  '/',
  authMiddleware.handle.bind(authMiddleware),
  suggestionController.get.bind(suggestionController),
);
router.post('/', suggestionController.create.bind(suggestionController));

export default router;
