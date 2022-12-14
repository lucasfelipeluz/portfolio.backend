import { Router } from 'express';
import projetosRoutes from './projetos.routes';
import habilidadesRoutes from './habilidades.routes';
import sobreMimRoutes from './sobremim.routes';

const routes = Router();

routes.use(projetosRoutes);
routes.use(habilidadesRoutes);
routes.use(sobreMimRoutes);

export default routes;
