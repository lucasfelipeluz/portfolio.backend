import * as Express from 'express';
import { container as dependencyContainer } from 'tsyringe';
import { AcessMetricsController } from '@/api/controllers';

const router = Express.Router();

const acessMetricsController = dependencyContainer.resolve(AcessMetricsController);

router.get('/', acessMetricsController.getAll.bind(acessMetricsController));

export default router;
