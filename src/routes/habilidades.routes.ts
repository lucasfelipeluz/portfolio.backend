import { Router } from 'express';
import HabilidadesControllers from '@src/controllers/HabilidadesControllers';

const routes = Router();

const habilidadesControllers = new HabilidadesControllers();

routes.get('/habilidades', habilidadesControllers.getAllHabilidades);
routes.get('/habilidades/:id', habilidadesControllers.getAllHabilidades);
routes.post('/habilidades', habilidadesControllers.createHabilidades);
routes.put('/habilidades/:id', habilidadesControllers.editHabilidades);
routes.delete('/habilidades/:id', habilidadesControllers.deleteHabilidades);

export default routes;
