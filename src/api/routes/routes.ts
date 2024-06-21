import * as Express from 'express';
import projectRoutes from './project.routes';

const router = Express.Router();

router.use('/project', projectRoutes);

export default router;
