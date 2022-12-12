import express, { Router } from 'express';
import ProjetosControllers from '@src/controllers/ProjetosControllers';

const routes = Router();
const projetosControllers = new ProjetosControllers();

routes.get('/', projetosControllers.getProjetos);

export default routes;
