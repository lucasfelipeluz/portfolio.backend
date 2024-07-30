import * as Express from 'express';
import { container as dependencyContainer } from 'tsyringe';
import { AboutMeController } from '@/api/controllers';

const router = Express.Router();

const aboutMeController = dependencyContainer.resolve(AboutMeController);

router.get('/', aboutMeController.get.bind(aboutMeController));
router.put('/', aboutMeController.update.bind(aboutMeController));

export default router;
