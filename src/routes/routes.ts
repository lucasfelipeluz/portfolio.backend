import { Router } from 'express';

import projetosRoutes from './projetos.routes';

const routes = Router();

routes.use(projetosRoutes);

export default routes;
