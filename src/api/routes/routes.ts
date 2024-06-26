import * as Express from 'express';
import projectRoutes from './project.routes';
import skillRoutes from './skill.routes';

const router = Express.Router();

router.use('/project', projectRoutes);
router.use('/skill', skillRoutes);

export default router;
