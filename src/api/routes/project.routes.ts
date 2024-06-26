import * as Express from 'express';
import { container as dependencyContainer } from 'tsyringe';
import ProjectController from '../controllers/ProjectController';

const router = Express.Router();

const projectController = dependencyContainer.resolve(ProjectController);

router.get('/', projectController.getAll.bind(projectController));
router.get('/:id', projectController.getById.bind(projectController));
router.post('/', projectController.create.bind(projectController));
router.put('/:id', projectController.update.bind(projectController));
router.delete('/:id', projectController.delete.bind(projectController));

export default router;
