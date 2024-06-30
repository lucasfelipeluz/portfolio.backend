import * as Express from 'express';
import { container as dependencyContainer } from 'tsyringe';
import ProjectImageController from '../controllers/ProjectImageController';

const router = Express.Router();

const projectImageController = dependencyContainer.resolve(ProjectImageController);

router.post('/', projectImageController.create.bind(projectImageController));
router.put('/:id', projectImageController.updateViewPriority.bind(projectImageController));
router.delete('/:id', projectImageController.delete.bind(projectImageController));

export default router;
