import * as Express from 'express';
import { container as dependencyContainer } from 'tsyringe';
import { HomeController } from '@/api/controllers';

const homeController = dependencyContainer.resolve(HomeController);

const router = Express.Router();

router.get('/', homeController.get.bind(homeController));

export default router;
