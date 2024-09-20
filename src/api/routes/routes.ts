import AuthMiddleware from '@/api/middlewares/AuthMiddleware';
import * as Express from 'express';
import { container as dependencyContainer } from 'tsyringe';
import authRoutes from './auth.routes';
import projectRoutes from './project.routes';
import projectImageRoutes from './projectImage.routes';
import skillRoutes from './skill.routes';
import homeRoutes from './home.routes';
import systemVariableRoutes from './systemVariable.routes';
import aboutMeRoutes from './aboutMe.routes';
import experienceRoutes from './experience.routes';
import suggestionRoutes from './suggestion.routes';

const router = Express.Router();

const authMiddleware = dependencyContainer.resolve(AuthMiddleware);

router.use('/', authRoutes);
router.use('/public', homeRoutes);
router.use('/var', systemVariableRoutes);

router.use('/project', authMiddleware.handleUserRoles.bind(authMiddleware), projectRoutes);
router.use('/skill', authMiddleware.handleUserRoles.bind(authMiddleware), skillRoutes);
router.use(
  '/project_image',
  authMiddleware.handleUserRoles.bind(authMiddleware),
  projectImageRoutes,
);
router.use('/about_me', aboutMeRoutes);
router.use('/experience', authMiddleware.handleUserRoles.bind(authMiddleware), experienceRoutes);
router.use('/suggestion', suggestionRoutes);

export default router;
