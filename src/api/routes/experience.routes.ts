import * as Express from 'express';
import { container as dependencyContainer } from 'tsyringe';
import { ExperienceController } from '@/api/controllers';

const router = Express.Router();

const experienceController = dependencyContainer.resolve(ExperienceController);

router.get('/', experienceController.getAll.bind(experienceController));
router.get('/:id', experienceController.getById.bind(experienceController));
router.post('/', experienceController.create.bind(experienceController));
router.put('/:id', experienceController.update.bind(experienceController));
router.delete('/:id', experienceController.delete.bind(experienceController));

export default router;
