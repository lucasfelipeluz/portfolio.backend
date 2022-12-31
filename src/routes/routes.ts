import { Router } from 'express';
import HomeControllers from '@src/controllers/HomeControllers';
import Auth from '@src/middleware/Auth';
import projetosRoutes from './projetos.routes';
import habilidadesRoutes from './habilidades.routes';
import sobreMimRoutes from './sobremim.routes';

const routes = Router();
const adminAuth = new Auth();

// Public
routes.get('/home', new HomeControllers().getHome);

// Private
// auth
routes.use(adminAuth.init);

// routes
routes.use(projetosRoutes);
routes.use(habilidadesRoutes);
routes.use(sobreMimRoutes);

export default routes;
