import { Router } from 'express';
import SobreMimControllers from '@src/controllers/SobreMimControllers';

const routes = Router();

const sobreMimControllers = new SobreMimControllers();

routes.get('/sobremim', sobreMimControllers.getSobreMim);
routes.post('/sobremim', sobreMimControllers.editSobreMim);

export default routes;
