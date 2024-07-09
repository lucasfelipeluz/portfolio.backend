import * as Express from 'express';
import { container as dependencyContainer } from 'tsyringe';
import SkillController from '@/api/controllers/SkillController';

const router = Express.Router();

const skillController = dependencyContainer.resolve(SkillController);

router.get('/', skillController.getAll.bind(skillController));
router.get('/:id', skillController.getById.bind(skillController));
router.post('/', skillController.create.bind(skillController));
router.put('/:id', skillController.update.bind(skillController));
router.delete('/:id', skillController.delete.bind(skillController));

export default router;
