import * as Express from 'express';
import projectRoutes from './project.routes';
import skillRoutes from './skill.routes';
import projectImageRoutes from './projectImage.routes';

const router = Express.Router();

router.use('/project', projectRoutes);
router.use('/skill', skillRoutes);
router.use('/project_image', projectImageRoutes);

export default router;
