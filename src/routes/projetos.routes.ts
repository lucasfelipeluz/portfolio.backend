import { Router } from 'express';
import ProjetosControllers from '@src/controllers/ProjetosControllers';

const routes = Router();

const projetosControllers = new ProjetosControllers();

routes.get('/projetos', projetosControllers.getAllProjetos);
routes.get('/projetos/:id', projetosControllers.getAllProjetos);
routes.post('/projetos', projetosControllers.createProjeto);
routes.put('/projetos/:id', projetosControllers.editProjeto);
routes.delete('/projetos/:id', projetosControllers.deleteProjeto);

export default routes;
