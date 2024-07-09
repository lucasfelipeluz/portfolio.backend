import * as Express from 'express';
import projectRoutes from './project.routes';
import projectImageRoutes from './projectImage.routes';
import skillRoutes from './skill.routes';

const router = Express.Router();

router.use('/project', projectRoutes);
router.use('/skill', skillRoutes);
router.use('/project_image', projectImageRoutes);

export default router;
