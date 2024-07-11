import AuthMiddleware from '@/api/middlewares/AuthMiddleware';
import * as Express from 'express';
import { container as dependencyContainer } from 'tsyringe';
import authRoutes from './auth.routes';
import projectRoutes from './project.routes';
import projectImageRoutes from './projectImage.routes';
import skillRoutes from './skill.routes';

const router = Express.Router();

const authMiddleware = dependencyContainer.resolve(AuthMiddleware);

router.use('/', authRoutes);

router.use('/project', authMiddleware.handle.bind(authMiddleware), projectRoutes);
router.use('/skill', authMiddleware.handle.bind(authMiddleware), skillRoutes);
router.use('/project_image', authMiddleware.handle.bind(authMiddleware), projectImageRoutes);

export default router;
